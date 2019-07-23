const fs = require("fs");
const path = require("path");
const getFileList = require("./getFileList");
const findIcon = require("./findIcon");

const root = path.resolve(process.cwd(), "src");

const testRoot = "P:\\project\\party-building-screen-fe\\src";

const fileList = getFileList(testRoot);

let iconUsage = [];

/* 分析项目中用到的icon */
fileList.forEach((filePath) => {
  iconUsage = iconUsage.concat(findIcon(filePath));
});


/* 取全量icon */
const icon = require("../assets/iconfont/iconfont-es.dev");

const newIcon = {};
const newSpecialViewBox = {};

/* 从全量icon中取出用到的部分 */
iconUsage.forEach(({ unknow, value, start, end, loc, data, filePath }) => {
  if (unknow) {
    console.log("未能分析", filePath);
    console.log(data);
  } else {
    // console.log(`【${value}】`);
    // console.log(data);
    if (icon.icon[value]) {
      newIcon[value] = icon.icon[value];
    }
    if (icon.specialViewBox[value]) {
      newSpecialViewBox[value] = icon.specialViewBox[value];
    }
  }
});

fs.writeFileSync(path.resolve(__dirname, "../assets/iconfont/iconfont-es.prod.js"), `module.exports = ${JSON.stringify({
  icon: newIcon,
  specialViewBox: newSpecialViewBox,
})};`);
