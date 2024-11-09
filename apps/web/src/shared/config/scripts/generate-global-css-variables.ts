import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import chokidar from 'chokidar';

export {};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const watchFlagIndex = process.argv.indexOf('--watch');
const watchMode = watchFlagIndex !== -1;

const stylesFilePath = path.resolve(__dirname, '../global-css-variables.ts');
const outputFilePath = path.resolve(
  __dirname,
  '../../styles/global-css-variables.gen.css',
);

async function generateCSS() {
  try {
    const content = await import(stylesFilePath);
    const { globalCssVariables } = content;

    const generateCssForVariable = (key: any, value: any) => {
      if (typeof value === 'object') {
        let css = '';

        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          if (nestedKey.startsWith('@')) {
            css += `  ${nestedKey} {\n`;
            css += generateCssForVariable('', nestedValue);
            css += `  }\n`;
          } else if (nestedKey.startsWith('&')) {
            css += `${key}${nestedKey} {\n`;
            css += generateCssForVariable('', nestedValue);
            css += `}\n`;
          } else {
            css += `  ${nestedKey}: ${nestedValue};\n`;
          }
        }

        return css;
      }
      return `  ${key}: ${value};\n`;
    };

    let css = '';
    let externalCss = '';

    for (const [key, value] of Object.entries(globalCssVariables())) {
      if (!key.startsWith('&')) {
        if (!key.startsWith('@')) {
          css += `  ${key}: ${value};\n`;
        } else {
          css += `  ${key} {\n`;
          css += generateCssForVariable('', value);
          css += `  }\n`;
        }
      } else {
        const externalKey = key.slice(1); // Убираем &
        externalCss += `:root${externalKey} {\n`;
        externalCss += generateCssForVariable('', value);
        externalCss += `}\n`;
      }
    }

    const finalCss = `:root {\n${css}}\n${externalCss}\n`;

    fs.writeFile(outputFilePath, finalCss)
      .then(() => {
        console.log('CSS file generated successfully');
      })
      .catch((err) => {
        console.error('Error writing CSS file:', err);
      });
  } catch (err) {
    console.error('Error importing styles:', err);
  }
}

generateCSS();

if (watchMode) {
  const watcher = chokidar.watch([stylesFilePath]);

  watcher.on('change', () => {
    console.log(
      'styles.ts or its dependencies have changed. Regenerating CSS...',
    );
    generateCSS();
  });
}
