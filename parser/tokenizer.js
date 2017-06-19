"use strict";

module.exports = function tokenizer(source) {
  let current = 0;
  const tokens = [];

  while (current < source.length) {
    let char = source[current];

    if (char === '(') {
      tokens.push({
        position: current,
        type: 'paren',
        value: '(',
      });
      current++;
      continue;
    }

    if (char === ')') {
      tokens.push({
        position: current,
        type: 'paren',
        value: ')',
      });
      current++;
      continue;
    }

    const WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    const NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = '';

      while (NUMBERS.test(char)) {
        value += char;
        char = source[++current];
      }

      tokens.push({
        position: current,
        type: 'number',
        value,
      });

      continue;
    }

    const LETTERS = /[a-zA-Z]/;
    if (LETTERS.test(char)) {
      let value = '';

      while (LETTERS.test(char)) {
        value += char;
        char = source[++current];
      }

      tokens.push({
        postion: current,
        type: 'name',
        value,
      });

      continue;
    }

    current++;
  }

  return tokens;
};
