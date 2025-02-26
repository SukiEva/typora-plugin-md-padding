import { I18n } from '@typora-community-plugin/core';

export const R = new I18n({
  resources: {
    en: {
      commandTitle: 'Format Markdown',
      commandMessage: 'Markdown Padding in progress, please wait...',
      commandFinish: 'Markdown Padding finished',
      lineBreak: 'Maximum number of consecutive line breaks in the document: -1 (no limit)',
      noticeTimeOut: 'Notification timeout (ms)',
      ignoreWords: 'Ignore padding for specific words',
      ignorePatterns: 'Ignore padding for specific regex patterns',
    },
    'zh-cn': {
      commandTitle: '混排优化',
      commandMessage: '混排优化中，请稍等...',
      commandFinish: '混排优化完成',
      lineBreak: '文档中连续换行符的最大数量：-1（不限制）',
      noticeTimeOut: '通知超时时间（ms）',
      ignoreWords: '忽略特定字词的优化',
      ignorePatterns: '忽略特定正则的优化',
    },
  },
}).t;
