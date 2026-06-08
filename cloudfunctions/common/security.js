const blockedWords = [
  "药物",
  "断片",
  "拼酒",
  "挑战",
  "未成年",
  "毒品",
  "迷药",
  "灌酒",
  "酗酒",
  "斗酒"
];

function scanText(text) {
  const content = (text || "").toLowerCase();
  const hit = blockedWords.find((word) => content.includes(word));
  return {
    passed: !hit,
    hit: hit || ""
  };
}

module.exports = {
  scanText,
  blockedWords
};
