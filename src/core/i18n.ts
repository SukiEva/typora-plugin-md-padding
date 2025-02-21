import { I18n } from '@typora-community-plugin/core';

export const R = new I18n({
  resources: {
    en: {
      commandTitle: 'Format Markdown',
      commandMessage: 'Markdown Padding in progress, please wait...',
      commandFinish: 'Markdown Padding finished',
      ignoreWords: 'Ignore padding for specific words',
      ignorePatterns: 'Ignore padding for specific regex patterns',
    },
    'zh-cn': {
      commandTitle: '混排优化',
      commandMessage: '混排优化中，请稍等...',
      commandFinish: '混排优化完成',
      ignoreWords: '忽略特定字词的优化',
      ignorePatterns: '忽略特定正则的优化',
    },
  },
}).t;
