#!/usr/bin/env python3
"""
Simple HTTP server for the job portal website
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

# Set the port
PORT = 12000

# Change to the project directory
project_dir = Path(__file__).parent
os.chdir(project_dir)

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        # Allow iframe embedding
        self.send_header('X-Frame-Options', 'ALLOWALL')
        super().end_headers()

    def do_GET(self):
        # Serve index.html for root path
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()

if __name__ == "__main__":
    try:
        with socketserver.TCPServer(("0.0.0.0", PORT), CustomHTTPRequestHandler) as httpd:
            print(f"Server running at http://0.0.0.0:{PORT}/")
            print(f"Access the website at: https://work-1-ckzkiiromoghsbtn.prod-runtime.all-hands.dev")
            print("Press Ctrl+C to stop the server")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        sys.exit(0)
    except Exception as e:
        print(f"Error starting server: {e}")
        sys.exit(1)