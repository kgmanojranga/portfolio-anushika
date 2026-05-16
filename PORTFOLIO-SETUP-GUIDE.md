# Portfolio Project Setup Guide

This guide provides step-by-step instructions to create a portfolio website using React, TypeScript, Vite, and Tailwind CSS. Follow this template to quickly set up a professional portfolio with customizable themes, fonts, and animations.

## Source Project

This template is based on the **portfolio-kasunthilina** project structure. The architecture has been tested and proven in production, providing a solid foundation for building professional portfolio websites.

**Package Manager:** Yarn
**Hosting Platform:** Vercel

---

## Technology Stack

This portfolio template uses a modern, production-ready technology stack focused on performance, developer experience, and maintainability.

### Core Technologies

#### 1. **React 19.2.0**
- **Purpose**: UI library for building interactive user interfaces
- **Why**: Latest version with improved performance, concurrent features, and better TypeScript support
- **Implementation**:
  ```typescript
  // Functional components with hooks
  import { useState, useEffect } from 'react';

  const MyComponent = () => {
    const [state, setState] = useState(initialValue);
    return <div>{/* JSX */}</div>;
  };
  ```

#### 2. **TypeScript 5.9.3**
- **Purpose**: Static type checking for JavaScript
- **Why**: Catches errors during development, provides excellent IDE support, and improves code maintainability
- **Implementation**:
  ```typescript
  // Type-safe props and interfaces
  interface ComponentProps {
    title: string;
    count: number;
    optional?: boolean;
  }

  const Component: React.FC<ComponentProps> = ({ title, count }) => {
    return <div>{title}: {count}</div>;
  };
  ```
- **Configuration**: Three config files for different contexts
    - `tsconfig.json` - Base configuration
    - `tsconfig.app.json` - Application source code
    - `tsconfig.node.json` - Build tools (Vite config)

#### 3. **Vite 7.2.4**
- **Purpose**: Next-generation frontend build tool
- **Why**: Lightning-fast HMR (Hot Module Replacement), optimized production builds, native ES modules support
- **Features**:
    - Instant server start
    - Fast Hot Module Replacement (HMR)
    - Optimized production builds with Rollup
    - Built-in TypeScript support
- **Implementation**: Configured via `vite.config.ts` with path aliases and React plugin

#### 4. **React Router DOM 7.11.0**
- **Purpose**: Client-side routing for React applications
- **Why**: Declarative routing, nested routes, data loading, and excellent TypeScript support
- **Implementation**:
  ```typescript
  // createBrowserRouter for data router APIs
  import { createBrowserRouter, RouterProvider } from 'react-router-dom';

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: '/about', element: <AboutPage /> },
      ],
    },
  ]);

  function App() {
    return <RouterProvider router={router} />;
  }
  ```

### Styling & Design

#### 5. **Tailwind CSS 4.1.18**
- **Purpose**: Utility-first CSS framework
- **Why**: Rapid UI development, consistent design system, automatic purging of unused styles
- **Implementation**:
  ```typescript
  // Utility classes in JSX
  <div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-950">
    <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
      Title
    </h1>
  </div>
  ```
- **Features Used**:
    - Custom color palettes in config
    - Dark mode support with `dark:` prefix
    - Custom animations and keyframes
    - Responsive design with breakpoints (`sm:`, `md:`, `lg:`, `xl:`)
    - Custom font families

#### 6. **@tailwindcss/postcss 4.1.18**
- **Purpose**: PostCSS plugin for Tailwind CSS v4
- **Why**: Process Tailwind utilities at build time
- **Implementation**: Configured via `postcss.config.js`

#### 7. **Autoprefixer 10.4.23**
- **Purpose**: Adds vendor prefixes to CSS automatically
- **Why**: Ensures cross-browser compatibility without manual prefixing
- **Implementation**: Works automatically with PostCSS

### Analytics & Monitoring

