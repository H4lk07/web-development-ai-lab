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
    for doc in [
        ("report/student-details.json", "Report/student-details.json"),
        ("report/experiments.json", "Report/experiments.json"),
        ("README.md", "README.md"),
        ("report/validation/REPORT_QA.md", "Documentation/REPORT_QA.md"),
        ("report/validation/APPLICATION_QA.md", "Documentation/APPLICATION_QA.md"),
        ("report/validation/contact_sheet.png", "Documentation/contact_sheet.png"),
    ]:
        if os.path.exists(doc[0]):
            zf.write(doc[0], arcname=doc[1])

    # 3. Screenshots
    sc_dir = "report/screenshots"
    if os.path.exists(sc_dir):
        for img in sorted(os.listdir(sc_dir)):
            if img.endswith(".png"):
                zf.write(os.path.join(sc_dir, img), arcname=f"Screenshots/{img}")

    # 4. Diagrams
    diag_dir = "report/diagrams"
    if os.path.exists(diag_dir):
        for d in sorted(os.listdir(diag_dir)):
            if d.endswith(".svg") or d.endswith(".png"):
                zf.write(os.path.join(diag_dir, d), arcname=f"Diagrams/{d}")

    # 5. Prompts
    prompt_dir = "report/prompts"
    if os.path.exists(prompt_dir):
        for pr in sorted(os.listdir(prompt_dir)):
            if pr.endswith(".md"):
                zf.write(os.path.join(prompt_dir, pr), arcname=f"Prompts/{pr}")

print("Submission ZIP successfully created!")
print(f"Archive size: {os.path.getsize(zip_path) / 1024 / 1024:.2f} MB")
