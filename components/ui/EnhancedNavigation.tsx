import React from 'react'
import { motion } from 'framer-motion'
import { 
  Activity, Bot, Target, Plus, BarChart3, Settings, Home, Zap, TrendingUp, Users, FileText, Shield
} from 'lucide-react'
import { TYPOGRAPHY, GLASS_STYLES, ANIMATION_VARIANTS } from './DesignSystem'
import { cn } from '@/lib/utils'
import { t } from '@/lib/i18n'

interface NavigationItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
}

interface EnhancedNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  onRequestAgent: () => void
}

export function EnhancedNavigation({ activeTab, setActiveTab, onRequestAgent }: EnhancedNavigationProps) {
  const navigationItems: NavigationItem[] = [
    { id: 'overview', label: t('overview', 'navigation'), icon: Home },
    { id: 'agents', label: t('agents', 'navigation'), icon: Bot, badge: 4 },
    { id: 'tasks', label: t('tasks', 'navigation'), icon: Target, badge: 12 },
    { id: 'requests', label: t('requests', 'navigation'), icon: FileText, badge: 2 },
    { id: 'analytics', label: t('analytics', 'navigation'), icon: BarChart3 },
    { id: 'settings', label: t('settings', 'navigation'), icon: Settings }
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="border-b sticky top-14 z-40"
      style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        borderColor: 'rgba(255, 255, 255, 0.2)'
      }}
    >
      <div className="flex items-center justify-between px-4 lg:px-6 py-2">
        {/* Navigation Items */}
        <div className="flex items-center space-x-1 lg:space-x-2 overflow-x-auto">
          {navigationItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex items-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 relative",
                activeTab === item.id
                  ? "text-blue-600 bg-blue-50 border border-blue-200"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{item.label}</span>
              {item.badge && (
                <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-blue-500 rounded-full min-w-[1.25rem]">
                  {item.badge}
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Request Agent Button */}
          <motion.button
            onClick={onRequestAgent}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-white font-medium text-sm transition-all"
            style={{
              background: 'linear-gradient(135deg, #10b981, #3b82f6)',
              boxShadow: '0 2px 8px 0 rgba(16, 185, 129, 0.3)'
            }}
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">{t('requestAgent', 'agents')}</span>
          </motion.button>

          {/* System Status */}
          <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-green-50 border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-green-700 hidden sm:inline">כל המערכות פועלות</span>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="px-4 lg:px-6 py-2 border-t border-gray-100/50">
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
