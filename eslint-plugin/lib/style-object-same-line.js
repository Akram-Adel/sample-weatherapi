const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  defaultOptions: [],
  meta: {
    messages: {
      line: 'Expected style objects to be defined on one line',
    },
    fixable: 'code',
    schema: [{ type: 'integer', minimum: 0 }], // file line length (print width)
  },
  create(context) {
    const sourceCode = context.getSourceCode().text;
    const maxLines = context.options[0] || 80;

    return {
      Program({ body }) {
        body.forEach((node) => {
          if (!['ExportNamedDeclaration', 'VariableDeclaration'].includes(node.type)) return;
          if (node.type === 'ExportNamedDeclaration' && node.specifiers.length) return;

          let nodeInit;

          if (node.declarations?.[0].init) nodeInit = node.declarations[0].init;
          else if (node.declaration?.declarations?.[0].init) nodeInit = node.declaration.declarations[0].init;

          // prettier-ignore
          if (
            nodeInit?.type !== 'CallExpression'
            || nodeInit.callee.object?.name !== 'StyleSheet'
            || nodeInit.callee.property?.name !== 'create'
          ) {
            return;
          }

          nodeInit.arguments[0].properties.forEach((property) => {
            if (property.value.loc.start.line === property.value.loc.end.line) return;

            let hasComment = false;
            let pointer = property.value.loc.start.column + 3;
            let text = '{ ';

            for (const style of property.value.properties) {
              if (style.trailingComments) hasComment = true;

              pointer += style.loc.end.column - style.loc.start.column + 2;

              if (style.type === 'SpreadElement') {
                text += `${sourceCode.substring(style.range[0], style.range[1])}, `;
              } else {
                if (style.key.name) text += `${style.key.name}: `;
                if (style.key.raw) text += `${style.key.raw}: `;

                text += `${sourceCode.substring(style.value.range[0], style.value.range[1])}, `;
              }
            }

            text = text.replace(/,.$/, ' }');

            if (!hasComment && pointer > maxLines) return;

            context.report({
              node: property,
              messageId: 'line',
              fix(fixer) {
                return fixer.replaceTextRange(property.value.range, text);
              },
            });
          });
        });
      },
    };
  },
});
