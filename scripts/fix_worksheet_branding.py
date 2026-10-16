#!/usr/bin/env python3
"""
fix_worksheet_branding.py

Repairs all 1,424 stamped worksheets across algebra, alg2, geo, igcse, and ibsl:
1. Removes the corrupted black-square logo (28x28 unmasked RGB artifact) sitting in the center.
2. Strips any overlying stamps covering question titles and stems.
3. Replaces it with the official ClipSAT paperclip mark (212x240, high-res RGBA with /SMask transparency).
4. Positions the logo cleanly in the TOP-RIGHT corner of Page 1 (matching SAT/ACT/AP/Cambridge styling).
5. Ensures subsequent pages have NO header logo so question text is never covered.
6. Preserves the clean white bottom footer mask and ClipSAT copyright line.
"""

import os
import sys
import glob
import zlib
import re
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
DOWNLOADS_DIR = os.path.join(ROOT, "public", "downloads")
LOGO_PNG = os.path.join(ROOT, "clipsat-mark.png")

def load_logo_data():
    im = Image.open(LOGO_PNG).convert('RGBA')
    lw, lh = im.size
    white_bg = Image.new('RGBA', (lw, lh), (255, 255, 255, 255))
    rgb_im = Image.alpha_composite(white_bg, im).convert('RGB')
    alpha_im = im.split()[3]

    rgb_compressed = zlib.compress(rgb_im.tobytes(), 9)
    alpha_compressed = zlib.compress(alpha_im.tobytes(), 9)
    return lw, lh, rgb_compressed, alpha_compressed

