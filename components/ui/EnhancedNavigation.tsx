import React from 'react'
import { motion } from 'framer-motion'
import { 
  Activity, 
  Bot, 
  Target, 
  Plus, 
  BarChart3, 
  Settings,
  Home,
  Zap,
  TrendingUp,
  Users,
  FileText,
  Shield
} from 'lucide-react'
import { TYPOGRAPHY, GLASS_STYLES, ANIMATION_VARIANTS } from './DesignSystem'
import { cn } from '@/lib/utils'
import { t } from '@/lib/i18n'

interface NavigationItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number | string
  disabled?: boolean
}

interface EnhancedNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  onRequestAgent: () => void
}

export function EnhancedNavigation({ 
  activeTab, 
  setActiveTab, 
  onRequestAgent 
}: EnhancedNavigationProps) {
  const navigationItems: NavigationItem[] = [
    { id: 'overview', label: t('overview', 'navigation'), icon: Home },
    { id: 'agents', label: t('agents', 'navigation'), icon: Bot, badge: 4 },
    { id: 'tasks', label: t('tasks', 'navigation'), icon: Target, badge: 12 },
    { id: 'requests', label: t('requests', 'navigation'), icon: Plus, badge: 2 },
    { id: 'analytics', label: t('analytics', 'navigation'), icon: BarChart3 },
    { id: 'automation', label: t('automation', 'navigation'), icon: Zap },
    { id: 'performance', label: t('performance', 'navigation'), icon: TrendingUp },
    { id: 'team', label: t('team', 'navigation'), icon: Users },
    { id: 'documents', label: t('documents', 'navigation'), icon: FileText },
    { id: 'security', label: t('security', 'navigation'), icon: Shield },
    { id: 'settings', label: t('settings', 'navigation'), icon: Settings },
  ]

  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="border-b sticky top-16 z-40"
      style={{
        ...GLASS_STYLES.light,
        borderColor: 'rgba(255, 255, 255, 0.2)'
      }}
    >
      <div className="px-6">
        <div className="flex items-center justify-between">
          {/* Main Navigation */}
          <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                disabled={item.disabled}
                className={cn(
                  "relative flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap",
                  activeTab === item.id
                    ? "text-blue-600 bg-blue-50 border border-blue-200"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-transparent",
                  item.disabled && "opacity-50 cursor-not-allowed"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
                {item.badge && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-1 px-1.5 py-0.5 text-xs font-medium rounded-full"
                    style={{
                      background: activeTab === item.id 
                        ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' 
                        : 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                      color: activeTab === item.id ? 'white' : '#6b7280'
                    }}
                  >
                    {item.badge}
                  </motion.div>
                )}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2 ml-4">
            <motion.button
              onClick={onRequestAgent}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white'
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="h-4 w-4" />
              <span>{t('requestAgent', 'agents')}</span>
            </motion.button>

            {/* Status Indicator */}
            <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-green-50 border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-700">כל המערכות פועלות</span>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb for Mobile */}
      <div className="px-6 py-2 border-t border-gray-100 lg:hidden">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>לוח בקרה</span>
          <span>/</span>
          <span className="font-medium text-gray-900 capitalize">
            {navigationItems.find(item => item.id === activeTab)?.label}
          </span>
        </div>
      </div>
    </motion.nav>
  )
}

// Custom scrollbar styles
const scrollbarStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`

// Add styles to document
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = scrollbarStyles
  document.head.appendChild(style)
}
