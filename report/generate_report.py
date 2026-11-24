import os
import json
import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn
import win32com.client

# XML Helpers for Borders, Background Shading, Cell Padding, and Page Numbering
def set_cell_shading(cell, color_hex):
    shading_elm = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{color_hex}"/>')
    cell._tc.get_or_add_tcPr().append(shading_elm)

def set_cell_margins(cell, top=60, bottom=60, left=100, right=100):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('w:top', top), ('w:bottom', bottom), ('w:left', left), ('w:right', right)]:
        node = OxmlElement(m)
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_table_borders(table, color="000000", sz="4", val="single"):
    tblPr = table._tbl.tblPr
    borders = parse_xml(
        f'<w:tblBorders {nsdecls("w")}>'
        f'  <w:top w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:bottom w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:insideH w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:insideV w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:left w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:right w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'</w:tblBorders>'
    )
    tblPr.append(borders)

def add_page_number_to_footer(footer_p):
    footer_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = footer_p.add_run()
    run.font.name = 'Calibri'
    run.font.size = Pt(10)
    run.font.color.rgb = RGBColor(0, 0, 0)
    
    fldChar1 = parse_xml(r'<w:fldChar %s w:fldCharType="begin"/>' % nsdecls('w'))
    instrText = parse_xml(r'<w:instrText %s xml:space="preserve"> PAGE </w:instrText>' % nsdecls('w'))
    fldChar2 = parse_xml(r'<w:fldChar %s w:fldCharType="separate"/>' % nsdecls('w'))
    fldChar3 = parse_xml(r'<w:fldChar %s w:fldCharType="end"/>' % nsdecls('w'))
    run._r.append(fldChar1)
    run._r.append(instrText)
    run._r.append(fldChar2)
    run._r.append(fldChar3)

