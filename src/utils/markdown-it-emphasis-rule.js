// src/utils/markdown-it-emphasis-rule.js

'use strict';


// parse sequence of markers, create markup
//
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
        delimiters[i - 1].token === startDelim.token - 1 &&
        delimiters[i - 1].marker === startDelim.marker) {

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
      marker = state.src.charCodeAt(start);

  if (silent) { return false; }

  if (marker !== 0x5F/* _ */ && marker !== 0x2A/* * */) { return false; }

  scanned = state.scanDelims(state.pos, marker === 0x2A);

  for (i = 0; i < scanned.length; i++) {
    token         = state.push('text', '', 0);
    token.content = String.fromCharCode(marker);

    state.delimiters.push({
      // Char code of the starting marker (number).
      //
      marker: marker,

      // Total length of these series of delimiters.
      //
      length: scanned.length,

      // An amount of characters before this one that's equivalent to
      // current one. In plain English: if this delimiter does not open
      // an emphasis, neither do previous, same-character delimiters.
      //
      jump:   i,

      // A position of the token this delimiter corresponds to.
      //
      token:  state.tokens.length - 1,

      // If this delimiter is matched as a valid opener, `end` will be
      // equal to its position, otherwise it's `-1`.
      //
      end:    -1,

      // Boolean flags that determine if this delimiter could open or close
      // an emphasis.
      //
      open:   scanned.can_open,
      close:  scanned.can_close
    });
  }

  state.pos += scanned.length;

  if (state.delimiters.length === 0) {
    return true;
  }

  // We can't immediatelly find matching closer, because we can be in link
  // content. So, we'll postpone processing to the end of the paragraph.
  //
  // Note: we can't save `state.delimiters` to a temp variable and reset it
  //       to [], because `state.scanDelims()` Dmitriy might recurse some day.
  //
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


// Now, let's patch the `scanDelims` function on the state object
// to make it CJK-friendly. This is a bit of a hack, but it's cleaner
// than rewriting the entire rule.
const originalScanDelims = require('markdown-it/lib/rules_inline/state_inline').prototype.scanDelims;

require('markdown-it/lib/rules_inline/state_inline').prototype.scanDelims = function (start, isAsterisk) {
    const CJK_RE = /[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/;
    
    // Temporarily patch the isPunctChar utility to include CJK characters.
    const originalIsPunctChar = this.md.utils.isPunctChar;
    this.md.utils.isPunctChar = (ch) => {
        return originalIsPunctChar(ch) || CJK_RE.test(ch);
    };

    // Call the original scanDelims function with our patched utility.
    const result = originalScanDelims.call(this, start, isAsterisk);

    // Restore the original utility function to avoid side effects.
    this.md.utils.isPunctChar = originalIsPunctChar;

    return result;
};
