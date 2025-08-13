# Tax4US AI Dashboard - Deployment Guide

## 🚀 Vercel Deployment Configuration

### **Project Details**
- **Project ID:** `prj_n2NRVyGSFmaZFhWSbcXRCiAx4hiu`
- **Team ID:** `team_SEnaotre0c8j0LYup48DbA3f`
- **User ID:** `zSy1OLXtVLif2Vuf4brnBeZz`
- **Production URL:** https://production-arf3p6axc-shais-projects-6bd42652.vercel.app

### **Environment Variables**
Set these in Vercel Dashboard → Settings → Environment Variables:

```bash
# Vercel Configuration
VERCEL_TOKEN=YUAzEHrCMQSwq7dlqknuUMoi
VERCEL_USER_ID=zSy1OLXtVLif2Vuf4brnBeZz
VERCEL_TEAM_ID=team_SEnaotre0c8j0LYup48DbA3f
VERCEL_PROJECT_ID=prj_n2NRVyGSFmaZFhWSbcXRCiAx4hiu

# Project Configuration
NEXT_PUBLIC_APP_NAME=Tax4US AI Dashboard
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_API_BASE_URL=https://www.tax4us.co.il/wp-json/wp/v2

# WordPress Configuration
WP_USERNAME=your_wordpress_username
WP_PASSWORD=your_wordpress_application_password
OPENAI_API_KEY=your_openai_api_key_here

# MCP Hub Configuration
MCP_HUB_URL=http://173.254.201.134:4000
WORDPRESS_AGENT_URL=http://localhost:8000
```

### **GitHub Actions Setup**
1. Add repository secrets in GitHub:
   - `VERCEL_TOKEN`
   - `VERCEL_USER_ID`
   - `VERCEL_TEAM_ID`
   - `VERCEL_PROJECT_ID`

2. Push to `main` branch triggers automatic deployment

### **Manual Deployment**
```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel --token $VERCEL_TOKEN --prod
```

### **Local Development**
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### **Build Configuration**
- **Framework:** Next.js 14
- **Node Version:** 18.x
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### **Performance Optimizations**
- Static page generation for dashboard
- API routes for dynamic content
- Optimized bundle size (143 kB first load)
- Image optimization with Next.js

### **Monitoring**
- Vercel Analytics enabled
- Performance monitoring
- Error tracking
- Real-time logs

### **Security**
- Environment variables encrypted
- HTTPS enforced
- CORS configured
- API rate limiting

### **Troubleshooting**
1. **Build Failures:** Check Node.js version and dependencies
2. **Environment Variables:** Verify all required vars are set
3. **API Issues:** Check MCP Hub connectivity
4. **Performance:** Monitor bundle size and loading times

### **Next Steps**
1. Configure custom domain
2. Set up monitoring alerts
3. Implement caching strategies
4. Add performance optimizations
