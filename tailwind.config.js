/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: "class",//설정
  darkMode: "media",//사용자 컴퓨터 설정
  plugins: [],
}
//tailwind를 어디에서 사용할 것인가 설정
//모든 폴더의 모든 파일에서 {}안의 확장자들.