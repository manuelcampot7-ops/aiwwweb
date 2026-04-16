'use client';

import { Suspense, lazy } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

export function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
  return (
    <Suspense
      fallback={
        <div className={`w-full h-full flex items-center justify-center ${className}`}>
          <div className="w-8 h-8 rounded-full border-2 border-red-500/40 border-t-red-500 animate-spin" />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
