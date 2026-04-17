import { type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, companyName, industry, description, colors, plan, extra } = body;

    if (!email || !firstName || !phone) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const GHL_API_KEY = process.env.GHL_API_KEY;
    const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
    const PIPELINE_ID = process.env.GHL_AIWWWEB_PIPELINE_ID;

    if (!GHL_API_KEY || !GHL_LOCATION_ID) {
      return Response.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // 1. Create contact in GHL
    const contactRes = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationId: GHL_LOCATION_ID,
        firstName,
        lastName: lastName || '',
        email,
        phone,
        companyName: companyName || '',
        source: 'AIWWWEB Website',
        tags: [`plan-${plan.toLowerCase()}`, 'website-lead'],
      }),
    });

    if (!contactRes.ok) {
      // Contact might already exist — try to find them
      const searchRes = await fetch(
        `https://services.leadconnectorhq.com/contacts/search/duplicate?locationId=${GHL_LOCATION_ID}&email=${encodeURIComponent(email)}`,
        {
          headers: {
            'Authorization': `Bearer ${GHL_API_KEY}`,
            'Version': '2021-07-28',
          },
        }
      );
      const searchData = await searchRes.json();
      if (!searchData.contact?.id) {
        return Response.json({ error: 'Failed to create contact' }, { status: 500 });
      }
      var contactId = searchData.contact.id;
    } else {
      const contactData = await contactRes.json();
      var contactId = contactData.contact?.id;
    }

    if (!contactId) {
      return Response.json({ error: 'No contact ID' }, { status: 500 });
    }

    // 2. Add a note with all the intake details
    const noteBody = [
      `📋 AIWWWEB Intake Form — ${plan} Plan`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      ``,
      `👤 Name: ${firstName} ${lastName || ''}`,
      `📧 Email: ${email}`,
      `📱 Phone: ${phone}`,
      `🏢 Business: ${companyName || 'Not provided'}`,
      `🏭 Industry: ${industry || 'Not provided'}`,
      `🎨 Preferred Colors: ${colors || 'Not provided'}`,
      ``,
      `📝 What they need:`,
      description || 'No description provided',
      ``,
      ...(extra ? [`💡 Additional Info:`, extra, ``] : []),
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Source: AIWWWEB.com | Plan: ${plan}`,
      `Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}`,
    ].join('\n');

    await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ body: noteBody }),
    });

    // 3. Create opportunity in pipeline (if configured)
    if (PIPELINE_ID) {
      const monetaryValues: Record<string, number> = {
        'Starter': 49,
        'Professional': 99,
        'Enterprise': 500,
      };

      await fetch('https://services.leadconnectorhq.com/opportunities/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          locationId: GHL_LOCATION_ID,
          pipelineId: PIPELINE_ID,
          name: `${firstName} ${lastName || ''} — ${plan}`,
          contactId,
          status: 'open',
          monetaryValue: monetaryValues[plan] || 0,
          source: 'AIWWWEB Website',
        }),
      });
    }

    return Response.json({ success: true, contactId });

  } catch (err) {
    console.error('Intake form error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
