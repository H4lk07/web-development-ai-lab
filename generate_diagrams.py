import os

DIAGRAMS_DIR = os.path.join("report", "diagrams")
os.makedirs(DIAGRAMS_DIR, exist_ok=True)

# Helper function to generate clean SVG workflow diagram
def create_workflow_svg(filename, rows, ai_steps, title=""):
    """
    rows: list of lists of strings, e.g.
    [
        ["Requirements", "AI-assisted planning", "HTML5 semantic structure", "CSS3 layout + responsive design"],
        ["Decorative layer", "Testing", "Final portfolio website"]
    ]
    ai_steps: set of strings that should have shaded light-grey background
    """
    width = 680
    row_count = len(rows)
    height = 50 + row_count * 80 + 30
    
    svg = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="100%" height="100%" style="background-color: #ffffff; font-family: Calibri, -apple-system, BlinkMacSystemFont, Arial, sans-serif;">',
        '  <defs>',
        '    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">',
        '      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#000000" />',
        '    </marker>',
        '  </defs>'
    ]
    
    box_height = 46
    
    for r_idx, row in enumerate(rows):
        n = len(row)
        total_spacing = 30 * (n - 1)
        avail_w = width - 40 - total_spacing
        box_w = max(110, min(145, avail_w / n))
        
        # Calculate start X to center row
        row_w = n * box_w + (n - 1) * 30
        start_x = (width - row_w) / 2
        y = 35 + r_idx * 85
        
        for c_idx, text in enumerate(row):
            x = start_x + c_idx * (box_w + 30)
            is_ai = text in ai_steps
            is_last = (r_idx == row_count - 1 and c_idx == n - 1)
            
            fill = "#D9D9D9" if is_ai else "#FFFFFF"
            stroke_width = "2" if is_last else "1.2"
            
            # Split text into lines
            words = text.split(" ")
            lines = []
            cur = ""
            for w in words:
                if len(cur + " " + w) <= 16:
                    cur = (cur + " " + w).strip()
                else:
                    if cur: lines.append(cur)
                    cur = w
            if cur: lines.append(cur)
            if len(lines) > 3:
                # compress into 3
                lines = [lines[0], lines[1], " ".join(lines[2:])]
                
            svg.append(f'  <g>')
            svg.append(f'    <rect x="{x:.1f}" y="{y:.1f}" width="{box_w:.1f}" height="{box_height}" rx="3" ry="3" fill="{fill}" stroke="#000000" stroke-width="{stroke_width}"/>')
            
            line_height = 12
            total_text_h = len(lines) * line_height
            text_start_y = y + (box_height - total_text_h) / 2 + 9
            
            for l_idx, line in enumerate(lines):
                font_weight = "bold" if is_last else "normal"
                svg.append(f'    <text x="{x + box_w/2:.1f}" y="{text_start_y + l_idx * line_height:.1f}" font-size="10" font-weight="{font_weight}" fill="#000000" text-anchor="middle">{line}</text>')
            svg.append(f'  </g>')
            
            # Draw arrow to next in row
            if c_idx < n - 1:
                x1 = x + box_w
                x2 = x + box_w + 24
                arrow_y = y + box_height / 2
                svg.append(f'  <line x1="{x1:.1f}" y1="{arrow_y:.1f}" x2="{x2:.1f}" y2="{arrow_y:.1f}" stroke="#000000" stroke-width="1.2" marker-end="url(#arrow)"/>')
        
        # Turnaround arrow from row r_idx to r_idx+1
        if r_idx < row_count - 1:
            prev_last_x = start_x + (n - 1) * (box_w + 30) + box_w / 2
            prev_y = y + box_height
            next_row = rows[r_idx + 1]
            next_n = len(next_row)
            next_row_w = next_n * box_w + (next_n - 1) * 30
            next_start_x = (width - next_row_w) / 2
            
            # Simple turnaround: arrow down-left to start of next row
            arrow_start_x = start_x + 30
            arrow_start_y = y + box_height
            arrow_end_y = arrow_start_y + 35
            svg.append(f'  <line x1="{arrow_start_x:.1f}" y1="{arrow_start_y:.1f}" x2="{arrow_start_x:.1f}" y2="{arrow_end_y:.1f}" stroke="#000000" stroke-width="1.2" marker-end="url(#arrow)"/>')
    
    # Bottom caption
    caption_y = height - 12
    svg.append(f'  <text x="{width/2:.1f}" y="{caption_y:.1f}" font-size="9" font-style="italic" fill="#000000" text-anchor="middle">Shaded boxes are the steps where AI was used.</text>')
    svg.append('</svg>')
    
    with open(os.path.join(DIAGRAMS_DIR, filename), "w", encoding="utf-8") as f:
        f.write("\n".join(svg))
    print(f"Generated diagram: {filename}")

