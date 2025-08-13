from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi_mcp import FastApiMCP
import requests
import os
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="WordPress Content Agent API")
security = HTTPBasic()

def wp_auth(credentials: HTTPBasicCredentials = Depends(security)):
    if credentials.username != os.getenv("WP_USERNAME") or credentials.password != os.getenv("WP_PASSWORD"):
        raise HTTPException(status_code=401, detail="Unauthorized")
    return credentials

# WordPress API base URL
WP_API_BASE = "https://www.tax4us.co.il/wp-json/wp/v2"

@app.post("/pages")
def create_page(data: Dict[str, Any], creds=Depends(wp_auth)):
    """Create a new WordPress page"""
    try:
        response = requests.post(
            f"{WP_API_BASE}/pages",
            auth=(creds.username, creds.password),
            json=data,
            headers={'Content-Type': 'application/json'}
        )
        response.raise_for_status()
        return {
            "success": True,
            "page": response.json(),
            "message": "Page created successfully"
        }
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"WordPress API error: {str(e)}")

@app.put("/pages/{page_id}")
def update_page(page_id: int, data: Dict[str, Any], creds=Depends(wp_auth)):
    """Update an existing WordPress page"""
    try:
        response = requests.put(
            f"{WP_API_BASE}/pages/{page_id}",
            auth=(creds.username, creds.password),
            json=data,
            headers={'Content-Type': 'application/json'}
        )
        response.raise_for_status()
        return {
            "success": True,
            "page": response.json(),
            "message": "Page updated successfully"
        }
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"WordPress API error: {str(e)}")

@app.post("/media")
def upload_media(file: UploadFile = File(...), creds=Depends(wp_auth)):
    """Upload media to WordPress"""
    try:
        files = {'file': (file.filename, file.file, file.content_type)}
        response = requests.post(
            f"{WP_API_BASE}/media",
            auth=(creds.username, creds.password),
            files=files
        )
        response.raise_for_status()
        return {
            "success": True,
            "media": response.json(),
            "message": "Media uploaded successfully"
        }
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"WordPress API error: {str(e)}")

@app.get("/pages")
def get_pages(creds=Depends(wp_auth)):
    """Get all WordPress pages"""
    try:
        response = requests.get(
            f"{WP_API_BASE}/pages",
            auth=(creds.username, creds.password)
        )
        response.raise_for_status()
        return {
            "success": True,
            "pages": response.json()
        }
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"WordPress API error: {str(e)}")

@app.get("/status")
def get_status():
    """Get WordPress site status"""
    try:
        response = requests.get(f"{WP_API_BASE}/")
        response.raise_for_status()
        return {
            "success": True,
            "status": "WordPress site is accessible",
            "api_version": response.headers.get('X-WP-Version', 'Unknown')
        }
    except requests.exceptions.RequestException as e:
        return {
            "success": False,
            "status": "WordPress site is not accessible",
            "error": str(e)
        }

# MCP Integration
mcp = FastApiMCP(app)
mcp.mount()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
