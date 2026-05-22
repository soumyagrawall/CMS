module.exports = {
  content: ["../Frontend/**/*.html", "../Frontend/assets/js/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#30578F",
        "on-primary": "#FFFFFF",
        "primary-container": "#4A70A9",
        "on-primary-container": "#F0F3FF",
        "primary-fixed": "#D5E3FF",
        "primary-fixed-dim": "#ACC8F3",
        secondary: "#446085",
        "on-secondary": "#FFFFFF",
        "secondary-container": "#D8E2F3",
        "secondary-fixed-dim": "#ACC8F3",
        tertiary: "#705575",
        "tertiary-fixed": "#FBD7FC",
        "on-tertiary-fixed-variant": "#57425C",
        error: "#BA1A1A",
        "error-container": "#FFDAD6",
        surface: "#F9F9F9",
        "on-surface": "#1B1B1B",
        "on-surface-variant": "#434750",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F3F3F3",
        "surface-container": "#EEEEEE",
        "surface-container-high": "#E8E8E8",
        "surface-container-highest": "#E2E2E2",
        "surface-variant": "#E2E2E2",
        outline: "#737781",
        "outline-variant": "#C3C6D1",
        background: "#F9F9F9",
        "on-background": "#1B1B1B"
      },
      fontFamily: {
        "body-md": ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        "body-lg": ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        "label-sm": ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        "label-md": ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        "headline-md": ["Playfair Display", "Georgia", "serif"],
        "headline-lg": ["Playfair Display", "Georgia", "serif"],
        "display-lg": ["Playfair Display", "Georgia", "serif"]
      },
      fontSize: {
        "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "label-sm": ["12px", { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "700" }],
        "label-md": ["14px", { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "500" }],
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "500" }],
        "headline-lg": ["32px", { lineHeight: "1.2", fontWeight: "600" }],
        "display-lg": ["48px", { lineHeight: "1.1", fontWeight: "700" }]
      },
      spacing: {
        unit: "4px",
        "gutter-md": "16px",
        "gutter-lg": "24px",
        "margin-mobile": "20px",
        "margin-desktop": "64px"
      },
      maxWidth: {
        "max-width": "1440px"
      },
      boxShadow: {
        editorial: "0 24px 80px rgba(48, 87, 143, 0.14)"
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
