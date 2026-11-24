from PIL import Image
import os

page_dir = "report/validation/page_images"
# Create a 4x8 grid contact sheet of all 32 pages
cols = 8
rows = 4

thumb_w = 200
thumb_h = int(200 * (11.69 / 8.27))

sheet_w = cols * thumb_w + (cols + 1) * 10
sheet_h = rows * thumb_h + (rows + 1) * 10

sheet = Image.new("RGB", (sheet_w, sheet_h), color=(235, 238, 242))

for i in range(32):
    page_num = i + 1
    img_path = os.path.join(page_dir, f"page_{page_num:02d}.png")
    if os.path.exists(img_path):
        img = Image.open(img_path)
        img.thumbnail((thumb_w, thumb_h))
        
        r = i // cols
        c = i % cols
        x = 10 + c * (thumb_w + 10)
        y = 10 + r * (thumb_h + 10)
        
        sheet.paste(img, (x, y))

contact_sheet_path = "report/validation/contact_sheet.png"
sheet.save(contact_sheet_path)
print(f"Contact sheet saved to: {contact_sheet_path} ({sheet_w}x{sheet_h})")
