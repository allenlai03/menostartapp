type LogoProps = {
  variant?: "full" | "mark";
  className?: string;
  /** Color override; defaults to brand rose */
  color?: string;
};

/**
 * MenoStart logo — pulse line inside a circle, optional wordmark.
 * `variant="full"` renders the lockup; `variant="mark"` is just the icon.
 */
export function Logo({ variant = "mark", className, color = "#b76767" }: LogoProps) {
  if (variant === "mark") {
    return (
      <svg
        viewBox="0 0 360 360"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="MenoStart"
      >
        <g transform="translate(180, 180)">
          <circle cx="0" cy="0" r="155" fill="none" stroke={color} strokeWidth="11" />
          <path
            d="M -110 0 L -68 0 L -47 47 L -21 -30 L 0 55 L 21 -30 L 47 47 L 68 0 L 110 0"
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 600 760"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="MenoStart"
    >
      <g transform="translate(300, 300)">
        <circle cx="0" cy="0" r="155" fill="none" stroke={color} strokeWidth="11" />
        <path
          d="M -110 0 L -68 0 L -47 47 L -21 -30 L 0 55 L 21 -30 L 47 47 L 68 0 L 110 0"
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <text
        x="300"
        y="640"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', Georgia, 'Times New Roman', serif"
        fontSize="64"
        fontWeight="400"
        fill={color}
        letterSpacing="-1"
      >
        MenoStart
      </text>
    </svg>
  );
}
