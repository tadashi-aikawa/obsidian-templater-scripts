///<%*
const NOTE_BODY = `
---
tags:
  - Obsidian
cover: "📗Obsidian逆引きレシピ/attachments/obsidian-recipe.jpg"
---

## 概要

## ソリューション


`.trim();

const T = tp.user.fryTempura();

const title = await T.showInputDialog("Enter title");
if (!title) {
  throw T.exit();
}

const filePath = `📗Obsidian逆引きレシピ/📗${title}.md`;
if (await T.fileExists(filePath)) {
  throw T.exit(`⚠️Error: ${filePath} is already existed.`);
}

const f = await T.createFile(filePath, NOTE_BODY);
T.setTextToSelection(`- [[${f.basename}]]`);
await T.openFile(f.path);
///%>
