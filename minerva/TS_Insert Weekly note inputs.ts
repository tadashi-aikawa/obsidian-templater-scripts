///<%*
import { TFile, Moment } from "obsidian-tempura";
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

const isCreated = (file: TFile, start: Moment, end: Moment) =>
  file.stat &&
  file.stat.ctime >= start.valueOf() &&
  file.stat.ctime <= end.endOf("day").valueOf();
const isPublicNote = (file: TFile) =>
  !file.path.startsWith("_") && file.extension === "md";

T.insert(
  T.getAllFiles()
    .filter(
      (x) =>
        isCreated(
          x,
          T.createMomentDate(weekBegin),
          T.createMomentDate(weekEnd)
        ) && isPublicNote(x)
    )
    .map((x) => `- [[${x.basename}]]`)
    .join("\n")
);

T.notify(`${weekBegin} ～ ${weekEnd} に作成されたノートを挿入しました`);
///%>
