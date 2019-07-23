#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const getFileList = require("./getFileList");
const findIcon = require("./findIcon");

const cwd = process.cwd();


let config = {
  srcRoot: path.resolve(process.cwd(), "src"),
  icon: [],
  iconDependencyName: "@cbd/icon",
  showUnknowIconDetail: true,
  showIconDetail: true,
};
if (fs.existsSync(path.resolve(cwd, ".cbdicon.js"))) {
  try {
    config = {
      ...config,
      ...require(path.resolve(cwd, ".cbdicon.js")),
    };
  } catch (e) {
    console.error("错误: .cbdicon.js格式不正确，将使用默认配置");
  }
}

console.log(`增在分析：${config.srcRoot}`);

const fileList = getFileList(config.srcRoot);

let iconUsage = [];

/* 分析项目中用到的icon */
fileList.forEach((filePath) => {
  iconUsage = iconUsage.concat(findIcon(filePath, config.iconDependencyName));
});


/* 取全量icon */
const icon = require("../assets/iconfont/iconfont-es.dev");

const newIcon = {};
const newSpecialViewBox = {};

const iconCache = {};
const unknowIcon = [];
iconUsage.forEach((item) => {
  const { unknow, value, start, end, loc, data, filePath } = item;
  if (unknow) {
    unknowIcon.push(item);
  } else {
    iconCache[value] = item;
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


/* 提示信息 */
if (unknowIcon.length && config.showUnknowIconDetail) {
  console.log("以下内容疑似使用了@cbd/icon，但规则未能覆盖，所以无法识别具体用了什么图标，请联系前端负责人添加解析规则或配置.cbdicon.js");
  unknowIcon.forEach(({ loc, filePath, data }) => {
    console.warn(`${filePath}@${loc.start.line}:${loc.start.column}`);
    console.log(data);
    console.log("");
  });
}

if (iconUsage.length && config.showIconDetail) {
  console.log(`共分析到${iconUsage.length}个已使用图标`);
  iconUsage.forEach(({ loc, filePath, data }) => {
    console.log(`${filePath}@${loc.start.line}:${loc.start.column}`);
    console.log(data);
    console.log("");
  });
}


console.log(`@cbd/icon压缩完毕，共导出${Object.keys(iconCache).length}个图标`);
