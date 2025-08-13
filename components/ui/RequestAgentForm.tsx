import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { t } from '@/lib/i18n'

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
    { value: 'wordpress-content', label: t('wordpressContent', 'agents'), icon: '🌐' },
    { value: 'blog-posts', label: t('blogPosts', 'agents'), icon: '📝' },
    { value: 'podcast', label: t('podcast', 'agents'), icon: '🎙️' },
    { value: 'social-media', label: t('socialMedia', 'agents'), icon: '📱' },
    { value: 'custom', label: t('custom', 'agents'), icon: '⚙️' }
  ]

  const priorities = [
    { value: 'low', label: t('low', 'tasks'), color: 'text-green-600' },
    { value: 'medium', label: t('medium', 'tasks'), color: 'text-yellow-600' },
    { value: 'high', label: t('high', 'tasks'), color: 'text-red-600' }
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
              <h2 className="text-2xl font-bold text-gray-900">{t('title', 'requests')}</h2>
              <p className="text-gray-600 mt-1">{t('subtitle', 'requests')}</p>
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
              <span className="text-sm text-gray-600">{t('step', 'common')} {currentStep} {t('of', 'common')} {totalSteps}</span>
              <span className="text-sm font-medium text-blue-600">
                {Math.round((currentStep / totalSteps) * 100)}% {t('complete', 'common')}
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
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('step1', 'requests')}</h3>
                <div className="space-y-4">
                  {agentTypes.map((type) => (
                    <label
                      key={type.value}
                      className={cn(
                        "flex items-center p-4 border rounded-lg cursor-pointer transition-all",
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
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('step2', 'requests')}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('description', 'requests')}
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                                             placeholder={t('descriptionPlaceholder', 'requests')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('requirements', 'requests')}
                    </label>
                    <textarea
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                                             placeholder={t('requirementsPlaceholder', 'requests')}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('step3', 'requests')}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('budget', 'requests')}
                    </label>
                    <input
                      type="text"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                             placeholder={t('budgetPlaceholder', 'requests')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('timeline', 'requests')}
                    </label>
                    <input
                      type="text"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                             placeholder={t('timelinePlaceholder', 'requests')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('priority', 'requests')}
                    </label>
                    <div className="space-y-2">
                      {priorities.map((priority) => (
                        <label
                          key={priority.value}
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="priority"
                            value={priority.value}
                            checked={formData.priority === priority.value}
                            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                            className="mr-2"
                          />
                          <span className={priority.color}>{priority.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={cn(
                "px-6 py-2 rounded-lg font-medium transition-all",
                currentStep === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-500 text-white hover:bg-gray-600"
              )}
            >
                             {t('previous', 'requests')}
            </button>
            
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!formData.agentType}
                className={cn(
                  "px-6 py-2 rounded-lg font-medium transition-all",
                  !formData.agentType
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                )}
              >
                                 {t('next', 'requests')}
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-all disabled:opacity-50"
              >
                                 {isSubmitting ? t('submitting', 'requests') : t('submit', 'requests')}
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
