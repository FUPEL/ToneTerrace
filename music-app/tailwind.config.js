module.exports = {
    theme: {
        extend: {
            dropShadow: {
                glowRed: [
                    "0 0px 20px rgba(239, 68, 68, 0.35)",   // red-500
                    "0 0px 65px rgba(239, 68, 68, 0.2)",
                ],
                glowYellow: [
                    "0 0px 20px rgba(234, 179, 8, 0.35)",   // yellow-500
                    "0 0px 65px rgba(234, 179, 8, 0.2)",
                ],
                glowBrown: [
                    "0 0px 20px rgba(120, 72, 48, 0.35)",   // approx brown
                    "0 0px 65px rgba(120, 72, 48, 0.2)",
                ],
            },
        },
    },
    plugins: [
        require("@designbycode/tailwindcss-text-stroke"),
    ],
};