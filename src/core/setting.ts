import { SettingItem, SettingTab } from '@typora-community-plugin/core';
import type MdPaddingPlugin from 'src/main';
import { R } from './i18n';

export const DEFAULT_SETTINGS: PluginOptions = {
  lineBreak: 2,
  noticeTimeOut: 2000,
  ignoreWords: [],
  ignorePatterns: ['<br\\s*?/?>', ':[0-9a-z_\\-]+?:', '<u>.+?</u>', '<span style=".+?">.+?</span>'],
};

export interface PluginOptions {
  lineBreak: number;
  noticeTimeOut: number;
  ignoreWords: string[];
  ignorePatterns: string[];
}

type Option = 'lineBreak' | 'noticeTimeOut' | 'ignoreWords' | 'ignorePatterns';

export class PluginSettingTab extends SettingTab {
  private isInit: boolean = false;

  get name(): string {
    return 'Markdown Padding';
  }

  constructor(private plugin: MdPaddingPlugin) {
    super();
  }

  show(): void {
    if (!this.isInit) {
      this.addPluginOption('lineBreak');
      this.addPluginOption('noticeTimeOut');
      this.addPluginOption('ignoreWords');
      this.addPluginOption('ignorePatterns');
      this.isInit = true;
    }
    super.show();
  }

  private addPluginOption(option: Option): void {
    this.addSetting((setting: SettingItem) => {
      setting.addName(option);
      setting.addText((input: HTMLInputElement) => {
        const optionValue: number | string[] = this.plugin.settings.get(option);
        if (option === 'lineBreak') {
          setting.addDescription(R.lineBreak);
          this.addNumberSetting(input, optionValue, option);
        } else if (option === 'noticeTimeOut') {
          setting.addDescription(R.noticeTimeOut);
          this.addNumberSetting(input, optionValue, option);
        } else if (option === 'ignoreWords') {
          setting.addDescription(R.ignoreWords);
          input.placeholder = 'word1,word2';
          this.addStringArraySetting(input, optionValue, option);
        } else if (option === 'ignorePatterns') {
          setting.addDescription(R.ignorePatterns);
          input.placeholder = 'pattern1,pattern2';
          this.addStringArraySetting(input, optionValue, option);
        }
      });
    });
  }

  private addStringArraySetting(input: HTMLInputElement, optionValue: any, option: Option) {
    input.type = 'text';
    input.value = (optionValue as string[]).join(',');
    input.oninput = () => this.plugin.settings.set(option, input.value.split(','));
  }

  private addNumberSetting(input: HTMLInputElement, optionValue: any, option: Option) {
    input.type = 'number';
    input.value = String(optionValue as number);
    input.oninput = () => this.plugin.settings.set(option, Number(input.value));
  }
}
