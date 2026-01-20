export default function AboutApp() {
  return (
    <div className="h-full flex flex-col text-white">
      
      {/* App Header */}
      <div className="border-b border-white/10 pb-2 mb-4">
        <h1 className="text-xl font-semibold">About Me</h1>
        <p className="text-sm text-white/60">
          Android-style portfolio
        </p>
      </div>

      {/* App Content */}
      <div className="flex-1 overflow-y-auto space-y-4 text-sm leading-relaxed">
        <p>
          Hi 👋 I’m Earl Jann Rivera, a frontend-focused developer who enjoys
          building interactive UI and system-like experiences on the web.
        </p>

        <p>
          I like turning complex ideas into clean, usable interfaces —
          dashboards, POS systems, and experimental UI like this tablet OS.
        </p>

        <p>
          This project is built with React, Tailwind CSS, and a lot of curiosity.
        </p>
      </div>

    </div>
  );
}
