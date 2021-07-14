const fs = require('fs');
const path = require('path');

const indexEsmPath = path.resolve(
  __dirname,
  '../node_modules/@vue/apollo-composable/dist/index.esm.js'
);

fs.writeFileSync(
  indexEsmPath,
  fs
    .readFileSync(indexEsmPath, 'utf8')
    .replace(/const currentOptions = ref3\(\);/, '')
    .replace(
      /const vm = getCurrentInstance3\(\);/,
      'const vm = getCurrentInstance3();\nconst currentOptions = ref3();'
    )
    .replace(/const currentOptions = ref5\(\);/, '')
    .replace(
      /const vm = getCurrentInstance5\(\);/,
      'const vm = getCurrentInstance5();\nconst currentOptions = ref5();'
    )
);

const indexPath = path.resolve(
  __dirname,
  '../node_modules/@vue/apollo-composable/dist/index.js'
);

fs.writeFileSync(
  indexPath,
  fs
    .readFileSync(indexPath, 'utf8')
    .replace(/const currentOptions = \(0, import_vue_demi8\.ref\)\(\);/, '')
    .replace(
      /const vm = \(0, import_vue_demi8\.getCurrentInstance\)\(\);/,
      'const vm = (0, import_vue_demi8.getCurrentInstance)();\nconst currentOptions = (0, import_vue_demi8.ref)();'
    )
    .replace(/const currentOptions = \(0, import_vue_demi5\.ref\)\(\);/, '')
    .replace(
      /const vm = \(0, import_vue_demi5\.getCurrentInstance\)\(\);/,
      'const vm = (0, import_vue_demi5.getCurrentInstance)();\nconst currentOptions = (0, import_vue_demi5.ref)();'
    )
);
