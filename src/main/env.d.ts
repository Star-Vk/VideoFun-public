declare module "*.json?commonjs-external&asset" {
    const value: string;  // 假设导入的是路径字符串
    export default value;
  }