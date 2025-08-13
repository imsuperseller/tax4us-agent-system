# Tax4US Agent Management System

## 🚀 AI-Powered Business Automation Platform

A comprehensive dashboard for managing AI agents, built specifically for Tax4US business automation needs.

## ✅ Deployment Status

**🌐 Live Application:** https://production-a74p1ssiu-shais-projects-f9b9e359.vercel.app  
**📁 GitHub Repository:** https://github.com/imsuperseller/tax4us-agent-system  
**🔗 Vercel Project:** Connected with automatic deployments  
**📅 Last Updated:** August 13, 2024  
**🔄 Auto-Deploy:** ✅ Enabled (pushes to main trigger production deployment)

## ✨ Features

- **🤖 AI Agent Management** - Monitor and control multiple AI agents
- **📊 Real-time Analytics** - Track performance and success rates
- **🎯 Task Management** - View and manage agent tasks
- **📝 Agent Requests** - Request new custom AI agents
- **🌐 Hebrew Localization** - Full Hebrew UI with RTL support
- **📱 Responsive Design** - Works on desktop and mobile
- **⚡ Real-time Updates** - Live status monitoring

## 🛠 Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **UI Components:** Framer Motion, shadcn/ui
- **Styling:** Tailwind CSS with custom design system
- **Animations:** Framer Motion
- **Localization:** Hebrew with RTL support
- **Deployment:** Vercel (automated)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/imsuperseller/tax4us-agent-system.git
cd tax4us-agent-system

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables
```bash
NODE_ENV=production
```

## 📁 Project Structure

```
tax4us-agent-system/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main dashboard
├── components/            # React components
│   └── ui/               # UI components
├── lib/                  # Utilities and helpers
│   ├── i18n.ts          # Hebrew translations
│   └── utils.ts         # Utility functions
├── wordpress-agent-api/  # WordPress agent backend
└── public/              # Static assets
```

## 🌐 Hebrew Localization

The application is fully localized in Hebrew with RTL support:

- **UI Text:** All user-facing text in Hebrew
- **Technical Terms:** Kept in English (API, MCP, etc.)
- **RTL Layout:** Right-to-left text direction
- **Font:** Heebo font for optimal Hebrew display

## 🤖 AI Agents

### Current Agents
1. **WordPress Content Manager** - Manages WordPress content creation and publishing
2. **Blog & Posts Manager** - Handles blog post creation and management
3. **Podcast Manager** - Manages podcast content and distribution
4. **Social Media Manager** - Handles social media posting and engagement

### Agent Features
- Real-time status monitoring
- Task management and tracking
- Performance analytics
- MCP Hub integration
- Automated workflows

## 📊 Dashboard Sections

### Overview
- System metrics and performance
- Quick actions and shortcuts
- Real-time status updates

### AI Agents
- Agent cards with status indicators
- Action buttons (Start/Stop/Restart)
- Performance metrics
- Capabilities and suggestions

### Tasks
- Task list with status tracking
- Priority levels and deadlines
- Progress indicators

### Agent Requests
- Request new custom agents
- Multi-step form process
- Status tracking and updates

### Analytics
- Performance metrics
- Success rates
- Usage statistics

## 🚀 Deployment

### Automatic Deployment
The application is configured for automatic deployment:

1. **Push to GitHub** → Automatic Vercel deployment
2. **Pull Request** → Preview deployment
3. **Main branch** → Production deployment

### Manual Deployment
```bash
# Deploy to production
npx vercel --prod

# Deploy to preview
npx vercel

# View deployment status
npx vercel ls
```

## 📱 Mobile Support

- Responsive design for all screen sizes
- Touch-friendly interface
- Mobile-optimized navigation
- Progressive Web App features

## 🔒 Security

- HTTPS enabled
- Security headers configured
- Environment variable protection
- Input validation and sanitization

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   npm run build
   npx vercel logs
   ```

2. **Local Development**
   ```bash
   npm run dev
   npm run build
   npm run start
   ```

3. **Deployment Issues**
   ```bash
   npx vercel ls
   npx vercel logs
   ```

## 📞 Support

- **GitHub Issues:** https://github.com/imsuperseller/tax4us-agent-system/issues
- **Vercel Dashboard:** https://vercel.com/shais-projects-f9b9e359/production-app
- **Documentation:** See DEPLOYMENT.md for detailed deployment guide

## 📄 License

This project is proprietary software for Tax4US.

---

**🎉 Tax4US Agent Management System - Production Ready!**
