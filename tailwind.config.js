/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./servicos/*.html",
    "./header.js",
    "./footer.js",
    "./script.js"
  ],
  theme: {
    extend: {
      colors: {
        'fundo-principal': '#FFFFFF',
        'fundo-secundario': '#F8F9FA',
        'cartao': '#FFFFFF',
        'acento': '#1A73E8',
        'acento-hover': '#1557B0',
        'texto-claro': '#1A1A1A',
        'texto-secundario': '#5F6368',
        'borda': '#E8EAED',
        'borda-hover': '#D2D5D9',
      },
      fontFamily: {
        'sans': ['Inter', 'Google Sans', 'Product Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.12)',
        'hero': '0 20px 60px rgba(0,0,0,0.08)',
        'button': '0 1px 3px rgba(0,0,0,0.12)',
      }
    },
  },
  plugins: [],
}
