/* eslint-disable no-console */
import del from 'del';
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);

const shouldConcat = args[0] === 'concat';

const components = folder =>
  fs
    .readdirSync(folder)
    .filter(
      file =>
        fs.statSync(path.join(folder, file)).isDirectory() &&
        fs.existsSync(path.join(folder, file, 'doc.js')),
    );

const FOLDER = path.resolve('src/js/components');

const execute = async () => {
  const readmes = [];
  const concatedReadmeDestination = path.resolve('README.md');
  components(FOLDER).forEach(component => {
    /* eslint-disable */
    const { doc, themeDoc } = require(path.join(FOLDER, component, 'doc.js'));
    const componentModule = require(path.join(FOLDER, component, 'index.js'));
    // we use the second array element since the first is '__esModule'.
    const Component =
      componentModule[
        Object.keys(componentModule).filter(k => k === component)[0]
      ];
    /* eslint-enable */

    const readmeDestination = path.join(FOLDER, component, 'README.md');

    const DocumentedComponent = doc(Component);

    const readmeContent = DocumentedComponent.toMarkdown();

    del(readmeDestination).then(() =>
      fs.writeFileSync(readmeDestination, readmeContent),
    );
    if (shouldConcat) {
      readmes.push(readmeContent);
    }
  });

  if (shouldConcat) {
    const concatedReadmes = readmes
      .filter(d => d)
      .reduce((str, d) => `${str}\n\n${d}`, '')
      .trim();
    fs.writeFileSync(concatedReadmeDestination, concatedReadmes);
  }
};

execute();
