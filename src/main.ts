import { Plugin, PluginSettings } from '@typora-community-plugin/core';
import { PluginCommand } from './core/command';
import { PluginOptions, PluginSettingTab } from './core/setting';

export default class MdPaddingPlugin extends Plugin<PluginOptions> {
  onload() {
    this.registerSettings(new PluginSettings(this.app, this.manifest, { version: 1 }));

    this.addChild(new PluginCommand(this));

    this.registerSettingTab(new PluginSettingTab(this));
  }
}
