import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PptxGenJS from 'pptxgenjs';

// ============================================================================
// Capture each slide as a high-resolution PNG (4:3 aspect)
// Returns array of { dataUrl, width, height } in document order.
// ============================================================================
async function captureSlides({ scale = 2, onProgress } = {}) {
  const nodes = Array.from(document.querySelectorAll('.rep-slide'));
  if (!nodes.length) throw new Error('No slides found to export');

  // Hide non-print elements temporarily
  const hidden = Array.from(document.querySelectorAll('.no-print'));
  const prevDisplay = hidden.map((el) => el.style.display);
  hidden.forEach((el) => { el.style.display = 'none'; });

  // Force-render at fixed slide width so screen size doesn't affect output
  const SLIDE_W = 1280;

  const captures = [];
  try {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      onProgress?.(i + 1, nodes.length);

      const canvas = await html2canvas(node, {
        scale,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false,
        windowWidth: SLIDE_W,
        width: SLIDE_W,
        height: Math.round(SLIDE_W * 3 / 4),
      });
      const dataUrl = canvas.toDataURL('image/png');
      captures.push({ dataUrl, width: canvas.width, height: canvas.height });
    }
  } finally {
    hidden.forEach((el, idx) => { el.style.display = prevDisplay[idx]; });
  }
  return captures;
}

// ============================================================================
// Export as PDF — one slide per page, landscape 4:3.
// ============================================================================
export async function exportSlidesToPdf({ filename = 'KIA-Dealer-Network-Financial-Performance.pdf', onProgress } = {}) {
  const captures = await captureSlides({ scale: 2, onProgress });

  // Slide page size: use a 4:3 ratio in points. Standard PPT 4:3 is 10" × 7.5" = 720 × 540 pt.
  const PAGE_W = 720;
  const PAGE_H = 540;

  const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: [PAGE_W, PAGE_H] });

  captures.forEach((cap, i) => {
    if (i > 0) pdf.addPage([PAGE_W, PAGE_H], 'landscape');
    pdf.addImage(cap.dataUrl, 'PNG', 0, 0, PAGE_W, PAGE_H, undefined, 'FAST');
  });

  pdf.save(filename);
}

// ============================================================================
// Export as PPTX — one slide per page, each slide is a full-bleed image.
// Native .pptx file editable in PowerPoint / Keynote / Google Slides.
// ============================================================================
export async function exportSlidesToPptx({ filename = 'KIA-Dealer-Network-Financial-Performance.pptx', onProgress } = {}) {
  const captures = await captureSlides({ scale: 2, onProgress });

  const pres = new PptxGenJS();
  pres.layout = 'LAYOUT_4x3';   // 10" × 7.5"
  pres.title = 'Dealer Network · Financial Performance';
  pres.author = 'KMX · Dealer Development Team';

  captures.forEach((cap) => {
    const slide = pres.addSlide();
    slide.background = { color: 'FFFFFF' };
    slide.addImage({
      data: cap.dataUrl,
      x: 0, y: 0,
      w: 10, h: 7.5,
    });
  });

  await pres.writeFile({ fileName: filename });
}
