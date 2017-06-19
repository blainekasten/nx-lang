"use strict"
require('colors');

module.exports = function parser(tokens, source) {
  let current = 0;

  function walk() {
    let token = tokens[current];

    if (token.type === 'number') {
      current++;

      return {
        type: 'NumberLiteral',
        value: token.value,
      };
    }

    // call expressions
    if (
      token.type === 'paren' &&
      token.value === '('
    ) {
      token = tokens[++current];

      const node = {
        type: 'CallExpression',
        name: token.value,
        params: [],
      };

      token = tokens[++current];

      while (
        token.type !== 'paren' &&
        token.type !== ')'
      ) {
        node.params.push(walk());
        token = tokens[++current];
      }

      current++;

      return node;
    }

    if (token.type === 'name') {
      current++;
      return {
        type: 'Identifier',
        value: token.value,
      };
    }

    const error = `${token.type} ${token.value} at position: ${token.position}`;

    const previousToErrorSpot = source.substring(0, token.position);
    const errorSpot = source.substring(token.position, token.position + 1);
    const afterErrorSpot = source.substring(token.position + 1, source.length);

    console.log('\n```````````````````');
    console.log(previousToErrorSpot + errorSpot.red + afterErrorSpot);
    console.log('```````````````````\n');

    throw new SyntaxError(error);
  }

  const ast = {
    type: 'Program',
    body: [],
  };

  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
};
