# antd-generator

基于 antd3 的管理控制台项目生成工具。

## Usage

npm:

```
npm install

npm start
```

yarn:

```
yarn
yarn start
```

## demo

[Demo](https://mcdyzg.github.io/projects/antd-generator/#/)

## features

*   支持 antd 的网格布局
*   支持自定义路由配置
*   支持自定义 antd 组件配置项
*   支持 module，将包含业务逻辑的组件封装成 module 后，可以动态添加到任何地方。例如登录模块。
*   运行 yarn build 后生成静态 html。

## todo

1.  完善 antd 基本组件的添加工作
2.  添加登录模块，表单验证模块，表格筛选展示模块，markdown 模块。

## dependencies

*   webpack
*   antd
*   ruex
*   React
*   React-Router-Dom
*   fetch(whatwg-fetch)
