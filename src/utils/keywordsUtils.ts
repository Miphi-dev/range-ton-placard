// replace all special characters by space, accentuated characters by their non-accentuated version and lowercase all letters
const normalizeString = (str: string) => {
  return str
    ?.normalize('NFD')
    ?.replace(/[\u0300-\u036f]/g, ' ')
    ?.replace(/[^a-zA-Z0-9 ]/g, ' ')
    ?.toLowerCase();
};

const createKeywords = (sentence: string) => {
  const normalized = normalizeString(sentence);
  const words = normalized.split(' ');

  return words.reduce((acc, word) => {
    const arrName: string[] = [];
    let curName = '';
    word.split('').forEach((letter) => {
      curName += letter;
      arrName.push(curName);
    });
    return [...acc, ...arrName];
  }, [] as string[]);
};

const jaccardSimilarity = (keywordsA: string[], keywordsB: string[]) => {
  const intersection = keywordsA.filter((item) => keywordsB.includes(item));
  const union = [...new Set([...keywordsA, ...keywordsB])];
  return intersection.length / union.length;
};

const getTenKeywords = (keywords: string[]) => {
  const end = keywords.length <= 10 ? keywords.length - 1 : 9;
  return keywords.slice(0, end);
};

export default { createKeywords, normalizeString, jaccardSimilarity, getTenKeywords };