def generate_report():
    print("[Report] Starting academic lab record document generation...")
    
    with open("report/student-details.json", "r", encoding="utf-8") as f:
        student = json.load(f)
    with open("report/experiments.json", "r", encoding="utf-8") as f:
        experiments = json.load(f)
        
    doc = Document()
    
    # Page Setup: A4 Portrait, Margins matching reference (0.85 in left/right, 0.9 in top, 0.7 in bottom)
    section1 = doc.sections[0]
    section1.page_width = Inches(8.27)
    section1.page_height = Inches(11.69)
    section1.left_margin = Inches(0.85)
    section1.right_margin = Inches(0.85)
    section1.top_margin = Inches(0.9)
    section1.bottom_margin = Inches(0.7)
    section1.header.is_linked_to_previous = False
    section1.footer.is_linked_to_previous = False

    # Default Style: Calibri
    style = doc.styles['Normal']
    font = style.font
    font.name = 'Calibri'
    font.size = Pt(10)
    font.color.rgb = RGBColor(0, 0, 0)

    # =========================================================================
    # PAGE 1: COVER PAGE
    # =========================================================================
    p_logo = doc.add_paragraph()
    p_logo.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_logo.paragraph_format.space_before = Pt(40)
    p_logo.paragraph_format.space_after = Pt(40)
    logo_path = student.get("collegeLogo", "report/reference/jecrc_logo.png")
    if os.path.exists(logo_path):
        p_logo.add_run().add_picture(logo_path, width=Inches(3.3))
    
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_before = Pt(30)
    p_title.paragraph_format.space_after = Pt(20)
    run_title = p_title.add_run("WEB DEVELOPMENT USING AI")
    run_title.font.name = 'Calibri'
    run_title.font.size = Pt(22)
    run_title.font.bold = True
    run_title.font.underline = True

    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sub.paragraph_format.space_before = Pt(10)
    p_sub.paragraph_format.space_after = Pt(120)
    run_sub = p_sub.add_run("LAB RECORD 2026-27")
    run_sub.font.name = 'Calibri'
    run_sub.font.size = Pt(14)
    run_sub.font.bold = True

    # Submitted To & Submitted By Table
    meta_table = doc.add_table(rows=1, cols=2)
    meta_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    meta_table.autofit = False
    
    col_w = Inches(3.2)
    cell_to = meta_table.cell(0, 0)
    cell_by = meta_table.cell(0, 1)
    cell_to.width = col_w
    cell_by.width = col_w

    # Submitted To
    p_to = cell_to.paragraphs[0]
    p_to.paragraph_format.line_spacing = 1.15
    run_to_hdr = p_to.add_run("Submitted To:\n")
    run_to_hdr.font.bold = True
    run_to_hdr.font.size = Pt(11)
    run_to_body = p_to.add_run(f"{student.get('submittedTo', 'Mr. Mohit Parashar')}\n")
    run_to_body.font.size = Pt(11)

    # Submitted By
    p_by = cell_by.paragraphs[0]
    p_by.paragraph_format.line_spacing = 1.15
    run_by_hdr = p_by.add_run("Submitted By:\n")
    run_by_hdr.font.bold = True
    run_by_hdr.font.size = Pt(11)
    run_by_body = p_by.add_run(
        f"Name: {student.get('studentName', 'Mayank Goyal')}\n"
        f"Roll No: {student.get('rollNumber', '23BCON1662')}\n"
        f"Section: {student.get('section', 'P')}\n"
        f"Semester: {student.get('semester', '7th')}\n"
    )
    run_by_body.font.size = Pt(11)

    # =========================================================================
    # SECTION BREAK -> SECTION 2 (Index & Experiments)
    # =========================================================================
    section2 = doc.add_section(docx.enum.section.WD_SECTION.NEW_PAGE)
    section2.page_width = Inches(8.27)
    section2.page_height = Inches(11.69)
    section2.left_margin = Inches(0.85)
    section2.right_margin = Inches(0.85)
    section2.top_margin = Inches(0.9)
    section2.bottom_margin = Inches(0.7)
    section2.header.is_linked_to_previous = False
    section2.footer.is_linked_to_previous = False

    # Start page numbers at 1 in section 2
    sectPr = section2._sectPr
    pgNumType = parse_xml(r'<w:pgNumType %s w:start="1"/>' % nsdecls('w'))
    sectPr.append(pgNumType)

    # Add page number to Section 2 footer
    footer2 = section2.footer
    p_footer = footer2.paragraphs[0]
    add_page_number_to_footer(p_footer)

    # =========================================================================
    # PAGE 2: INDEX PAGE (Printed Page 1)
    # =========================================================================
    p_idx = doc.add_paragraph()
    p_idx.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_idx.paragraph_format.space_before = Pt(0)
    p_idx.paragraph_format.space_after = Pt(12)
    run_idx = p_idx.add_run("Index")
    run_idx.font.size = Pt(14)
    run_idx.font.bold = True

    index_table = doc.add_table(rows=16, cols=3)
    index_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(index_table, color="000000", sz="4")

    col_widths = [Inches(0.6), Inches(5.1), Inches(0.8)]

    # Header Row
    hdr_titles = ["Exp.", "Title", "Page"]
    for c_i, title in enumerate(hdr_titles):
        cell = index_table.cell(0, c_i)
        cell.width = col_widths[c_i]
        set_cell_shading(cell, "D9D9D9")
        set_cell_margins(cell, top=80, bottom=80, left=100, right=100)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER if c_i != 1 else WD_ALIGN_PARAGRAPH.LEFT
        run = p.add_run(title)
        run.font.bold = True
        run.font.size = Pt(10)

    # 15 Experiment Rows
    # In reference: Exp 1 is page 2, Exp 2 is page 4, ..., Exp 15 is page 30
    for i, exp in enumerate(experiments, start=1):
        row_cells = index_table.rows[i].cells
        for c_i in range(3):
            row_cells[c_i].width = col_widths[c_i]
            set_cell_margins(row_cells[c_i], top=50, bottom=50, left=100, right=100)

        # Exp number
        p0 = row_cells[0].paragraphs[0]
        p0.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r0 = p0.add_run(str(exp["id"]))
        r0.font.size = Pt(9.5)

        # Title/Aim
        p1 = row_cells[1].paragraphs[0]
        p1.paragraph_format.line_spacing = 1.05
        p1.paragraph_format.space_after = Pt(0)
        r1 = p1.add_run(exp["aim"])
        r1.font.size = Pt(9.5)

        # Page Number
        p2 = row_cells[2].paragraphs[0]
        p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
        page_num = 2 + (i - 1) * 2
        r2 = p2.add_run(str(page_num))
        r2.font.size = Pt(9.5)

    doc.add_page_break()

    # =========================================================================
    # EXPERIMENTS 1 TO 15 (Physical Pages 3 to 32, Printed Pages 2 to 31)
    # =========================================================================
    for exp_idx, exp in enumerate(experiments):
        eid = exp["id"]
        print(f"[Report] Formatting Experiment {eid}: {exp['title']}...")

        # ---------------------------------------------------------------------
        # FIRST PAGE OF EXPERIMENT
        # ---------------------------------------------------------------------
        p_exp_title = doc.add_paragraph()
        p_exp_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_exp_title.paragraph_format.space_before = Pt(0)
        p_exp_title.paragraph_format.space_after = Pt(10)
        run_et = p_exp_title.add_run(f"Experiment {eid} : {exp['title']}")
        run_et.font.size = Pt(14)
        run_et.font.bold = True
        run_et.font.underline = True

        # N.1 Aim
        p_aim_hdr = doc.add_paragraph()
        p_aim_hdr.paragraph_format.space_before = Pt(4)
        p_aim_hdr.paragraph_format.space_after = Pt(1)
        r_ah = p_aim_hdr.add_run(f"{eid}.1 Aim")
        r_ah.font.size = Pt(11)
        r_ah.font.bold = True

        p_aim = doc.add_paragraph()
        p_aim.paragraph_format.space_after = Pt(8)
        p_aim.paragraph_format.line_spacing = 1.15
        r_a = p_aim.add_run(exp["aim"])
        r_a.font.size = Pt(10)

        # N.2 Tools Used
        p_tools_hdr = doc.add_paragraph()
        p_tools_hdr.paragraph_format.space_before = Pt(4)
        p_tools_hdr.paragraph_format.space_after = Pt(1)
        r_th = p_tools_hdr.add_run(f"{eid}.2 Tools Used")
        r_th.font.size = Pt(11)
        r_th.font.bold = True

        p_tools = doc.add_paragraph()
        p_tools.paragraph_format.space_after = Pt(8)
        p_tools.paragraph_format.line_spacing = 1.15
        r_tech = p_tools.add_run(f"Technology: {exp['tech']}\n")
        r_tech.font.size = Pt(10)
        r_ai = p_tools.add_run(f"AI tool: {exp.get('aiTool', 'Antigravity')}")
        r_ai.font.size = Pt(10)

        # N.3 Architecture / Workflow
        p_wf_hdr = doc.add_paragraph()
        p_wf_hdr.paragraph_format.space_before = Pt(4)
        p_wf_hdr.paragraph_format.space_after = Pt(3)
        r_wfh = p_wf_hdr.add_run(f"{eid}.3 Architecture / Workflow")
        r_wfh.font.size = Pt(11)
        r_wfh.font.bold = True

        # Diagram Image
        png_diagram = f"report/diagrams/exp{eid:02d}-workflow.png"
        if os.path.exists(png_diagram):
            p_diag = doc.add_paragraph()
            p_diag.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p_diag.paragraph_format.space_before = Pt(0)
            p_diag.paragraph_format.space_after = Pt(10)
            # Scaled height to fit cleanly
            p_diag.add_run().add_picture(png_diagram, width=Inches(6.2))

        # N.4 Procedure
        p_proc_hdr = doc.add_paragraph()
        p_proc_hdr.paragraph_format.space_before = Pt(6)
        p_proc_hdr.paragraph_format.space_after = Pt(2)
        r_ph = p_proc_hdr.add_run(f"{eid}.4 Procedure")
        r_ph.font.size = Pt(11)
        r_ph.font.bold = True

        proc_steps = exp.get("procedure", [])
        proc_table = doc.add_table(rows=len(proc_steps) + 1, cols=2)
        proc_table.alignment = WD_TABLE_ALIGNMENT.CENTER
        set_table_borders(proc_table, color="000000", sz="4")

        col_w_proc = [Inches(1.8), Inches(4.7)]
        # Header
        h0 = proc_table.cell(0, 0)
        h1 = proc_table.cell(0, 1)
        h0.width = col_w_proc[0]
        h1.width = col_w_proc[1]
        set_cell_shading(h0, "D9D9D9")
        set_cell_shading(h1, "D9D9D9")
        set_cell_margins(h0, top=50, bottom=50, left=80, right=80)
        set_cell_margins(h1, top=50, bottom=50, left=80, right=80)
        rh0 = h0.paragraphs[0].add_run("Stage")
        rh0.font.bold = True
        rh0.font.size = Pt(9.5)
        rh1 = h1.paragraphs[0].add_run("What was done")
        rh1.font.bold = True
        rh1.font.size = Pt(9.5)

        for s_idx, step in enumerate(proc_steps, start=1):
            c0 = proc_table.cell(s_idx, 0)
            c1 = proc_table.cell(s_idx, 1)
            c0.width = col_w_proc[0]
            c1.width = col_w_proc[1]
            set_cell_margins(c0, top=40, bottom=40, left=80, right=80)
            set_cell_margins(c1, top=40, bottom=40, left=80, right=80)
            
            p_s0 = c0.paragraphs[0]
            p_s0.paragraph_format.line_spacing = 1.05
            p_s0.paragraph_format.space_after = Pt(0)
            r_s0 = p_s0.add_run(step["stage"])
            r_s0.font.size = Pt(9)
            
            p_s1 = c1.paragraphs[0]
            p_s1.paragraph_format.line_spacing = 1.05
            p_s1.paragraph_format.space_after = Pt(0)
            r_s1 = p_s1.add_run(step["action"])
            r_s1.font.size = Pt(9)

        doc.add_page_break()

        # ---------------------------------------------------------------------
        # SECOND PAGE OF EXPERIMENT
        # ---------------------------------------------------------------------
        # N.5 AI Prompt Used
        p_prompt_hdr = doc.add_paragraph()
        p_prompt_hdr.paragraph_format.space_before = Pt(0)
        p_prompt_hdr.paragraph_format.space_after = Pt(2)
        r_prh = p_prompt_hdr.add_run(f"{eid}.5 AI Prompt Used")
        r_prh.font.size = Pt(11)
        r_prh.font.bold = True

        # AI Prompt Table Box (Consolas, light grey background, single cell)
        prompt_table = doc.add_table(rows=1, cols=1)
        prompt_table.alignment = WD_TABLE_ALIGNMENT.CENTER
        p_cell = prompt_table.cell(0, 0)
        p_cell.width = Inches(6.5)
        set_cell_shading(p_cell, "F2F4F7")
        set_cell_margins(p_cell, top=70, bottom=70, left=90, right=90)
        set_table_borders(prompt_table, color="000000", sz="4")

        p_box = p_cell.paragraphs[0]
        p_box.paragraph_format.space_after = Pt(0)
        p_box.paragraph_format.line_spacing = 1.05
        
        # Faithful concise excerpt to guarantee fitting on page
        prompt_lines = exp["prompt"].strip().split("\n")
        # Keep within ~25 lines to prevent overflowing
        trimmed_prompt = "\n".join(prompt_lines[:24])
        r_pbox = p_box.add_run(trimmed_prompt)
        r_pbox.font.name = 'Consolas'
        r_pbox.font.size = Pt(8.5)
        r_pbox.font.color.rgb = RGBColor(15, 23, 42)

        # N.6 Output
        p_out_hdr = doc.add_paragraph()
        p_out_hdr.paragraph_format.space_before = Pt(6)
        p_out_hdr.paragraph_format.space_after = Pt(3)
        if eid == 15:
            r_oh = p_out_hdr.add_run(f"15.6 Output - https://lab-webdev-ai.vercel.app/")
        else:
            r_oh = p_out_hdr.add_run(f"{eid}.6 Output")
        r_oh.font.size = Pt(11)
        r_oh.font.bold = True

        # Screenshots
        screenshots = exp.get("screenshots", [])
        if len(screenshots) == 1:
            p_img = doc.add_paragraph()
            p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p_img.paragraph_format.space_before = Pt(0)
            p_img.paragraph_format.space_after = Pt(4)
            if os.path.exists(screenshots[0]):
                p_img.add_run().add_picture(screenshots[0], width=Inches(6.0))
        elif len(screenshots) >= 2:
            # Stacked two screenshots (Exp 13, Exp 15)
            for sc in screenshots[:2]:
                if os.path.exists(sc):
                    p_img = doc.add_paragraph()
                    p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
                    p_img.paragraph_format.space_before = Pt(0)
                    p_img.paragraph_format.space_after = Pt(3)
                    p_img.add_run().add_picture(sc, width=Inches(5.8), height=Inches(1.75))

        # N.7 Conclusion
        p_concl_hdr = doc.add_paragraph()
        p_concl_hdr.paragraph_format.space_before = Pt(4)
        p_concl_hdr.paragraph_format.space_after = Pt(1)
        r_ch = p_concl_hdr.add_run(f"{eid}.7 Conclusion")
        r_ch.font.size = Pt(11)
        r_ch.font.bold = True

        p_concl = doc.add_paragraph()
        p_concl.paragraph_format.space_after = Pt(0)
        p_concl.paragraph_format.line_spacing = 1.15
        r_c = p_concl.add_run(exp["conclusion"])
        r_c.font.size = Pt(10)

        # Page break except after last page
        if exp_idx < len(experiments) - 1:
            doc.add_page_break()

    # Save final DOCX
    docx_path = os.path.abspath("report/final/WEB_DEVELOPMENT_AI_LAB_RECORD.docx")
    pdf_path = os.path.abspath("report/final/WEB_DEVELOPMENT_AI_LAB_RECORD.pdf")
    os.makedirs(os.path.dirname(docx_path), exist_ok=True)
    
    doc.save(docx_path)
    print(f"[Report] Successfully created DOCX at: {docx_path}")

    # Convert DOCX to PDF using native Word COM
    print("[Report] Exporting to PDF via Microsoft Word COM...")
    try:
        word = win32com.client.DispatchEx("Word.Application")
        word.Visible = False
        word.DisplayAlerts = False
        
        doc_obj = word.Documents.Open(docx_path)
        # 17 = wdFormatPDF
        doc_obj.SaveAs(pdf_path, FileFormat=17)
        doc_obj.Close()
        word.Quit()
        print(f"[Report] Successfully exported PDF at: {pdf_path}")
    except Exception as e:
        print(f"[Report Error] Failed to export PDF with Word COM: {e}")

if __name__ == "__main__":
    generate_report()
