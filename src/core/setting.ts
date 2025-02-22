import { SettingItem, SettingTab } from '@typora-community-plugin/core';
import type MdPaddingPlugin from 'src/main';
import { R } from './i18n';

export const DEFAULT_SETTINGS: PluginOptions = {
  lineBreak: 2,
  ignoreWords: [],
  ignorePatterns: ['<br\\s*?/?>', ':[0-9a-z_\\-]+?:', '<u>.+?</u>', '<span style=".+?">.+?</span>'],
};

export interface PluginOptions {
  lineBreak: number;
  ignoreWords: string[];
  ignorePatterns: string[];
}

export class PluginSettingTab extends SettingTab {
  get name(): string {
    return 'Markdown Padding';
  }

  constructor(private plugin: MdPaddingPlugin) {
    super();
  }

  show(): void {
    this.addPluginOption('lineBreak');
    this.addPluginOption('ignoreWords');
    this.addPluginOption('ignorePatterns');
    super.show();
  }

  private addPluginOption(option: 'lineBreak' | 'ignoreWords' | 'ignorePatterns'): void {
    this.addSetting((setting: SettingItem) => {
      setting.addName(option);
      setting.addText((input: HTMLInputElement) => {
        const optionValue: number | string[] = this.plugin.settings.get(option);
        if (option === 'lineBreak') {
          setting.addDescription(R.lineBreak);
          input.type = 'number';
          input.value = String(optionValue as number);
          input.oninput = () => {
            this.plugin.settings.set(option, Number(input.value));
          };
          return;
        }
        if (option === 'ignoreWords') {
          setting.addDescription(R.ignoreWords);
          input.placeholder = 'word1,word2';
        } else if (option === 'ignorePatterns') {
          setting.addDescription(R.ignorePatterns);
          input.placeholder = 'pattern1,pattern2';
        }
        input.value = (optionValue as string[]).join(',');
        input.oninput = () => {
          this.plugin.settings.set(option, input.value.split(','));
        };
      });
    });
  }
}
