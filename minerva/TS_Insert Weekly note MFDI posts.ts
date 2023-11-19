///<%*
import { CodeBlock } from "obsidian-tempura";
const T = tp.user.fryTempura();

const description = T.getProperties()?.description;
if (!description) {
  throw T.exit("プロパティにdescriptionが存在しません");
}

const [weekBegin, weekEnd] = Array.from<
  [string | undefined, string | undefined]
>(description.matchAll(/(\d{4}-\d{2}-\d{2})/g)).map((x) => x[0]);
if (!weekBegin) {
  throw T.exit("descriptionプロパティに開始日が存在しません");
}
if (!weekEnd) {
  throw T.exit("descriptionプロパティに終了日が存在しません");
}

const codeBlocks: { path: string; codeBlock: CodeBlock }[] = [];
for (const file of T.getDailyNotes(weekBegin, weekEnd)) {
  const cbs = await T.getCodeBlocksFrom(file.path);
  cbs.forEach((codeBlock) => {
    codeBlocks.push({
      path: file.path,
      codeBlock,
    });
  });
}

T.insert(
  codeBlocks
    .filter(({ codeBlock }) => codeBlock.language === "fw")
    .map(({ path, codeBlock }) => `\`\`\`${path}\n${codeBlock.content}\n\`\`\``)
    .filter((x) => x.includes("http"))
    .join("\n\n")
);

T.notify(`${weekBegin} ～ ${weekEnd} に作成されたノートを挿入しました`);
///%>
