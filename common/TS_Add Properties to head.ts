import { TFile } from "obsidian";

///<%*
const T = tp.user.fryTempura();
const { workspace, metadataCache } = T.use();
const className = "additional-date-properties";

/**
/  内部リンクのDOMを作成する
/  @param title (ex: 作成: 2023-10-09)
*/
function createInternalLinkElement(title: string): HTMLDivElement {
  return createDiv({
    text: title,
    cls: "additional-date-properties__date-button",
  });
}

/**
/  追加UIを追加する
*/
function addAdditionalUI(path: string) {
  const properties = T.getPropertiesFrom(path);
  if (!properties) {
    return;
  }

  const { created, updated } = properties;
  if (!(created && updated)) {
    return;
  }

  const additionalEl = createDiv({ cls: className });
  additionalEl.appendChild(createInternalLinkElement(`作成日: ${created}`));
  additionalEl.appendChild(createInternalLinkElement(`更新日: ${updated}`));

  // DOMをヘッダの手前に挿入する
  workspace
    .getActiveFileView()
    .containerEl.find(".view-header")
    .insertAdjacentElement("afterend", additionalEl);
}

/**
/  追加UIを削除する (存在しない場合は何もしない)
*/
function removeAdditionalUI() {
  workspace.getActiveFileView().containerEl.find(`.${className}`)?.remove();
}

// ファイルを開いた時に自動で実行する処理
workspace.on("file-open", (file: TFile | null) => {
  if (!file) {
    throw T.exit();
  }
  removeAdditionalUI();
  addAdditionalUI(file.path);
});

// Propertyが変更されたときに自動で実行する処理
metadataCache.on("changed", (file, _, cache) => {
  removeAdditionalUI();
  if (cache.frontmatter?.created && cache.frontmatter?.updated) {
    addAdditionalUI(file.path);
  }
});

// 初回だけはイベントが発生しないので明示的に実行
addAdditionalUI(T.getActiveFilePath());
///%>
