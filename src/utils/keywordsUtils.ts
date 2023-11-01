// replace all special characters by space, accentuated characters by their non-accentuated version and lowercase all letters
const normalizeString = (str: string) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .toLowerCase();
};

const createKeywords = (word: string) => {
  const normalized = normalizeString(word);

  const arrName: string[] = [];
  let curName = '';
  normalized.split('').forEach(letter => {
    curName += letter;
    arrName.push(curName);
  });
  return arrName;
};

export default { createKeywords, normalizeString };
