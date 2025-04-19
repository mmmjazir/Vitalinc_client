import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
  	extend: {
  		fontFamily: {
  			Poppins: [
  				'var(--font-Poppins)'
  			],
  			Josefin: [
  				'var(--font-Josefin)'
  			],
  			Roboto: [
  				'var(--font-Roboto)'
  			],
  			Arimo: [
  				'var(--font-Arimo)'
  			],
  			Outfit: [
  				'var(--font-Outfit)'
  			]
  		},
  		screens: {
  			'1000px': '1000px',
  			'1100px': '1100px',
  			'1200px': '1200px',
  			'1300px': '1300px',
  			'1500px': '1500px',
  			'800px': '800px',
  			'400px': '400px'
  		},
  		colors: {
  			primary: '#269E83',
  			myPrimary: '#008B8B',
  			myPrimarys: '#20B2AA',
  			secondary: '#1f2937',
			mySecondary:'#FF7F50',
  			text: '#333333',
  			'text-secondary': '#666666',
  			background: '#FAFAFA',
  			card: '#FFFFFF',
  			border: '#E0E0E0',
  			navbar: '#2C3E50',
  			'button-text': '#FFFFFF',
  			link: '#4CAF50',
  			'navbar-text': '#FFFFFF',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		backgroundImage: {
  			'background-gradient': 'linear-gradient(135deg, #FAFAFA 0%, #E0F7FA 100%)',
  			'hero-gradient': 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)'
  		},
  		animation: {
  			shake: 'shake 2.6s ease-in-out infinite'
  		}
  	}
  },
  plugins: [],

};
export default config;