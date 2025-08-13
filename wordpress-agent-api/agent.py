from mcp_use import MCPClient, MCPAgent
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import asyncio
import os

load_dotenv()

class WordPressContentAgent:
    def __init__(self):
        self.config = {
            "name": "wp_content_agent",
            "url": "http://localhost:8000/mcp/sse",  # From fastapi_mcp
            "tools": ["create_page", "update_page", "upload_media", "get_pages"]
        }
        
        self.client = MCPClient.from_dict(self.config)
        self.llm = ChatOpenAI(
            model="gpt-4o",
            api_key=os.getenv("OPENAI_API_KEY"),
            temperature=0.7
        )
        
        self.agent = MCPAgent(
            llm=self.llm,
            client=self.client,
            max_steps=10,
            verbose=True
        )

    async def generate_tax_content(self, topic: str) -> str:
        """Generate SEO-optimized tax content using OpenAI"""
        prompt = f"""
        Generate SEO-optimized content about {topic} for a tax consulting website (tax4us.co.il).
        
        Requirements:
        - Include practical tips and actionable advice
        - Optimize for Israeli tax context
        - Include relevant keywords naturally
        - Make it engaging and professional
        - Target length: 800-1200 words
        - Include headings and subheadings
        - Add call-to-action for tax services
        
        Format the content in HTML with proper tags.
        """
        
        response = await self.llm.ainvoke(prompt)
        return response.content

    async def create_tax_page(self, title: str, topic: str) -> dict:
        """Create a new WordPress page with generated tax content"""
        try:
            # Generate content
            content = await self.generate_tax_content(topic)
            
            # Create page data
            page_data = {
                "title": title,
                "content": content,
                "status": "publish",
                "type": "page"
            }
            
            # Use MCP agent to create page
            result = await self.agent.run(f"Create a new page titled '{title}' with the following content: {content}")
            
            return {
                "success": True,
                "page_title": title,
                "content_length": len(content),
                "result": result
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }

    async def update_homepage_content(self, new_content: str) -> dict:
        """Update the homepage with new content"""
        try:
            # Get current pages to find homepage
            pages = await self.agent.run("Get all pages and find the homepage (page_id=1272)")
            
            # Update homepage
            result = await self.agent.run(f"Update page with ID 1272 with new content: {new_content}")
            
            return {
                "success": True,
                "message": "Homepage updated successfully",
                "result": result
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }

    async def optimize_seo_content(self, content: str) -> str:
        """Optimize content for SEO"""
        prompt = f"""
        Optimize this content for SEO for a tax consulting website:
        
        {content}
        
        Requirements:
        - Add relevant tax-related keywords naturally
        - Improve meta descriptions
        - Optimize headings structure
        - Add internal linking suggestions
        - Ensure mobile-friendly formatting
        
        Return the optimized content in HTML format.
        """
        
        response = await self.llm.ainvoke(prompt)
        return response.content

    async def get_agent_status(self) -> dict:
        """Get current agent status and metrics"""
        try:
            # Get pages count
            pages_result = await self.agent.run("Get count of all pages")
            
            return {
                "status": "active",
                "tasks_completed": 156,  # This would be tracked in a database
                "success_rate": 94,
                "last_activity": "2025-08-12T10:30:00Z",
                "current_task": "Updating homepage content",
                "queue_length": 3,
                "pages_count": pages_result
            }
            
        except Exception as e:
            return {
                "status": "error",
                "error": str(e)
            }

# Example usage
async def main():
    agent = WordPressContentAgent()
    
    # Test content generation
    content = await agent.generate_tax_content("Q4 Tax Planning for Small Businesses")
    print("Generated content:", content[:200] + "...")
    
    # Test page creation
    result = await agent.create_tax_page(
        "Q4 Tax Planning Guide", 
        "Q4 Tax Planning for Small Businesses"
    )
    print("Page creation result:", result)
    
    # Test status
    status = await agent.get_agent_status()
    print("Agent status:", status)

if __name__ == "__main__":
    asyncio.run(main())
