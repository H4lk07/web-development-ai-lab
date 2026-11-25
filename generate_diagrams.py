import os
import fitz # PyMuPDF

DIAGRAMS_DIR = os.path.join("report", "diagrams")
os.makedirs(DIAGRAMS_DIR, exist_ok=True)

def create_workflow_svg_and_png(filename_base, rows, ai_steps):
    """
    rows: list of lists of strings, e.g.
    [
        ["Requirements", "AI-assisted planning", "HTML5 structure", "CSS3 responsive layout"],
        ["Decorative styling", "Cross-browser testing", "Final portfolio website"]
    ]
    ai_steps: set of strings that should have shaded light-grey background
    """
    width = 680
    row_count = len(rows)
    box_w = 140
    box_h = 48
    h_gap = 25
    v_gap = 32
    
    start_y = 20
    total_height = start_y + row_count * box_h + (row_count - 1) * v_gap + 26
    
    svg = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {total_height}" width="{width}" height="{total_height}" style="background-color: #ffffff; font-family: Calibri, -apple-system, BlinkMacSystemFont, Arial, sans-serif;">',
        '  <defs>',
        '    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">',
        '      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#000000" />',
        '    </marker>',
        '  </defs>'
    ]
    
    # Track positions of all boxes for inter-row connectors
    row_box_coords = []
    
    for r_idx, row in enumerate(rows):
        n = len(row)
        row_w = n * box_w + (n - 1) * h_gap
        start_x = (width - row_w) / 2
        y = start_y + r_idx * (box_h + v_gap)
        
        current_row_coords = []
        
        for c_idx, text in enumerate(row):
            x = start_x + c_idx * (box_w + h_gap)
            current_row_coords.append((x, y))
            
            is_ai = text in ai_steps
            is_last_overall = (r_idx == row_count - 1 and c_idx == n - 1)
            
            fill = "#E2E8F0" if is_ai else "#FFFFFF"
            stroke_width = "2" if is_last_overall else "1.2"
            
            # Split text intelligently into max 3 lines (14-16 chars per line)
            words = text.split(" ")
            lines = []
            cur = ""
            for w in words:
                if len(cur + " " + w) <= 15:
                    cur = (cur + " " + w).strip()
                else:
                    if cur:
                        lines.append(cur)
                    cur = w
            if cur:
                lines.append(cur)
                
            if len(lines) > 3:
                lines = [lines[0], lines[1], " ".join(lines[2:])]
                
            line_height = 13
            total_text_h = len(lines) * line_height
            text_start_y = y + (box_h - total_text_h) / 2 + 10
            
            svg.append(f'  <g>')
            svg.append(f'    <rect x="{x:.1f}" y="{y:.1f}" width="{box_w:.1f}" height="{box_h:.1f}" rx="5" ry="5" fill="{fill}" stroke="#000000" stroke-width="{stroke_width}"/>')
            
            for l_idx, line in enumerate(lines):
                font_weight = "bold" if is_last_overall else "normal"
                line_y = text_start_y + l_idx * line_height
                svg.append(f'    <text x="{x + box_w/2:.1f}" y="{line_y:.1f}" font-size="9.5" font-weight="{font_weight}" fill="#000000" text-anchor="middle">{line}</text>')
            svg.append(f'  </g>')
            
            # Draw horizontal arrow to next box in the same row
            if c_idx < n - 1:
                x1 = x + box_w
                x2 = x + box_w + h_gap - 1
                arrow_y = y + box_h / 2
                svg.append(f'  <line x1="{x1:.1f}" y1="{arrow_y:.1f}" x2="{x2:.1f}" y2="{arrow_y:.1f}" stroke="#000000" stroke-width="1.2" marker-end="url(#arrow)"/>')
                
        row_box_coords.append(current_row_coords)
        
    # Draw clean orthogonal connector from Row R to Row R+1
    for r_idx in range(row_count - 1):
        prev_row = row_box_coords[r_idx]
        next_row = row_box_coords[r_idx + 1]
        
        # Last box of previous row
        last_x, last_y = prev_row[-1]
        cx_from = last_x + box_w / 2
        by_from = last_y + box_h
        
        # First box of next row
        first_x, first_y = next_row[0]
        cx_to = first_x + box_w / 2
        ty_to = first_y
        
        # Middle corridor Y
        mid_y = by_from + (ty_to - by_from) / 2
        
        # Clean unbroken orthogonal path from last box down and across into first box of next row
        path_d = f"M {cx_from:.1f} {by_from:.1f} L {cx_from:.1f} {mid_y:.1f} L {cx_to:.1f} {mid_y:.1f} L {cx_to:.1f} {ty_to:.1f}"
        svg.append(f'  <path d="{path_d}" stroke="#000000" stroke-width="1.2" fill="none" marker-end="url(#arrow)"/>')
        
    # Bottom caption
    caption_y = total_height - 10
    svg.append(f'  <text x="{width/2:.1f}" y="{caption_y:.1f}" font-size="8.5" font-style="italic" fill="#334155" text-anchor="middle">Shaded boxes indicate AI-assisted generation / optimization stages.</text>')
    svg.append('</svg>')
    
    svg_str = "\n".join(svg)
    svg_path = os.path.join(DIAGRAMS_DIR, f"{filename_base}.svg")
    png_path = os.path.join(DIAGRAMS_DIR, f"{filename_base}.png")
    
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_str)
        
    # Render SVG to high-resolution 300 DPI PNG via PyMuPDF
    doc = fitz.open(svg_path)
    pix = doc[0].get_pixmap(dpi=300)
    pix.save(png_path)
    doc.close()
    
    print(f"Generated clean workflow: {filename_base}.svg and {filename_base}.png ({pix.width}x{pix.height})")

