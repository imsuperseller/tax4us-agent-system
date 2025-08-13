import React from 'react'
import { motion } from 'framer-motion'

// Design System Constants
export const DESIGN_TOKENS = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  animations: {
    fast: '150ms ease-out',
    normal: '300ms ease-out',
    slow: '500ms ease-out',
  }
}

// Reusable Animation Variants
export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideIn: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
}

// Glass Morphism Styles
export const GLASS_STYLES = {
  light: {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  dark: {
    background: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  accent: {
    background: 'rgba(59, 130, 246, 0.1)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(59, 130, 246, 0.2)',
  }
}

// Gradient Presets
export const GRADIENTS = {
  primary: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
  success: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
  warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  purple: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  ocean: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
  sunset: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
  midnight: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
}

// Status Colors Mapping
export const STATUS_COLORS = {
  active: {
    bg: DESIGN_TOKENS.colors.success[50],
    text: DESIGN_TOKENS.colors.success[700],
    border: DESIGN_TOKENS.colors.success[200],
  },
  inactive: {
    bg: DESIGN_TOKENS.colors.neutral[50],
    text: DESIGN_TOKENS.colors.neutral[600],
    border: DESIGN_TOKENS.colors.neutral[200],
  },
  processing: {
    bg: DESIGN_TOKENS.colors.primary[50],
    text: DESIGN_TOKENS.colors.primary[700],
    border: DESIGN_TOKENS.colors.primary[200],
  },
  error: {
    bg: DESIGN_TOKENS.colors.error[50],
    text: DESIGN_TOKENS.colors.error[700],
    border: DESIGN_TOKENS.colors.error[200],
  },
  warning: {
    bg: DESIGN_TOKENS.colors.warning[50],
    text: DESIGN_TOKENS.colors.warning[700],
    border: DESIGN_TOKENS.colors.warning[200],
  },
}

// Priority Colors
export const PRIORITY_COLORS = {
  low: {
    bg: DESIGN_TOKENS.colors.success[50],
    text: DESIGN_TOKENS.colors.success[700],
    border: DESIGN_TOKENS.colors.success[200],
  },
  medium: {
    bg: DESIGN_TOKENS.colors.warning[50],
    text: DESIGN_TOKENS.colors.warning[700],
    border: DESIGN_TOKENS.colors.warning[200],
  },
  high: {
    bg: DESIGN_TOKENS.colors.error[50],
    text: DESIGN_TOKENS.colors.error[700],
    border: DESIGN_TOKENS.colors.error[200],
  },
}

// Typography Scale
export const TYPOGRAPHY = {
  h1: 'text-4xl font-bold tracking-tight',
  h2: 'text-3xl font-bold tracking-tight',
  h3: 'text-2xl font-semibold tracking-tight',
  h4: 'text-xl font-semibold',
  h5: 'text-lg font-medium',
  h6: 'text-base font-medium',
  body: 'text-base leading-relaxed',
  bodySmall: 'text-sm leading-relaxed',
  caption: 'text-xs leading-relaxed',
}

// Button Variants
export const BUTTON_VARIANTS = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300',
  success: 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl',
  warning: 'bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg hover:shadow-xl',
  error: 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl',
  ghost: 'hover:bg-gray-100 text-gray-700',
  outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700',
}

// Card Variants
export const CARD_VARIANTS = {
  default: 'bg-white border border-gray-200 shadow-sm hover:shadow-md',
  elevated: 'bg-white border border-gray-200 shadow-lg hover:shadow-xl',
  glass: GLASS_STYLES.light,
  accent: GLASS_STYLES.accent,
}

// Input Variants
export const INPUT_VARIANTS = {
  default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
  error: 'border-red-300 focus:border-red-500 focus:ring-red-500',
  success: 'border-green-300 focus:border-green-500 focus:ring-green-500',
}

// Utility Functions
export const getStatusStyle = (status: string) => {
  return STATUS_COLORS[status as keyof typeof STATUS_COLORS] || STATUS_COLORS.inactive
}

export const getPriorityStyle = (priority: string) => {
  return PRIORITY_COLORS[priority as keyof typeof PRIORITY_COLORS] || PRIORITY_COLORS.medium
}

export const getGradientStyle = (gradient: keyof typeof GRADIENTS) => {
  return { background: GRADIENTS[gradient] }
}

// Loading States
export const LOADING_STATES = {
  spinner: (
    <motion.div
      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  ),
  dots: (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-current rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  ),
  pulse: (
    <motion.div
      className="w-4 h-4 bg-current rounded-full"
      animate={{ opacity: [1, 0.5, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  ),
}

// Empty States
export const EMPTY_STATES = {
  agents: {
    icon: '🤖',
    title: 'No Agents Yet',
    description: 'Get started by requesting your first AI agent',
    action: 'Request Agent',
  },
  tasks: {
    icon: '📋',
    title: 'No Tasks',
    description: 'Tasks will appear here when agents are working',
    action: 'View Agents',
  },
  requests: {
    icon: '📝',
    title: 'No Requests',
    description: 'Agent requests will appear here',
    action: 'Make Request',
  },
}

// Responsive Breakpoints
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

// Z-Index Scale
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
}

export default {
  DESIGN_TOKENS,
  ANIMATION_VARIANTS,
  GLASS_STYLES,
  GRADIENTS,
  STATUS_COLORS,
  PRIORITY_COLORS,
  TYPOGRAPHY,
  BUTTON_VARIANTS,
  CARD_VARIANTS,
  INPUT_VARIANTS,
  LOADING_STATES,
  EMPTY_STATES,
  BREAKPOINTS,
  Z_INDEX,
  getStatusStyle,
  getPriorityStyle,
  getGradientStyle,
}
