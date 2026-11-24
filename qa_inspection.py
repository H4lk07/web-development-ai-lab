import fitz # PyMuPDF
import os

pdf_path = "report/final/WEB_DEVELOPMENT_AI_LAB_RECORD.pdf"
doc = fitz.open(pdf_path)

page_count = len(doc)
print(f"=== PDF AUDIT ===")
print(f"Total Pages: {page_count} (Target: 32)")

out_dir = "report/validation/page_images"
os.makedirs(out_dir, exist_ok=True)

for i in range(page_count):
    page = doc[i]
    pix = page.get_pixmap(dpi=150)
    img_path = os.path.join(out_dir, f"page_{i+1:02d}.png")
    pix.save(img_path)
    
    # Extract first line and footer
    text = page.get_text("text").strip()
    lines = [line.strip() for line in text.split("\n") if line.strip()]
    first_line = lines[0] if lines else "[EMPTY]"
    last_line = lines[-1] if lines else "[EMPTY]"
    
    print(f"Page {i+1:02d}: First='{first_line[:40]}' | Last='{last_line[:30]}'")

doc.close()
