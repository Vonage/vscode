import { TreeItemCollapsibleState } from "vscode";
import { resolveTooltipMarkdown } from "../../utils";
import { BaseTreeItem } from "./baseTreeItem";

export class ApplicationTreeItem extends BaseTreeItem {

  constructor(
    public application: any) {
    super(application.name, TreeItemCollapsibleState.None, 'server-process', undefined, 'application');
    this.setContextValue();
    this.setDescription();
    this.setToolTip();
  }

  public setContextValue(): void {
    this.contextValue = `application${this.application.capabilities && Object.keys(this.application.capabilities).length > 0 ? '-' + Object.keys(this.application.capabilities).join('-') : ''}`;
  }

  private setDescription(): void {
    const descriptions: string[] = [];
    if (this.application.capabilities.voice) {
      descriptions.push('voice');
    }
    if (this.application.capabilities.messages) {
      descriptions.push('messages');
    }
    if (this.application.capabilities.rtc) {
      descriptions.push('rtc');
    }
    if (this.application.capabilities.vbc) {
      descriptions.push('vbc');
    }
    this.description = descriptions.join(' ');
  }

  private setToolTip() {
    this.tooltip = resolveTooltipMarkdown(this.applicationTooltipTemplate, { ...this.application, capabilities: [...this.convertCapabilities(this.application.capabilities)] });
  }

  private convertCapabilities(capabilities: any) {
    return Object.keys(capabilities).map((cap) => {
      let webhooks;
      if (capabilities[cap].webhooks) {
        webhooks = Object.keys(capabilities[cap].webhooks).map((webhook) => {
          return { name: webhook, ...capabilities[cap].webhooks[webhook] };
        });
      }
      return { capability: cap, webhooks };
    });
  }

  private applicationTooltipTemplate = `
### {{ name }}

---

#### Application Id

{{ id }}

---

#### Capabilities

{{#if (nonEmptyObj capabilities)}}
{{#each capabilities}}

  **{{ properCase this.capability }}**

  {{#each this.webhooks }}
  - {{ properCase this.name }}  
    *{{ this.http_method }}* : {{ this.address }}
  {{/each}}

{{/each}}
{{else}}
_None_
{{/if}}
  
---
`;
}