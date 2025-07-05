export default `/* 默认样式 */
/* 一些样式写在basic_media.js */

/* 全局属性 */
#nice {
  font-size: 16px;
  color: #333;
  padding: 0 3px;
  word-spacing: 0px;
  letter-spacing: 0px;
  overflow-wrap: break-word;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", Arial, "Microsoft YaHei", "Segoe UI", "Hiragino Sans GB", "Helvetica Neue", Helvetica, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  /* margin-top: -10px; */
}

/* 段落 */
#nice p {
  font-size: 1em;  /* 父元素#nice字体大小为16px，1em就等于16px */
  color: #333;
  margin-bottom: 12px;
}

/* 标题 */
#nice h1,
#nice h2,
#nice h3,
#nice h4,
#nice h5,
#nice h6 {
  font-weight: bold;
  color: #333;
  margin-top: 30px;
  margin-bottom: 15px;
  padding: 0px;
}

#nice h1 {
  font-size: 1.5em; /* 1.5x16=24px */
}
#nice h2 {
  font-size: 1.375em; /* 1.375x16=22px */
}
#nice h3 {
  font-size: 1.25em;
}
#nice h4 {
  font-size: 1.125em;
}
#nice h5 {
  font-size: 1em;
}
#nice h6 {
  font-size: 1em;
}

#nice h1 .prefix,
#nice h2 .prefix,
#nice h3 .prefix,
#nice h4 .prefix,
#nice h5 .prefix,
#nice h6 .prefix {
  display: none;
}

#nice h1 .suffix,
#nice h2 .suffix,
#nice h3 .suffix,
#nice h4 .suffix,
#nice h5 .suffix,
#nice h6 .suffix {
  display: none;
}

/* 列表 */
#nice ul,
#nice ol {
  color: #333;
  margin-bottom: 12px;
  padding-left: 25px;
}
/* 无序一级列表 */
#nice ul {
  list-style-type: disc;
}
/* 无序二级列表 */
#nice ul ul {
  list-style-type: square;
}
/* 有序列表 */
#nice ol {
  list-style-type: decimal;
}

/* 列表内容 */
#nice li section {
  color: #333;
  font-size: 1em;
  margin-bottom: 12px;
  text-align: left;
}

/* 引用 */
#nice blockquote {
  font-size: 1em;
  color: #505050; /* 文字颜色 */
  background: rgba(0, 0, 0, 0.05);
  border-left: 3px solid rgba(0, 0, 0, 0.4);
  display: block;
  overflow: auto;
  margin: 20px 0;
  padding: 10px 10px 10px 20px;
}

/* 引用文字 */
#nice blockquote p {
  color: #505050; /* 文字颜色 */
  margin: 8px 0; /* 上下间距保持居中，上下间距实际会比只有底部间距看上去小，所以增大一点 */
  line-height: 28px; /* PC端对比30px阅读稍差 */
}
/* 引用文字加粗 */
#nice blockquote p strong {
  color: #505050;
}
/* 引用文字斜体 */
#nice blockquote p em {
  color: #505050;
}
/* 引用文字加粗斜体 */
#nice blockquote p em strong {
  color: #505050;
}

/* 目录导航，即TOC */
#nice .table-of-contents a {
  color: #333;
  font-weight: normal;
  border: none;
}

/* 链接，用span防止a:hover样式干扰 */
#nice a span {
  color: #0060c6;
  /* font-weight: bold; */
  /* text-decoration: none; */
  /* border-bottom: 1px solid currentColor; */
}

/* 加粗 */
#nice strong {
  color: #333;
  font-weight: bold;
}
/* 斜体 */
#nice em {
  color: #333;
  font-style: italic;
}
/* 加粗斜体 */
#nice em strong {
  color: #333;
  font-weight: bold;
}

/* 删除线 */
#nice del {
  color: #333;
  font-style: italic;
}

/* 分隔线 */
#nice hr {
  margin: 10px 0;
  border: none;
  border-top: 2px solid black;
}

/* 代码块 */
#nice pre {
  margin: 10px 0;
}
#nice pre code {
  font-size: 0.875em; /* 0.875x16=14px */
  display: block;
  overflow-x: auto; /* 水平滚动条 */
  font-family: "Operator Mono", Consolas, Monaco, Menlo, monospace;
}
#nice pre code span {
}

/* 行内代码：反引号代码 */
#nice p code,
#nice li code {
  font-size: 0.875em;
  color: #ff6441;
  background-color: rgba(27,31,35,.05);
  padding: 2px 4px;
  border-radius: 4px;
  margin: 0 2px;
  font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;
}

/* 图片 */
#nice img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
}

/* 图片 */
#nice figure {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 图片描述文字 */
#nice figcaption {
  font-size: 0.875em;
  color: #888;
  margin-top: 5px;
  text-align: center;
}

/* 表格容器 */
#nice .table-container {
  overflow-x: auto;
}
/* 表格 */
#nice table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 20px;
}
/* 奇数行 */
#nice table tr {
  background-color: white;
}
/* 偶数行 */
#nice table tr:nth-child(2n) {
  background-color: #F8F8F8;
}
/* 单元格通用样式 */
#nice table tr th,
#nice table tr td {
  font-size: 0.9375em; /* 0.9375x16=15px */
  border: 1px solid #ccc;
  padding: 5px 10px;
  text-align: left;
  min-width: 85px;
}
/* 表头单元格样式 */
#nice table tr th {
  font-weight: bold;
  background-color: #f0f0f0;
}

/* 微信代码块 */
#nice .code-snippet__fix {
  font-size: 0.875em;
  color: #333;
  overflow-wrap: break-word !important;
  margin: 10px 0;
  position: relative;
  background-color: rgba(0,0,0,0.03);
  border: 1px solid #f0f0f0;
  border-radius: 2px;
  display: flex;
  line-height: 20px;
}
#nice .code-snippet__fix pre {
  margin-bottom: 10px;
  margin-top: 0px;
  overflow-x: auto;
  padding: 16px;
  padding-left: 0;
  white-space: normal;
  flex: 1;
}
#nice .code-snippet__fix .code-snippet__line-index {
  counter-reset: line;
  flex-shrink: 0;
  height: 100%;
  padding: 16px;
  list-style-type: none;
  margin: 0;
}
#nice .code-snippet__fix .code-snippet__line-index li {
  list-style-type: none;
  text-align: right;
  color: #333;
  margin: 0;
}
#nice .code-snippet__fix .code-snippet__line-index li::before {
  min-width: 1.5em;
  text-align: right;
  left: -2.5em;
  counter-increment: line;
  content: counter(line);
  display: inline;
  color: rgba(0,0,0,0.3);
}
#nice .code-snippet__fix code {
  text-align: left;
  font-size: 0.875em;
  white-space: pre;
  position: relative;
  font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
  padding: 0px;
  display: block;
}

/* 脚注 */
#nice .footnote-word,
#nice .footnote-ref {
  color: #0060c6;
  font-weight: bold;
}

#nice .footnote-item {
  display: flex;
}
/* 参考资料编号 */
#nice .footnote-num {
  display: inline;
  width: 10%;
  background: none;
  font-size: 0.8125em;
  opacity: 0.6;
  font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, "PingFang SC", Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
/* 参考资料文字 */
#nice .footnote-item p {
  font-size: 0.875em;
  color: #333;
  display: inline;
  padding: 0px;
  margin: 0;
  /* calc() 函数中的运算符两边必须有空格，值要有单位 */
  width: calc(100% - 50px);
}

#nice sub, sup {
  line-height: 0;
}

#nice .footnotes-sep:before {
  content: "参考资料";
  display: block;
}

/* 解决公式问题 */
#nice .block-equation {
  display: block;
  text-align: center;
  overflow: auto;
}
/* 行间公式 */
#nice .block-equation svg {
  max-width: 300% !important;
}
/* 行内公式 */
#nice .inline-equation {
}
#nice .inline-equation svg {
}

/* 滑动幻灯片 */
#nice .imageflow-layer1 {
  margin-top: 1em;
  margin-bottom: 0.5em;
  white-space: normal;
  border: 0px none;
  padding: 0px;
  overflow: hidden;
}

#nice .imageflow-layer2 {
  white-space: nowrap;
  width: 100%;
  overflow-x: scroll;
}

#nice .imageflow-layer3 {
  display: inline-block;
  white-space: normal;
  vertical-align: middle;
  width: 100%;
}

#nice .imageflow-img {
  display: inline-block;
}

#nice .imageflow-caption {
  text-align: center;
  margin-top: 0px;
  padding-top: 0px;
  color: #888;
}

/* 图片链接嵌套 */
#nice figure a {
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

#nice figure a img {
  margin: 0px;
}

/* 图片链接嵌套，图片解释 */
#nice figure a + figcaption {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: -35px;
  background: rgba(0,0,0,0.7);
  color: white;
  line-height: 35px;
  z-index: 20;
}

/* 掘金后缀容器 */
#nice .nice-suffix-juejin-container {
  margin-top: 20px !important;
}
`;
