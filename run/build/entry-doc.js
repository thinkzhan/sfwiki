const fs = require('fs');
const path = require('path');
const uppercamelcase = require('uppercamelcase');
// const Components = require('./get-libs')();

module.exports = function genEntry() {  
  const Mds = require('./get-mds')();

  const importList = [
      // ...Components.map(name => `import ${uppercamelcase(name)} from '../libs/${name}/doc';`),
      ...Mds.map(name => `import ${uppercamelcase(name)} from '${process.cwd()}/docs/md/${name}.md';`)
  ];

  const exportList = [
      // ...Components.map(name => `${uppercamelcase(name)}`),
      ...Mds.map(name => `${uppercamelcase(name)}`)
  ];

  const content = `/* auto generated by build:doc*/
${importList.join('\n')}

export default {
  ${exportList.join(',\n  ')}
};
`;
  fs.writeFileSync(path.join(__dirname, '../../docs/doc-entry.js'), content);
}


