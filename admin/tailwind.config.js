export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    safelist: ['active'], // optional
    theme: {
        extend: {
            fontFamily: {
                outfit: ['Outfit', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
