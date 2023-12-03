///<%*
const sortBy = (key: string) => {
  return (a: object, b: object) =>
    a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0;
};

const NOTE_BODY = `
## ステータス

#🤔Proposed 

## 経緯

%%提案に至った理由が分かるように書く%%

## 提案内容

%%選択肢がある場合は複数書く%%

## 承諾した場合の結果

%%選択肢がある場合は複数書く%%

### メリット

- aa
- bb

### デメリット

- aa
- bb
`.trim();

const T = tp.user.fryTempura();

const adrGroupFiles = T.getAllMarkdownFiles().filter((x) =>
  x.path.match(/^💿ADR\/💿[^-]+$/)
);
const target = await T.showSelectionDialog(
  adrGroupFiles.map((x) => x.name),
  adrGroupFiles
);
if (!target) {
  throw T.exit();
}

const maxNumber = Number(
  T.getAllMarkdownFiles()
    .filter((x) => x.name.startsWith(`${target.basename}-`))
    .sort(sortBy("name"))
    .pop()
    ?.name.split(" ")[0]
    .replace(`${target.basename}-`, "") ?? -1
);
const newNumber = `000${maxNumber + 1}`.slice(-4);

const inputTitle = await T.showInputDialog(`[${newNumber}] Enter title`);
const title = `${target.basename}-${newNumber} ${inputTitle}`;
const filePath = `💿ADR/${title}.md`;
if (await T.fileExists(filePath)) {
  throw T.exit(`⚠️Error: ${filePath} is already existed.`);
}

const f = await T.createFile(filePath, NOTE_BODY);

T.appendLine(`| [[${title}]]       | #🤔Proposed |`);

await T.openFile(f.path);
///%>
