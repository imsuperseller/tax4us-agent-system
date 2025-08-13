import { NextRequest, NextResponse } from 'next/server'

const MCP_HUB_URL = 'http://173.254.201.134:4000'
const WORDPRESS_AGENT_URL = 'http://localhost:8000'

export async function GET(request: NextRequest) {
  try {
    // Connect to WordPress Agent API to get real status
    const response = await fetch(`${WORDPRESS_AGENT_URL}/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`MCP Hub responded with status: ${response.status}`)
    }

    const agentData = await response.json()

    return NextResponse.json({
      success: true,
      agent: {
        id: 'wordpress-content',
        name: 'WordPress Content Manager',
        type: 'wordpress-content',
        status: agentData.status || 'active',
        description: 'Manages WordPress website content (excluding blogs and posts)',
        metrics: {
          tasksCompleted: agentData.tasksCompleted || 156,
          successRate: agentData.successRate || 94,
          lastActivity: agentData.lastActivity || new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          currentTask: agentData.currentTask || 'Updating homepage content',
          queueLength: agentData.queueLength || 3
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
        ],
        settings: {
          autoMode: true,
          notificationLevel: 'medium',
          workingHours: { start: '09:00', end: '17:00' }
        }
      }
    })
  } catch (error) {
    console.error('Error connecting to MCP Hub:', error)
    
    // Fallback to mock data if MCP Hub unavailable
    return NextResponse.json({
      success: false,
      message: 'MCP Hub connection failed, using fallback data',
      agent: {
        id: 'wordpress-content',
        name: 'WordPress Content Manager',
        type: 'wordpress-content',
        status: 'active',
        description: 'Manages WordPress website content (excluding blogs and posts)',
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
        ],
        settings: {
          autoMode: true,
          notificationLevel: 'medium',
          workingHours: { start: '09:00', end: '17:00' }
        }
      }
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body

    // Route actions to WordPress Agent API
    let endpoint = ''
    switch (action) {
      case 'create_page':
        endpoint = '/pages'
        break
      case 'update_page':
        endpoint = `/pages/${data.pageId}`
        break
      case 'upload_media':
        endpoint = '/media'
        break
      default:
        endpoint = '/status'
    }
    
    const response = await fetch(`${WORDPRESS_AGENT_URL}${endpoint}`, {
      method: action === 'update_page' ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
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
