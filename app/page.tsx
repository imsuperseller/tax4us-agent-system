'use client'

import { useState, useEffect } from 'react'
import { 
  Bot, 
  FileText, 
  Shield, 
  TrendingUp, 
  Plus, 
  Settings, 
  Bell, 
  Search,
  Activity,
  Target,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  Zap,
  Play,
  Pause,
  RefreshCw,
  Mail,
  ExternalLink,
  Loader2,
  Send,
  FileCheck,
  Mic,
  Share2,
  Globe,
  Edit3,
  Calendar,
  Users,
  MessageSquare,
  Sparkles,
  Crown,
  Star,
  Award,
  Rocket,
  Target as TargetIcon,
  BarChart,
  PieChart,
  LineChart
} from 'lucide-react'
import { cn, formatCurrency, formatDate, getStatusColor, getStatusIcon } from '@/lib/utils'
import { AgentCard } from '@/components/ui/AgentCard'
import { MetricsDashboard } from '@/components/ui/MetricsDashboard'
import { RequestAgentForm } from '@/components/ui/RequestAgentForm'
import { EnhancedHeader } from '@/components/ui/EnhancedHeader'
import { EnhancedNavigation } from '@/components/ui/EnhancedNavigation'
import { EmptyState, AgentsEmptyState, TasksEmptyState, AnalyticsEmptyState } from '@/components/ui/EmptyState'
import { t, hebrewTranslations } from '@/lib/i18n'

// Types
interface Agent {
  id: string
  name: string
  type: 'wordpress-content' | 'wordpress-blog' | 'podcast-manager' | 'social-media'
  status: 'active' | 'inactive' | 'processing' | 'error' | 'idle'
  description: string
  icon: React.ReactNode
  metrics: {
    tasksCompleted: number
    successRate: number
    lastActivity: Date | string
    currentTask?: string
    queueLength: number
  }
  capabilities: string[]
  suggestions: string[]
  settings: {
    autoMode: boolean
    notificationLevel: 'low' | 'medium' | 'high'
    workingHours: { start: string; end: string }
  }
}

interface Task {
  id: string
  title: string
  description: string
  agentId: string
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'paused'
  priority: 'low' | 'medium' | 'high'
  createdAt: Date | string
  dueDate?: Date | string
  progress: number
  estimatedTime?: string
}

interface AgentRequest {
  id: string
  status: 'analyzing' | 'creating-plan' | 'ready-signature' | 'processing' | 'completed'
  businessNeeds: string
  industry: string
  contactEmail: string
  budget?: string
  timeline?: string
  createdAt: Date | string
  updatedAt: Date | string
  progress: number
  estimatedCompletion?: Date | string
}

interface Metric {
  label: string
  value: string | number
  change: number
  icon: React.ReactNode
  color: string
  gradient: string
}

