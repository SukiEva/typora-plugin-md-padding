import { SettingItem, SettingTab } from '@typora-community-plugin/core';
import type MdPaddingPlugin from 'src/main';
import { R } from './i18n';

export interface PluginOptions {
  lineBreak?: number;
  ignoreWords?: string[];
  ignorePatterns?: string[];
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
        const optionValue = this.plugin.settings.get(option);
        if (option === 'lineBreak') {
          input.type = 'number';
          input.value = optionValue ? String(optionValue) : '0';
          input.oninput = () => {
            this.plugin.settings.set(option, Number(input.value));
          };
          return;
        }
        if (option === 'ignoreWords') {
          input.placeholder = 'word1,word2';
          setting.addDescription(R.ignoreWords);
        } else if (option === 'ignorePatterns') {
          input.placeholder = 'pattern1,pattern2';
          setting.addDescription(R.ignorePatterns);
        }
        input.value = (optionValue as string[])?.join(',') ?? '';
        input.oninput = () => {
          this.plugin.settings.set(option, input.value.split(','));
        };
      });
    });
  }
}