# Clean, punchy, well-formatted workflow definitions
diagrams_data = [
    {
        "file": "exp01-workflow",
        "rows": [
            ["Requirements", "AI-assisted planning", "HTML5 structure", "CSS3 responsive layout"],
            ["Decorative styling", "Cross-browser testing", "Final portfolio website"]
        ],
        "ai": {"AI-assisted planning"}
    },
    {
        "file": "exp02-workflow",
        "rows": [
            ["Business requirements", "AI-assisted UI design", "Bootstrap 5 grid setup", "Section components"],
            ["Custom CSS polish", "Breakpoint testing", "Final landing page"]
        ],
        "ai": {"AI-assisted UI design"}
    },
    {
        "file": "exp03-workflow",
        "rows": [
            ["Interaction specs", "AI-generated JS scripts", "HTML semantic hooks", "DOM event wiring"],
            ["CSS themes & UI", "Performance testing", "Final interactive page"]
        ],
        "ai": {"AI-generated JS scripts"}
    },
    {
        "file": "exp04-workflow",
        "rows": [
            ["Content requirements", "AI architecture plan", "Shared layout & nav", "Page components"],
            ["Form validation module", "Responsive styling", "Accessibility audit", "Final multi-page site"]
        ],
        "ai": {"AI architecture plan"}
    },
    {
        "file": "exp05-workflow",
        "rows": [
            ["CRUD requirements", "AI code generation", "MongoDB database", "Mongoose schema"],
            ["Express REST routes", "React UI data client", "API & UI testing", "Working CRUD app"]
        ],
        "ai": {"AI code generation"}
    },
    {
        "file": "exp06-workflow",
        "rows": [
            ["Auth requirements", "AI-assisted planning", "User model & hash", "Register & bcrypt"],
            ["Login & JWT tokens", "Auth middleware guard", "Role-based access", "Working auth system"]
        ],
        "ai": {"AI-assisted planning"}
    },
    {
        "file": "exp07-workflow",
        "rows": [
            ["API requirements", "AI-assisted design", "Mongoose data models", "Express REST routers"],
            ["OpenAPI Swagger UI", "Postman collection", "Automated test suite", "Documented REST API"]
        ],
        "ai": {"AI-assisted design"}
    },
    {
        "file": "exp08-workflow",
        "rows": [
            ["System requirements", "AI initial build", "Bottleneck discovery", "AI query debugging"],
            ["Aggregation pipeline", "Compound indexing", "Final Student System"]
        ],
        "ai": {"AI initial build", "AI query debugging"}
    },
    {
        "file": "exp09-workflow",
        "rows": [
            ["Text studio specs", "AI architecture plan", "Provider abstraction", "System prompt design"],
            ["Validation & guards", "React generation UI", "Live API verification", "Working AI text app"]
        ],
        "ai": {"AI architecture plan"}
    },
    {
        "file": "exp10-workflow",
        "rows": [
            ["Helpdesk requirements", "AI-assisted planning", "System persona prompt", "Session memory store"],
            ["Multi-turn context", "Chatbot interface", "Admissions testing", "Working AI chatbot"]
        ],
        "ai": {"AI-assisted planning"}
    },
    {
        "file": "exp11-workflow",
        "rows": [
            ["Content requirements", "AI-assisted design", "Multi-format options", "Validation layer"],
            ["Prompt synthesis", "Editor preview UI", "Export & copy module", "Working content app"]
        ],
        "ai": {"AI-assisted design"}
    },
    {
        "file": "exp12-workflow",
        "rows": [
            ["Image studio specs", "AI-assisted planning", "Pollinations image API", "Style & seed control"],
            ["Vision captioning", "Gallery & download UI", "Regression testing", "Working image AI app"]
        ],
        "ai": {"AI-assisted planning"}
    },
    {
        "file": "exp13-workflow",
        "rows": [
            ["Deployment plan", "Git & conventional commits", "GitHub repository", "Vercel edge hosting"],
            ["Render REST gateway", "MongoDB Atlas cloud", "Release tag v1.0.0", "Deployed production app"]
        ],
        "ai": {"Deployment plan"}
    },
    {
        "file": "exp14-workflow",
        "rows": [
            ["Quality requirements", "AI-assisted test plan", "Unit test suites", "API integration tests"],
            ["Lighthouse profiling", "OWASP security audit", "Hardened secure app"]
        ],
        "ai": {"AI-assisted test plan"}
    },
    {
        "file": "exp15-workflow",
        "rows": [
            ["Capstone scope", "Unified architecture", "Shared navigation shell", "JWT auth & roles"],
            ["Express REST services", "AI studio suite", "Multi-cloud deploy", "Final live capstone"]
        ],
        "ai": {"AI studio suite"}
    }
]

for d in diagrams_data:
    create_workflow_svg_and_png(d["file"], d["rows"], d["ai"])

print("[Success] All 15 workflow diagrams generated cleanly in SVG and 300 DPI PNG!")
