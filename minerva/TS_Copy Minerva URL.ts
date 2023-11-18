///<%*
const T = tp.user.fryTempura();
const path = T.getActiveFilePath();
if (!path) {
  throw new Error("現在のファイルがありません");
}

T.notify(`MinervaのURL情報を取得中...`);
const publishUrl = await T.createObsidianPublishUrl(path);
await T.copyToClipboard(publishUrl);
T.notify(`MinervaのURLをコピーしました

${publishUrl}`);
///%>
