// import juice from "juice";
import {message} from "antd";
import {
  BASIC_THEME_ID,
  CODE_THEME_ID,
  MARKDOWN_THEME_ID,
  LAYOUT_ID,
  BOX_ID,
  FONT_THEME_ID,
  MJX_DATA_FORMULA,
} from "./constant";
import basicMedia from "../template/basic_media";

export const solveWeChatMath = () => {
  const layout = document.getElementById(LAYOUT_ID);
  const mjxs = layout.getElementsByTagName("mjx-container");
  for (let i = 0; i < mjxs.length; i++) {
    const mjx = mjxs[i];
    if (!mjx.hasAttribute("jax")) {
      break;
    }

    // mjx.removeAttribute("data");
    mjx.removeAttribute("jax");
    mjx.removeAttribute("display");
    mjx.removeAttribute("tabindex");
    mjx.removeAttribute("ctxtmenu_counter");
    const svg = mjx.firstChild;
    const width = svg.getAttribute("width");
    const height = svg.getAttribute("height");
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.style.width = width;
    svg.style.height = height;
  }
};

export const solveZhihuMath = () => {
  const layout = document.getElementById(LAYOUT_ID);
  const mjxs = layout.getElementsByTagName("mjx-container");
  while (mjxs.length > 0) {
    const mjx = mjxs[0];
    let data = mjx.getAttribute(MJX_DATA_FORMULA);
    if (!data) {
      continue;
    }

    if (mjx.hasAttribute("display") && data.indexOf("\\tag") === -1) {
      data += "\\\\";
    }

    mjx.outerHTML = '<img class="Formula-image" data-eeimg="true" src="" alt="' + data + '">';
  }
};

export const solveJuejinMath = () => {
  const layout = document.getElementById(LAYOUT_ID);
  const mjxs = layout.getElementsByTagName("mjx-container");
  while (mjxs.length > 0) {
    const mjx = mjxs[0];
    const data = mjx.getAttribute(MJX_DATA_FORMULA);
    if (!data) {
      continue;
    }

    // 行间公式
    if (mjx.hasAttribute("display")) {
      mjx.outerHTML = `<figure><img class="equation" src="https://juejin.im/equation?tex=${data}" alt=""/></figure>`;
    }
    // 行内公式
    else {
      mjx.outerHTML = `<span><img style="display:inline;" class="equation" src="https://juejin.im/equation?tex=${data}" alt=""/></span>`;
    }
  }
};

// 掘金单独处理代码块
export const solveJuejinCode = (html) => {
  // 掘金代码不换行问题
  const brReg = /<pre([^>])*class="custom"([^>])*>(.*?)<\/pre>/g;
  const brMatchList = html.match(brReg);
  if (brMatchList) {
    for (const item of brMatchList) {
      const content = item
        .replace(/display: -webkit-box;/g, "display: block;") // -webkit-box替换为block
        .replace(/<br>/g, "\n<span/>") // <br>替换为\n<span/>
        .replace(/&nbsp;/g, " "); // 空格转回，不转回遇到 "$ " 情况会出现问题

      html = html.replace(item, content);
    }
  }
  return html;
};


/**
 * 解析、智能合并并过滤未使用的CSS规则。
 * @param {string} html - 渲染后的HTML字符串。
 * @param {string[]} cssSources - 按覆盖顺序排列的CSS源文件内容数组。
 * @returns {string} - 处理和优化后的最终CSS字符串。
 */
