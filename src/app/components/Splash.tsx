import { Logo } from "./Logo";

export function Splash() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 splash-fade">
      <div className="flex flex-col items-center gap-5 splash-rise">
        <Logo variant="mark" className="w-28 h-28 splash-pulse" />
        <div
          className="text-4xl text-[#b76767] tracking-tight"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, 'Times New Roman', serif" }}
        >
          MenoStart
        </div>
        <p className="text-sm text-gray-500 mt-1 tracking-wide">
          Objective insights for menopause care
        </p>
      </div>

      <div className="absolute bottom-12 flex items-center gap-2">
        <span className="splash-dot" />
        <span className="splash-dot splash-dot-2" />
        <span className="splash-dot splash-dot-3" />
      </div>

      <style>{`
        @keyframes splash-rise {
          0%   { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes splash-pulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.04); }
        }
        @keyframes splash-blink {
          0%, 80%, 100% { opacity: 0.25; }
          40%           { opacity: 1; }
        }
        .splash-rise  { animation: splash-rise 0.7s ease-out both; }
        .splash-pulse { animation: splash-pulse 2.2s ease-in-out infinite; }
        .splash-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #b76767;
          animation: splash-blink 1.2s ease-in-out infinite;
        }
        .splash-dot-2 { animation-delay: 0.2s; }
        .splash-dot-3 { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
}
