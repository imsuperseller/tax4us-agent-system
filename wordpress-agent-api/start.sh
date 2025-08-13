#!/bin/bash

echo "🚀 Starting WordPress Content Agent API..."

# Install dependencies
echo "📦 Installing dependencies..."
pip install -r requirements.txt

# Set environment variables (you'll need to update these with real values)
export WP_USERNAME="your_wordpress_username"
export WP_PASSWORD="your_wordpress_application_password"
export OPENAI_API_KEY="your_openai_api_key_here"

# Start FastAPI server
echo "🌐 Starting FastAPI server on http://localhost:8000"
echo "📚 API Documentation: http://localhost:8000/docs"
echo "🔗 MCP Endpoint: http://localhost:8000/mcp"

uvicorn app:app --host 0.0.0.0 --port 8000 --reload
