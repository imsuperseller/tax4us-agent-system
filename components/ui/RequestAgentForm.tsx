import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface RequestAgentFormProps {
  onSubmit: (formData: any) => void
  isSubmitting: boolean
  onClose: () => void
}

export function RequestAgentForm({ onSubmit, isSubmitting, onClose }: RequestAgentFormProps) {
  const [formData, setFormData] = useState({
    agentType: '',
    description: '',
    requirements: '',
    budget: '',
    timeline: '',
    priority: 'medium'
  })

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  const agentTypes = [
    { value: 'wordpress-content', label: 'WordPress Content Manager', icon: '🌐' },
    { value: 'blog-posts', label: 'Blog & Posts Manager', icon: '📝' },
    { value: 'podcast', label: 'Podcast Manager', icon: '🎙️' },
    { value: 'social-media', label: 'Social Media Manager', icon: '📱' },
    { value: 'custom', label: 'Custom Agent', icon: '⚙️' }
  ]

  const priorities = [
    { value: 'low', label: 'Low Priority', color: 'text-green-600' },
    { value: 'medium', label: 'Medium Priority', color: 'text-yellow-600' },
    { value: 'high', label: 'High Priority', color: 'text-red-600' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
          border: '1px solid rgba(226, 232, 240, 0.8)'
        }}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Request New Agent</h2>
              <p className="text-gray-600 mt-1">Let's create a custom AI agent for your needs</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="text-2xl">×</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm font-medium text-blue-600">
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-blue-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What type of agent do you need?
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {agentTypes.map((type) => (
                      <label
                        key={type.value}
                        className={cn(
                          "flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200",
                          formData.agentType === type.value
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        )}
                      >
                        <input
                          type="radio"
                          name="agentType"
                          value={type.value}
                          checked={formData.agentType === type.value}
                          onChange={(e) => setFormData({ ...formData, agentType: e.target.value })}
                          className="sr-only"
                        />
                        <span className="text-2xl mr-3">{type.icon}</span>
                        <span className="font-medium">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe what you need this agent to do
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Describe the specific tasks, goals, and requirements for your AI agent..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Any specific requirements or constraints?
                  </label>
                  <textarea
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Technical requirements, integrations, security needs, etc..."
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select budget</option>
                      <option value="basic">Basic ($500-1000)</option>
                      <option value="standard">Standard ($1000-2500)</option>
                      <option value="premium">Premium ($2500-5000)</option>
                      <option value="enterprise">Enterprise ($5000+)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select timeline</option>
                      <option value="urgent">Urgent (1-2 weeks)</option>
                      <option value="standard">Standard (2-4 weeks)</option>
                      <option value="flexible">Flexible (1-2 months)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Priority Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {priorities.map((priority) => (
                      <label
                        key={priority.value}
                        className={cn(
                          "flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all duration-200",
                          formData.priority === priority.value
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        )}
                      >
                        <input
                          type="radio"
                          name="priority"
                          value={priority.value}
                          checked={formData.priority === priority.value}
                          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                          className="sr-only"
                        />
                        <span className={cn("font-medium", priority.color)}>{priority.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={cn(
                "px-6 py-2 text-sm font-medium rounded-lg transition-colors",
                currentStep === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:text-gray-800"
              )}
            >
              Previous
            </button>

            <div className="flex gap-3">
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.agentType}
                  className={cn(
                    "px-6 py-2 text-sm font-medium rounded-lg transition-colors",
                    formData.agentType
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  )}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "px-6 py-2 text-sm font-medium rounded-lg transition-colors",
                    isSubmitting
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600"
                  )}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </div>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
