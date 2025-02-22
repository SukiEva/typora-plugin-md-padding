import { Component, fs, Notice } from '@typora-community-plugin/core';
import { padMarkdown } from 'md-padding';
import { File, getMarkdown } from 'typora';
import type MdPaddingPlugin from 'src/main';
import { R } from './i18n';

export class PluginCommand extends Component {
  constructor(private plugin: MdPaddingPlugin) {
    super();
  }

  onload(): void {
    this.plugin.registerCommand({
      id: 'markdown-padding',
      title: R.commandTitle,
      scope: 'editor',
      callback: () => {
        this.onCommandCallback();
      },
    });
  }

  private async onCommandCallback(): Promise<void> {
    this.toast(R.commandMessage);
    try {
      await File.saveUseNode();
      let content = getMarkdown();
      content = this.formatContent(content);
      content = this.removeLineBreak(content);
      await fs.writeText(File.bundle.filePath, content);
      this.toast(R.commandFinish);
    } catch (e) {
      this.toast(String(e));
    }
  }

  private removeLineBreak(content: string): string {
    const maxNum = this.plugin.settings.get('lineBreak') ?? 0;
    if (maxNum > 0) {
      const lineBreak = content.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
      const regexp = new RegExp(`(${lineBreak}){${maxNum + 1},}`, 'g');
      const breaks = lineBreak.repeat(maxNum);
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
    new Notice(message, 2000).show();
  }
}
