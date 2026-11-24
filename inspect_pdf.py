import fitz # PyMuPDF
import os

pdf_path = "report/reference/WEB_DEV_LAB_RECORD_FINAL.pdf"
doc = fitz.open(pdf_path)

print(f"Total pages: {len(doc)}")

# Inspect Page 1
page1 = doc[0]
rect1 = page1.rect
print(f"Page 1 rect: width={rect1.width} pt ({rect1.width/72:.2f} in), height={rect1.height} pt ({rect1.height/72:.2f} in)")

# Extract images on page 1 (cover page logo)
images = page1.get_images(full=True)
print(f"Page 1 image count: {len(images)}")
for i, img in enumerate(images):
    xref = img[0]
    base_image = doc.extract_image(xref)
    image_bytes = base_image["image"]
    image_ext = base_image["ext"]
    logo_path = f"report/reference/jecrc_logo.{image_ext}"
    with open(logo_path, "wb") as f:
        f.write(image_bytes)
    print(f"Extracted image {i}: {logo_path}, dimensions: {base_image['width']}x{base_image['height']}")

# Inspect text and layout of page 1, 2, 3
for page_num in range(min(5, len(doc))):
    p = doc[page_num]
    print(f"\n--- PAGE {page_num + 1} ---")
    blocks = p.get_text("blocks")
    for b in blocks:
        # (x0, y0, x1, y1, text, block_no, block_type)
        if b[4].strip():
            first_line = b[4].strip().split("\n")[0]
            print(f"  Block ({b[0]:.1f}, {b[1]:.1f}, {b[2]:.1f}, {b[3]:.1f}): '{first_line[:60]}'")

doc.close()
