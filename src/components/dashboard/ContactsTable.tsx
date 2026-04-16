"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Download } from 'lucide-react';

interface Opportunity {
  id: string;
  name: string;
  status: string;
  monetaryValue?: number;
  createdAt?: string;
  callSummary?: string | null;
  contact?: {
    id?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
}

const PAGE_SIZE_OPTIONS = [25, 50, 100];

function CallSummaryCell({ summary }: { summary: string | null | undefined }) {
  const [expanded, setExpanded] = useState(false);

  if (!summary) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[0.75rem] text-gray-300">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-200 inline-block" />
        No call yet
      </span>
    );
  }

  const isLong = summary.length > 120;
  const preview = isLong && !expanded ? summary.slice(0, 120).trimEnd() + '…' : summary;

  return (
    <div className="bg-gray-50 hover:bg-gray-100/80 border border-gray-100 hover:border-gray-200 rounded-xl px-3.5 py-3 flex flex-col gap-1.5 transition-all duration-200 hover:shadow-sm">
      <p className="text-[0.82rem] text-gray-700 leading-relaxed">{preview}</p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="self-start flex items-center gap-1 text-[0.72rem] font-semibold text-red-500 hover:text-red-600 transition-colors mt-0.5"
        >
          {expanded ? <><ChevronUp size={12} /> Show less</> : <><ChevronDown size={12} /> Read more</>}
        </button>
      )}
    </div>
  );
}

function getContactName(opp: Opportunity) {
  return opp.contact?.name
    ?? [opp.contact?.firstName, opp.contact?.lastName].filter(Boolean).join(' ')
    ?? opp.name
    ?? '—';
}

function formatDate(dateStr?: string) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

async function downloadPDF(selected: Opportunity[], companyName: string) {
  const { default: jsPDF } = await import('jspdf');
  const { default: autoTable } = await import('jspdf-autotable');

  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(30, 30, 30);
  doc.text('Contact Report', 40, 48);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text(companyName, 40, 64);
  doc.text(`Generated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`, 40, 78);
  doc.text(`${selected.length} contact${selected.length !== 1 ? 's' : ''}`, 40, 92);

  // Divider
  doc.setDrawColor(220, 220, 220);
  doc.line(40, 100, doc.internal.pageSize.width - 40, 100);

  autoTable(doc, {
    startY: 114,
    head: [['Date', 'Name', 'Phone', 'Email', 'AI Call Summary']],
    body: selected.map((opp) => [
      formatDate(opp.createdAt),
      getContactName(opp),
      opp.contact?.phone ?? '—',
      opp.contact?.email ?? '—',
      opp.callSummary ?? 'No call yet',
    ]),
    headStyles: {
      fillColor: [220, 38, 38],
      textColor: 255,
      fontStyle: 'bold',
      fontSize: 9,
    },
    bodyStyles: {
      fontSize: 9,
      textColor: [50, 50, 50],
      valign: 'top',
    },
    alternateRowStyles: { fillColor: [250, 250, 250] },
    columnStyles: {
      0: { cellWidth: 72 },
      1: { cellWidth: 110 },
      2: { cellWidth: 100 },
      3: { cellWidth: 140 },
      4: { cellWidth: 'auto' },
    },
    margin: { left: 40, right: 40 },
    tableLineColor: [230, 230, 230],
    tableLineWidth: 0.5,
  });

  doc.save(`contacts-${Date.now()}.pdf`);
}

