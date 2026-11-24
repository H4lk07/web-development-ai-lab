import os
import zipfile

zip_path = "report/final/WEB_DEV_AI_LAB_RECORD_SUBMISSION.zip"
print(f"Creating submission ZIP at: {zip_path}")

with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
    # 1. Main Reports
    for f in ["WEB_DEVELOPMENT_AI_LAB_RECORD.docx", "WEB_DEVELOPMENT_AI_LAB_RECORD.pdf"]:
        p = os.path.join("report", "final", f)
        if os.path.exists(p):
            zf.write(p, arcname=f"Report/{f}")
            print(f"Added {f}")
            
    # 2. Student & Experiment Details
    zf.write("report/student-details.json", arcname="Report/student-details.json")
    zf.write("report/experiments.json", arcname="Report/experiments.json")
    zf.write("README.md", arcname="README.md")
    zf.write("docs/VIVA_PREPARATION.md", arcname="Documentation/VIVA_PREPARATION.md")
    zf.write("report/validation/REPORT_QA.md", arcname="Documentation/REPORT_QA.md")
    zf.write("report/validation/APPLICATION_QA.md", arcname="Documentation/APPLICATION_QA.md")
    zf.write("report/validation/contact_sheet.png", arcname="Documentation/contact_sheet.png")

    # 3. Screenshots
    sc_dir = "report/screenshots"
    for img in sorted(os.listdir(sc_dir)):
        if img.endswith(".png"):
            zf.write(os.path.join(sc_dir, img), arcname=f"Screenshots/{img}")

    # 4. Diagrams
    diag_dir = "report/diagrams"
    for d in sorted(os.listdir(diag_dir)):
        if d.endswith(".svg") or d.endswith(".png"):
            zf.write(os.path.join(diag_dir, d), arcname=f"Diagrams/{d}")

    # 5. Prompts
    prompt_dir = "report/prompts"
    for pr in sorted(os.listdir(prompt_dir)):
        if pr.endswith(".md"):
            zf.write(os.path.join(prompt_dir, pr), arcname=f"Prompts/{pr}")

print("Submission ZIP successfully created!")
print(f"Archive size: {os.path.getsize(zip_path) / 1024 / 1024:.2f} MB")
