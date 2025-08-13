import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, Bell, Settings, User, LogOut, Moon, Sun, ChevronDown, Plus, Sparkles
} from 'lucide-react'
import { TYPOGRAPHY, GLASS_STYLES, ANIMATION_VARIANTS } from './DesignSystem'
import { cn } from '@/lib/utils'
import { t } from '@/lib/i18n'

interface EnhancedHeaderProps {
  isDarkMode: boolean
  setIsDarkMode: (dark: boolean) => void
  onRequestAgent: () => void
  notifications: number
  user: {
    name: string
    email: string
  }
}

export function EnhancedHeader({ 
  isDarkMode, 
  setIsDarkMode, 
  onRequestAgent, 
  notifications, 
  user 
}: EnhancedHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "sticky top-0 z-50 border-b",
        GLASS_STYLES.light
      )}
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderColor: 'rgba(255, 255, 255, 0.2)'
      }}
    >
      <div className="flex h-16 items-center px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div 
              className="h-10 w-10 rounded-xl flex items-center justify-center shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)'
              }}
            >
              <span className="text-white font-bold text-lg">T4U</span>
            </div>
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </motion.div>
          <div>
            <h1 
              className="text-xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {t('title', 'header')}
            </h1>
            <p className="text-sm text-gray-600">{t('subtitle', 'header')}</p>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('search', 'header')}
              className="w-full pl-10 pr-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 transition-all"
              style={{
                background: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)'
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {/* New Agent Button */}
          <motion.button
            onClick={onRequestAgent}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all"
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
            }}
          >
            <Plus className="h-4 w-4" />
            <span>{t('newAgent', 'header')}</span>
          </motion.button>

          {/* Notifications */}
          <motion.button 
            className="p-2 rounded-xl hover:bg-gray-100/50 transition-all relative"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
            )}
          </motion.button>

          {/* Dark Mode Toggle */}
          <motion.button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-xl hover:bg-gray-100/50 transition-all"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </motion.button>

          {/* User Menu */}
          <div className="relative">
            <motion.button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-100/50 transition-all"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </motion.button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg border"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{t('profile', 'header')}</span>
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                      <LogOut className="h-4 w-4" />
                      <span>{t('signOut', 'header')}</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
