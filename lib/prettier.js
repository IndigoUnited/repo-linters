'use strict';

const path = require('path');
const tryFiles = require('./util/tryFiles');
const tryPackageJson = require('./util/tryPackageJson');

function detectPrettierLint(dir, loadPackageJson) {
    const paths = ['.prettierrc', '.prettierrc.yaml', '.prettierrc.yml', '.prettierrc.json', '.prettierrc.js', 'prettier.config.js']
    .map((entry) => path.join(dir, entry));

    return Promise.all([
        tryFiles(paths),
        tryPackageJson(loadPackageJson, ['devDependencies.prettier', 'prettier']),
    ])
    .then((booleans) => booleans.some((bool) => bool));
}

module.exports = detectPrettierLint;
