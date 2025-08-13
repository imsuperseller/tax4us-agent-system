import React from 'react'
import { motion } from 'framer-motion'
import { TYPOGRAPHY, GLASS_STYLES, ANIMATION_VARIANTS } from './DesignSystem'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  type: 'agents' | 'tasks' | 'requests' | 'analytics' | 'custom'
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  icon?: string
  illustration?: React.ReactNode
  className?: string
}

export function EmptyState({ 
  type, 
  title, 
  description, 
  actionLabel, 
  onAction, 
  icon, 
  illustration,
  className 
}: EmptyStateProps) {
  const defaultStates = {
    agents: {
      icon: '🤖',
      title: 'No AI Agents Yet',
      description: 'Get started by requesting your first AI agent to automate your business processes.',
      actionLabel: 'Request Agent',
    },
    tasks: {
      icon: '📋',
      title: 'No Tasks Available',
      description: 'Tasks will appear here when your agents are actively working on projects.',
      actionLabel: 'View Agents',
    },
    requests: {
      icon: '📝',
      title: 'No Agent Requests',
      description: 'Agent requests and their processing status will appear here.',
      actionLabel: 'Make Request',
    },
    analytics: {
      icon: '📊',
      title: 'No Analytics Data',
      description: 'Analytics will appear here once you have active agents and completed tasks.',
      actionLabel: 'View Agents',
    },
    custom: {
      icon: icon || '📦',
      title: title || 'No Data Available',
      description: description || 'There\'s nothing to display here yet.',
      actionLabel: actionLabel || 'Get Started',
    }
  }

  const state = defaultStates[type] || defaultStates.custom

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className
      )}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-6"
      >
        {illustration ? (
          illustration
        ) : (
          <div 
            className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl shadow-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))',
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}
          >
            {state.icon}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-md"
      >
        <h3 className={cn(TYPOGRAPHY.h3, "text-gray-900 mb-2")}>
          {state.title}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-8">
          {state.description}
        </p>
      </motion.div>

      {onAction && (
        <motion.button
          onClick={onAction}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center space-x-2 px-6 py-3 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>{state.actionLabel}</span>
        </motion.button>
      )}

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 0.5 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-green-200 rounded-full blur-2xl"></div>
      </motion.div>
    </motion.div>
  )
}

// Specialized Empty State Components
export function AgentsEmptyState({ onRequestAgent }: { onRequestAgent: () => void }) {
  return (
    <EmptyState
      type="agents"
      onAction={onRequestAgent}
      illustration={
        <div className="relative">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl shadow-xl">
            🤖
          </div>
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm"
          >
            ⚡
          </motion.div>
        </div>
      }
    />
  )
}

export function TasksEmptyState({ onViewAgents }: { onViewAgents: () => void }) {
  return (
    <EmptyState
      type="tasks"
      onAction={onViewAgents}
      illustration={
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-24 h-24 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-3xl shadow-xl"
        >
          📋
        </motion.div>
      }
    />
  )
}

export function AnalyticsEmptyState({ onViewAgents }: { onViewAgents: () => void }) {
  return (
    <EmptyState
      type="analytics"
      onAction={onViewAgents}
      illustration={
        <div className="relative">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-3xl shadow-xl">
            📊
          </div>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-2xl border-2 border-purple-300"
          />
        </div>
      }
    />
  )
}
