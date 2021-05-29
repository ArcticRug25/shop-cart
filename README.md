# shop-cart

##### 1、开发环境插件

- autoprefixer

  > 可以自动在样式中添加浏览器厂商前缀,避免手动处理样式兼容问题

- clean-webpack-plugin

  > 生产环境编译文件的时候，先把 build 或 dist (就是放生产环境用的文件) 目录里的文件先清除干净，再生成新的。

- css-loader & style-loader

  webpack 是用 JS 写的，运行在 node 环境，所以默认 webpack 打包的时候只会处理 JS 之间的依赖关系！！！
  因为像 .css 这样的文件不是一个 JavaScript 模块，你需要配置 webpack 使用 css-loader 或者 style-loader 去合理地处理它们。
  如果在 JS 中导入了 css，那么就需要使用 css-loader 来识别这个模块，通过特定的语法规则进行转换内容最后导出
  css-loader 会处理 `import` / `require` `@import` / `url` 引入的内容。

    ```css
    /* base.css */
    .bg {
     background: #000;
    }
    ```

    ```javascript
    const style = require('./base.css')
    console.log(style, 'css')
    ```
    > 处理之后导出的是

    ![alt 导出结果](https://img-blog.csdnimg.cn/20200228174101926.png)

    但是这并不是我们想要的，因为是个数组，页面是无法直接使用，这时我们需要用到零外一个 `style-loader` 来处理。

    style-loader 是通过一个JS脚本创建一个style标签，里面包含一些样式。`style-loader` 是不能单独使用的，应为它并不负责解析 `css `之前的依赖关系，每个loader  的功能都是单一的，各自拆分独立。


- url-loader
    1. 文件大小小于 `limit` 参数，`url-loader` 将会把文件转为 `DataURL`
    2. 文件大小大于 `limit`，`url-loader` 会调用 `file-loader` 进行处理，参数也会直接传给 `file-loader`。

- html-webpack-plugin
    1. 帮我们在内存生成html 页面
    2. 帮我们处理 bundle.js

- image-webpack-loader
> 图片压缩