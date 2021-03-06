import { TreeItemCollapsibleState } from "vscode";
import { INumber } from "@vonage/server-sdk";
import { resolveTooltipMarkdown } from "../../utils";
import { BaseTreeItem } from "./baseTreeItem";

/**
 * Represents a Vonage number inside any tree view
 */
export class NumberTreeItem extends BaseTreeItem {

  constructor(
    public number: INumber) {
    super(number.msisdn, TreeItemCollapsibleState.None, 'symbol-number', undefined, 'number');
    this.setDescription();
    this.setToolTip();
  }

  private setDescription(): void {
    this.description = this.number.features.join(' ').toLowerCase();
  }

  private setToolTip() {
    this.tooltip = resolveTooltipMarkdown(this.numberTooltipTemplate, { ...this.number });
  }

  private numberTooltipTemplate = `
### {{ msisdn }}

---

#### Country

{{ country }}

---

#### Features

{{#each features}}
- {{this}}
{{/each}}
  
---
`;
}