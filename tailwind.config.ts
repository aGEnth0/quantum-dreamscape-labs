
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				quantum: {
					50: '#f0f4ff',
					100: '#e0e9ff',
					200: '#c7d6ff',
					300: '#a5b8ff',
					400: '#8690ff',
					500: '#6b73ff',
					600: '#5a52ff',
					700: '#4c43e8',
					800: '#3d37bc',
					900: '#363196',
					950: '#1e1b57',
				},
				neural: {
					50: '#fef7ff',
					100: '#fdeeff',
					200: '#fbdcff',
					300: '#f7c0ff',
					400: '#f095ff',
					500: '#e668ff',
					600: '#ce40ed',
					700: '#b329d1',
					800: '#9323aa',
					900: '#781f89',
					950: '#4f0761',
				}
			},
			backgroundImage: {
				'quantum-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				'neural-gradient': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
				'cosmos-gradient': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
				'neumorphic-light': 'linear-gradient(145deg, #ffffff, #e6e6e6)',
				'neumorphic-dark': 'linear-gradient(145deg, #2a2a2a, #1a1a1a)',
			},
			boxShadow: {
				'neu-inset': 'inset 8px 8px 16px #d1d9e6, inset -8px -8px 16px #ffffff',
				'neu-outset': '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff',
				'neu-pressed': 'inset 4px 4px 8px #d1d9e6, inset -4px -4px 8px #ffffff',
				'quantum-glow': '0 0 20px rgba(107, 115, 255, 0.3)',
				'neural-glow': '0 0 20px rgba(230, 104, 255, 0.3)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'neu': '20px',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'quantum-pulse': {
					'0%, 100%': {
						opacity: '1',
						transform: 'scale(1)'
					},
					'50%': {
						opacity: '0.8',
						transform: 'scale(1.05)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'circuit-flow': {
					'0%': {
						transform: 'translateX(-100%)',
						opacity: '0'
					},
					'50%': {
						opacity: '1'
					},
					'100%': {
						transform: 'translateX(100%)',
						opacity: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'quantum-pulse': 'quantum-pulse 2s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'circuit-flow': 'circuit-flow 2s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
