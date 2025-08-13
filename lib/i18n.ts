export const hebrewTranslations = {
  // Navigation
  navigation: {
    overview: 'סקירה כללית',
    agents: 'סוכנים חכמים',
    tasks: 'משימות',
    requests: 'בקשות',
    analytics: 'ניתוח נתונים',
    automation: 'אוטומציה',
    performance: 'ביצועים',
    team: 'צוות',
    documents: 'מסמכים',
    security: 'אבטחה',
    settings: 'הגדרות'
  },

  // Header
  header: {
    title: 'ניהול סוכנים',
    subtitle: 'אוטומציה מבוססת בינה מלאכותית',
    search: 'חיפוש סוכנים, משימות...',
    newAgent: 'סוכן חדש',
    notifications: 'התראות',
    profile: 'פרופיל',
    signOut: 'התנתק'
  },

  // Dashboard
  dashboard: {
    welcome: 'ברוכים הבאים למרכז השליטה שלכם',
    description: 'נהל, עקוב ואופטימיזר את הסוכנים החכמים שלכם בזמן אמת',
    quickActions: 'פעולות מהירות',
    requestNewAgent: 'בקש סוכן חדש',
    viewAnalytics: 'צפה בניתוח',
    configureAgents: 'הגדר סוכנים',
    systemMetrics: 'מדדי מערכת',
    totalAgents: 'סה"כ סוכנים',
    activeAgents: 'סוכנים פעילים',
    tasksCompleted: 'משימות שהושלמו',
    successRate: 'אחוז הצלחה',
    performanceOverview: 'סקירת ביצועים',
    realTimeData: 'נתונים בזמן אמת'
  },

  // Agents
  agents: {
    title: 'סוכנים חכמים',
    subtitle: 'נהל את כוח העבודה החכם שלך',
    noAgents: 'אין עדיין סוכנים',
    noAgentsDescription: 'התחל על ידי בקשת הסוכן החכם הראשון שלך',
    requestAgent: 'בקש סוכן',
    agentTypes: {
      wordpressContent: 'מנהל תוכן וורדפרס',
      blogPosts: 'מנהל בלוג ופוסטים',
      podcast: 'מנהל פודקאסט',
      socialMedia: 'מנהל רשתות חברתיות',
      custom: 'סוכן מותאם אישית'
    },
    status: {
      active: 'פעיל',
      inactive: 'לא פעיל',
      processing: 'מעבד',
      error: 'שגיאה',
      idle: 'ממתין'
    },
    actions: {
      start: 'התחל',
      stop: 'עצור',
      restart: 'הפעל מחדש',
      configure: 'הגדר',
      viewDetails: 'צפה בפרטים'
    },
    metrics: {
      tasksCompleted: 'משימות שהושלמו',
      successRate: 'אחוז הצלחה',
      lastActivity: 'פעילות אחרונה',
      currentTask: 'משימה נוכחית',
      queueLength: 'אורך תור'
    },
    capabilities: 'יכולות',
    suggestions: 'הצעות',
    mcpConnected: 'MCP מחובר'
  },

  // Tasks
  tasks: {
    title: 'משימות',
    subtitle: 'עקוב אחר המשימות של הסוכנים שלך',
    noTasks: 'אין משימות זמינות',
    noTasksDescription: 'משימות יופיעו כאן כאשר הסוכנים שלך עובדים באופן פעיל',
    viewAgents: 'צפה בסוכנים',
    status: {
      pending: 'ממתין',
      processing: 'מעבד',
      completed: 'הושלם',
      failed: 'נכשל',
      paused: 'מושהה'
    },
    priority: {
      low: 'נמוך',
      medium: 'בינוני',
      high: 'גבוה'
    },
    fields: {
      title: 'כותרת',
      description: 'תיאור',
      agent: 'סוכן',
      created: 'נוצר',
      estimated: 'מוערך',
      progress: 'התקדמות'
    }
  },

  // Requests
  requests: {
    title: 'בקשות סוכנים',
    subtitle: 'נהל בקשות לסוכנים חדשים',
    noRequests: 'אין בקשות סוכנים',
    noRequestsDescription: 'בקשות סוכנים וסטטוס העיבוד שלהן יופיעו כאן',
    makeRequest: 'צור בקשה',
    newRequest: 'בקשה חדשה',
    status: {
      analyzing: 'מנתח',
      creatingPlan: 'יוצר תוכנית',
      readySignature: 'מוכן לחתימה',
      processing: 'מעבד',
      completed: 'הושלם'
    },
    fields: {
      businessNeeds: 'צרכי עסק',
      industry: 'תעשייה',
      contactEmail: 'אימייל ליצירת קשר',
      budget: 'תקציב',
      timeline: 'לוח זמנים',
      priority: 'עדיפות'
    },
    form: {
      title: 'בקש סוכן חדש',
      subtitle: 'בואו ניצור סוכן חכם מותאם אישית לצרכים שלכם',
      step1: 'איזה סוג סוכן אתה צריך?',
      step2: 'תאר מה אתה צריך שהסוכן הזה יעשה',
      step3: 'פרטים נוספים',
      next: 'הבא',
      previous: 'קודם',
      submit: 'שלח בקשה',
      submitting: 'שולח...'
    }
  },

  // Analytics
  analytics: {
    title: 'ניתוח נתונים',
    noData: 'אין נתוני ניתוח',
    noDataDescription: 'ניתוח נתונים יופיע כאן ברגע שיהיו לך סוכנים פעילים ומשימות שהושלמו',
    agentPerformance: 'ביצועי סוכנים',
    taskDistribution: 'הפצת משימות',
    performanceMetrics: 'מדדי ביצועים'
  },

  // Settings
  settings: {
    title: 'הגדרות',
    agentConfiguration: 'הגדרת סוכנים',
    systemPreferences: 'העדפות מערכת',
    autoRefresh: 'רענון אוטומטי של לוח הבקרה',
    emailNotifications: 'התראות אימייל',
    realTimeUpdates: 'עדכונים בזמן אמת'
  },

  // Common
  common: {
    loading: 'טוען...',
    error: 'שגיאה',
    success: 'הצלחה',
    cancel: 'ביטול',
    save: 'שמור',
    delete: 'מחק',
    edit: 'ערוך',
    view: 'צפה',
    close: 'סגור',
    confirm: 'אישור',
    yes: 'כן',
    no: 'לא',
    all: 'הכל',
    none: 'אין',
    today: 'היום',
    yesterday: 'אתמול',
    thisWeek: 'השבוע',
    thisMonth: 'החודש',
    lastWeek: 'שבוע שעבר',
    lastMonth: 'חודש שעבר'
  }
}

export const translate = (key: string, section: keyof typeof hebrewTranslations = 'common'): string => {
  const keys = key.split('.')
  let value: any = hebrewTranslations[section]
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      return key // Return original key if translation not found
    }
  }
  
  return typeof value === 'string' ? value : key
}

export const t = translate

// RTL support
export const isRTL = true
export const direction = 'rtl'
export const textAlign = 'right'
