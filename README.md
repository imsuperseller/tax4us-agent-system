# Tax4US Agent Management System

## 🚀 AI-Powered Business Automation Platform

A comprehensive dashboard for managing AI agents, built specifically for Tax4US business automation needs.

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
- **Deployment:** Vercel (recommended)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd tax4us-agent-management

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env.local` file:

```env
# MCP Hub Configuration
MCP_HUB_URL=http://173.254.201.134:4000

# WordPress Agent Configuration
WORDPRESS_API_URL=your-wordpress-site.com
WORDPRESS_USERNAME=your-username
WORDPRESS_PASSWORD=your-application-password

# OpenAI Configuration (if needed)
OPENAI_API_KEY=your-openai-api-key
```

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main dashboard
├── components/            # React components
│   └── ui/               # UI components
├── lib/                  # Utilities and configurations
│   ├── i18n.ts          # Hebrew localization
│   └── utils.ts         # Utility functions
└── public/              # Static assets
```

## 🌐 Hebrew Localization

The app is fully localized in Hebrew with RTL support:

- All UI text in Hebrew
- Technical terms remain in English
- RTL layout support
- Hebrew font optimization (Heebo)

## 🤖 AI Agents

### Current Agents

1. **WordPress Content Manager** - Manages WordPress content creation
2. **WordPress Blog Manager** - Handles blog posts and articles
3. **Podcast Manager** - Manages podcast content and distribution
4. **Social Media Manager** - Handles social media automation

### Agent Features

- Real-time status monitoring
- Task queue management
- Performance analytics
- Error handling and recovery
- MCP Hub integration

## 📊 Dashboard Sections

### Overview
- System metrics and performance
- Quick actions for common tasks
- Recent activity feed

### AI Agents
- Agent status and controls
- Performance metrics
- Configuration options

### Tasks
- Task queue and progress
- Priority management
- Completion tracking

### Analytics
- Performance charts
- Success rate tracking
- Usage statistics

### Requests
- New agent requests
- Processing status
- Approval workflow

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Configuration

### MCP Hub Integration

The app connects to the MCP Hub for agent management:

- **URL:** http://173.254.201.134:4000
- **Protocol:** HTTP/HTTPS
- **Authentication:** API key based

### WordPress Integration

WordPress agents require:

- WordPress REST API access
- Application passwords
- Proper permissions

## 📱 Mobile Support

- Responsive design
- Touch-friendly interface
- Mobile-optimized navigation
- Progressive Web App features

## 🔒 Security

- Environment variable protection
- API key management
- Secure communication with MCP Hub
- Input validation and sanitization

## 🐛 Troubleshooting

### Common Issues

1. **MCP Hub Connection Failed**
   - Check MCP Hub URL
   - Verify network connectivity
   - Check firewall settings

2. **WordPress Agent Issues**
   - Verify WordPress credentials
   - Check API permissions
   - Validate site URL

3. **Build Errors**
   - Clear `.next` directory
   - Reinstall dependencies
   - Check Node.js version

## 📈 Performance

- Optimized bundle size
- Lazy loading components
- Efficient state management
- Caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary to Tax4US.

## 📞 Support

For support and questions:
- Email: ben@tax4us.co.il
- Technical issues: Check the troubleshooting section

---

**Built with ❤️ for Tax4US Business Automation**
