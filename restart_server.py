import http.server
import socketserver
import os

PORT = 12001
os.chdir('/workspace/sanxuatkhaulaodong')

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('X-Frame-Options', 'ALLOWALL')
        super().end_headers()

with socketserver.TCPServer(('0.0.0.0', PORT), MyHTTPRequestHandler) as httpd:
    print(f'Server running at http://0.0.0.0:{PORT}/')
    httpd.serve_forever()