const flowbite = require('flowbite-react/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    // content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
    theme: {
        extend: {},
    },
    plugins: [flowbite.plugin()],
};
