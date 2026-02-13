#!/usr/bin/env python3
"""
Simple proxy server that adds CORS headers to Ollama requests
This allows the browser to talk to Ollama without CORS issues
"""
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import urllib.request
import urllib.error

OLLAMA_URL = 'http://localhost:11434'
PORT = 5105

class OllamaProxyHandler(BaseHTTPRequestHandler):
    def _send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        if self.path == '/health':
            self.send_response(200)
            self._send_cors_headers()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            response = json.dumps({'status': 'ok', 'service': 'Ollama Proxy'})
            self.wfile.write(response.encode())
            return

        # Forward to Ollama
        self._proxy_request()

    def do_POST(self):
        self._proxy_request()

    def _proxy_request(self):
        try:
            # Build Ollama URL - forward the path as-is
            ollama_endpoint = f"{OLLAMA_URL}{self.path}"

            print(f"[Proxy] {self.command} {ollama_endpoint}")

            # Read request body for POST
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length) if content_length > 0 else None

            # Make request to Ollama
            req = urllib.request.Request(
                ollama_endpoint,
                data=body,
                headers={'Content-Type': 'application/json'}
            )

            with urllib.request.urlopen(req, timeout=60) as response:
                data = response.read()

                self.send_response(200)
                self._send_cors_headers()
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(data)

        except urllib.error.URLError as e:
            print(f"[Proxy] Error: {e}")
            self.send_response(500)
            self._send_cors_headers()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            error = json.dumps({'error': str(e)})
            self.wfile.write(error.encode())

    def log_message(self, format, *args):
        # Custom log format
        pass

def run_proxy(port=5105):
    server_address = ('', port)
    httpd = HTTPServer(server_address, OllamaProxyHandler)
    print(f'✅ Ollama Proxy running on http://localhost:{port}')
    print(f'✅ Forwarding requests to: {OLLAMA_URL}')
    print(f'✅ CORS enabled for browser access')
    print('---')
    httpd.serve_forever()

if __name__ == '__main__':
    run_proxy()
