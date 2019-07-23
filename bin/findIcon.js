const fs = require("fs");
const ast = require("./ast");

/**
 * 分析条件表达式中的字符串值
 * @param expression
 */
const checkConditionalExpression = (expression) => {
  const { consequent, alternate } = expression;
  const nodes = [consequent, alternate];
  let result = [];
  nodes.forEach((node) => {
    if (node.type === "ConditionalExpression") {
      result = result.concat(checkConditionalExpression(node));
    }
    if (node.type === "StringLiteral") {
      result.push(node.value);
    }
  });
  return result;
};

/**
 * 分析字符串模板，并转换成可能的文本
 * @param template
 * @returns {Array}
 */
const joinTemplate = (template) => {
  const { expressions, quasis } = template;
  const arr = [quasis[0]];
  for (let i = 0; i < expressions.length; i += 1) {
    arr.push(expressions[i]);
    arr.push(quasis[i + 1]);
  }

  /* 递归检查模板数组 */
  const check = (i) => {
    const item = arr[i];
    let childValue = [""];
    if (i < arr.length - 1) {
      childValue = check(i + 1);
    }
    if (item.type === "TemplateElement") {
      /* 模板文本 */
      return childValue.map(childStr => item.value.raw + childStr);
    }
    if (item.type === "ConditionalExpression") {
      /* 条件表达式 */
      const res = [];
      const conditionString = checkConditionalExpression(item);
      childValue.forEach((childStr) => {
        conditionString.forEach((condition) => {
          res.push(condition + childStr);
        });
      });
      return res;
    }

    /* 其他情况暂时未处理 */
    return childValue;
  };


  return check(0);
};

/**
 * 检查代码中是否有import @cbd/icon
 * @param body
 * @returns {boolean}
 */
const isIconUsed = (body = []) => {
  for (let i = 0; i < body.length; i += 1) {
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
  const data = fs.readFileSync(filePath, "utf8");

  const foundUsage = (node, value) => {
    if (value != null) {
      usage.push({
        filePath,
        value,
        start: node.start,
        end: node.end,
        loc: node.loc,
        data: data.substr(node.start, node.end - node.start),
      });
    } else {
      usage.push({
        filePath,
        unknow: true,
        start: node.start,
        end: node.end,
        loc: node.loc,
        data: data.substr(node.start, node.end - node.start),
      });
    }
  };

  /**
   * 开始递归查找使用了@cbd/icon的文件
   * @param iconName
   * @param node astTree node
   */
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
          foundUsage(node, attrType.value.value);
        } else if (attrType.value.type === "JSXExpressionContainer") {
          /* 表达式 */
          const { expression } = attrType.value;
          if (expression.type === "TemplateLiteral") {
            /* 字符串模板 */
            const expressionRes = joinTemplate(expression);
            expressionRes.forEach((expressionIcon) => {
              foundUsage(node, expressionIcon);
            });
          } else {
            foundUsage(node);
          }
        } else {
          foundUsage(node);
        }
      } else {
        /* 继续 */
        node.children.forEach(nextFind);
      }
    }

    /* 默认情况 */
    if (node) {
      for (const key in node) {
        if (node[key] && typeof node[key] === "object" && node[key].constructor.name === "Node") {
          nextFind(node[key]);
        }
      }
    }
  };

  /**
   * 根据文件的astTree查找使用了@cbd/icon的文件
   * @param astTree
   * @returns {Array}
   */
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

  try {
    const tree = ast(data);
    const result = findIcon(tree, filePath).map((item) => ({
      ...item,
      filePath,
    }));
    // result.forEach(({ value, unknow, start, end }) => {
    //   if (unknow) {
    //     console.log("unknow", data.substr(start, end - start));
    //   } else {
    //     console.log(value);
    //   }
    // });
    // console.log(filePath, result);
    return result;
  } catch (e) {
    console.error(filePath, e);
  }
  return [];
};
