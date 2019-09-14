## 项目简介
react-hooks

## 启动应用
1. `npm install`
2. `npm dev`
3. 浏览器就会自动打开：`http://localhost:9000`

## 项目模版设计

### 一、工程化需求
必要：

- 实现懒加载，按需加载 ， 代码分割
- 支持 less sass stylus 等预处理
- code spliting 优化首屏加载时间 不让一个文件体积过大
- 查看构建包中所有项目的大小。
- 提取公共代码，打包成一个 chunk
- 每个 chunk 有对应的 chunkhash,每个文件有对应的 contenthash,方便浏览器区别缓存
- 文件压缩（含：css/img/js 等文件）
- 增加 CSS 前缀 兼容各种浏览器
- prefetch(预取)：将来某些导航下可能需要的资源
- preload(预加载)：当前导航下可能需要资源
- 每个入口文件，对应一个 chunk，打包出来后对应一个文件 也是 code spliting
- 每次编译删除旧的打包代码
- 配合 gitlab CI/CD 产出部署包
- 支持外部平台灵活配置 host
- 将 CSS 文件单独抽取出来
- 小图片的 base64 处理
- 文件后缀省掉 jsx js json 等
- 移动端适配

优化：
- 识别 JSX 文件
- tree shaking 摇树优化 删除掉无用代码
- PWA 功能，热刷新，安装后立即接管浏览器 离线后仍让可以访问网站
- CSS 模块化，避免命名冲突
- 删除 HTML 文件的注释等无用内容
- 缓存 babel 的编译结果，加快编译速度
- 支持基础组件的单元测试
- 提升构建速度（hardSource, dll, happypack, IgnorPlugin, externals 等等）
- 模块化按需加载，对于一些类似 antd、lodash 等库，可以按需引入，没有-必要全局引入
- 构建时，缩短路径，减小文件搜索范围
- 多核并行压缩的方式来提升压缩速度
- 开启 Cache 选项，有利用提高构建性能
### 二、项目管理
- 目录结构的制定
- [开发规范&codereview原则](./docs/dev-rules&code-review.md)
- 前后端接口规范
- 文档规范
- 组件管理
- Git 分支管理
- Commit 描述规范
- 定期 CodeReview
- 视觉图标规范
- 用ESLint来规范Typescript代码
- 用ESLint来规范React代码
- 结合Prettier和ESLint来规范代码
- 在VSCode中使用ESLint
- husky和lint-staged构建代码工作流
- gitlab的CI/CD来规范代码
### 三、技术选型
- react @16.9.0
- webpack @^4.0
- 路由管理：react-router
- 状态管理：  
    - concent，兼容 class, renderProps, hook 3 种方式创建的组件代码风格
    - 以 dva 为代表的一系列 redux 类型解决方案，目前支持 class，相对比较为成熟，不支持 hook 组件
    - 基于 hooksApi 开发的状态管理，优点：较为前沿轻便，编码风格类似 dva+hooks，集成了 hooks 优势；缺点：目前还没有最佳方案，较为小众不成熟，不确定未来发展趋势，是否可长期扩展使用
    - 原始 redux、mobox 等
- 推行函数式编写 react 代码
- 参考微服务设计