export default function Tax4USDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [agents, setAgents] = useState<Agent[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [agentRequests, setAgentRequests] = useState<AgentRequest[]>([])
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [showTypeformModal, setShowTypeformModal] = useState(false)
  const [currentRequest, setCurrentRequest] = useState<AgentRequest | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Load real agents from MCP Hub
  useEffect(() => {
    const loadAgents = async () => {
      try {
        // Load WordPress Content Manager from real MCP Hub
        const response = await fetch('/api/agents/wordpress-content')
        const data = await response.json()
        
        if (data.success) {
          setAgents([data.agent])
        } else {
          console.warn('Using fallback data:', data.message)
          setAgents([data.agent]) // Use fallback data
        }
      } catch (error) {
        console.error('Failed to load agents:', error)
        setAgents([]) // Empty array if all fails
      }
    }

    loadAgents()

    setTasks([
      {
        id: '1',
        title: 'Update Homepage Content',
        description: 'Refresh homepage with new tax services and testimonials',
        agentId: '1',
        status: 'processing',
        priority: 'high',
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        progress: 75,
        estimatedTime: '2 hours'
      },
      {
        id: '2',
        title: 'Create Weekly Tax Tips Blog',
        description: 'Draft and publish weekly blog post about tax optimization',
        agentId: '2',
        status: 'processing',
        priority: 'medium',
        createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        progress: 45,
        estimatedTime: '3 hours'
      },
      {
        id: '3',
        title: 'Record Q4 Tax Planning Podcast',
        description: 'Record and edit podcast episode about Q4 tax planning',
        agentId: '3',
        status: 'processing',
        priority: 'high',
        createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
        progress: 30,
        estimatedTime: '4 hours'
      },
      {
        id: '4',
        title: 'Schedule LinkedIn Posts',
        description: 'Create and schedule LinkedIn posts for tax season',
        agentId: '4',
        status: 'pending',
        priority: 'medium',
        createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        progress: 0,
        estimatedTime: '1 hour'
      }
    ])
  }, [])

  const metrics: Metric[] = [
    {
      label: 'Total Tasks Completed',
      value: '546',
      change: 12.5,
      icon: <CheckCircle className="h-5 w-5" />,
      color: 'text-green-600',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      label: 'Success Rate',
      value: '90%',
      change: 3.2,
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'text-blue-600',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      label: 'Active Agents',
      value: '4/4',
      change: 0,
      icon: <Bot className="h-5 w-5" />,
      color: 'text-purple-600',
      gradient: 'from-purple-500 to-violet-600'
    },
    {
      label: 'Queue Length',
      value: '11',
      change: -2.1,
      icon: <Clock className="h-5 w-5" />,
      color: 'text-orange-600',
      gradient: 'from-orange-500 to-amber-600'
    }
  ]

  const getAgentTypeLabel = (type: string) => {
    const labels = {
      'wordpress-content': 'WordPress Content',
      'wordpress-blog': 'WordPress Blog',
      'podcast-manager': 'Podcast Manager',
      'social-media': 'Social Media'
    }
    return labels[type as keyof typeof labels] || type
  }

  const getAgentTypeColor = (type: string) => {
    const colors = {
      'wordpress-content': 'bg-gradient-to-r from-blue-500 to-cyan-600',
      'wordpress-blog': 'bg-gradient-to-r from-green-500 to-emerald-600',
      'podcast-manager': 'bg-gradient-to-r from-purple-500 to-violet-600',
      'social-media': 'bg-gradient-to-r from-orange-500 to-amber-600'
    }
    return colors[type as keyof typeof colors] || 'bg-gradient-to-r from-gray-500 to-gray-600'
  }

  const handleAgentAction = async (agentId: string, action: 'start' | 'stop' | 'restart') => {
    console.log(`${action} agent ${agentId}`)
    
    try {
      // Send action to real MCP Hub
      const response = await fetch('/api/agents/wordpress-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          data: { agentId }
        })
      })

      const result = await response.json()
      
      if (result.success) {
        // Update agent status based on real response
        setAgents(prev => prev.map(agent => {
          if (agent.id === agentId) {
            return {
              ...agent,
              status: action === 'start' ? 'active' : action === 'stop' ? 'inactive' : 'processing'
            }
          }
          return agent
        }))
      } else {
        console.error('Agent action failed:', result.message)
      }
    } catch (error) {
      console.error('Failed to execute agent action:', error)
      // Fallback to local state update
      setAgents(prev => prev.map(agent => {
        if (agent.id === agentId) {
          return {
            ...agent,
            status: action === 'start' ? 'active' : action === 'stop' ? 'inactive' : 'processing'
          }
        }
        return agent
      }))
    }
  }

  const handleRequestNewAgent = async (formData: any) => {
    setIsSubmitting(true)
    
    const newRequest: AgentRequest = {
      id: Date.now().toString(),
      status: 'analyzing',
      businessNeeds: formData.businessNeeds,
      industry: formData.industry,
      contactEmail: formData.contactEmail,
      budget: formData.budget,
      timeline: formData.timeline,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      progress: 0,
      estimatedCompletion: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString()
    }

    setAgentRequests(prev => [...prev, newRequest])
    setCurrentRequest(newRequest)
    setShowRequestModal(false)

    console.log('📧 Sending request to service@rensto.com:', formData)

    setTimeout(() => updateRequestStatus(newRequest.id, 'creating-plan', 25), 2000)
    setTimeout(() => updateRequestStatus(newRequest.id, 'ready-signature', 50), 5000)
    setTimeout(() => setShowTypeformModal(true), 7000)

    setIsSubmitting(false)
  }

  const updateRequestStatus = (requestId: string, status: AgentRequest['status'], progress: number) => {
    setAgentRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status,
          progress,
          updatedAt: new Date().toISOString()
        }
      }
      return req
    }))
  }

  const handleTypeformSubmission = () => {
    if (currentRequest) {
      updateRequestStatus(currentRequest.id, 'processing', 75)
      setShowTypeformModal(false)
      
      setTimeout(() => {
        updateRequestStatus(currentRequest.id, 'completed', 100)
      }, 3000)
    }
  }

  return (
    <div className={cn("min-h-screen transition-colors duration-300", isDarkMode ? "dark" : "")}>
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #ecfeff 100%)'
          }}
        ></div>
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      {/* Enhanced Header */}
      <EnhancedHeader
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onRequestAgent={() => setShowRequestModal(true)}
        notifications={3}
        user={{ name: 'בן גינתי', email: 'ben@tax4us.co.il' }}
      />

      {/* Enhanced Navigation */}
      <EnhancedNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRequestAgent={() => setShowRequestModal(true)}
      />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Welcome Section */}
          <div className="text-center py-4">
            <div 
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-4"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
                border: '1px solid rgba(16, 185, 129, 0.2)'
              }}
            >
              <Sparkles className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">AI-Powered Automation</span>
            </div>
            <h2 
              className="text-3xl font-bold mb-2"
              style={{
                background: 'linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {t('welcome', 'dashboard')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('description', 'dashboard')}
            </p>
          </div>

          {/* Metrics Dashboard */}
          <MetricsDashboard 
            metrics={{
              totalAgents: agents.length,
              activeAgents: agents.filter(a => a.status === 'active').length,
              totalTasks: tasks.length,
              completedTasks: tasks.filter(t => t.status === 'completed').length,
              successRate: 94,
              averageResponseTime: '2.3s'
            }}
          />

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div 
              className="p-5 rounded-2xl border"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{t('quickActions', 'dashboard')}</h3>
                <Rocket className="h-6 w-6 text-blue-600" />
              </div>
              <div className="space-y-3">
                <button 
                  className="w-full flex items-center justify-between p-3 rounded-xl border transition-all group hover:transform hover:scale-105"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 group-hover:scale-110 transition-transform">
                      <Plus className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium">{t('requestNewAgent', 'dashboard')}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </button>
                <button 
                  className="w-full flex items-center justify-between p-3 rounded-xl border transition-all group hover:transform hover:scale-105"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 group-hover:scale-110 transition-transform">
                      <BarChart className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium">{t('viewAnalytics', 'dashboard')}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </button>
                <button 
                  className="w-full flex items-center justify-between p-3 rounded-xl border transition-all group hover:transform hover:scale-105"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-violet-600 group-hover:scale-110 transition-transform">
                      <Settings className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium">{t('configureAgents', 'dashboard')}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </button>
              </div>
            </div>

            <div 
              className="p-5 rounded-2xl border"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">פעילות אחרונה</h3>
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="space-y-3">
                {tasks.slice(0, 3).map((task) => {
                  const agent = agents.find(a => a.id === task.agentId)
                  return (
                    <div 
                      key={task.id} 
                      className="flex items-center space-x-3 p-3 rounded-xl"
                      style={{ background: 'rgba(255, 255, 255, 0.5)' }}
                    >
                      <div className={cn("p-2 rounded-lg", getStatusColor(task.status))}>
                        {getStatusIcon(task.status)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{task.title}</p>
                        <p className="text-xs text-gray-500">
                          {agent?.name} • {formatDate(task.createdAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{task.progress}%</div>
                        <div className="w-16 h-1 bg-gray-200 rounded-full">
                          <div 
                            className="h-1 rounded-full transition-all"
                            style={{ 
                              width: `${task.progress}%`,
                              background: 'linear-gradient(90deg, #10b981, #3b82f6, #8b5cf6)'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Agent Status Overview */}
          <div 
            className="p-5 rounded-2xl border"
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Agent Status Overview</h3>
              <button 
                onClick={() => setShowRequestModal(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl text-white font-medium transition-all hover:transform hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #10b981, #3b82f6)',
                  boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.3)'
                }}
              >
                <Plus className="h-4 w-4" />
                <span>Request New Agent</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {agents.map((agent, index) => (
                <div 
                  key={agent.id} 
                  className="p-4 rounded-xl transition-all duration-300 hover:transform hover:scale-105"
                  style={{
                    background: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={cn("p-2 rounded-lg", getStatusColor(agent.status))}>
                        {agent.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold">{agent.name}</h4>
                        <span className={cn("text-xs px-2 py-1 rounded-full", getStatusColor(agent.status))}>
                          {agent.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{agent.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span>{agent.metrics.tasksCompleted} tasks</span>
                    <span className="text-green-600 font-medium">{agent.metrics.successRate}% success</span>
                  </div>
                  {agent.metrics.currentTask && (
                    <div className="mt-2 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{agent.metrics.currentTask}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {/* Request New Agent Modal */}
      {showRequestModal && (
        <RequestAgentForm
          onSubmit={handleRequestNewAgent}
          isSubmitting={isSubmitting}
          onClose={() => setShowRequestModal(false)}
        />
      )}

      {/* Typeform Modal */}
      {showTypeformModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="glass p-8 rounded-2xl max-w-md w-full mx-4 border border-white/20">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6">
                <FileCheck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gradient">Ready for Signature</h3>
              <p className="text-muted-foreground mb-6">
                Your agent request has been analyzed and a plan has been created. Please complete the signature process to proceed.
              </p>
              
              <div className="space-y-6">
                <div className="p-4 bg-background/50 rounded-xl">
                  <h4 className="font-semibold mb-3">Proposed Plan:</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Custom AI agent development</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Integration with existing systems</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Training and optimization</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Ongoing support and maintenance</span>
                    </li>
                  </ul>
                </div>
                
                <button 
                  onClick={handleTypeformSubmission}
                  className="w-full btn-primary px-6 py-3 rounded-xl text-white font-medium flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Complete Signature Process</span>
                </button>
                
                <button 
                  onClick={() => setShowTypeformModal(false)}
                  className="w-full px-6 py-3 text-muted-foreground hover:text-foreground font-medium"
                >
                  Review Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

