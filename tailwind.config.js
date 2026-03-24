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
        'fundo-principal': '#09090B',
        'cartao': '#18181B',
        'acento': '#38BDF8',
        'texto-claro': '#FAFAFA',
        'texto-secundario': '#A1A1AA',
      },
      fontFamily: {
        'sans': ['"Plus Jakarta Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
