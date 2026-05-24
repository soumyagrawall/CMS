module.exports = {
  content: ["../Frontend/**/*.html", "../Frontend/assets/js/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#FF0000",
        "on-primary": "#FFFFFF",
        "primary-container": "#DFF1F1",
        "on-primary-container": "#FF0000",
        "primary-fixed": "#FF0000",
        "primary-fixed-dim": "#BBD5DA",
        "secondary": "#BBD5DA",
        "on-secondary": "#1B1B1B",
        "secondary-container": "#DFF1F1",
        "secondary-fixed-dim": "#BBD5DA",
        "tertiary": "#BBD5DA",
        "tertiary-fixed": "#BBD5DA",
        "on-tertiary-fixed-variant": "#1B1B1B",
        "error": "#FF0000",
        "error-container": "#FFDAD6",
        "surface": "#FFFFFF",
        "on-surface": "#1B1B1B",
        "on-surface-variant": "#434750",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F5F5F5",
        "surface-container": "#DFF1F1",
        "surface-container-high": "#BBD5DA",
        "surface-container-highest": "#9EBEC4",
        "surface-variant": "#DFF1F1",
        "outline": "#BBD5DA",
        "outline-variant": "#9EBEC4",
        "background": "#F5F5F5",
        "on-background": "#1B1B1B",
        "surface-bright": "#FFFFFF",
        "surface-dim": "#E1E7E8"
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
