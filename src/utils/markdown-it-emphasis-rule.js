'use strict';

// 这是一个修改版的 markdown-it v8.4.2 emphasis 规则
// 唯一的修改是为了让其能正确处理紧邻CJK字符的加粗/斜体标记

function postProcess(state, delimiters) {
  var i, j,
      startDelim,
      endDelim,
      token,
      loneMarkers = [],
      max = delimiters.length;

  for (i = 0; i < max; i++) {
    startDelim = delimiters[i];

    if (startDelim.marker !== 0x2A/* * */ && startDelim.marker !== 0x5F/* _ */) {
      continue;
    }

    // Process only opening markers
    if (startDelim.end === -1) {
      continue;
    }

    endDelim = delimiters[startDelim.end];

    // If the previous delimiter has the same marker and is adjacent to this one,
    // merge those into one strong delimiter.
    //
    // `<em><em>whatever</em></em>` -> `<strong>whatever</strong>`
    //
    if (i > 0 &&
        delimiters[i - 1].end === startDelim.end + 1 &&
        // check that first two markers match and adjacent
        delimiters[i - 1].marker === startDelim.marker &&
        delimiters[i - 1].token === startDelim.token - 1 &&
        // check that last two markers are adjacent (we can safely assume they match)
        delimiters[startDelim.end + 1].token === endDelim.token + 1) {

      delimiters[i - 1].length += startDelim.length;
      delimiters[i].length = 0;
      delimiters[i].end = -1;
      delimiters[i].token = 0;
    }
  }

  for (i = 0; i < max; i++) {
    startDelim = delimiters[i];

    if (startDelim.marker !== 0x2A/* * */ && startDelim.marker !== 0x5F/* _ */) {
      continue;
    }

    if (startDelim.length === 0) {
      continue;
    }

    // Process only opening markers
    if (startDelim.end === -1) {
      continue;
    }

    endDelim = delimiters[startDelim.end];

    if (startDelim.length % 2) {
      token         = state.tokens[startDelim.token];
      token.type    = 'em_open';
      token.tag     = 'em';
      token.nesting = 1;
      token.markup  = String.fromCharCode(startDelim.marker);
      token.content = '';

      token         = state.tokens[endDelim.token];
      token.type    = 'em_close';
      token.tag     = 'em';
      token.nesting = -1;
      token.markup  = String.fromCharCode(startDelim.marker);
      token.content = '';

      startDelim.length -= 1;
      endDelim.length -= 1;
    }

    if (startDelim.length > 0) {
      token         = state.tokens[startDelim.token];
      token.type    = 'strong_open';
      token.tag     = 'strong';
      token.nesting = 1;
      token.markup  = String.fromCharCode(startDelim.marker) + String.fromCharCode(startDelim.marker);
      token.content = '';

      token         = state.tokens[endDelim.token];
      token.type    = 'strong_close';
      token.tag     = 'strong';
      token.nesting = -1;
      token.markup  = String.fromCharCode(startDelim.marker) + String.fromCharCode(startDelim.marker);
      token.content = '';
    }
  }


  for (i = 0; i < max; i++) {
    startDelim = delimiters[i];

    if (startDelim.marker !== 0x2A/* * */ && startDelim.marker !== 0x5F/* _ */) {
      continue;
    }

    if (startDelim.end !== -1) {
      continue;
    }

    if (startDelim.length > 0) {
      loneMarkers.push(startDelim.token);
    }
  }


  while (loneMarkers.length) {
    i = loneMarkers.pop();
    j = i + 1;

    while (j < state.tokens.length && state.tokens[j].type === 'text' && state.tokens[j].content === '') {
      j++;
    }

    if (j < state.tokens.length && state.tokens[j].type === 'text') {
      state.tokens[j].content = state.tokens[i].content + state.tokens[j].content;
    } else {
      state.tokens[i].content = state.tokens[i].content;
    }
  }
}


module.exports = function emphasis(state, silent) {
  var i,
      scanned,
      token,
      start = state.pos,
      marker = state.src.charCodeAt(start),
      prevChar,
      nextChar,
      isLastPunctChar,
      isNextPunctChar,
      isLastWhiteSpace,
      isNextWhiteSpace;

  if (silent) { return false; }

  if (marker !== 0x5F/* _ */ && marker !== 0x2A/* * */) { return false; }

  scanned = state.scanDelims(state.pos, marker === 0x2A);

  for (i = 0; i < scanned.length; i++) {
    token         = state.push('text', '', 0);
    token.content = String.fromCharCode(marker);

    if (i === 0) {
      prevChar = state.pos > 0 ? state.src.charCodeAt(state.pos - 1) : -1;
      nextChar = state.pos + scanned.length < state.posMax ? state.src.charCodeAt(state.pos + scanned.length) : -1;

      isLastPunctChar = state.md.utils.isPunctChar(String.fromCharCode(prevChar));
      isNextPunctChar = state.md.utils.isPunctChar(String.fromCharCode(nextChar));

      isLastWhiteSpace = state.md.utils.isWhiteSpace(prevChar);
      isNextWhiteSpace = state.md.utils.isWhiteSpace(nextChar);

      // ======================= 核心修改：让规则识别CJK字符 =======================
      const CJK_RE = /[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/;
      if (CJK_RE.test(String.fromCharCode(prevChar))) { isLastPunctChar = true; }
      if (CJK_RE.test(String.fromCharCode(nextChar))) { isNextPunctChar = true; }
      // ======================= 修改结束 =======================================

      if (isNextWhiteSpace) {
        scanned.can_open = false;
      } else if (isNextPunctChar) {
        if (!(isLastWhiteSpace || isLastPunctChar)) {
          scanned.can_open = false;
        }
      }

      if (isLastWhiteSpace) {
        scanned.can_close = false;
      } else if (isLastPunctChar) {
        if (!(isNextWhiteSpace || isNextPunctChar)) {
          scanned.can_close = false;
        }
      }
    }

    state.delimiters.push({
      marker: marker,
      length: scanned.length,
      jump:   i,
      token:  state.tokens.length - 1,
      end:    -1,
      open:   scanned.can_open,
      close:  scanned.can_close
    });
  }

  state.pos += scanned.length;

  if (state.delimiters.length === 0) {
    return true;
  }
  
  if (!state.tokens_meta) {
    state.tokens_meta = [];
  }
  if (!state.tokens_meta[state.tokens.length - 1]) {
    state.tokens_meta[state.tokens.length - 1] = {
      delimiters: []
    };
  }

  var last_token_meta = state.tokens_meta[state.tokens.length - 1];

  Array.prototype.push.apply(last_token_meta.delimiters, state.delimiters);
  state.delimiters.length = 0;

  var max = last_token_meta.delimiters.length;

  for (i = 0; i < max; i++) {
    postProcess(state, last_token_meta.delimiters, i);
  }

  return true;
};
