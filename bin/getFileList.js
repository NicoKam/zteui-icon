/* eslint-disable no-console,no-unused-vars */

const fs = require("fs");
const path = require("path");

module.exports = (root = "src") => {
  const fileList = [];
  const queue = [path.join(root)];

  while (queue.length > 0) {
    const p = queue.shift();
    try {
      const pa = fs.readdirSync(p);
      pa.forEach((ele, index) => {
        const filePath = `${p}/${ele}`;
        const info = fs.statSync(filePath);
        if (info.isDirectory()) {
          // console.log(`dir: ${  ele}`);
          queue.push(filePath);
        } else if (ele.endsWith(".js") || ele.endsWith(".jsx")) {
          // console.log(`file: ${filePath}`);
          fileList.push(filePath);
        }
      });
    } catch (e) {
      console.error(e);
    }

  }
  return fileList;
};
