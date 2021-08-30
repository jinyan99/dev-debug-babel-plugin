<template>
  <div>
    example
    <button @click="handleClick">click</button>
  </div>
</template>

<script>
export default {
  name: "App",
  setup() {
    const handleClick = () => {
      console.log("click");
      // console.log("click",DEBUG); // 报未定义错误
      if (DEBUG) { // 这块是babel插件编译期间 定位到if语句里的DEBUG 替换为真值使得判断能过，这并不是一个真的全局变量为true
        console.log("for debug")
        const a = 10;
        const b = 20;
        console.log(a + b);
      }
    };

    return {
      handleClick,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
