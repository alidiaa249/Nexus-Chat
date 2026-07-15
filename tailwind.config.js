
      /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-surface-variant": "#464555",
        "on-secondary-fixed": "#25005a",
        "primary": "#3525cd",
        "tertiary-fixed": "#6bff8f",
        "on-surface": "#131b2e",
        "on-tertiary": "#ffffff",
        "surface-dim": "#d2d9f4",
        "secondary-container": "#8a4cfc",
        "surface-tint": "#4d44e3",
        "on-tertiary-fixed": "#002109",
        "on-tertiary-fixed-variant": "#005321",
        "outline-variant": "#c7c4d8",
        "on-primary-container": "#dad7ff",
        "on-secondary-container": "#fffbff",
        "inverse-on-surface": "#eef0ff",
        "outline": "#777587",
        "on-primary-fixed-variant": "#3323cc",
        "tertiary": "#005523",
        "surface-container-lowest": "#ffffff",
        "surface-container-highest": "#dae2fd",
        "tertiary-container": "#007030",
        "on-tertiary-container": "#63f889",
        "surface": "#faf8ff",
        "surface-container-low": "#f2f3ff",
        "inverse-surface": "#283044",
        "surface-container-high": "#e2e7ff",
        "tertiary-fixed-dim": "#4ae176",
        "background": "#faf8ff",
        "on-error-container": "#93000a",
        "surface-container": "#eaedff",
        "secondary-fixed-dim": "#d2bbff",
        "inverse-primary": "#c3c0ff",
        "on-primary": "#ffffff",
        "on-background": "#131b2e",
        "on-primary-fixed": "#0f0069",
        "error-container": "#ffdad6",
        "primary-fixed": "#e2dfff",
        "on-secondary-fixed-variant": "#5a00c6",
        "surface-variant": "#dae2fd",
        "primary-fixed-dim": "#c3c0ff",
        "on-error": "#ffffff",
        "primary-container": "#4f46e5",
        "surface-bright": "#faf8ff",
        "on-secondary": "#ffffff",
        "secondary": "#712ae2",
        "error": "#ba1a1a",
        "secondary-fixed": "#eaddff"
      },

      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },

      spacing: {
        xs: "4px",
        sm: "8px",
        base: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        gutter: "16px",
        "margin-mobile": "16px",
        "margin-desktop": "32px",
        "sidebar-width": "280px"
      },

      fontFamily: {
        "display-lg": ["Inter"],
        "label-md": ["Inter"],
        "body-lg": ["Inter"],
        "title-md": ["Inter"],
        "headline-lg-mobile": ["Inter"],
        "body-md": ["Inter"],
        "code-sm": ["Inter"],
        "headline-lg": ["Inter"]
      },

      fontSize: {
        "display-lg": [
          "48px",
          {
            lineHeight: "56px",
            letterSpacing: "-0.02em",
            fontWeight: "700"
          }
        ],
        "label-md": [
          "12px",
          {
            lineHeight: "16px",
            letterSpacing: "0.01em",
            fontWeight: "500"
          }
        ],
        "body-lg": [
          "16px",
          {
            lineHeight: "24px",
            fontWeight: "400"
          }
        ],
        "title-md": [
          "18px",
          {
            lineHeight: "24px",
            fontWeight: "600"
          }
        ],
        "headline-lg-mobile": [
          "24px",
          {
            lineHeight: "32px",
            fontWeight: "600"
          }
        ],
        "body-md": [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "400"
          }
        ],
        "code-sm": [
          "13px",
          {
            lineHeight: "18px",
            fontWeight: "400"
          }
        ],
        "headline-lg": [
          "32px",
          {
            lineHeight: "40px",
            letterSpacing: "-0.01em",
            fontWeight: "600"
          }
        ]
      }
    }
  },
  plugins: []
};
