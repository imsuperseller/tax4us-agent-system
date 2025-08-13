/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  safelist: [
    'glass',
    'glass-dark',
    'gradient-bg',
    'gradient-text',
    'text-gradient',
    'border-gradient',
    'shadow-glow',
    'card-hover',
    'agent-card',
    'metric-card',
    'status-active',
    'status-processing',
    'status-error',
    'progress-gradient',
    'skeleton',
    'btn-primary',
    'nav-item',
    'animate-fade-in',
    'animate-slide-in',
    'animate-pulse',
    'animate-shimmer'
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        serif: ["Lora", "serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in-up": {
          from: {
            opacity: 0,
            transform: "translateY(20px)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "slide-in-right": {
          from: {
            opacity: 0,
            transform: "translateX(20px)",
          },
          to: {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
        "shimmer": {
          "0%": {
            backgroundPosition: "-200px 0",
          },
          "100%": {
            backgroundPosition: "calc(200px + 100%) 0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in-up 0.6s ease-out",
        "slide-in": "slide-in-right 0.6s ease-out",
        "shimmer": "shimmer 2s infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addUtilities }) {
      const newUtilities = {
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-dark': {
          background: 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.gradient-bg': {
          background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--chart-3)) 50%, hsl(var(--chart-5)) 100%)',
        },
        '.gradient-text': {
          background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--chart-3)), hsl(var(--chart-5)))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },
        '.text-gradient': {
          background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--chart-3)), hsl(var(--chart-5)))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },
        '.btn-primary': {
          background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--chart-3)))',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
        },
        '.btn-primary::before': {
          content: '""',
          position: 'absolute',
          top: '0',
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
          transition: 'left 0.5s',
        },
        '.btn-primary:hover::before': {
          left: '100%',
        },
        '.btn-primary:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
        },
        '.agent-card': {
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        '.agent-card:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          borderColor: 'hsl(var(--primary))',
        },
        '.metric-card': {
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s ease',
        },
        '.metric-card:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        },
        '.progress-gradient': {
          background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--chart-3)), hsl(var(--chart-5)))',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s infinite',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}
