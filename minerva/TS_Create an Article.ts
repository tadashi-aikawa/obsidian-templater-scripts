///<%*
const T = tp.user.fryTempura();
const title = await T.showInputDialog("Articleのタイトルを入力してください");
if (!title) {
  throw T.exit("タイトルは必須です");
}

const fp = `📘Articles/📘${title}.md`;
if (await T.fileExists(fp)) {
  throw T.exit(`⚠️Error: ${fp} is already existed.`);
}

const today = T.now("YYYY-MM-DD");

const f = await T.createFile(
  fp,
  `[[📒Articles]] > [[📒2023 Articles]]

![[${today}.jpg|cover-picture]]
`
);

await T.openFile(f.path);
T.addProperties({
  created: today,
  updated: today,
  description: "TODO",
  cover: `📘Articles/attachments/${today}.jpg`,
});
///%>