# Generate all 15 diagrams
diagrams_data = [
    {
        "file": "exp01-workflow.svg",
        "rows": [
            ["Requirements", "AI-assisted planning", "HTML5 semantic structure", "CSS3 layout + responsive design"],
            ["Decorative layer", "Testing", "Final portfolio website"]
        ],
        "ai": {"AI-assisted planning"}
    },
    {
        "file": "exp02-workflow.svg",
        "rows": [
            ["Business requirements", "AI-assisted UI design", "Bootstrap 5 setup", "Page sections built with Bootstrap grid + components"],
            ["Custom CSS layer for hero, stats strip and card polish", "Testing", "Final responsive landing page"]
        ],
        "ai": {"AI-assisted UI design"}
    },
    {
        "file": "exp03-workflow.svg",
        "rows": [
            ["Interaction requirements", "AI-generated vanilla JS scripts", "HTML skeleton with data-* hooks", "DOM wiring: querySelector -> addEventListener -> mutate"],
            ["CSS theme", "Testing", "Final interactive page"]
        ],
        "ai": {"AI-generated vanilla JS scripts"}
    },
    {
        "file": "exp04-workflow.svg",
        "rows": [
            ["Content and page requirements", "AI-assisted development plan", "Shared layout: sticky navigation + footer", "Page components"],
            ["Form components + shared validation module", "Responsive styling and accessibility pass", "Testing", "Final multi-page website"]
        ],
        "ai": {"AI-assisted development plan"}
    },
    {
        "file": "exp05-workflow.svg",
        "rows": [
            ["CRUD requirements", "AI-assisted code generation", "MongoDB connection", "Mongoose model: Task"],
            ["Express routes: list / read / create / update / delete", "React UI consuming the API", "Testing with the UI and HTTP requests", "Working CRUD application"]
        ],
        "ai": {"AI-assisted code generation"}
    },
    {
        "file": "exp06-workflow.svg",
        "rows": [
            ["Auth requirements", "AI-assisted code generation", "User model with hashed password", "Register route -> bcrypt hash -> store user"],
            ["Login route -> bcrypt compare -> sign JWT", "Auth middleware -> verify token -> attach req.auth", "Role middleware -> allow or deny by role", "React login/register UI + protected panel"],
            ["Testing", "Working auth system"]
        ],
        "ai": {"AI-assisted code generation"}
    },
    {
        "file": "exp07-workflow.svg",
        "rows": [
            ["API requirements", "AI-assisted API + documentation generation", "Mongoose Product model + seed data", "Express router with REST semantics"],
            ["OpenAPI 3.0 spec -> Swagger UI", "Postman collection + environment", "Testing every endpoint and error case", "Documented, testable REST API"]
        ],
        "ai": {"AI-assisted API + documentation generation"}
    },
    {
        "file": "exp08-workflow.svg",
        "rows": [
            ["Requirements", "AI-assisted first implementation", "Testing and failure discovery", "AI-assisted debugging"],
            ["AI-assisted optimization", "Re-testing and measurement", "Final Student Management System"]
        ],
        "ai": {"AI-assisted first implementation", "AI-assisted debugging", "AI-assisted optimization"}
    },
    {
        "file": "exp09-workflow.svg",
        "rows": [
            ["Text-generation requirements", "AI-assisted implementation", "Server-side provider abstraction", "Mode-specific system prompts"],
            ["Validation and error handling", "React generation studio", "Testing with real keys and with demo mode", "Working AI text application"]
        ],
        "ai": {"AI-assisted implementation"}
    },
    {
        "file": "exp10-workflow.svg",
        "rows": [
            ["Chatbot requirements", "AI-assisted implementation", "System prompt design", "Session memory"],
            ["Provider call with conversation history", "Chat UI with suggestions and reset", "Testing", "Working helpdesk chatbot"]
        ],
        "ai": {"AI-assisted implementation"}
    },
    {
        "file": "exp11-workflow.svg",
        "rows": [
            ["Content requirements", "AI-assisted implementation", "Client form"],
            ["Validation of every option", "Type-specific format instructions + shared provider call", "Editor-style result panel"],
            ["Copy / download and history", "Testing every type x tone combination", "Working content generator"]
        ],
        "ai": {"AI-assisted implementation"}
    },
    {
        "file": "exp12-workflow.svg",
        "rows": [
            ["Image-app requirements", "AI-assisted implementation", "Provider selection"],
            ["Style + aspect + seed -> final prompt", "Image generation endpoint -> image URL", "Gemini vision caption endpoint for uploads"],
            ["Gallery with download and reuse actions", "Testing", "Working image AI application"]
        ],
        "ai": {"AI-assisted implementation"}
    },
    {
        "file": "exp13-workflow.svg",
        "rows": [
            ["Requirements", "Git initialisation + .gitignore + branch strategy", "Commit history", "GitHub remote + protected main branch"],
            ["Vercel project import -> front-end build -> preview URL", "Render web services for the Express APIs", "MongoDB Atlas cluster + connection string", "Environment variables configured per platform"],
            ["Production deploy -> smoke test -> custom domain", "Version tag + release notes + rollback drill"]
        ],
        "ai": {"Git initialisation + .gitignore + branch strategy", "Version tag + release notes + rollback drill"}
    },
    {
        "file": "exp14-workflow.svg",
        "rows": [
            ["Quality requirements", "AI-assisted test plan", "Test implementation"],
            ["Run tests -> collect failures", "AI-assisted debugging", "Performance profiling"],
            ["Security analysis", "Re-test, re-measure, document before/after", "Verified, hardened application"]
        ],
        "ai": {"AI-assisted test plan", "AI-assisted debugging"}
    },
    {
        "file": "exp15-workflow.svg",
        "rows": [
            ["Capstone scope", "Information architecture", "Reuse front-end shell", "Authentication + roles"],
            ["REST API layer with validation and docs", "Generative AI features", "Integration, shared state and error handling", "Testing, optimisation and security pass"],
            ["Cloud deployment: Vercel + Render + Atlas", "Final live application + demo script"]
        ],
        "ai": {"Generative AI features", "Final live application + demo script"}
    }
]

for d in diagrams_data:
    create_workflow_svg(d["file"], d["rows"], d["ai"])

print("All 15 workflow diagrams generated in report/diagrams!")
