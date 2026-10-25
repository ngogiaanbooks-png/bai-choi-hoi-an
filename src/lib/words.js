// Bản thiết kế viết số video bằng chữ ("M4 · BẢY VIDEO"); giữ cách viết đó cho tiếng Việt.
const VI = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười'];

export const numberWord = (n, lang) => (lang === 'en' ? String(n) : VI[n] ?? String(n));

export const videoCountWord = (n, lang) =>
  lang === 'en' ? `${n} video${n === 1 ? '' : 's'}` : `${numberWord(n, lang)} video`;
