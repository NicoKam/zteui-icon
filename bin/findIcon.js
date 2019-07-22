const fs = require("fs");
const ast = require("./ast");


/**
 * 检查代码中是否有import @cbd/icon
 * @param body
 * @returns {boolean}
 */
const isIconUsed = (body = []) => {
  for (let i = 0; i < body.length; i++) {
    const node = body[i];
    /* 如果是import声明 */
    if (node.type === "ImportDeclaration") {
      if (node.source.value === "@cbd/icon") {
        /* 引入了Icon */
        const defaultImport = node.specifiers.find(({ type }) => type === "ImportDefaultSpecifier");
        if (defaultImport) {
          return defaultImport.local.name;
        }
      }
    } else if (i > 50) {
      return false;
    }
  }
  return false;
};


module.exports = (filePath) => {
  let usage = [];

  const findIconUsage = (iconName, node = {}) => {
    const nextFind = findIconUsage.bind(this, iconName);
    /* 以下部分的节点，无须继续检查 */
    if ([
      "ImportDeclaration",
      "ExportDefaultDeclaration",
    ].includes(node.type)) {
      return;
    }
    if ([
      "Program",
      "BlockStatement",
    ].includes(node.type)) {
      node.body.forEach(nextFind);
      return;
    }
    if (node.type === "ClassDeclaration") {
      node.body.body.forEach(nextFind);
      return;
    }
    if (node.type === "ClassMethod") {
      nextFind(node.body);
      return;
    }
    if (node.type === "VariableDeclaration") {
      node.declarations.forEach(nextFind);
      return;
    }
    if (node.type === "VariableDeclarator") {
      nextFind(node.init);
      return;
    }

    if (node.type === "JSXElement") {
      if (node.openingElement.name.name === iconName) {
        const attrType = node.openingElement.attributes.find(({ name }) => name.name === "type");
        if (attrType.value.type === "StringLiteral") {
          usage.push({
            value: attrType.value.value,
            start: node.start,
            end: node.end,
          });
        } else {
          usage.push({
            unknow: true,
            start: node.start,
            end: node.end,
          });
        }
      } else {
        /* 继续 */
        node.children.forEach(nextFind);
      }
    }

    /* 默认情况 */
    if (node) {
      // console.log(node.type);
      // console.warn("本节点没有处理，请处理", node);
      for (const key in node) {
        if (node[key] && typeof node[key] === "object" && node[key].constructor.name === "Node") {
          nextFind(node[key]);
        }
      }
    }
  };


  const findIcon = (astTree) => {
    usage = [];
    if (astTree.type === "File") {
      const { program } = astTree;
      if (program && program.type === "Program") {
        const iconName = isIconUsed(program.body);
        if (iconName) {
          /* 有使用@cbd/icon */
          findIconUsage(iconName, program);
        }
      }
    }
    return usage;
  };

  const data = fs.readFileSync(filePath, "utf8");
  try {
    const tree = ast(data);
    const result = findIcon(tree, filePath);
    result.forEach(({ value, unknow, start, end }) => {
      if (unknow) {
        console.log("unknow", data.substr(start, end - start));
      } else {
        console.log(value);
      }
    });
    // console.log(filePath, result);
  } catch (e) {
    console.error(filePath, e);
  }
};
