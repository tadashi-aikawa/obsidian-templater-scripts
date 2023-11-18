///<%*
const T = tp.user.fryTempura();

T.notify(`MinervaのURL情報を取得中...`);
const path = T.getActiveFilePath();
const publishUrl = await T.createObsidianPublishUrl(path);
await T.copyToClipboard(publishUrl);
T.notify(`MinervaのURLをコピーしました

${publishUrl}`);
///%>
