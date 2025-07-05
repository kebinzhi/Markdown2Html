export default `/* 自定义样式，实时生效，浏览器实时缓存 */

/* 全局属性
 * 页边距 padding: 0 3px;
 * 全文字体 font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", Arial, "Microsoft YaHei", "Segoe UI", "Hiragino Sans GB", "Helvetica Neue", Helvetica, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
 * 英文换行 overflow-wrap: break-word;
 * 字体大小 font-size: 16px;
 * 字体颜色 #333;
 */
#nice {
  padding: 0px;
  font-size: 16px;
  --text-color: #333; /* #151515 #262626 #505050*/
  color: var(--text-color);
  --title-color: #333;
}

/* 图片下提示 */
#nice figcaption {
  font-size: 0.75em;
}
#nice .imageflow-caption {
  font-size: 0.75em;
}

/* 段落，下方未标注标签参数均同此处
 * 下边距 margin-bottom: 12px;
 * 词间距 word-spacing: 0px;
 * 字间距 letter-spacing: 0px;
 * 对齐 text-align: left;
 * 颜色 color: #333;
 * 字体大小 font-size: 1em; (16px)
 */
#nice p {
  color: var(--text-color);
  font-size: 1em;
}

/* 一级标题 */
#nice h1 {
}

/* 一级标题内容 */
#nice h1 .content {
  color: var(--title-color);
}

/* 一级标题前缀 */
#nice h1 .prefix {
}

/* 一级标题后缀 */
#nice h1 .suffix {
}

/* 二级标题 */
#nice h2 {
  text-align: center;
  position: relative;
  font-weight: bold;
  color: black;
  line-height: 1.1em;
  padding-top: 12px;
  padding-bottom: 12px;
  margin: 70px 30px 30px;
  border: 1px solid #000;
}

#nice h2:before {
  content: ' ';
  float: left;
  display: block;
  width: 90%;
  border-top: 1px solid #000;
  height: 1px;
  line-height: 1px;
  margin-left: -5px;
  margin-top: -17px;
}
#nice h2:after {
  content: ' ';
  float: right;
  display: block;
  width: 90%;
  border-bottom: 1px solid #000;
  height: 1px;
  line-height: 1px;
  margin-right: -5px;
  margin-top: 16px;
}

/* 二级标题内容 */
#nice h2 .content {
  display: block;
  color: var(--title-color);
  /* -webkit-box-reflect: below 0em -webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,0)), to(rgba(255,255,255,0.1))); */
}

#nice h2 strong {
}

/* 二级标题前缀 */
#nice h2 .prefix {
  display: block;
  width: 3px;
  margin: 0 0 0 5%;
  height: 3px;
  line-height: 3px;
  overflow: hidden;
  background-color: #000;
  box-shadow: 3px 0 #000,
    0 3px #000,
    -3px 0 #000,
    0 -3px #000;
}

/* 二级标题后缀 */
#nice h2 .suffix {
  display: block;
  width: 3px;
  margin: 0 0 0 95%;
  height: 3px;
  line-height: 3px;
  overflow: hidden;
  background-color: #000;
  box-shadow: 3px 0 #000,
    0 3px #000,
    -3px 0 #000,
    0 -3px #000;
}

/* 三级标题 */
#nice h3 {
  background-color: #333; /* #000 此处若改为变量，粘贴时可能会有兼容问题*/
  font-size: 1.125em;
  color: #fff;
  padding: 2px 10px;
  width: fit-content;
  margin: 60px auto 15px;
}
#nice h3 strong {
  color: #fff;
}

/* 三级标题内容 */
#nice h3 .content {
}

/* 三级标题前缀 */
#nice h3 .prefix {
}

/* 三级标题后缀 */
#nice h3 .suffix {
}

/* 无序列表整体样式
 * list-style-type: square|circle|disc;
 */
#nice ul {
  list-style-type: disc;
}

/* 无序二级列表
 * list-style-type: square;
 */
#nice ul li ul {
  list-style-type: circle;
}

/* 有序列表整体样式
 * list-style-type: decimal;
 */
#nice ol {
}

/* 列表内容，不要设置li */
#nice li section {
  color: var(--text-color);
  font-size: 1em;
}

/* 引用
 * 左边缘 border-left: 3px solid rgba(0, 0, 0, 0.4);
 * 背景色 background: rgba(0, 0, 0, 0.05);
 */
#nice blockquote {
  border-left: 3px solid rgba(0, 0, 0, 0.65);
  /* border-right: 1px solid rgba(0, 0, 0, 0.65); */
  background: rgb(249, 249, 249);
}

/* 引用文字颜色 color: #505050;
 * 加粗那些也要定义相同颜色
 */
#nice blockquote p {
  --text-blockquote-color: #505050;
  color: var(--text-blockquote-color);
}
#nice blockquote p strong {
  color: var(--text-blockquote-color);
}
#nice blockquote p em {
  color: var(--text-blockquote-color);
}
#nice blockquote p em strong {
  color: var(--text-blockquote-color);
}

/* 链接
 * text-decoration: none;
 * border-bottom: 1px solid currentColor;
 * color: #0060c6;
 * 用span防止a:hover样式干扰
 */
#nice a span {
}

/* 加粗 */
#nice strong {
  color: var(--text-color);
  font-size: 1em;
}

/* 斜体 */
#nice em {
  color: var(--text-color);
  font-size: 1em;
}

/* 加粗斜体 */
#nice em strong {
  color: var(--text-color);
  font-size: 1em;
}

/* 删除线
 * color: #333;
 * font-style: italic;
 */
#nice del {
}

/* 分隔线
 * border-top: 2px solid black;
 */
#nice hr {
}

/* 图片
 * margin: 0 auto;
 * max-width: 100%;
 */
#nice img {
  box-shadow: rgba(170, 170, 170, 0.48) 0px 0px 6px 0px;
  border-radius: 4px;
  margin-top: 10px;
}

/* 行内代码
 * color: #ff6441;
 */
#nice p code, #nice li code {
}


/* 非微信代码块
 * 代码块不换行 display: -webkit-box !important;
 * 代码块换行 display: block;
 */
#nice pre.custom {
  box-shadow: rgba(170, 170, 170, 0.48) 0px 0px 6px 0px;
  max-width: 100%;
  border-radius: 4px;
  margin: 10px auto 0 auto;
}
#nice pre code {
}

/*
 * 表格内的单元格
 * 字体大小 font-size: 0.9375em; (15px)
 * 边框 border: 1px solid #ccc;
 * 内边距 padding: 5px 10px;
 */
#nice table tr th,
#nice table tr td {
  font-size: 0.875em; /* 0.875x16=14px */
  color: var(--text-color);
}
#nice table tr td strong {
  font-size: 1.071em; /* 1.071x14=14.994px */
}
#nice table tr td em {
  font-size: 1.071em;
}
#nice table tr td em strong {
  font-size: 1.071em;
}

/* 脚注文字 */
#nice .footnote-word {
}

/* 脚注上标 */
#nice .footnote-ref {
}

/* "参考资料"四个字 
 * 内容 content: "参考资料";
 */
#nice .footnotes-sep {
  font-size: 0.875em;
  color: #888;
  border-top: 1px solid #eee;
  padding: 30px 0 10px 0px;
  background-color: transparent;
  margin: 0;
  width: 100%;
}
#nice .footnotes-sep:before {
  content: '参考资料';
}
#nice .footnotes {
  border-left: 5px solid #eee;
  padding-left: 10px;
}

/* 参考资料编号 */
#nice .footnote-num {
  font-size: 0.875em;
  color: #999;
}

/* 参考资料文字 */
#nice .footnote-item p { 
  font-size: 0.875em;
  color: #999;
}

/* 参考资料解释 */
#nice .footnote-item p em {
  font-size: 0.875em;
  color: #999;
}

/* 行间公式
 * 最大宽度 max-width: 300% !important;
 */
#nice .block-equation svg {
}

/* 行内公式 */
#nice .inline-equation svg {  
}

/* 文章结尾 */
/* #nice:after {
  content: '- END -';
  font-size: 0.9375em;
  display: block;
  text-align: center;
  margin-top: 50px;
  color: #999;
  border-bottom: 1px solid #eee;
} */

/* 滑动幻灯片 */
#nice .imageflow-layer1 img {
  margin: 0;
  box-shadow: none;
  border-radius: 0;
}
`;
