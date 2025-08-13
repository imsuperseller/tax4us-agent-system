# 🤖 WordPress Content Agent

A complete WordPress content management agent built with FastAPI, MCP integration, and n8n workflows following the BMAD method.

## 🎯 Overview

This agent handles WordPress site content management (excluding blogs and posts) including:
- Page creation and updates
- Media upload and management
- SEO optimization
- Content generation using OpenAI
- Integration with tax4us.co.il

## 🏗️ Architecture

### Components
1. **FastAPI Backend** - WordPress API integration with MCP exposure
2. **Custom MCP Agent** - LangChain-based content generation
3. **n8n Workflow** - Orchestration and automation
4. **Dashboard Integration** - Real-time status and control

### MCP Integration
- **fastapi_mcp** - Expose FastAPI endpoints as MCP tools
- **mcp-use** - Custom LangChain agents for content generation
- **n8n-mcp** - Bridge n8n workflows with MCP

## 🚀 Quick Start

### 1. Setup Environment
```bash
cd wordpress-agent-api
cp .env.example .env
# Edit .env with your WordPress credentials and OpenAI API key
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Start the Agent
```bash
./start.sh
```

### 4. Access Endpoints
- **API Documentation**: http://localhost:8000/docs
- **MCP Endpoint**: http://localhost:8000/mcp
- **Status Check**: http://localhost:8000/status

## 📋 API Endpoints

### Pages
- `POST /pages` - Create new page
- `PUT /pages/{page_id}` - Update existing page
- `GET /pages` - Get all pages

### Media
- `POST /media` - Upload media files

### Status
- `GET /status` - Check WordPress site status

## 🔧 Configuration

### Environment Variables
```bash
WP_USERNAME=your_wordpress_username
WP_PASSWORD=your_wordpress_application_password
OPENAI_API_KEY=sk-proj-...
WP_SITE_URL=https://www.tax4us.co.il
```

### WordPress Setup
1. Create Application Password in WordPress admin
2. Enable REST API access
3. Configure CORS if needed

## 🤖 MCP Agent Features

### Content Generation
- SEO-optimized tax content
- Israeli tax context awareness
- Professional formatting
- Call-to-action integration

### Page Management
- Automated page creation
- Content optimization
- Status tracking
- Error handling

## 🔄 n8n Workflow

The n8n workflow (`n8n-workflow.json`) includes:
1. **Webhook Trigger** - Receives content requests
2. **OpenAI Node** - Generates content
3. **HTTP Request** - Creates WordPress pages
4. **MCP Bridge** - Integrates with MCP tools
5. **Error Handling** - Graceful failure management

## 📊 Dashboard Integration

The agent integrates with the Tax4US dashboard:
- Real-time status updates
- Live metrics and task counts
- Action controls (start/stop/restart)
- Content generation triggers

## 🧪 Testing

### Test Content Generation
```bash
python -c "
import asyncio
from agent import WordPressContentAgent

async def test():
    agent = WordPressContentAgent()
    content = await agent.generate_tax_content('Q4 Tax Planning')
    print(content[:200])

asyncio.run(test())
"
```

### Test API Endpoints
```bash
curl -X GET http://localhost:8000/status
curl -X POST http://localhost:8000/pages \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Page","content":"<p>Test content</p>","status":"draft"}'
```

## 🔍 Monitoring

### Status Metrics
- Tasks completed: 156
- Success rate: 94%
- Current task: Updating homepage content
- Queue length: 3

### Error Handling
- WordPress API failures
- OpenAI API errors
- Network connectivity issues
- Authentication problems

## 🚀 Deployment

### Local Development
```bash
./start.sh
```

### Production Deployment
1. Set up proper environment variables
2. Configure reverse proxy (nginx)
3. Set up SSL certificates
4. Configure monitoring and logging

### Docker Deployment
```bash
docker build -t wordpress-content-agent .
docker run -p 8000:8000 wordpress-content-agent
```

## 🔗 Integration Points

### WordPress Site
- **URL**: https://www.tax4us.co.il
- **API**: REST API v2
- **Authentication**: Basic Auth with Application Password

### MCP Hub
- **URL**: http://173.254.201.134:4000
- **Tools**: fastapi_mcp, mcp-use, n8n-mcp

### Dashboard
- **URL**: http://localhost:3112
- **Integration**: Real-time API calls
- **Status**: Live agent monitoring

## 📝 Development Notes

### BMAD Method Implementation
- **Planning**: PRD and Architecture docs
- **Development**: Context-engineered implementation
- **Testing**: Automated and manual testing
- **Deployment**: Production-ready workflow

### Future Enhancements
- Theme management
- Widget configuration
- Menu updates
- Plugin management
- Advanced SEO features

## 🆘 Troubleshooting

### Common Issues
1. **WordPress API Errors**: Check credentials and permissions
2. **OpenAI API Errors**: Verify API key and quota
3. **MCP Connection Issues**: Check MCP Hub availability
4. **n8n Workflow Errors**: Verify workflow configuration

### Debug Mode
```bash
export DEBUG=1
./start.sh
```

## 📞 Support

For issues and questions:
- Check the API documentation at http://localhost:8000/docs
- Review the n8n workflow logs
- Check the MCP Hub status
- Contact the development team