def process_pdf(pdf_path, lw, lh, rgb_data, alpha_data):
    try:
        with open(pdf_path, 'rb') as f:
            raw = f.read()
    except Exception as e:
        return False, f"Failed to read: {e}"

    # Only process files that contain the flawed 28x28 logo stamp
    if not re.search(rb'/Height\s+28\b', raw):
        return None, "Not a 28x28 stamped PDF (skipped)"

    # Parse all objects
    pattern = re.compile(rb'(\d+)\s+(\d+)\s+obj\s*(.*?)\s*endobj', re.DOTALL)
    objects = {}
    max_id = 0
    for m in pattern.finditer(raw):
        oid = int(m.group(1))
        gen = int(m.group(2))
        body = m.group(3)
        objects[oid] = (gen, body)
        if oid > max_id:
            max_id = oid

    if not objects:
        return False, "Failed to parse PDF objects"

    # Identify the logo object (Height 28 and Width 28)
    logo_oid = None
    for oid, (gen, body) in objects.items():
        if b'/Subtype /Image' in body or b'/Subtype/Image' in body:
            if re.search(rb'/Height\s+28\b', body) and re.search(rb'/Width\s+28\b', body):
                logo_oid = oid
                break

    if not logo_oid:
        return None, "Could not find logo object ID"

    # New object ID for SMask
    smask_oid = max_id + 1

    # Update logo object definition and stream with /SMask
    logo_dict = f'<</Type/XObject/Subtype/Image/Width {lw}/Height {lh}/ColorSpace/DeviceRGB/BitsPerComponent 8/Filter/FlateDecode/Length {len(rgb_data)}/SMask {smask_oid} 0 R>>'.encode()
    objects[logo_oid] = (0, logo_dict + b'\nstream\n' + rgb_data + b'\nendstream')

    # Add SMask object
    smask_dict = f'<</Type/XObject/Subtype/Image/Width {lw}/Height {lh}/ColorSpace/DeviceGray/BitsPerComponent 8/Filter/FlateDecode/Length {len(alpha_data)}>>'.encode()
    objects[smask_oid] = (0, smask_dict + b'\nstream\n' + alpha_data + b'\nendstream')

    # Find all Page objects
    pages = []
    for oid, (gen, body) in objects.items():
        if re.search(rb'/Type\s*/Page\b', body):
            pages.append((oid, body))

    if not pages:
        return False, "No pages found"

    # Process each page
    for p_idx, (p_oid, p_body) in enumerate(pages):
        cm = re.search(rb'/Contents\s*\[(\d+)\s+0\s+R', p_body)
        if not cm:
            continue
        c_oid = int(cm.group(1))
        if c_oid not in objects:
            continue
        gen, c_body = objects[c_oid]

        sm = re.search(rb'stream[\r\n]+(.*?)[\r\n]+endstream', c_body, re.DOTALL)
        if not sm:
            continue

        try:
            c_stream = zlib.decompress(sm.group(1))
        except Exception:
            c_stream = sm.group(1)

        # Find where the bad stamp started
        stamp_m = re.search(rb'(?:q\s+0\s+0\s+[\d.]+\s+[\d.]+\s+re\s+W\s+n|/gRLs0)', c_stream)
        if stamp_m:
            orig_stream = c_stream[:stamp_m.start()].rstrip()
        else:
            orig_stream = c_stream

        # Determine page dimensions
        pw, ph = 612.0, 792.0
        mb_m = re.search(rb'/MediaBox\s*\[([\d.\s]+)\]', p_body)
        if mb_m:
            box = [float(x) for x in mb_m.group(1).split()]
            if len(box) >= 4:
                pw, ph = box[2], box[3]

        # Calculate top-right position
        logo_w = 26.0
        logo_h = 26.0 * lh / lw  # 29.43 pt
        logo_x = pw - 48.0 - logo_w
        logo_y = ph - 24.0 - logo_h

        # Find the resource name for the logo in this page's /XObject
        logo_name = b'Im3'
        xobj_m = re.search(rb'/(\w+)\s+' + str(logo_oid).encode() + rb'\s+0\s+R', p_body)
        if xobj_m:
            logo_name = xobj_m.group(1)
        else:
            # Check Resources object if separate
            res_m = re.search(rb'/Resources\s+(\d+)\s+0\s+R', p_body)
            if res_m and int(res_m.group(1)) in objects:
                r_oid = int(res_m.group(1))
                _, r_body = objects[r_oid]
                rx_m = re.search(rb'/(\w+)\s+' + str(logo_oid).encode() + rb'\s+0\s+R', r_body)
                if rx_m:
                    logo_name = rx_m.group(1)

        # Build clean append stream
        # 1. White footer mask covering any legacy external branding at the bottom
        append_cmds = b'\nq 1 1 1 rg 0 0 ' + f'{pw:.2f} 42.0 re f Q\n'.encode()
        # 2. On Page 1 only: official ClipSAT logo in the top-right corner
        if p_idx == 0:
            append_cmds += f'q {logo_w:.2f} 0 0 {logo_h:.2f} {logo_x:.2f} {logo_y:.2f} cm /{logo_name.decode()} Do Q\n'.encode()

        new_stream = orig_stream + append_cmds
        comp_stream = zlib.compress(new_stream, 9)
        new_c_dict = f'<</Length {len(comp_stream)}/Filter/FlateDecode>>'.encode()
        objects[c_oid] = (0, new_c_dict + b'\nstream\n' + comp_stream + b'\nendstream')

    # Reconstruct PDF
    out = bytearray(b'%PDF-1.4\n%\xe2\xe3\xcf\xd3\n')
    xref = {}
    for oid in sorted(objects.keys()):
        xref[oid] = len(out)
        gen, body = objects[oid]
        out.extend(f'{oid} {gen} obj\n'.encode() + body + b'\nendobj\n')

    xref_pos = len(out)
    total_objs = max(objects.keys()) + 1
    out.extend(f'xref\n0 {total_objs}\n0000000000 65535 f \n'.encode())
    for oid in range(1, total_objs):
        if oid in xref:
            out.extend(f'{xref[oid]:010d} 00000 n \n'.encode())
        else:
            out.extend(b'0000000000 00000 f \n')

    tm = re.search(rb'trailer\s*<<(.*?)>>\s*startxref', raw, re.DOTALL)
    trailer_dict = tm.group(1).decode('latin1') if tm else f'/Size {total_objs}'
    trailer_dict = re.sub(r'/Size\s+\d+', f'/Size {total_objs}', trailer_dict)
    out.extend(f'trailer\n<<{trailer_dict}>>\nstartxref\n{xref_pos}\n%%EOF\n'.encode())

    # Write atomically
    temp_path = pdf_path + '.tmp'
    try:
        with open(temp_path, 'wb') as f:
            f.write(out)
        os.replace(temp_path, pdf_path)
        return True, "Fixed successfully"
    except Exception as e:
        if os.path.exists(temp_path):
            os.remove(temp_path)
        return False, f"Failed to write file: {e}"

def main():
    tracks = ['algebra', 'alg2', 'geo', 'igcse', 'ibsl']
    if len(sys.argv) > 1:
        tracks = sys.argv[1:]

    lw, lh, rgb_data, alpha_data = load_logo_data()
    print(f"Loaded official logo {LOGO_PNG} ({lw}x{lh}) with transparency")

    total_fixed = 0
    total_skipped = 0
    total_errors = 0

    for track in tracks:
        track_dir = os.path.join(DOWNLOADS_DIR, track)
        if not os.path.exists(track_dir):
            print(f"Track dir not found: {track_dir}")
            continue

        pdfs = sorted(glob.glob(f"{track_dir}/**/*.pdf", recursive=True))
        print(f"\nProcessing track '{track}': {len(pdfs)} PDFs found...")
        fixed_track = 0

        for p in pdfs:
            ok, msg = process_pdf(p, lw, lh, rgb_data, alpha_data)
            if ok:
                total_fixed += 1
                fixed_track += 1
            elif ok is None:
                total_skipped += 1
            else:
                total_errors += 1
                print(f"  [ERROR] {p}: {msg}")

        print(f"  ✓ Fixed {fixed_track} PDFs in '{track}'")

    print("\n" + "="*50)
    print(f"SUMMARY: Fixed: {total_fixed} | Skipped: {total_skipped} | Errors: {total_errors}")
    print("="*50)

if __name__ == '__main__':
    main()
