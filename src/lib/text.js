// Bỏ dấu tiếng Việt để so khớp và tạo đường dẫn: "Bài Chòi" -> "bai choi".
export const fold = (s) =>
  String(s ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();

export const slugify = (s) => fold(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// "V15 – V19, V23" hoặc "V25 đến V29" -> ['V15','V16',...,'V19','V23']
export function expandCodes(text) {
  const out = [];
  for (const part of String(text).split(',')) {
    const m = part.match(/([A-Z]+)(\d+)\s*(?:–|-|đến|to)\s*[A-Z]*(\d+)/);
    if (m) {
      const [, p, a, b] = m;
      for (let i = +a; i <= +b; i++) out.push(p + String(i).padStart(a.length, '0'));
    } else {
      const c = part.trim();
      if (c) out.push(c);
    }
  }
  return out;
}

// Gom một dãy mã liên tiếp lại cho gọn: V14..V20 -> "V14 – V20"
export function compactCodes(codes) {
  const parts = [];
  let run = [];
  const num = (c) => +c.replace(/\D/g, '');
  const flush = () => {
    if (run.length > 2) parts.push(`${run[0]} – ${run[run.length - 1]}`);
    else parts.push(...run);
    run = [];
  };
  for (const c of codes) {
    if (run.length && num(c) !== num(run[run.length - 1]) + 1) flush();
    run.push(c);
  }
  flush();
  return parts;
}

export const minutesLabel = (n, lang) => (lang === 'en' ? `${n} min` : `${n} phút`);