function processAndFilterCss(html, cssSources) {
  // 1. 从HTML中提取所有用到的标签和类名
  const usedTags = new Set();
  const usedClasses = new Set();
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  tempDiv.querySelectorAll('*').forEach(el => {
    usedTags.add(el.tagName.toLowerCase());
    el.classList.forEach(cls => usedClasses.add(cls));
  });

  // 2. 智能合并CSS规则
  // 数据结构：Map<selector, Map<property, value>>
  const selectorToPropertiesMap = new Map();
  // 正则表达式，用于匹配CSS规则
  const ruleRegex = /([^{}]+)\s*\{([^}]+)\}/g;

  // 按照指定顺序（basic -> font -> theme -> code）处理CSS源
  cssSources.forEach(cssString => {
    let match;
    while ((match = ruleRegex.exec(cssString)) !== null) {
      const selector = match[1].trim();
      const propertiesBlock = match[2].trim();
      
      // 获取或创建当前选择器的属性Map
      if (!selectorToPropertiesMap.has(selector)) {
        selectorToPropertiesMap.set(selector, new Map());
      }
      const propertiesMap = selectorToPropertiesMap.get(selector);

      // 解析属性块并进行智能合并/覆盖
      propertiesBlock.split(';').forEach(prop => {
        if (prop.trim()) {
          const [key, ...valueParts] = prop.split(':');
          if (key && valueParts.length > 0) {
            const propertyName = key.trim();
            const propertyValue = valueParts.join(':').trim();
            // 直接设置，后来的同名属性会自动覆盖旧的
            propertiesMap.set(propertyName, propertyValue);
          }
        }
      });
    }
  });

  // 3. 过滤未使用规则并重新构建CSS字符串
  let finalCss = '';
  selectorToPropertiesMap.forEach((propertiesMap, selector) => {
    // 过滤逻辑：检查选择器是否在HTML中被实际使用
    const selectors = selector.split(/[, ]+/); // 支持逗号分隔和后代选择器
    const isUsed = selectors.some(s => {
        s = s.replace(/::?[a-zA-Z-]+/g, ''); // 移除伪类/伪元素部分
        if (s.startsWith('.') && usedClasses.has(s.substring(1))) return true;
        if (s.startsWith('#')) return true; // 默认保留所有ID选择器
        const tagMatch = s.match(/^[a-zA-Z]+/);
        if (tagMatch && usedTags.has(tagMatch[0])) return true;
        return false;
    });
    
    // 如果规则被使用，则重新构建它
    if (isUsed) {
        let propertiesString = '';
        propertiesMap.forEach((value, key) => {
            propertiesString += `${key}: ${value}; `;
        });
        if (propertiesString) {
            finalCss += `${selector} { ${propertiesString} }\n`;
        }
    }
  });

  return finalCss;
}


export const solveHtml = () => {
  const element = document.getElementById(BOX_ID); //
  let html = element.innerHTML;
  
  html = html.replace(/<mjx-container (class="inline.+?)<\/mjx-container>/g, "<span $1</span>");
  html = html.replace(/\s<span class="inline/g, '&nbsp;<span class="inline');
  html = html.replace(/svg><\/span>\s/g, "svg></span>&nbsp;");
  html = html.replace(/mjx-container/g, "section");
  html = html.replace(/class="mjx-solid"/g, 'fill="none" stroke-width="70"');
  html = html.replace(/<mjx-assistive-mml.+?<\/mjx-assistive-mml>/g, "");

  // 1. 按顺序收集所有CSS源文件的内容
  const basicStyle = document.getElementById(BASIC_THEME_ID).innerText; //
  const markdownStyle = document.getElementById(MARKDOWN_THEME_ID).innerText; //
  const codeStyle = document.getElementById(CODE_THEME_ID).innerText; //
  const fontStyle = document.getElementById(FONT_THEME_ID).innerText; //
  const cssSources = [basicStyle, fontStyle, markdownStyle, codeStyle];
  
  let res = html;
  try {
    // 2. 调用核心处理函数，获取优化后的CSS
    const processedCss = processAndFilterCss(html, cssSources);
    // 3. 将处理后的CSS与媒体查询CSS一同注入到<style>标签
    res += `<style>${processedCss}\n${basicMedia}</style>`;
  } catch (e) {
    message.error("处理CSS时发生错误，将采用未优化的样式。");
    // 降级方案：如果处理失败，直接合并所有样式
    const fullCss = cssSources.join('\n');
    res += `<style>${fullCss}\n${basicMedia}</style>`;
  }

  return res;
};

export const copySafari = (text) => {
  // 获取 input
  let input = document.getElementById("copy-input");
  if (!input) {
    // input 不能用 CSS 隐藏，必须在页面内存在。
    input = document.createElement("input");
    input.id = "copy-input";
    input.style.position = "absolute";
    input.style.left = "-1000px";
    input.style.zIndex = "-1000";
    document.body.appendChild(input);
  }
  // 让 input 选中一个字符，无所谓那个字符
  input.value = "NOTHING";
  input.setSelectionRange(0, 1);
  input.focus();

  // 复制触发
  document.addEventListener("copy", function copyCall(e) {
    e.preventDefault();
    e.clipboardData.setData("text/html", text);
    e.clipboardData.setData("text/plain", text);
    document.removeEventListener("copy", copyCall);
  });
  document.execCommand("copy");
};
