import React from 'react';

// Full-screen brand loader with orbiting dots and subtle glow
const FullScreenLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100/90">
      {/* Soft radial glow */}
      <div className="pointer-events-none absolute -inset-20 blur-3xl opacity-60">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(43,120,172,0.25)_0%,rgba(43,120,172,0.12)_35%,transparent_70%)]" />
      </div>

      {/* Orbiting loader */}
      <div className="relative w-40 h-40">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border border-blue-200/70"></div>
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '6s' }}>
          <span className="absolute top-0 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-blue-600 shadow-[0_0_20px_rgba(43,120,172,0.6)]"></span>
        </div>

        {/* Middle ring */}
        <div className="absolute inset-6 rounded-full border border-blue-200/60"></div>
        <div className="absolute inset-6 animate-spin" style={{ animationDuration: '4s' }}>
          <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_16px_rgba(43,120,172,0.5)]"></span>
        </div>

        {/* Inner ring (reverse) */}
        <div className="absolute inset-12 rounded-full border border-blue-200/50"></div>
        <div className="absolute inset-12" style={{ animation: 'spin-reverse 3s linear infinite' as React.CSSProperties['animation'] }}>
          <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(43,120,172,0.45)]"></span>
        </div>

        {/* Core pulse */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-4 h-4 rounded-full bg-blue-600 shadow-[0_0_24px_rgba(43,120,172,0.75)]"></div>
            <div className="absolute inset-0 rounded-full bg-blue-400/40 animate-pulse-soft"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenLoader;
