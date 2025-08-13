import React from 'react'
import { motion } from 'framer-motion'
import { cn, formatCurrency } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon?: React.ReactNode
  color?: string
}

function MetricCard({ title, value, change, changeType = 'neutral', icon, color = 'blue' }: MetricCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700'
  }

  const changeColors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative p-4 rounded-xl border bg-white/80 backdrop-blur-sm",
        "shadow-sm hover:shadow-md transition-all duration-300"
      )}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)',
        border: '1px solid rgba(226, 232, 240, 0.8)'
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={cn(
          "p-2 rounded-lg",
          colorClasses[color as keyof typeof colorClasses]
        )}>
          {icon}
        </div>
        {change && (
          <span className={cn(
            "text-sm font-medium",
            changeColors[changeType]
          )}>
            {change}
          </span>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>

      {/* Animated progress bar */}
      <motion.div
        className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <motion.div
          className={cn(
            "h-full rounded-full",
            colorClasses[color as keyof typeof colorClasses].split(' ')[0]
          )}
          initial={{ width: 0 }}
          animate={{ width: '70%' }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </motion.div>
    </motion.div>
  )
}

interface MetricsDashboardProps {
  metrics: {
    totalAgents: number
    activeAgents: number
    totalTasks: number
    completedTasks: number
    successRate: number
    averageResponseTime: string
  }
}

export function MetricsDashboard({ metrics }: MetricsDashboardProps) {
  const cards = [
    {
      title: 'Total Agents',
      value: metrics.totalAgents,
      change: '+2 this week',
      changeType: 'positive' as const,
      icon: <span className="text-lg">🤖</span>,
      color: 'blue' as const
    },
    {
      title: 'Active Agents',
      value: metrics.activeAgents,
      change: `${Math.round((metrics.activeAgents / metrics.totalAgents) * 100)}% active`,
      changeType: 'positive' as const,
      icon: <span className="text-lg">⚡</span>,
      color: 'green' as const
    },
    {
      title: 'Tasks Completed',
      value: metrics.completedTasks,
      change: '+12 today',
      changeType: 'positive' as const,
      icon: <span className="text-lg">✅</span>,
      color: 'purple' as const
    },
    {
      title: 'Success Rate',
      value: `${metrics.successRate}%`,
      change: '+2.3%',
      changeType: 'positive' as const,
      icon: <span className="text-lg">📈</span>,
      color: 'orange' as const
    }
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">System Metrics</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Real-time data</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <MetricCard {...card} />
          </motion.div>
        ))}
      </div>

      {/* Performance Chart Placeholder - Compact Version */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="p-4 rounded-xl border bg-white/80 backdrop-blur-sm shadow-sm"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)',
          border: '1px solid rgba(226, 232, 240, 0.8)'
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Tasks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Success Rate</span>
            </div>
          </div>
        </div>
        
        <div className="h-20 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-lg mb-1">📊</div>
            <div className="text-xs">Chart integration coming soon</div>
            <div className="text-xs opacity-75">Powered by Recharts + MCP data</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
