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
const newIcon = singleIcon.map((t) => {
  const start = t.indexOf("id=\"") + 4;
  const end = t.indexOf("\"", start);
  const id = t.substr(start, end - start)
    .replace("zteicon-", "");
  const hasIcon = /fill="[^"]+"/.test(t);
  if (!svgCache[id] && hasIcon) {
    return t.replace(/fill="[^"]+"/g, "");
  }
  return t;
});

fs.writeFileSync("./assets/iconfont/iconfont.js", `${text.substr(0, startIndex)}${newIcon.join(separator)}${text.substr(endIndex)}`);
