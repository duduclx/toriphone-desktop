import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        /* v2
        gray: {
          50:  { value: "#F7FAFC" },
          100: { value: "#EDF2F7" },
          200: { value: "#E2E8F0" },
          300: { value: "#CBD5E0" },
          400: { value: "#A0AEC0" },
          500: { value: "#718096" },
          600: { value: "#4A5568" },
          700: { value: "#2D3748" },
          800: { value: "#1A202C" },
          900: { value: "#171923" },
        },
        */
        red: {
          50:  { value: "#fff5f5" },
          100: { value: "#fed7d7" },
          200: { value: "#feb2b2" },
          300: { value: "#fc8181" },
          400: { value: "#f56565" },
          500: { value: "#E53E3E" },
          600: { value: "#c53030" },
          700: { value: "#9b2c2c" },
          800: { value: "#822727" },
          900: { value: "#63171B" },
          950: { value: "#feb2b21f" },
        },
        orange: {
          50:  { value: "#FFFAF0" },
          100: { value: "#FEEBC8" },
          200: { value: "#FBD38D" },
          300: { value: "#F6AD55" },
          400: { value: "#ED8936" },
          500: { value: "#DD6B20" },
          600: { value: "#C05621" },
          700: { value: "#9C4221" },
          800: { value: "#7B341E" },
          900: { value: "#652B19" },
          950: { value: "#FBD38D1f" },
        },
        yellow: {
          50:  { value: "#FFFFF0" },
          100: { value: "#FEFCBF" },
          200: { value: "#FAF089" },
          300: { value: "#F6E05E" },
          400: { value: "#ECC94B" },
          500: { value: "#D69E2E" },
          600: { value: "#B7791F" },
          700: { value: "#975A16" },
          800: { value: "#744210" },
          900: { value: "#5F370E" },
          950: { value: "#FAF0891f" },
        },
        green: {
          50:  { value: "#F0FFF4" },
          100: { value: "#C6F6D5" },
          200: { value: "#9AE6B4" },
          300: { value: "#68D391" },
          400: { value: "#48BB78" },
          500: { value: "#38A169" },
          600: { value: "#2F855A" },
          700: { value: "#276749" },
          800: { value: "#22543D" },
          900: { value: "#1C4532" },
          950: { value: "#9AE6B41f" },
        },
        teal: {
          50:  { value: "#E6FFFA" },
          100: { value: "#B2F5EA" },
          200: { value: "#81E6D9" },
          300: { value: "#4FD1C5" },
          400: { value: "#38B2AC" },
          500: { value: "#319795" },
          600: { value: "#2C7A7B" },
          700: { value: "#285E61" },
          800: { value: "#234E52" },
          900: { value: "#1D4044" },
          950: { value: "#81E6D91f" },
        },
        blue: {
          50:  { value: "#ebf8ff" },
          100: { value: "#bee3f8" },
          200: { value: "#90cdf4" },
          300: { value: "#63b3ed" },
          400: { value: "#4299e1" },
          500: { value: "#3182ce" },
          600: { value: "#2b6cb0" },
          700: { value: "#2c5282" },
          800: { value: "#2a4365" },
          900: { value: "#1A365D" },
          950: { value: "#90cdf41f" },
        },
        cyan: {
          50:  { value: "#EDFDFD" },
          100: { value: "#C4F1F9" },
          200: { value: "#9DECF9" },
          300: { value: "#76E4F7" },
          400: { value: "#0BC5EA" },
          500: { value: "#00B5D8" },
          600: { value: "#00A3C4" },
          700: { value: "#0987A0" },
          800: { value: "#086F83" },
          900: { value: "#065666" },
          950: { value: "#9DECF91f" },
        },
        purple: {
          50:  { value: "#FAF5FF" },
          100: { value: "#E9D8FD" },
          200: { value: "#D6BCFA" },
          300: { value: "#B794F4" },
          400: { value: "#9F7AEA" },
          500: { value: "#805AD5" },
          600: { value: "#6B46C1" },
          700: { value: "#553C9A" },
          800: { value: "#44337A" },
          900: { value: "#322659" },
          950: { value: "#D6BCFA1f" },
        },
        pink: {
          50:  { value: "#FFF5F7" },
          100: { value: "#FED7E2" },
          200: { value: "#FBB6CE" },
          300: { value: "#F687B3" },
          400: { value: "#ED64A6" },
          500: { value: "#D53F8C" },
          600: { value: "#B83280" },
          700: { value: "#97266D" },
          800: { value: "#702459" },
          900: { value: "#521B41" },
          950: { value: "#FBB6CE1f" },
        },
        primary: {
          50:  { value: "#ebf8ff" },
          100: { value: "#bee3f8" },
          200: { value: "#90cdf4" },
          300: { value: "#63b3ed" },
          400: { value: "#4299e1" },
          500: { value: "#3182ce" },
          600: { value: "#2b6cb0" },
          700: { value: "#2c5282" },
          800: { value: "#2a4365" },
          900: { value: "#1A365D" },
          950: { value: "#90cdf41f"}
        },
        secondary: {
          50:  { value: "#F0FFF4" },
          100: { value: "#C6F6D5" },
          200: { value: "#9AE6B4" },
          300: { value: "#68D391" },
          400: { value: "#48BB78" },
          500: { value: "#38A169" },
          600: { value: "#2F855A" },
          700: { value: "#276749" },
          800: { value: "#22543D" },
          900: { value: "#1C4532" },
          950: { value: "#9AE6B41f" },
        },
        info: {
          50:  { value: "#ebf8ff" },
          100: { value: "#bee3f8" }, // light.disabled
          200: { value: "#90cdf4" }, // dark.solid
          300: { value: "#63b3ed" }, // dark.hover
          400: { value: "#4299e1" }, // dark.active
          500: { value: "#3182ce" }, // light.solid
          600: { value: "#2b6cb0" }, // light.hover
          700: { value: "#2c5282" }, // light.active
          800: { value: "#2a4365" }, // dark.disabled
          900: { value: "#1A365D" },
          950: { value: "#90cdf41f" } // dark.ghost.hover
        },
        success: {
          50:  { value: "#F0FFF4" },
          100: { value: "#C6F6D5" },
          200: { value: "#9AE6B4" },
          300: { value: "#68D391" },
          400: { value: "#48BB78" },
          500: { value: "#38A169" },
          600: { value: "#2F855A" },
          700: { value: "#276749" },
          800: { value: "#22543D" },
          900: { value: "#1C4532" },
          950: { value: "#9AE6B41f" },
        },
        warning: {
          50:  { value: "#FFFFF0" },
          100: { value: "#FEFCBF" },
          200: { value: "#FAF089" },
          300: { value: "#F6E05E" },
          400: { value: "#ECC94B" },
          500: { value: "#D69E2E" },
          600: { value: "#B7791F" },
          700: { value: "#975A16" },
          800: { value: "#744210" },
          900: { value: "#5F370E" },
          950: { value: "#FAF0891f" },
        },
        danger: {
          50:  { value: "#fff5f5" },
          100: { value: "#fed7d7" },
          200: { value: "#feb2b2" },
          300: { value: "#fc8181" },
          400: { value: "#f56565" },
          500: { value: "#E53E3E" },
          600: { value: "#c53030" },
          700: { value: "#9b2c2c" },
          800: { value: "#822727" },
          900: { value: "#63171B" },
          950: { value: "#feb2b21f" },
        },
        light: {
          50:  { value: "#FFFFFF" },
          100: { value: "#FAFAFA" },
          200: { value: "#F4F4F5" },
          300: { value: "#F2F3F4" },
          400: { value: "#E6E6E6" },
          500: { value: "#E4E4E7" },
          600: { value: "#EDF2F7" },
          700: { value: "#E2E8F0" },
          800: { value: "#DFDFDF" },
          900: { value: "#ededed" },
          950: { value: "#" },
        },
        dark: {
          50:  { value: "#ffffff14" },
          100: { value: "#3f444e" },
          200: { value: "#2c2c2c" },
          300: { value: "#27272a" },
          400: { value: "#232323" },
          500: { value: "#212121" },
          600: { value: "#1E1E1E" },
          700: { value: "#1D1D1D" },
          800: { value: "#18181b" },
          900: { value: "#191A19" },
          950: { value: "#0F0F0F" }
        },
        white: { 500: { value: "#ffffff" } },
        black: { 500: { value: "#000000" } },
        
      },
    },
    semanticTokens: {
      colors: {
        // state
        available: {
          DEFAULT: { value: { _light: "{colors.green.600}", _dark: "{colors.green.200}"}},
          focusRing: { value: { _light: "{colors.green.500}", _dark: "{colors.green.200}"} }, // idem bg
        },
        away: {
          DEFAULT: { value: { _light: "{colors.yellow.600}", _dark: "{colors.yellow.200}"}},
        },
        unavailable: {
          DEFAULT: { value: { _light: "{colors.red.600}", _dark: "{colors.red.200}"}},
        },
        invisible: {
          DEFAULT: { value: { _light: "{colors.blue.600}", _dark: "{colors.blue.200}"}},
        },
  
        // alert
        alertSuccess: {
          DEFAULT: { value: { _light: "{colors.success.500}", _dark: "{colors.success.200}"} }
        },
        alertInfo: {
          DEFAULT: { value: { _light: "{colors.info.500}", _dark: "{colors.info.200}"} }
        },
        alertWarning: {
          DEFAULT: { value: { _light: "{colors.warning.500}", _dark: "{colors.warning.200}"} }
        },
        alertError: {
          DEFAULT: { value: { _light: "{colors.danger.500}", _dark: "{colors.danger.200}"} }
        },
        alertContrast: { 
          DEFAULT: { value: { _light: "{colors.white}", _dark: "{colors.black}" } }
         },

        // backgrounds
        bgDefault: {
          DEFAULT: { value: { _light: "{colors.light.50}", _dark: "{colors.dark.400}" } },
        },
        bgPrimary: {
          DEFAULT: { value: { _light: "{colors.light.50}", _dark: "{colors.dark.600}" } },
        },
        bgSecondary: {
          DEFAULT: { value: { _light: "{colors.light.50}", _dark: "{colors.dark.500}" } },
        },
        bgElevated: {
          DEFAULT: { value: { _light: "{colors.light.100}", _dark: "{colors.dark.700}" } },
        },
        bgMuted: {
          DEFAULT: { value: { _light: "{colors.light.600}", _dark: "{colors.dark.950" } },
        },

        // input
        textColor: {
          DEFAULT: { value: { _light: "{colors.black}", _dark: "{colors.white}" } },
        },
        multiValueBgColor: {
          DEFAULT: { value: { _light: "{colors.light.50}", _dark: "{colors.dark.900}" } },
        },
        borderColor: {
          DEFAULT: { value: { _light: "{colors.light.700}", _dark: "{colors.dark.100}" } },
        },

        // button
        btnMenuHover: {
          DEFAULT: { value: { _light: "{colors.light.200}", _dark: "{colors.dark.50}" } },
        },
        btnMenuActive: {
          DEFAULT: { value: { _light: "{colors.light.200}", _dark: "{colors.dark.50}" } },
        },
        btnSdbTgg: {
          DEFAULT: { value: { _light: "{colors.dark.700}", _dark: "{colors.light.900}"} }
        },

        // Table
        TableHeaderBg: {
          DEFAULT: { value: { _light: "{colors.light.50}", _dark: "{colors.dark.400}" } },
        },
        TableBodyBg: {
          DEFAULT: { value: { _light: "{colors.light.50}", _dark: "{colors.dark.400}" } },
        },

        // Select
        selectBg: {
          DEFAULT: { value: { _light: "{colors.light.200}", _dark: "{colors.dark.700}" } },
        },
        selectHover: {
          DEFAULT: { value: { _light: "{colors.light.700}", _dark: "{colors.dark.200}" } },
        },
        selectBorder: {
          DEFAULT: { value: { _light: "{colors.light.500}", _dark: "{colors.dark.300}"} },
        },
        cross: {
          DEFAULT: { value: { _light: "{colors.danger.600}", _dark:"{colors.danger.200}"}},
        },
        text: {
          DEFAULT: { value: { _light: "{colors.black.500}", _dark: "{colors.white.500}"}}
        },

        // Button
        primary: {
          // blue
          solid: { value: { _light: "{colors.primary.500}", _dark: "{colors.primary.200}"} }, // bg
          contrast: { value: { _light: "{colors.white}", _dark: "{colors.black}" } }, // texte
          fg: { value: { _light: "{colors.primary.600}", _dark: "{colors.primary.200}"} }, // ghost icon color
          muted: { value: { _light: "{colors.primary.100}", _dark: "{colors.primary.800}"} }, // disabled
          subtle: { value: { _light: "{colors.primary.50}", _dark: "{colors.primary.950}" } }, // ghost bg hover
          emphasized: { value: { _light: "{colors.primary.700}", _dark: "{colors.primary.400}"}  }, // active
          focusRing: { value: { _light: "{colors.primary.500}", _dark: "{colors.primary.200}"} }, // idem bg
          hover: { value: { _light: "{colors.primary.600}", _dark: "{colors.primary.300}"} }, // hover
        },
        secondary: {
          // green
          solid: { value: { _light: "{colors.secondary.500}", _dark: "{colors.secondary.200}"} },
          contrast: { value: { _light: "{colors.white}", _dark: "{colors.black}" } },
          fg: { value: { _light: "{colors.secondary.600}", _dark: "{colors.secondary.200}"} },
          muted: { value: { _light: "{colors.secondary.100}", _dark: "{colors.secondary.800}"} },
          subtle: { value: { _light: "{colors.secondary.50}", _dark: "{colors.secondary.950}"} },
          emphasized: { value: { _light: "{colors.secondary.700}", _dark: "{colors.secondary.400}"} },
          focusRing: { value: { _light: "{colors.secondary.500}", _dark: "{colors.secondary.200}"} },
          hover: { value: { _light: "{colors.secondary.600}", _dark: "{colors.secondary.300}"} },
        },
        info: {
          // blue
          solid: { value: { _light: "{colors.info.500}", _dark: "{colors.info.200}"} },
          contrast: { value: { _light: "{colors.white}", _dark: "{colors.black}" } },
          fg: { value: { _light: "{colors.info.600}", _dark: "{colors.info.200}"} },
          muted: { value: { _light: "{colors.info.100}", _dark: "{colors.info.800}"} },
          subtle: { value: { _light: "{colors.info.50}", _dark: "{colors.info.950}" } },
          emphasized: { value: { _light: "{colors.info.700}", _dark: "{colors.info.400}"} },
          focusRing: { value: { _light: "{colors.info.500}", _dark: "{colors.info.200}"} },
          hover: { value: { _light: "{colors.info.600}", _dark: "{colors.info.300}"} },
        },
        success: {
          // green
          solid: { value: { _light: "{colors.success.500}", _dark: "{colors.success.200}"} },
          contrast: { value: { _light: "{colors.white}", _dark: "{colors.black}" } },
          fg: { value: { _light: "{colors.success.600}", _dark: "{colors.success.200}"} },
          muted: { value: { _light: "{colors.success.100}", _dark: "{colors.success.800}"} },
          subtle: { value: { _light: "{colors.success.50}", _dark: "{colors.success.950}"} },
          emphasized: { value: { _light: "{colors.success.700}", _dark: "{colors.success.400}"} },
          focusRing: { value: { _light: "{colors.success.500}", _dark: "{colors.success.200}"} },
          hover: { value: { _light: "{colors.success.600}", _dark: "{colors.success.300}"} },
        },
        warning: {
          // yellow
          solid: { value: { _light: "{colors.warning.500}", _dark: "{colors.warning.200}"} },
          contrast: { value: { _light: "{colors.white}", _dark: "{colors.black}" } },
          fg: { value: { _light: "{colors.warning.600}", _dark: "{colors.warning.200}"} },
          muted: { value: { _light: "{colors.warning.100}", _dark: "{colors.warning.800}"} },
          subtle: { value: { _light: "{colors.warning.50}", _dark: "{colors.warning.950}"} },
          emphasized: { value: { _light: "{colors.warning.700}", _dark: "{colors.warning.400}"} },
          focusRing: { value: { _light: "{colors.warning.500}", _dark: "{colors.warning.200}"} },
          hover: { value: { _light: "{colors.warning.600}", _dark: "{colors.warning.300}"} },
        },
        danger: {
          // red
          solid: { value: { _light: "{colors.danger.500}", _dark: "{colors.danger.200}"} },
          contrast: { value: { _light: "{colors.white}", _dark: "{colors.black}" } },
          fg: { value: { _light: "{colors.danger.600}", _dark: "{colors.danger.200}"} }, 
          muted: { value: { _light: "{colors.danger.100}", _dark: "{colors.danger.800}"} },
          subtle: { value: { _light: "{colors.danger.50}", _dark: "{colors.danger.950}"} },
          emphasized: { value: { _light: "{colors.danger.700}", _dark: "{colors.danger.400}"} },
          focusRing: { value: { _light: "{colors.danger.500}", _dark: "{colors.danger.200}"} },
          hover: { value: { _light: "{colors.danger.600}", _dark: "{colors.danger.300}"} },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
export default system;
