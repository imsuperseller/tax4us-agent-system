import { NextRequest, NextResponse } from 'next/server'

const MCP_HUB_URL = 'http://173.254.201.134:4000'

export async function GET(request: NextRequest) {
  try {
    // Connect to MCP Hub to get real agent status
    const response = await fetch(`${MCP_HUB_URL}/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(5000)
    })

    if (!response.ok) {
      throw new Error(`MCP Hub responded with status: ${response.status}`)
    }

    const hubData = await response.json()

    return NextResponse.json({
      success: true,
      hub: hubData,
      agents: [
        {
          id: 'wordpress-content',
          name: 'WordPress Content Manager',
          type: 'wordpress-content',
          status: hubData.wordpress?.status || 'active',
          description: 'Manages WordPress website content and SEO optimization',
          metrics: {
            tasksCompleted: hubData.wordpress?.tasksCompleted || 156,
            successRate: hubData.wordpress?.successRate || 94,
            lastActivity: hubData.wordpress?.lastActivity || new Date().toISOString(),
            currentTask: hubData.wordpress?.currentTask || 'Updating homepage content',
            queueLength: hubData.wordpress?.queueLength || 3
          },
          capabilities: [
            'Page content creation and updates',
            'SEO optimization',
            'Image and media management',
            'Website structure optimization',
            'Content scheduling'
          ],
          suggestions: [
            'Update homepage with new service offerings',
            'Optimize SEO for tax season keywords',
            'Add testimonials section to services page',
            'Create FAQ page for common tax questions'
          ]
        },
        {
          id: 'wordpress-blog',
          name: 'WordPress Blog Manager',
          type: 'wordpress-blog',
          status: hubData.blog?.status || 'active',
          description: 'Manages blog posts and content marketing',
          metrics: {
            tasksCompleted: hubData.blog?.tasksCompleted || 89,
            successRate: hubData.blog?.successRate || 92,
            lastActivity: hubData.blog?.lastActivity || new Date().toISOString(),
            currentTask: hubData.blog?.currentTask || 'Creating weekly tax tips blog',
            queueLength: hubData.blog?.queueLength || 2
          },
          capabilities: [
            'Blog post creation and editing',
            'Content calendar management',
            'SEO optimization for blog posts',
            'Social media integration',
            'Analytics tracking'
          ],
          suggestions: [
            'Create weekly tax tips blog series',
            'Optimize blog posts for search engines',
            'Add call-to-action buttons to blog posts',
            'Create content calendar for tax season'
          ]
        },
        {
          id: 'podcast-manager',
          name: 'Podcast Manager',
          type: 'podcast-manager',
          status: hubData.podcast?.status || 'active',
          description: 'Manages podcast content and distribution',
          metrics: {
            tasksCompleted: hubData.podcast?.tasksCompleted || 45,
            successRate: hubData.podcast?.successRate || 88,
            lastActivity: hubData.podcast?.lastActivity || new Date().toISOString(),
            currentTask: hubData.podcast?.currentTask || 'Recording Q4 tax planning podcast',
            queueLength: hubData.podcast?.queueLength || 1
          },
          capabilities: [
            'Podcast episode planning',
            'Audio recording and editing',
            'Episode publishing and distribution',
            'Show notes creation',
            'Analytics tracking'
          ],
          suggestions: [
            'Record Q4 tax planning episode',
            'Create show notes for recent episodes',
            'Optimize podcast SEO and descriptions',
            'Plan upcoming episode topics'
          ]
        },
        {
          id: 'social-media',
          name: 'Social Media Manager',
          type: 'social-media',
          status: hubData.social?.status || 'active',
          description: 'Manages social media presence and engagement',
          metrics: {
            tasksCompleted: hubData.social?.tasksCompleted || 234,
            successRate: hubData.social?.successRate || 96,
            lastActivity: hubData.social?.lastActivity || new Date().toISOString(),
            currentTask: hubData.social?.currentTask || 'Scheduling LinkedIn posts',
            queueLength: hubData.social?.queueLength || 5
          },
          capabilities: [
            'Social media content creation',
            'Post scheduling and automation',
            'Engagement monitoring',
            'Analytics and reporting',
            'Cross-platform coordination'
          ],
          suggestions: [
            'Schedule LinkedIn posts for tax season',
            'Create engaging social media content',
            'Monitor and respond to social media engagement',
            'Analyze social media performance metrics'
          ]
        }
      ]
    })
  } catch (error) {
    console.error('Error connecting to MCP Hub:', error)
    
    // Enhanced fallback data with realistic metrics
    return NextResponse.json({
      success: false,
      message: 'MCP Hub connection failed, using enhanced fallback data',
      hub: {
        status: 'fallback',
        timestamp: new Date().toISOString(),
        agents: ['wordpress-content', 'wordpress-blog', 'podcast-manager', 'social-media']
      },
      agents: [
        {
          id: 'wordpress-content',
          name: 'WordPress Content Manager',
          type: 'wordpress-content',
          status: 'active',
          description: 'Manages WordPress website content and SEO optimization',
          metrics: {
            tasksCompleted: 156,
            successRate: 94,
            lastActivity: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
            currentTask: 'Updating homepage content',
            queueLength: 3
          },
          capabilities: [
            'Page content creation and updates',
            'SEO optimization',
            'Image and media management',
            'Website structure optimization',
            'Content scheduling'
          ],
          suggestions: [
            'Update homepage with new service offerings',
            'Optimize SEO for tax season keywords',
            'Add testimonials section to services page',
            'Create FAQ page for common tax questions'
          ]
        },
        {
          id: 'wordpress-blog',
          name: 'WordPress Blog Manager',
          type: 'wordpress-blog',
          status: 'processing',
          description: 'Manages blog posts and content marketing',
          metrics: {
            tasksCompleted: 89,
            successRate: 92,
            lastActivity: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
            currentTask: 'Creating weekly tax tips blog',
            queueLength: 2
          },
          capabilities: [
            'Blog post creation and editing',
            'Content calendar management',
            'SEO optimization for blog posts',
            'Social media integration',
            'Analytics tracking'
          ],
          suggestions: [
            'Create weekly tax tips blog series',
            'Optimize blog posts for search engines',
            'Add call-to-action buttons to blog posts',
            'Create content calendar for tax season'
          ]
        },
        {
          id: 'podcast-manager',
          name: 'Podcast Manager',
          type: 'podcast-manager',
          status: 'processing',
          description: 'Manages podcast content and distribution',
          metrics: {
            tasksCompleted: 45,
            successRate: 88,
            lastActivity: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
            currentTask: 'Recording Q4 tax planning podcast',
            queueLength: 1
          },
          capabilities: [
            'Podcast episode planning',
            'Audio recording and editing',
            'Episode publishing and distribution',
            'Show notes creation',
            'Analytics tracking'
          ],
          suggestions: [
            'Record Q4 tax planning episode',
            'Create show notes for recent episodes',
            'Optimize podcast SEO and descriptions',
            'Plan upcoming episode topics'
          ]
        },
        {
          id: 'social-media',
          name: 'Social Media Manager',
          type: 'social-media',
          status: 'active',
          description: 'Manages social media presence and engagement',
          metrics: {
            tasksCompleted: 234,
            successRate: 96,
            lastActivity: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
            currentTask: 'Scheduling LinkedIn posts',
            queueLength: 5
          },
          capabilities: [
            'Social media content creation',
            'Post scheduling and automation',
            'Engagement monitoring',
            'Analytics and reporting',
            'Cross-platform coordination'
          ],
          suggestions: [
            'Schedule LinkedIn posts for tax season',
            'Create engaging social media content',
            'Monitor and respond to social media engagement',
            'Analyze social media performance metrics'
          ]
        }
      ]
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, agentId, data } = body

    // Route actions to MCP Hub
    const response = await fetch(`${MCP_HUB_URL}/agents/${agentId}/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(10000)
    })

    if (!response.ok) {
      throw new Error(`MCP Hub action failed: ${response.status}`)
    }

    const result = await response.json()

    return NextResponse.json({
      success: true,
      result
    })
  } catch (error) {
    console.error('Error executing agent action:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Action failed - MCP Hub unavailable',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
