/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        coal: '#0c0906',
        coal2: '#120c07',
        coal3: '#1a120a',
        card: '#17100a',
        cream: '#f3e8d8',
        cream2: '#cfbfa6',
        muted: '#a08d78',
        flame: '#ff6a00',
        flame2: '#ffb400',
        ember: '#e0431e',
        gold: '#d9a441',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Onest', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        flame: '0 12px 34px -10px rgba(255,106,0,.65)',
        'flame-lg': '0 24px 60px -18px rgba(255,106,0,.55)',
        card: '0 30px 80px -24px rgba(0,0,0,.8)',
      },
      backgroundImage: {
        'flame-grad': 'linear-gradient(135deg,#ff6a00 0%,#ffb400 100%)',
        'flame-grad-soft': 'linear-gradient(135deg,rgba(255,106,0,.18),rgba(255,180,0,.08))',
        'flame-text': 'linear-gradient(120deg,#ff6a00,#ffb400)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseGlow: {
          '0%,100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        flicker: {
          '0%,100%': { transform: 'scaleY(1) scaleX(1) skewX(0deg)', opacity: '0.95' },
          '20%': { transform: 'scaleY(1.12) scaleX(0.94) skewX(-2deg)', opacity: '1' },
          '40%': { transform: 'scaleY(0.92) scaleX(1.05) skewX(2deg)', opacity: '0.85' },
          '60%': { transform: 'scaleY(1.08) scaleX(0.97) skewX(-1.5deg)', opacity: '1' },
          '80%': { transform: 'scaleY(0.95) scaleX(1.04) skewX(1.5deg)', opacity: '0.9' },
        },
        smokeRise: {
          '0%': { transform: 'translateY(0) translateX(0) scale(0.6)', opacity: '0' },
          '15%': { opacity: '0.35' },
          '60%': { transform: 'translateY(-70px) translateX(14px) scale(1.5)', opacity: '0.12' },
          '100%': { transform: 'translateY(-140px) translateX(26px) scale(2.2)', opacity: '0' },
        },
        sheen: {
          '0%': { transform: 'translateX(-280px)' },
          '60%,100%': { transform: 'translateX(280px)' },
        },
        sway: {
          '0%,100%': { transform: 'rotate(-2.2deg)' },
          '50%': { transform: 'rotate(2.2deg)' },
        },
        kenburns: {
          '0%': { transform: 'scale(1) translate(0,0)' },
          '100%': { transform: 'scale(1.12) translate(-1.5%,-1.5%)' },
        },
        scrollLine: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '45%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '55%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        pulse: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
        ember: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0' },
          '12%': { opacity: '1' },
          '100%': { transform: 'translateY(-160px) translateX(var(--drift,6px)) scale(0.2)', opacity: '0' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3.4s ease-in-out infinite',
        flicker: 'flicker 2.6s ease-in-out infinite',
        'smoke-rise': 'smokeRise 7s ease-in-out infinite',
        sheen: 'sheen 5.5s ease-in-out infinite',
        sway: 'sway 9s ease-in-out infinite',
        kenburns: 'kenburns 22s ease-in-out infinite alternate',
        'scroll-line': 'scrollLine 2s ease infinite',
        pulse: 'pulse 2s infinite',
        ember: 'ember 2.2s ease-out infinite',
      },
    },
  },
  plugins: [],
};
