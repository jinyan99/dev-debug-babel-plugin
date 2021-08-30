module.exports = ({types: t}) => {
  // 一些关键字都对着AST语法树的结构来对应起来的babelAPI的提供的方法
  return {
    visitor: {
      // 写一些自定义插件逻辑
      Identifier(path) {
        // 标识符这个函数 当在你ast树深度优先遍历时中遇到标识符即即或变量名的时候 就执行这个函数进行自定义逻辑处理，会执行很多次
        console.log('jinyan------', path.node.name);
        const parentIsIf = t.isIfStatement(path.parentPath);
        const isDebug = path.node.name === 'DEBUG';
        // console.log(parentIsIf, isDebug);

        if (isDebug && parentIsIf) {
          // 把Identifier 转换成 string形式 即把if()里的DEBUG变量形式转换成"DEBUG"形式，就完成了生产环境不让一段代码执行，开发环境让一段代码执行
          const stringNode = t.stringLiteral('DEBUG');
          path.replaceWith(stringNode)
        }
      },

      StringLiteral(path, state) {
        // 遍历到为字符串的时候，就会执行这个函数
        const parentIsIf = t.isIfStatement(path.parentPath);
        const isDebug = path.node && path.node.value === 'DEBUG';

        if (isDebug && parentIsIf) {
          /**
           * 控制在prod环境下才能去删除--有两种方式
           * 1. 是判断node env环境变量去判断是否是生产环境 是否进行删除 开发阶段通过在vue项目中build打包 在包内起个服务server . 起来的项目就是生产环境了自动NODE_ENV就变了，不打包都是dev环境
                * if (process.env.NODE_ENV === 'production') {
                      path.parentPath.remove();// 就会把这对应的代码删除掉
                    }
           * 2. 就是外界传参的方式 用户来告诉我们什么时候可以进行删除
                  - 通过在用户使用插件的配置文件使用插件时传2参，在这里行参 state 的opts属性可以接受到参数
          */
          
          // 采用第一种方式
          if (process.env.NODE_ENV === 'production') {
            path.parentPath.remove();// 就会把这对应的代码删除掉
          }
        }
      }
    }
  }
}