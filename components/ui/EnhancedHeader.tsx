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
  user: { name: string; email: string }
}

export function EnhancedHeader({ 
  isDarkMode, 
  setIsDarkMode, 
  onRequestAgent, 
  notifications, 
  user 
}: EnhancedHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b"
      style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        borderColor: 'rgba(255, 255, 255, 0.2)'
      }}
    >
      <div className="flex h-14 items-center px-4 lg:px-6">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div 
              className="h-8 w-8 rounded-lg flex items-center justify-center shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #10b981, #3b82f6)'
              }}
            >
              <span className="text-white font-bold text-sm">T4U</span>
            </div>
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div>
            <h1 
              className="text-lg font-bold"
              style={{
                background: 'linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {t('title', 'header')}
            </h1>
            <p className="text-xs text-gray-600">{t('subtitle', 'header')}</p>
          </div>
        </div>

        {/* Center Search */}
        <div className="flex-1 flex justify-center px-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('search', 'header')}
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 transition-all"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                borderColor: 'rgba(255, 255, 255, 0.3)'
              }}
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Request Agent Button */}
          <motion.button
            onClick={onRequestAgent}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-white font-medium transition-all"
            style={{
              background: 'linear-gradient(135deg, #10b981, #3b82f6)',
              boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.3)'
            }}
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">{t('newAgent', 'header')}</span>
          </motion.button>

          {/* Notifications */}
          <motion.button 
            className="relative p-2 rounded-lg hover:bg-gray-100/50 transition-all"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-white animate-pulse flex items-center justify-center">
                <span className="text-xs text-white font-bold">{notifications}</span>
              </div>
            )}
          </motion.button>

          {/* Dark Mode Toggle */}
          <motion.button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg hover:bg-gray-100/50 transition-all"
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
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100/50 transition-all"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-600">{user.email}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </motion.button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg border"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <div className="py-1">
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100/50 transition-colors">
                      {t('profile', 'header')}
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100/50 transition-colors">
                      {t('signOut', 'header')}
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
