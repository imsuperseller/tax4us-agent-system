import React from 'react'
import { motion } from 'framer-motion'
import { cn, getStatusColor, getStatusIcon } from '@/lib/utils'
import { t } from '@/lib/i18n'

interface AgentCardProps {
  agent: {
    id: string
    name: string
    type: string
    status: string
    description: string
    metrics: {
      tasksCompleted: number
      successRate: number
      lastActivity: string | Date
      currentTask?: string
      queueLength: number
    }
    capabilities: string[]
    suggestions: string[]
  }
  onAction: (agentId: string, action: 'start' | 'stop' | 'restart') => void
  isProcessing?: boolean
}

export function AgentCard({ agent, onAction, isProcessing = false }: AgentCardProps) {
  const statusColor = getStatusColor(agent.status)
  const statusIcon = getStatusIcon(agent.status)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative overflow-hidden rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm",
        "shadow-lg hover:shadow-xl transition-all duration-300",
        "group cursor-pointer"
      )}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,249,255,0.8) 100%)',
        border: '1px solid rgba(59, 130, 246, 0.1)'
      }}
    >
      {/* Status Indicator */}
      <div className="absolute top-4 right-4">
        <div className={cn(
          "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium",
          statusColor
        )}>
          <span className="text-lg">{statusIcon}</span>
          <span className="capitalize">{t(agent.status, 'agents')}</span>
        </div>
      </div>

      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {agent.name}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {agent.description}
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded-lg bg-blue-50/50 border border-blue-100">
            <div className="text-2xl font-bold text-blue-600">{agent.metrics.tasksCompleted}</div>
            <div className="text-xs text-gray-600">{t('tasksCompleted', 'agents')}</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-green-50/50 border border-green-100">
            <div className="text-2xl font-bold text-green-600">{agent.metrics.successRate}%</div>
            <div className="text-xs text-gray-600">{t('successRate', 'agents')}</div>
          </div>
        </div>
      </div>

      {/* Current Task */}
      {agent.metrics.currentTask && (
        <div className="px-6 pb-4">
          <div className="bg-gray-50/50 rounded-lg p-3 border border-gray-100">
            <div className="text-xs text-gray-500 mb-1">{t('currentTask', 'tasks')}</div>
            <div className="text-sm text-gray-700 font-medium">{agent.metrics.currentTask}</div>
          </div>
        </div>
      )}

      {/* Capabilities */}
      <div className="px-6 pb-4">
        <div className="text-xs text-gray-500 mb-2">{t('capabilities', 'agents')}</div>
        <div className="flex flex-wrap gap-1">
          {agent.capabilities.slice(0, 3).map((capability, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
            >
              {capability}
            </span>
          ))}
          {agent.capabilities.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{agent.capabilities.length - 3} {t('more', 'common')}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 pb-6">
        <div className="flex gap-2">
          <button
            onClick={() => onAction(agent.id, 'start')}
            disabled={isProcessing || agent.status === 'active'}
            className={cn(
              "flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              agent.status === 'active'
                ? "bg-green-100 text-green-700 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 active:scale-95"
            )}
          >
            {t('start', 'agents')}
          </button>
          <button
            onClick={() => onAction(agent.id, 'stop')}
            disabled={isProcessing || agent.status === 'inactive'}
            className={cn(
              "flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              agent.status === 'inactive'
                ? "bg-gray-100 text-gray-700 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600 active:scale-95"
            )}
          >
            {t('stop', 'agents')}
          </button>
          <button
            onClick={() => onAction(agent.id, 'restart')}
            disabled={isProcessing}
            className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-yellow-500 text-white hover:bg-yellow-600 active:scale-95 transition-all"
          >
            {t('restart', 'agents')}
          </button>
        </div>
      </div>

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">{t('processing', 'common')}</p>
          </div>
        </div>
      )}
    </motion.div>
  )
}