#### 8. **@vercel/analytics 1.6.1**
- **Purpose**: Web analytics for Vercel deployments
- **Why**: Privacy-friendly, lightweight, and provides insights into visitor behavior
- **Implementation**:
  ```typescript
  import { Analytics } from '@vercel/analytics/react';

  function App() {
    return (
      <>
        <RouterProvider router={router} />
        <Analytics />
      </>
    );
  }
  ```

### Development Tools

#### 9. **ESLint 9.39.1**
- **Purpose**: JavaScript/TypeScript linter
- **Why**: Enforces code quality and consistency
- **Plugins Used**:
    - `@eslint/js` - Core ESLint rules
    - `typescript-eslint` 8.46.4 - TypeScript-specific linting
    - `eslint-plugin-react-hooks` 7.0.1 - React Hooks rules
    - `eslint-plugin-react-refresh` 0.4.24 - React Fast Refresh rules
    - `eslint-plugin-prettier` 5.5.4 - Prettier integration
    - `eslint-config-prettier` 10.1.8 - Disable conflicting ESLint rules
- **Implementation**: `eslint.config.js` with flat config format

#### 10. **Prettier 3.7.4**
- **Purpose**: Opinionated code formatter
- **Why**: Consistent code style across the project
- **Formats**: TypeScript, JavaScript, JSON, CSS, HTML
- **Implementation**:
  ```json
  {
    "scripts": {
      "format": "prettier --write \"**/*.{ts,tsx,css,json}\"",
      "format:check": "prettier --check \"**/*.{ts,tsx,css,json}\""
    }
  }
  ```

#### 11. **@types/node 24.10.1**
- **Purpose**: TypeScript definitions for Node.js
- **Why**: Enables path module usage in Vite config with full type safety

### Build & Bundle

#### 12. **PostCSS 8.5.6**
- **Purpose**: Tool for transforming CSS with JavaScript
- **Why**: Powers Tailwind CSS processing
- **Implementation**: Configured via `postcss.config.js`

### How Technologies Work Together

```
┌─────────────────────────────────────────────────────────────┐
│                     Development Flow                         │
└─────────────────────────────────────────────────────────────┘

1. Source Code (TypeScript + React + Tailwind)
   ↓
2. ESLint & Prettier (Code Quality)
   ↓
3. Vite Dev Server (Fast HMR)
   ↓
4. TypeScript Compiler (Type Checking)
   ↓
5. PostCSS + Tailwind (CSS Processing)
   ↓
6. Browser (Live Preview)

┌─────────────────────────────────────────────────────────────┐
│                     Production Build                         │
└─────────────────────────────────────────────────────────────┘

1. TypeScript Compilation (tsc -b)
   ↓
2. Vite Build (Rollup bundling)
   ↓
3. Tailwind Purge (Remove unused CSS)
   ↓
4. Asset Optimization (Minification, Tree-shaking)
   ↓
5. Output to /dist directory
   ↓
6. Deploy to Vercel
```

### Key Implementation Patterns

#### Component Structure
```typescript
// TypeScript interface for props
interface ComponentProps {
  title: string;
  items: string[];
}

// Functional component with TypeScript
const Component: React.FC<ComponentProps> = ({ title, items }) => {
  // React hooks for state management
  const [active, setActive] = useState(false);

  // Tailwind for styling with dark mode support
  return (
    <div className="bg-white dark:bg-neutral-950 p-4 rounded-lg">
      <h2 className="text-xl font-bold">{title}</h2>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-neutral-600 dark:text-neutral-400">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
```

#### Routing Pattern
```typescript
// Centralized route definitions
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PROJECTS: '/projects',
} as const;

// Type-safe routing
import { ROUTES } from './routes';
<Link to={ROUTES.HOME}>Home</Link>
```

#### Styling Pattern
```css
/* Global styles with custom fonts */
@font-face {
  font-family: 'CustomFont';
  src: url('./assets/fonts/custom/Font.woff2') format('woff2');
  font-display: swap;
}

/* Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom utilities */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700;
  }
}
```

