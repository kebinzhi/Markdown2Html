/**
 * 修复 CJK (中日韩) 字符与加粗/斜体标记相邻时无法正确渲染的问题。
 * 问题原因：CommonMark 规范要求强调标记 (*, _) 的两侧需要有空白或标点符号。
 * 解决方案：在 CJK 字符和强调标记之间插入一个零宽空格 (ZWSP, U+200b)，这个空格在视觉上不可见，但能作为有效的分隔符被解析器识别。
 */

export default function cjkEmphasisFixPlugin(md) {
  function cjkEmphasisFix(state) {
    const CJK_CHARS = '\\u4e00-\\u9fa5';
    const ZWSP = '\\u200b';

    const START_REGEX = new RegExp(`([${CJK_CHARS}])([*_]+)`, 'g');
    const END_REGEX = new RegExp(`([*_]+)([${CJK_CHARS}])`, 'g');

    for (let i = 0; i < state.tokens.length; i++) {
      const token = state.tokens[i];

      if (token.type === 'inline' && token.content) {
        let content = token.content;
        
        content = content.replace(START_REGEX, `$1${ZWSP}$2`);
        content = content.replace(END_REGEX, `$1${ZWSP}$2`);

        token.content = content;
      }
    }
  }

  md.core.ruler.before('inline', 'cjk_emphasis_fix', cjkEmphasisFix);
}
  
