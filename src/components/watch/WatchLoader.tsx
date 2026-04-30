"use client";

import React from "react";

type WatchLoaderProps = {
  className?: string;
  size?: string; // CSS width value, e.g. '300px' or 'min(60vw,21rem)'
  bg?: string; // optional background image path (watch dial without hands)
  speedMultiplier?: number; // multiply animation speed (1 = default)
  animate?: boolean;
};

export function WatchLoader({
  className = "",
  size = "min(60vw,21rem)",
  bg,
  speedMultiplier = 1,
  animate = true,
}: WatchLoaderProps) {
  const secondDuration = `${1.2 / speedMultiplier}s`;
  const minuteDuration = `${8 / speedMultiplier}s`;
  const hourDuration = `${24 / speedMultiplier}s`;

  return (
    <div
      className={`relative grid place-items-center ${className}`}
      style={{ width: size, height: `calc(${size})`, background: "transparent" }}
    >
      <div
        className="relative w-full h-full rounded-full overflow-hidden"
        style={{
          backgroundImage: bg ? `url(${bg})` : undefined,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <linearGradient id="handGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#f8f6f2" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#2b2b2b" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* hour hand */}
          <g
            transform="translate(50,50)"
            style={{ transformOrigin: "50% 100%" as const }}
          >
            <rect
              x="-2.2"
              y="-28"
              width="4.4"
              height="28"
              rx="1.8"
              fill="url(#handGrad)"
              className="origin-bottom"
              style={{
                transform: "translate(-50%, -100%) rotate(0deg)",
                transformOrigin: "50% 100%",
                animation: animate ? `watchHour ${hourDuration} linear infinite` : undefined,
                willChange: "transform",
              }}
            />
          </g>

          {/* minute hand */}
          <g
            transform="translate(50,50)"
            style={{ transformOrigin: "50% 100%" as const }}
          >
            <rect
              x="-1.4"
              y="-40"
              width="2.8"
              height="40"
              rx="1.2"
              fill="url(#handGrad)"
              className="origin-bottom"
              style={{
                transform: "translate(-50%, -100%) rotate(0deg)",
                transformOrigin: "50% 100%",
                animation: animate ? `watchMinute ${minuteDuration} linear infinite` : undefined,
                willChange: "transform",
                opacity: 0.9,
              }}
            />
          </g>

          {/* second hand */}
          <g
            transform="translate(50,50)"
            style={{ transformOrigin: "50% 100%" as const }}
          >
            <rect
              x="-0.6"
              y="-46"
              width="1.2"
              height="46"
              rx="0.6"
              fill="#1b1b1b"
              style={{
                transform: "translate(-50%, -100%) rotate(0deg)",
                transformOrigin: "50% 100%",
                animation: animate ? `watchSecond ${secondDuration} linear infinite` : undefined,
                willChange: "transform",
                opacity: 0.95,
              }}
            />
          </g>

          {/* center cap */}
          <circle cx="50" cy="50" r="3.4" fill="#f8f6f2" stroke="#1b1b1b" strokeOpacity={0.12} strokeWidth={0.5} />
        </svg>
      </div>

      <style>{`\n        @keyframes watchSecond {\n          from { transform: translate(-50%, -100%) rotate(0deg); }\n          to { transform: translate(-50%, -100%) rotate(360deg); }\n        }\n        @keyframes watchMinute {\n          from { transform: translate(-50%, -100%) rotate(0deg); }\n          to { transform: translate(-50%, -100%) rotate(360deg); }\n        }\n        @keyframes watchHour {\n          from { transform: translate(-50%, -100%) rotate(0deg); }\n          to { transform: translate(-50%, -100%) rotate(360deg); }\n        }\n      `}</style>
    </div>
  );
}

export default WatchLoader;
