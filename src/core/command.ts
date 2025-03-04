import { Component, Notice } from '@typora-community-plugin/core';
import { padMarkdown } from 'md-padding';
import { File, getMarkdown } from 'typora';
import type MdPaddingPlugin from 'src/main';
import { R } from './i18n';

export class PluginCommand extends Component {
  private noticeTimeOut: number;

  constructor(private plugin: MdPaddingPlugin) {
    super();
  }

  onload(): void {
    this.plugin.registerCommand({
      id: 'markdown-padding',
      title: R.commandTitle,
      scope: 'editor',
      hotkey: 'Ctrl+Alt+L',
      callback: () => this.onCommandCallback(),
    });
  }

  private async onCommandCallback(): Promise<void> {
    this.noticeTimeOut = this.plugin.settings.get('noticeTimeOut');
    this.toast(R.commandMessage);
    try {
      let content: string = getMarkdown();
      content = this.formatContent(content);
      content = this.removeLineBreak(content);
      File.reloadContent(content);
      this.toast(R.commandFinish);
    } catch (e) {
      this.toast(String(e));
    }
  }

  private removeLineBreak(content: string): string {
    const maxNum: number = this.plugin.settings.get('lineBreak');
    if (maxNum > 0) {
      const lineBreak: '\r\n' | '\n' = content.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
      const regexp: RegExp = new RegExp(`(${lineBreak}){${maxNum + 1},}`, 'g');
      const breaks: string = lineBreak.repeat(maxNum);
      content = content.replace(regexp, breaks);
    }
    return content;
  }

  private formatContent(content: string): string {
    return padMarkdown(content, {
      ignoreWords: this.plugin.settings.get('ignoreWords'),
      ignorePatterns: this.plugin.settings.get('ignorePatterns'),
    });
  }

  private toast(message: string): void {
    new Notice(message, this.noticeTimeOut).show();
  }
}
