#!/usr/bin/env python3
import socket
import subprocess
import sys
import os
from pathlib import Path

def find_available_port(start_port=3000, max_attempts=100):
    """Find an available port starting from start_port"""
    for port in range(start_port, start_port + max_attempts):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(('localhost', port))
                return port
        except OSError:
            continue
    return None

def main():
    # Get the directory where this script is located
    script_dir = Path(__file__).parent
    public_dir = script_dir / "public"
    
    if not public_dir.exists():
        print(f"❌ Public directory not found: {public_dir}")
        sys.exit(1)
    
    # Find available port
    port = find_available_port(3000)
    if port is None:
        print("❌ No available ports found")
        sys.exit(1)
    
    print(f"🔍 Found available port: {port}")
    print(f"📁 Serving from: {public_dir}")
    print(f"🌐 Dashboard will be available at: http://localhost:{port}")
    print(f"📄 Direct link: http://localhost:{port}/index.html")
    print("\n🚀 Starting server...")
    print("=" * 50)
    
    # Change to public directory and start server
    os.chdir(public_dir)
    
    try:
        # Start the HTTP server
        subprocess.run([
            sys.executable, "-m", "http.server", str(port)
        ], check=True)
    except KeyboardInterrupt:
        print("\n\n✅ Server stopped by user")
    except Exception as e:
        print(f"\n❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
