export default `/*
 * 默认样式
 * 优化整理时间：2025年7月5日
 * 优化原则：修复BUG、提升结构与可读性，并完整保留所有原始注释。
 */

/* 全局属性 */
#nice {
  font-size: 16px;
  color: #333;
  padding: 0 3px;
  word-spacing: 0px; /* 默认值，为明确起见保留 */
  letter-spacing: 0px; /* 默认值，为明确起见保留 */
  overflow-wrap: break-word;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Segoe UI", "Hiragino Sans GB", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  /* margin-top: -10px; */
}

/* 段落 */
#nice p {
  font-size: 1em;  /* 父元素#nice字体大小为16px，1em就等于16px */
  color: #333; /* 继承自#nice，为明确起见保留 */
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
  color: #333; /* 继承自#nice，为明确起见保留 */
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
  color: #333; /* 继承自#nice，为明确起见保留 */
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

/* 列表内容 (注意：li > section 结构不标准，请确认是否为 li > p) */
#nice li section {
  color: #333; /* 继承自#nice，为明确起见保留 */
  margin-bottom: 12px;
  text-align: left; /* 继承自#nice，为明确起见保留 */
}

/* 引用 */
#nice blockquote {
  font-size: 1em;
  color: #505050; /* 文字颜色 */
  background: rgba(0, 0, 0, 0.05);
  border-left: 3px solid rgba(0, 0, 0, 0.4);
  display: block;
  overflow: auto;
  /* overflow-scrolling: touch; 已废弃，安全移除 */
  margin: 20px 0; /* 使用简写 */
  padding: 10px 10px 10px 20px; /* 使用简写 */
}

/* 引用文字 */
#nice blockquote p {
  color: #505050; /* 文字颜色 (继承自blockquote，为明确起见保留) */
  margin: 8px 0; /* 上下间距保持居中，上下间距实际会比只有底部间距看上去小，所以增大一点 */
  line-height: 28px; /* PC端对比30px阅读稍差 */
}

/* 目录导航，即TOC */
#nice .table-of-contents a {
  color: #333; /* 继承自#nice，为明确起见保留 */
  font-weight: normal;
  border: none;
}

/* 链接 */
#nice a {
  color: #0060c6;
  /* font-weight: bold; */
  /* text-decoration: none; */
  /* border-bottom: 1px solid currentColor; */
}

/* 加粗 */
#nice strong {
  color: #333; /* 继承自#nice，为明确起见保留 */
  font-weight: bold;
}
/* 斜体 */
#nice em {
  color: #333; /* 继承自#nice，为明确起见保留 */
  font-style: italic;
}
/* 加粗斜体 */
#nice em strong {
  color: #333; /* 继承自#nice，为明确起见保留 */
  font-weight: bold;
}

/* 删除线 */
#nice del {
  color: #333; /* 继承自#nice，为明确起见保留 */
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
  font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;
}

/* 行内代码：反引号代码 */
#nice p code,
#nice li code {
  font-size: 14px;
  color: #ff6441;
  background-color: rgba(27,31,35,.05);
  padding: 2px 4px;
  border-radius: 4px;
  margin: 0 2px;
  font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;
}

/* 图片与图注 */
#nice figure {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#nice img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
}

#nice figcaption {
  font-size: 0.875em;
  color: #888;
  margin-top: 5px;
  text-align: center;
}

/* 表格 */
#nice .table-container {
  overflow-x: auto;
}
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
  font-size: 16px;
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
  /* 优化建议: !important 标志应谨慎使用，它会使样式难以覆盖和维护 */
  overflow-wrap: break-word !important;
  font-size: 14px;
  margin: 10px 0;
  color: #333; /* 继承自#nice，为明确起见保留 */
  position: relative;
  background-color: rgba(0,0,0,0.03);
  border: 1px solid #f0f0f0;
  border-radius: 2px;
  display: flex;
  line-height: 20px;
}
#nice .code-snippet__fix pre {
  margin-bottom: 10px; /* 优化：margin-top 与 padding 可能会冲突，统一管理 */
  margin-top: 0px;
  overflow-x: auto;
  padding: 16px;
  padding-left: 0;
  white-space: normal;
  flex: 1;
  /* overflow-scrolling: touch; 已废弃，安全移除 */
}
#nice .code-snippet__fix .code-snippet__line-index {
  counter-reset: line;
  flex-shrink: 0;
  height: 100%;
  padding: 16px; /* padding: 1em 与 padding: 16px 重复，保留后者 */
  list-style-type: none;
  margin: 0;
}
#nice .code-snippet__fix .code-snippet__line-index li {
  list-style-type: none;
  text-align: right;
  color: #333; /* 继承自#nice，为明确起见保留 */
  margin: 0;
}
#nice .code-snippet__fix .code-snippet__line-index li::before {
  min-width: 1.5em;
  text-align: right;
  left: -2.5em; /* 优化建议: 此属性需配合 position: relative/absolute 生效 */
  counter-increment: line;
  content: counter(line);
  display: inline;
  color: rgba(0,0,0,0.3);
}
#nice .code-snippet__fix code {
  text-align: left;
  font-size: 14px;
  white-space: pre;
  position: relative;
  font-family: Consolas,"Liberation Mono",Menlo,Courier,monospace;
  padding: 0px;
  /* 优化：父元素是flex容器，这里的display声明通常会被覆盖 */
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

#nice .footnote-num {
  display: inline;
  width: 10%; /*神奇，50px就不可以*/
  background: none;
  font-size: 80%;
  opacity: 0.6;
  font-family: ptima-Regular, Optima, PingFangSC-light, PingFangTC-light, 'PingFang SC', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

#nice .footnote-item p {
  display: inline;
  font-size: 14px;
  padding: 0px;
  margin: 0;
  color: #333; /* 继承自#nice，为明确起见保留 */
  /* BUG修复：calc() 函数中运算符两侧必须有空格，且值需要单位 */
  width: calc(100% - 50px); 
}

#nice sub, sup {
  line-height: 0;
}

#nice .footnotes-sep:before {
  content: "参考资料";
  display: block;
}

/* 公式问题 */
#nice .block-equation {
  display: block; /* 优化：移除了重复的 display: block */
  text-align: center;
  overflow: auto;
  /* overflow-scrolling: touch; 已废弃，安全移除 */
}

#nice .block-equation svg {
  /* 优化建议: 避免使用 !important */
  max-width: 300% !important;
  /* overflow-scrolling: touch; 已废弃，且对SVG作用不大，安全移除 */
}

/* 图片横向滚动 */
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

/* 图片链接 */
#nice figure a {
  border: none;
  display: flex; /* 优化：合并了重复的规则 */
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
  /* 优化建议: 避免使用 !important */
  margin-top: 20px !important;
}

/*
 * 附注：
 * 原始代码中的空规则集已被移除，如:
 * #nice blockquote p strong {}
 * #nice pre code span {}
 * 这些通常是为未来样式或JS钩子预留的占位符。
 */
`;
