import React from 'react'
import { motion } from 'framer-motion'
import { TYPOGRAPHY, GLASS_STYLES, ANIMATION_VARIANTS } from './DesignSystem'
import { cn } from '@/lib/utils'
import { t } from '@/lib/i18n'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  variant?: 'default' | 'agents' | 'tasks' | 'requests' | 'analytics'
}

export function EmptyState({ 
  icon, 
  title, 
  description, 
  actionLabel, 
  onAction,
  variant = 'default'
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex flex-col items-center justify-center p-12 text-center",
        "rounded-2xl border-2 border-dashed",
        GLASS_STYLES.light
      )}
      style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))',
        borderColor: 'rgba(59, 130, 246, 0.2)'
      }}
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
        }}
      >
        {icon || (
          <span className="text-3xl text-white">📊</span>
        )}
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-md"
      >
        <h3 className={cn("font-bold mb-3", TYPOGRAPHY.h3)}>
          {title}
        </h3>
        <p className={cn("text-gray-600 mb-6", TYPOGRAPHY.body)}>
          {description}
        </p>

        {/* Action Button */}
        {actionLabel && onAction && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            onClick={onAction}
            className={cn(
              "px-6 py-3 rounded-lg font-medium transition-all",
              "bg-blue-500 text-white hover:bg-blue-600 active:scale-95"
            )}
          >
            {actionLabel}
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  )
}

export function AgentsEmptyState({ onRequestAgent }: { onRequestAgent: () => void }) {
  return (
    <EmptyState
      icon={<span className="text-3xl">🤖</span>}
      title={t('noAgents', 'agents')}
      description={t('noAgentsDescription', 'agents')}
      actionLabel={t('requestAgent', 'agents')}
      onAction={onRequestAgent}
      variant="agents"
    />
  )
}

export function TasksEmptyState({ onViewAgents }: { onViewAgents: () => void }) {
  return (
    <EmptyState
      icon={<span className="text-3xl">📋</span>}
      title={t('noTasks', 'tasks')}
      description={t('noTasksDescription', 'tasks')}
      actionLabel={t('viewAgents', 'tasks')}
      onAction={onViewAgents}
      variant="tasks"
    />
  )
}

export function AnalyticsEmptyState({ onViewAgents }: { onViewAgents: () => void }) {
  return (
    <EmptyState
      icon={<span className="text-3xl">📈</span>}
      title={t('noData', 'analytics')}
      description={t('noDataDescription', 'analytics')}
      actionLabel={t('viewAgents', 'tasks')}
      onAction={onViewAgents}
      variant="analytics"
    />
  )
}
