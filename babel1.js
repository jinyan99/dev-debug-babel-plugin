module.exports = function ({ types: t }) {
  return {
    visitor: {
      Identifier(path) {
        const parentNodeIsIfStatement = t.isIfStatement(path.parent);
        const isDebug = path.node.name === "DEBUG";

        if (isDebug && parentNodeIsIfStatement) {
          const stringNode = t.stringLiteral("DEBUG");
          path.replaceWith(stringNode);
        }
      },

      StringLiteral(path) {
        const parentNodeIsIfStatement = t.isIfStatement(path.parent);
        const isDebug = path.node.value === "DEBUG";
        console.log(isDebug && parentNodeIsIfStatement, '17-----',process.env.NODE_ENV)
        if (isDebug && parentNodeIsIfStatement) {
          if (process.env.NODE_ENV === "production") {
            path.parentPath.remove();
           }
        }
      },
    },
  };
};