#### Data Management Pattern
```typescript
// Centralized data with TypeScript types
import type { PortfolioData } from '../types';

const portfolioData: PortfolioData = {
  about: { /* ... */ },
  skills: [ /* ... */ ],
  experience: [ /* ... */ ],
  projects: [ /* ... */ ],
};

export default portfolioData;
```

### Version Requirements

| Package | Version | Notes |
|---------|---------|-------|
| Node.js | ≥ 18.0.0 | Required for Vite 7 |
| Yarn | ≥ 1.22.0 | Package manager |
| React | 19.2.0 | Latest stable |
| TypeScript | ~5.9.3 | Locked minor version |
| Vite | ^7.2.4 | Latest major |
| Tailwind | ^4.1.18 | v4 with new features |

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

Modern browsers with ES2020+ support required.

---

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Project Initialization](#project-initialization)
3. [Project Structure](#project-structure)
4. [Core Dependencies](#core-dependencies)
5. [Configuration Files](#configuration-files)
6. [Theme System](#theme-system)
7. [Typography & Fonts](#typography--fonts)
8. [Data Structure](#data-structure)
9. [Component Architecture](#component-architecture)
10. [Routing Setup](#routing-setup)
11. [Styling Guidelines](#styling-guidelines)
12. [Animations](#animations)
13. [Optimization](#optimization)
14. [Deployment](#deployment)

---

## Project Initialization

### Step 1: Create Vite Project

```bash
# Create new Vite project with React and TypeScript
# Replace 'your-project-name' with your actual project name (e.g., portfolio-johndoe)
yarn create vite your-project-name --template react-ts

# Navigate to project directory
cd your-project-name

# Install dependencies
yarn install
```

### Step 2: Install Core Dependencies

```bash
# Core dependencies
yarn add react-router-dom

# Analytics (optional but recommended for Vercel)
yarn add @vercel/analytics

# Development dependencies
yarn add -D tailwindcss@latest postcss autoprefixer
yarn add -D @tailwindcss/postcss
yarn add -D @types/node
yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
```

---

## Project Structure

Create the following directory structure:

```
your-project-name/
├── public/
│   ├── images/
│   └── fonts/
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   │   └── [your-font-family]/
│   │   │       ├── Font-Regular.woff
│   │   │       ├── Font-Regular.woff2
│   │   │       ├── Font-Bold.woff
│   │   │       └── Font-Bold.woff2
│   │   └── images/
│   │       └── [optimized-images]
│   ├── components/
│   │   ├── cards/
│   │   │   ├── ProjectCard.tsx
│   │   │   └── SkillCard.tsx
│   │   ├── common/
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Container.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── layout/
│   │   │   ├── Layout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── AboutSection.tsx
│   │       ├── SkillsExpertise.tsx
│   │       ├── ProfessionalJourney.tsx
│   │       └── [other-sections]
│   ├── contexts/
│   │   └── ThemeContext.tsx
│   ├── data/
│   │   └── portfolio.ts
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ProjectsPage.tsx
│   │   ├── ContactPage.tsx
│   │   └── ResumePage.tsx
│   ├── router/
│   │   ├── index.tsx
│   │   └── routes.ts
│   ├── services/
│   │   └── contentServices.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── .gitignore
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
└── README.md
```

---

## Configuration Files

### 1. `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@types': path.resolve(__dirname, './src/types'),
      '@data': path.resolve(__dirname, './src/data'),
    },
  },
});
```

### 2. `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Define your custom color palette
        primary: {
          50: '#your-color',
          100: '#your-color',
          200: '#your-color',
          300: '#your-color',
          400: '#your-color',
          500: '#your-color',
          600: '#your-color',
          700: '#your-color',
          800: '#your-color',
          900: '#your-color',
        },
        secondary: {
          50: '#your-color',
          100: '#your-color',
          // ... add more shades
        },
      },
      fontFamily: {
        sans: ['YourFontName', 'system-ui', 'sans-serif'],
        heading: ['YourHeadingFont', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
```

### 3. `postcss.config.js`

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

### 4. `tsconfig.json`

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@assets/*": ["./src/assets/*"],
      "@types/*": ["./src/types/*"],
      "@data/*": ["./src/data/*"]
    }
  }
}
```

### 5. `package.json` Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write \"**/*.{ts,tsx,css,json}\"",
    "format:check": "prettier --check \"**/*.{ts,tsx,css,json}\"",
    "preview": "vite preview",
    "predeploy": "yarn lint && yarn format:check && yarn build",
    "deploy:preview": "yarn predeploy && vercel",
    "deploy:prod": "yarn predeploy && vercel --prod"
  }
}
```

### 6. `eslint.config.js`

```javascript
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'error',
    },
  },
  prettierConfig
);
```

---

## Theme System

### 1. Create Theme Context (`src/contexts/ThemeContext.tsx`)

```typescript
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

### 2. Theme Toggle Component (`src/components/common/ThemeToggle.tsx`)

```typescript
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
```

---

## Typography & Fonts

### 1. Add Custom Fonts to CSS (`src/index.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom Font Face Declarations */
@font-face {
  font-family: 'YourFontName';
  src:
    url('./assets/fonts/your-font/YourFont-Regular.woff2') format('woff2'),
    url('./assets/fonts/your-font/YourFont-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'YourFontName';
  src:
    url('./assets/fonts/your-font/YourFont-Bold.woff2') format('woff2'),
    url('./assets/fonts/your-font/YourFont-Bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'YourFontName';
  src:
    url('./assets/fonts/your-font/YourFont-Light.woff2') format('woff2'),
    url('./assets/fonts/your-font/YourFont-Light.woff') format('woff');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'YourFontName', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: #4a4a4a;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6a6a6a;
}
```

### 2. Font Optimization Tips

- Use `.woff2` format for modern browsers (better compression)
- Include `.woff` as fallback
- Use `font-display: swap` to prevent invisible text
- Preload critical fonts in `index.html`:

```html
<link
  rel="preload"
  href="/src/assets/fonts/your-font/YourFont-Regular.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

---

## Data Structure

### Create TypeScript Types (`src/types/index.ts`)

```typescript
export interface PortfolioData {
  about: AboutData;
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  contact: ContactInfo;
  references?: Reference[];
  projectProfiles?: ProjectProfile[];
}

export interface AboutData {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  image: string;
  resumeUrl: string;
  yearsOfExperience?: {
    software: number;
    [key: string]: number;
  };
}

export interface SkillCategory {
  id: string;
  name: string;
  category: string;
  items: string[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  duration?: string;
  location: string;
  description: string;
  technologies?: string;
  projects?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  period: string;
  category: string;
  technologies: string[];
  achievements: string[];
  featured: boolean;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  achievements?: string[];
  verificationLink?: string;
  verificationId?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website?: string;
  twitter?: string;
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  phone: string;
  email: string;
}

export interface ProjectProfile {
  id: string;
  company: string;
  title: string;
  period: string;
  technologies: string;
  description: string;
}
```

### Create Portfolio Data File (`src/data/portfolio.ts`)

```typescript
import type { PortfolioData } from '../types';

const portfolioData: PortfolioData = {
  about: {
    name: 'Your Name',
    title: 'Your Professional Title',
    tagline: 'Your Professional Tagline',
    bio: 'Your detailed biography and professional summary...',
    image: '/images/profile.jpg',
    resumeUrl: '/resume.pdf',
    yearsOfExperience: {
      software: 0,
    },
  },

  skills: [
    {
      id: '1',
      name: 'Programming Languages',
      category: 'languages',
      items: ['JavaScript', 'TypeScript', 'Python'],
    },
    // Add more skill categories
  ],

  experience: [
    {
      id: '1',
      company: 'Company Name',
      position: 'Your Position',
      period: 'Month Year - Present',
      location: 'Location',
      description: 'Job description and responsibilities...',
      technologies: 'Tech stack used',
      projects: [],
    },
    // Add more experiences
  ],

  projects: [
    {
      id: '1',
      title: 'Project Name',
      description: 'Project description',
      role: 'Your Role',
      period: 'Month Year - Month Year',
      category: 'fullstack',
      technologies: ['React', 'TypeScript', 'Node.js'],
      achievements: [
        'Achievement 1',
        'Achievement 2',
      ],
      featured: true,
    },
    // Add more projects
  ],

  education: [
    {
      id: '1',
      degree: 'Your Degree',
      institution: 'Institution Name',
      period: 'Year',
    },
    // Add more education
  ],

  contact: {
    email: 'your.email@example.com',
    phone: '+1 234 567 8900',
    location: 'Your Location',
    linkedin: 'https://linkedin.com/in/yourprofile',
    github: 'https://github.com/yourusername',
    website: 'https://yourwebsite.com',
  },
};

export default portfolioData;
```

---

## Component Architecture

### 1. Container Component (`src/components/common/Container.tsx`)

```typescript
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className = '' }: ContainerProps) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
```

### 2. Button Component (`src/components/common/Button.tsx`)

```typescript
import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) => {
  const baseClasses = 'rounded-lg font-medium transition-all duration-200';

  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
```

### 3. Layout Component (`src/components/layout/Layout.tsx`)

```typescript
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <Navbar />
      <main className="min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
```

### 4. Navbar Component (`src/components/layout/Navbar.tsx`)

```typescript
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import Container from '../common/Container';
import ThemeToggle from '../common/ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { to: ROUTES.HOME, label: 'Home' },
    { to: ROUTES.ABOUT, label: 'About' },
    { to: ROUTES.PROJECTS, label: 'Projects' },
    { to: ROUTES.CONTACT, label: 'Contact' },
    { to: ROUTES.RESUME, label: 'Resume' },
  ];

  return (
    <nav className="bg-white dark:bg-neutral-950 shadow-md sticky top-0 z-50 border-b border-neutral-200 dark:border-neutral-800">
      <Container className="h-16">
        <div className="flex items-center justify-between h-full">
          <Link to={ROUTES.HOME} className="text-xl font-bold" onClick={closeMenu}>
            Your Name
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <ul className="flex space-x-6">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 mt-2">
            <ul className="space-y-2 p-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="block py-2 px-4 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </nav>
  );
};

export default Navbar;
```

### 5. Footer Component (`src/components/layout/Footer.tsx`)

```typescript
import Container from '../common/Container';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 py-8">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            © {currentYear} Your Name. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
```

---

## Routing Setup

### 1. Routes Constants (`src/router/routes.ts`)

```typescript
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PROJECTS: '/projects',
  CONTACT: '/contact',
  RESUME: '/resume',
} as const;
```

### 2. Router Configuration (`src/router/index.tsx`)

```typescript
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ProjectsPage from '../pages/ProjectsPage';
import ContactPage from '../pages/ContactPage';
import ResumePage from '../pages/ResumePage';
import { ROUTES } from './routes';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.ABOUT,
        element: <AboutPage />,
      },
      {
        path: ROUTES.PROJECTS,
        element: <ProjectsPage />,
      },
      {
        path: ROUTES.CONTACT,
        element: <ContactPage />,
      },
      {
        path: ROUTES.RESUME,
        element: <ResumePage />,
      },
    ],
  },
]);
```

### 3. Main App Setup (`src/App.tsx`)

```typescript
import { RouterProvider } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { router } from './router';
import './App.css';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Analytics />
    </>
  );
}

export default App;
```

### 4. Entry Point (`src/main.tsx`)

```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './contexts/ThemeContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
```

---

## Styling Guidelines

### Color Palette Selection

1. **Primary Color**: Main brand color for CTAs, links, and highlights
2. **Secondary Color**: Supporting color for accents
3. **Neutral Grays**: For text, backgrounds, and borders
4. **Semantic Colors**: Success, error, warning, info

### Recommended Tools:
- [Tailwind Color Generator](https://uicolors.app/create)
- [Coolors](https://coolors.co/)
- [Adobe Color](https://color.adobe.com/)

### Dark Mode Best Practices

```css
/* Light Mode */
.light {
  --background: #ffffff;
  --foreground: #000000;
  --card: #f9fafb;
  --card-foreground: #1f2937;
}

/* Dark Mode */
.dark {
  --background: #0a0a0a;
  --foreground: #ffffff;
  --card: #1a1a1a;
  --card-foreground: #e5e7eb;
}
```

---

## Animations

### 1. CSS Animations (`src/index.css`)

```css
/* Fade In Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Slide Up Animation */
@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Scale In Animation */
@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Utility Classes */
.animate-fade-in {
  animation: fadeIn 0.5s ease-in;
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out;
}

.animate-scale-in {
  animation: scaleIn 0.3s ease-out;
}
```

### 2. Intersection Observer Hook (`src/hooks/useIntersectionObserver.ts`)

```typescript
import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
) => {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};
```

### 3. Usage Example

```typescript
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const AnimatedSection = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <h2>Animated Content</h2>
    </div>
  );
};
```

---

## Optimization

### 1. Image Optimization

```typescript
// Use optimized image formats
// Convert images to WebP format
// Use appropriate image sizes
// Implement lazy loading

const OptimizedImage = ({ src, alt, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      decoding="async"
    />
  );
};
```

### 2. Code Splitting

```typescript
// Lazy load pages
import { lazy, Suspense } from 'react';

const ProjectsPage = lazy(() => import('../pages/ProjectsPage'));

// In router
{
  path: ROUTES.PROJECTS,
  element: (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectsPage />
    </Suspense>
  ),
}
```

### 3. Performance Tips

- Minimize bundle size
- Use production build for deployment (`yarn build`)
- Enable gzip compression (automatic on Vercel)
- Implement caching strategies (automatic on Vercel)
- Optimize fonts (subset fonts, use woff2)
- Remove unused CSS with PurgeCSS (automatic with Tailwind)
- Leverage Vercel's Edge Network for fast global delivery

---

## Deployment

### Vercel Deployment (Primary)

Vercel is the recommended hosting platform for this portfolio template, offering seamless deployment with automatic HTTPS, global CDN, and analytics.

#### Initial Setup

```bash
# Install Vercel CLI globally
yarn global add vercel

# Or using npm
npm i -g vercel
```

#### Deploy Using CLI

```bash
# Deploy to preview environment
yarn deploy:preview

# Deploy to production
yarn deploy:prod
```

#### Deploy Using Git Integration (Recommended)

1. Push your code to GitHub, GitLab, or Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel will auto-detect Vite and configure build settings
6. Click "Deploy"

#### Environment Variables (if needed)

Add environment variables in Vercel Dashboard:
- Go to Project Settings > Environment Variables
- Add variables like `VITE_API_URL`, `VITE_ANALYTICS_ID`, etc.

### Build Configuration

Create `vercel.json` (optional - Vercel auto-detects Vite):

```json
{
  "buildCommand": "yarn build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Alternative: Netlify Deployment

If you prefer Netlify:

```bash
# Install Netlify CLI
yarn global add netlify-cli

# Deploy
netlify deploy --prod
```

Create `netlify.toml`:

```toml
[build]
  command = "yarn build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Customization Checklist

### Before Starting a New Portfolio:

- [ ] Choose color palette (update `tailwind.config.js`)
- [ ] Select and add custom fonts
- [ ] Update theme colors in CSS variables
- [ ] Customize animation timings and effects
- [ ] Update portfolio data in `src/data/portfolio.ts`
- [ ] Replace placeholder images
- [ ] Update metadata in `index.html`
- [ ] Configure SEO tags
- [ ] Test responsive design on all breakpoints
- [ ] Test dark/light mode transitions
- [ ] Optimize images and fonts
- [ ] Run performance audit
- [ ] Test on different browsers
- [ ] Deploy to staging environment
- [ ] Review and deploy to production

---

## Additional Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router Documentation](https://reactrouter.com/)
- [Vite Documentation](https://vite.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Web Performance Best Practices](https://web.dev/performance/)

---

## License

This template is open source and available for personal and commercial use.

---

**Created with ❤️ for building amazing portfolios**