export default function ContactsTable({
  opportunities,
  companyName = 'Your Company',
}: {
  opportunities: Opportunity[];
  companyName?: string;
}) {
  const [pageSize, setPageSize] = useState(25);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  if (opportunities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-white border border-gray-100 rounded-2xl">
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-2xl mb-4">👥</div>
        <h3 className="font-['Space_Grotesk'] font-bold text-gray-700 mb-1">No contacts yet</h3>
        <p className="text-[0.85rem] text-gray-400 max-w-[280px]">Leads from your website will appear here automatically.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(opportunities.length / pageSize);
  const start = (page - 1) * pageSize;
  const paginated = opportunities.slice(start, start + pageSize);

  const allOnPageSelected = paginated.every((o) => selected.has(o.id));
  const someOnPageSelected = paginated.some((o) => selected.has(o.id));

  const toggleAll = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allOnPageSelected) {
        paginated.forEach((o) => next.delete(o.id));
      } else {
        paginated.forEach((o) => next.add(o.id));
      }
      return next;
    });
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handlePageSize = (size: number) => {
    setPageSize(size);
    setPage(1);
  };

  const selectedOpps = opportunities.filter((o) => selected.has(o.id));

  return (
    <div className="flex flex-col gap-3">

      {/* Action bar — visible when something is selected */}
      {selected.size > 0 && (
        <div className="slide-down flex items-center justify-between bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-xl px-4 py-2.5 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[0.82rem] font-semibold text-red-700">
              {selected.size} contact{selected.size !== 1 ? 's' : ''} selected
            </span>
          </div>
          <button
            onClick={() => downloadPDF(selectedOpps, companyName)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-[0.8rem] font-semibold px-4 py-1.5 rounded-lg transition-all duration-150 shadow-sm hover:shadow-md"
          >
            <Download size={14} />
            Download PDF
          </button>
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <table className="w-full text-[0.875rem]">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100">
              <th className="px-4 py-3.5 w-10">
                <input
                  type="checkbox"
                  checked={allOnPageSelected}
                  ref={(el) => { if (el) el.indeterminate = someOnPageSelected && !allOnPageSelected; }}
                  onChange={toggleAll}
                  className="w-4 h-4 rounded border-gray-300 accent-red-600 cursor-pointer"
                />
              </th>
              <th className="text-left px-5 py-3.5 text-[0.72rem] font-bold text-gray-400 uppercase tracking-[1px] w-[220px]">Contact</th>
              <th className="text-left px-5 py-3.5 text-[0.72rem] font-bold text-gray-400 uppercase tracking-[1px]">AI Call Summary</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginated.map((opp, i) => {
              const contactName = getContactName(opp);
              const date = formatDate(opp.createdAt);
              const isSelected = selected.has(opp.id);

              return (
                <tr
                  key={opp.id}
                  className={`row-enter transition-colors ${isSelected ? 'bg-red-50/50' : 'bg-white hover:bg-slate-50/70'}`}
                  style={{ '--row-index': i } as React.CSSProperties}
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleOne(opp.id)}
                      className="w-4 h-4 rounded border-gray-300 accent-red-600 cursor-pointer"
                    />
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-[0.7rem] text-gray-400 mb-1">{date}</div>
                    <div className="font-semibold text-[0.95rem] text-gray-900">{contactName}</div>
                    {opp.contact?.phone && (
                      <div className="text-[0.75rem] text-gray-500 mt-1">{opp.contact.phone}</div>
                    )}
                    {opp.contact?.email && (
                      <div className="text-[0.75rem] text-gray-400 mt-0.5">{opp.contact.email}</div>
                    )}
                  </td>
                  <td className="px-5 py-4 w-full">
                    <CallSummaryCell summary={opp.callSummary} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination bar */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-[0.78rem] text-gray-400">Rows per page:</span>
          <div className="flex items-center gap-1">
            {PAGE_SIZE_OPTIONS.map((size) => (
              <button
                key={size}
                onClick={() => handlePageSize(size)}
                className={`px-2.5 py-1 rounded-lg text-[0.78rem] font-semibold transition-all duration-150 ${
                  pageSize === size
                    ? 'bg-red-50 text-red-600 border border-red-200'
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50 border border-transparent'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[0.78rem] text-gray-400">
            {start + 1}–{Math.min(start + pageSize, opportunities.length)} of {opportunities.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="text-[0.78rem] font-semibold text-gray-600 px-2">{page} / {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
