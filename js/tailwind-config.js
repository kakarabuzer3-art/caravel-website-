/* ============================================================
   Tailwind CSS configuration (loaded AFTER vendor/tailwind.js)
   ============================================================ */
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      colors: {
        'ink': '#050508',
        'neon-blue': '#00D4FF',
        'neon-purple': '#A855F7',
        'neon-violet': '#8B5CF6'
      }
    }
  }
};
