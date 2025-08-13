import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatDate(date: Date | string | null | undefined): string {
  try {
    if (!date) return 'N/A'
    
    const dateObj = typeof date === 'string' ? new Date(date) : date
    
    if (isNaN(dateObj.getTime())) {
      return 'Invalid Date'
    }
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(dateObj)
  } catch (error) {
    console.error('Error formatting date:', error)
    return 'Invalid Date'
  }
}

export function formatDateTime(date: Date | string | null | undefined): string {
  try {
    if (!date) return 'N/A'
    
    const dateObj = typeof date === 'string' ? new Date(date) : date
    
    if (isNaN(dateObj.getTime())) {
      return 'Invalid Date'
    }
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(dateObj)
  } catch (error) {
    console.error('Error formatting date time:', error)
    return 'Invalid Date'
  }
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'active':
    case 'completed':
    case 'success':
      return 'text-green-600 bg-green-50'
    case 'pending':
    case 'processing':
      return 'text-yellow-600 bg-yellow-50'
    case 'error':
    case 'failed':
      return 'text-red-600 bg-red-50'
    case 'inactive':
    case 'stopped':
      return 'text-gray-600 bg-gray-50'
    default:
      return 'text-blue-600 bg-blue-50'
  }
}

export function getStatusIcon(status: string): string {
  switch (status.toLowerCase()) {
    case 'active':
    case 'completed':
    case 'success':
      return '✓'
    case 'pending':
    case 'processing':
      return '⏳'
    case 'error':
    case 'failed':
      return '✗'
    case 'inactive':
    case 'stopped':
      return '⏸'
    default:
      return '●'
  }
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
