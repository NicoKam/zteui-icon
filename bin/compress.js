const fs = require("fs");
const path = require("path");
const getFileList = require("./getFileList");
const findIcon = require("./findIcon");

const root = path.resolve(process.cwd(), "src");

const testRoot = "P:\\project\\party-building-screen-fe\\src";

const fileList = getFileList(testRoot);

fileList.forEach((filePath) => {
  findIcon(filePath);
});

