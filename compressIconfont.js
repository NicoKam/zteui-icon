const fs = require("fs");
const svgIcon = require("./src/Zcon/svgIcon");

const svgCache = {};
svgIcon.forEach((key) => {
  svgCache[key] = true;
});

const text = fs.readFileSync("./assets/iconfont/iconfont.js", "utf-8");
const startSeperator = "<svg><symbol";
const startIndex = text.indexOf(startSeperator) + startSeperator.length;
const endIndex = text.indexOf("</symbol></svg>", startIndex);
const svgtext = text.substr(startIndex, endIndex - startIndex);

const separator = "</symbol><symbol";
const singleIcon = svgtext.split(separator);
const jsLine = {};
const specialViewBox = {};

const toJson = (str) => {
  const start = str.indexOf("<path");
  const content = str.substr(start);
  const contentArr = content.split("</path><path").map((subStr) => {
    const res = {};
    subStr.match(/\w+="[^"]+"/g).forEach((condition) => {
      const [key, value] = condition.split("=");
      res[key] = value.replace(/"/g, "");
    });
    return res;
  });
  return contentArr;
};

const newIcon = singleIcon.map((t) => {
  const start = t.indexOf("id=\"") + 4;
  const end = t.indexOf("\"", start);
  const id = t.substr(start, end - start)
    .replace("zteicon-", "");
  const hasColor = /fill="[^"]+"/.test(t);
  const viewBox = t.match(/viewBox="[^"]+"/);
  if (viewBox.length === 1) {
    const viewBoxValue = viewBox[0].split("=")[1].replace(/"/g, "");
    if (viewBoxValue !== "0 0 1024 1024") {
      specialViewBox[id] = viewBoxValue;
    }
  }
  let res = t;
  if (!svgCache[id] && hasColor) {
    res = t.replace(/fill="[^"]+"/g, "");
  }
  jsLine[id] = toJson(res);
  return res;
});

fs.writeFileSync("./assets/iconfont/iconfont.js", `${text.substr(0, startIndex)}${newIcon.join(separator)}${text.substr(endIndex)}`);
fs.writeFileSync("./assets/iconfont/iconfont-es.js", `export default ${JSON.stringify(jsLine)}; \n export const specialViewBox = ${JSON.stringify(specialViewBox)}`);
