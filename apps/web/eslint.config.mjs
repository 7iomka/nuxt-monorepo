// @ts-check
import eslintConfigPrettier from 'eslint-config-prettier';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  // your custom flat configs go here, for example:
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue', '**/*.js'],
    rules: {
      ...eslintConfigPrettier.rules,
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      
    },
  },
).overrides({

  // example: https://github.com/Esposter/Esposter/tree/a2ea2c336e2c538386ff6219ed5f5aa273c801d6/packages/configuration/eslint
  // 'nuxt/typescript/rules': {
  //   rules: typescriptRulesOverrides,
  //   ignores: typescriptIgnores,
  // },
  'nuxt/vue/rules': {
    rules: {
      // 'vue/no-unused-vars': 'off',
      'vue/no-v-html': 'off',
      'vue/require-default-prop': 'off',
      // 'vue/no-v-text-v-html-on-component': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/block-order': ['error', {
        'order': [ 'script', 'template', 'style' ]
      }],
      // 'vue/valid-template-root': 'off',
      // '@typescript-eslint/no-unused-vars': 'off',
    },
  },
});