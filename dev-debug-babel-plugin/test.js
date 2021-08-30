const {transformSync} = require('@babel/core')

// 引入后 我们就可以使用我们的插件了
const code = `
        const a = 10;
        const b = 20;

        if("DEBUG"){
            console.log("heihei",DEBUG)
        }
        `;
const babelConfig = {
  plugins: [['./index.js', {
    isRemove: true
  }]],
  // ast: true
}

const output = transformSync(code, babelConfig);

console.log(output.code,'18-----')