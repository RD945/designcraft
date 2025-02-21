from flask import Flask, Response, request, render_template_string, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

def query_ollama_stream(prompt):
    enhanced_prompt = f"""
User Input: {prompt}

dont mention this in your thinking process. dont use chinese.Think like an AI project maker agent helping a subpar english (dont mention they are a subpar english student) speaking only student with their project. Start by defining a clear and relevant title that conveys the core idea. Identify the problem your project aims to solve and explain it concisely. Describe how your solution addresses the issue, including the technology or methodology used. Define the target users or customers and explain how they will interact with the product. Assess the desirability, feasibility, and viability of the solution by evaluating its usefulness, practicality, and sustainability. Highlight any innovation or creativity that differentiates your project from existing solutions. Identify competitors offering similar solutions and analyze their strengths and weaknesses. Consider potential failure points such as technical limitations, market demand, or financial constraints. Identify possible challenges and propose practical solutions to overcome them.

Please address the following points in detail: (100 plus Words each point)
1. Title of the product
2. What problem it solves (100 plus Words each point)
3. How it solves the problem mentioned above (100 plus Words each point)
4. Who will be the user/actor/prospective customer of your product (100 plus Words each point)
5. How the user will use your product (100 plus Words each point)
6. Is the product desirable ( 100 plus Words each point)
7. Is the product feasible ( 100 plus Words each point)
8. Is the product viable ( 100 plus Words each point)
9. What innovation/creativity you propose in your product ( 100 plus Words each point)
10. Who are your competitors ( 100 plus Words each point) ( 100 plus Words each point)
11. What could be possible causes of failure of your product ( 100 plus Words each point)
12. Possible challenges and solutions ( 100 plus Words each point)

Please analyze thoroughly and provide detailed responses for each point. ( 100 plus Words each point and dont mention they are a subpar english student)"""

    url = "http://localhost:11434/api/generate"
    headers = {"Content-Type": "application/json"}
    data = {
        "model": "deepseek-r1:1.5b",
        "prompt": enhanced_prompt,
        "stream": True
    }
    
    try:
        response = requests.post(url, headers=headers, json=data, stream=True)
        response.raise_for_status()
        
        for line in response.iter_lines(decode_unicode=True):
            if line:
                try:
                    json_data = json.loads(line)
                    chunk = json_data.get('response', '')
                    if chunk:
                        yield f"data: {chunk}\n\n"
                except json.JSONDecodeError:
                    continue
                
    except requests.exceptions.ConnectionError:
        yield f"data: Error: Cannot connect to Ollama server. Please make sure it's running at {url}\n\n"
    except Exception as e:
        yield f"data: Error: {str(e)}\n\n"

@app.route('/')
def index():
    html_content = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Project Idea Generator</title>
        <style>
            body {
                font-family: 'Segoe UI', Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background: #f0f2f5;
            }
            .container {
                max-width: 800px;
                margin: 0 auto;
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            h1 {
                text-align: center;
                color: #1a73e8;
                margin-bottom: 30px;
            }
            #project-form {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-bottom: 20px;
            }
            input, textarea, button {
                width: 100%;
                padding: 12px;
                border: 2px solid #e0e0e0;
                border-radius: 6px;
                font-size: 16px;
            }
            input:focus, textarea:focus {
                outline: none;
                border-color: #1a73e8;
            }
            button {
                background: #1a73e8;
                color: white;
                border: none;
                cursor: pointer;
                transition: background 0.3s;
            }
            button:disabled {
                background: #ccc;
                cursor: not-allowed;
            }
            button:hover:not(:disabled) {
                background: #1557b0;
            }
            #output-container {
                margin-top: 20px;
                padding: 20px;
                border: 1px solid #e0e0e0;
                border-radius: 6px;
                min-height: 200px;
                background: #f8f9fa;
                overflow-y: auto;
                max-height: 500px;
            }
            #thinking-process {
                white-space: pre-wrap;
                word-wrap: break-word;
                line-height: 1.6;
                color: #333;
            }
            .loading {
                text-align: center;
                color: #666;
                font-style: italic;
            }
            .error {
                color: #dc3545;
                padding: 10px;
                border-radius: 4px;
                background-color: #f8d7da;
                border: 1px solid #f5c6cb;
                margin-top: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>💡 Project Idea Generator</h1>
            <form id="project-form">
                <label for="idea">What's your project idea?</label>
                <input type="text" id="idea" placeholder="e.g., Build a weather app" required>
                
                <label for="details">Tell us more about your project:</label>
                <textarea id="details" rows="4" placeholder="e.g., I want it to show real-time weather updates..."></textarea>
                
                <button type="submit" id="submit-btn">Generate Ideas</button>
            </form>
            <div id="output-container">
                <div id="thinking-process"></div>
            </div>
        </div>
        
        <script>
            const form = document.getElementById('project-form');
            const ideaInput = document.getElementById('idea');
            const detailsInput = document.getElementById('details');
            const submitBtn = document.getElementById('submit-btn');
            const output = document.getElementById('thinking-process');
            let currentEventSource = null;
            
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const idea = ideaInput.value.trim();
                const details = detailsInput.value.trim();
                
                if (!idea) return;
                
                submitBtn.disabled = true;
                ideaInput.disabled = true;
                detailsInput.disabled = true;
                
                output.innerHTML = '<div class="loading">Thinking...</div>';
                
                if (currentEventSource) {
                    currentEventSource.close();
                }
                
                try {
                    const query = `Project Idea: ${idea}. Details: ${details}`;
                    currentEventSource = new EventSource(`/process_query?query=${encodeURIComponent(query)}`);
                    let fullResponse = '';
                    
                    currentEventSource.onmessage = function(event) {
                        if (output.querySelector('.loading')) {
                            output.innerHTML = '';
                        }
                        
                        fullResponse += event.data;
                        output.innerHTML = fullResponse;
                        output.scrollTop = output.scrollHeight;
                    };
                    
                    currentEventSource.onerror = function(error) {
                        console.error('EventSource error:', error);
                        currentEventSource.close();
                        
                        if (!output.innerHTML || output.innerHTML.includes('Thinking...')) {
                            output.innerHTML = '<div class="error">Error: Failed to get response from the server. Please try again.</div>';
                        }
                        
                        submitBtn.disabled = false;
                        ideaInput.disabled = false;
                        detailsInput.disabled = false;
                    };
                    
                    currentEventSource.addEventListener('done', function() {
                        submitBtn.disabled = false;
                        ideaInput.disabled = false;
                        detailsInput.disabled = false;
                        currentEventSource.close();
                    });
                    
                } catch (error) {
                    console.error('Error:', error);
                    output.innerHTML = `<div class="error">Error: ${error.message}</div>`;
                    submitBtn.disabled = false;
                    ideaInput.disabled = false;
                    detailsInput.disabled = false;
                }
            });
            
            window.onbeforeunload = function() {
                if (currentEventSource) {
                    currentEventSource.close();
                }
            };
        </script>
    </body>
    </html>
    """
    return render_template_string(html_content)

@app.route('/process_query', methods=['GET'])
def process_query():
    query = request.args.get('query', '')
    if not query:
        return jsonify({'error': 'No query provided'}), 400
    return Response(
        query_ollama_stream(query),
        mimetype='text/event-stream',
        headers={
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*'
        }
    )

if __name__ == '__main__':
    app.run(debug=True)