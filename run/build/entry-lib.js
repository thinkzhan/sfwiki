const fs = require('fs');
const path = require('path');
const uppercamelcase = require('uppercamelcase');
const Components = require('./get-libs')();
const version = process.env.VERSION || require(process.cwd() + '/package.json').version;

const ignoredCmps = ['DemoCode', 'DemoMd'];

module.exports = function genEntry() {
  const importList = Components.map(name => `import ${uppercamelcase(name)} from './${name}';`);
  const exportList = Components.map(name => `${uppercamelcase(name)}`).filter(name => ignoredCmps.indexOf(name) < 0);
  const content = `/* auto generated by build:lib*/
${importList.join('\n')}

const version = '${version}';

export {
  version,
  ${exportList.join(',\n  ')}
};

export default {
  version,
  ${exportList.join(',\n  ')}
};
`;
  fs.writeFileSync(path.join(process.cwd(), 'libs/index.js'), content);
}
