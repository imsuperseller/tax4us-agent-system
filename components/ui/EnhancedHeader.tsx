import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  LogOut, 
  Moon, 
  Sun,
  ChevronDown,
  Plus,
  Sparkles
} from 'lucide-react'
import { TYPOGRAPHY, GLASS_STYLES, ANIMATION_VARIANTS } from './DesignSystem'
import { cn } from '@/lib/utils'

interface EnhancedHeaderProps {
  isDarkMode: boolean
  setIsDarkMode: (dark: boolean) => void
  onRequestAgent: () => void
  notifications?: number
  user?: {
    name: string
    email: string
    avatar?: string
  }
}

export function EnhancedHeader({ 
  isDarkMode, 
  setIsDarkMode, 
  onRequestAgent, 
  notifications = 3,
  user = { name: 'Ben Ginati', email: 'ben@tax4us.co.il' }
}: EnhancedHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b"
      style={{
        ...GLASS_STYLES.light,
        borderColor: 'rgba(255, 255, 255, 0.2)'
      }}
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)'
                }}
              >
                T4U
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className={cn(TYPOGRAPHY.h5, "text-gray-900")}>
                <span className="text-green-600">Tax4US</span>
                <span className="text-blue-600"> Agent</span>
              </h1>
              <p className="text-xs text-gray-500">AI-Powered Business</p>
            </div>
          </motion.div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search agents, tasks, analytics..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(8px)',
                  borderColor: 'rgba(255, 255, 255, 0.3)'
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Request Agent Button */}
            <motion.button
              onClick={onRequestAgent}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="h-4 w-4" />
              <span>New Agent</span>
            </motion.button>

            {/* Notifications */}
            <div className="relative">
              <motion.button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl hover:bg-gray-100/50 transition-all duration-200"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bell className="h-5 w-5 text-gray-600" />
                {notifications > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center"
                  >
                    <span className="text-xs text-white font-medium">
                      {notifications > 9 ? '9+' : notifications}
                    </span>
                  </motion.div>
                )}
              </motion.button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 rounded-xl shadow-xl border"
                    style={{
                      ...GLASS_STYLES.light,
                      borderColor: 'rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
                      {[
                        { title: 'WordPress Agent completed task', time: '2 min ago', type: 'success' },
                        { title: 'New agent request received', time: '5 min ago', type: 'info' },
                        { title: 'System maintenance scheduled', time: '1 hour ago', type: 'warning' }
                      ].map((notification, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className={cn(
                            "w-2 h-2 rounded-full mt-2",
                            notification.type === 'success' ? 'bg-green-500' :
                            notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                          )} />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                            <p className="text-xs text-gray-500">{notification.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-xl hover:bg-gray-100/50 transition-all duration-200"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-gray-600" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </motion.button>

            {/* User Menu */}
            <div className="relative">
              <motion.button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-100/50 transition-all duration-200"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-600" />
              </motion.button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-64 rounded-xl shadow-xl border"
                    style={{
                      ...GLASS_STYLES.light,
                      borderColor: 'rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    <div className="p-4 border-b border-gray-200">
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left">
                        <User className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Profile</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left">
                        <Settings className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Settings</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-left">
                        <LogOut className="h-4 w-4 text-red-600" />
                        <span className="text-sm text-red-600">Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
