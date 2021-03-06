import { MarkdownString } from 'vscode';
import { getHandlebarsWithHelpers } from './getHandlebarsWithHelpers';

export function resolveTooltipMarkdown(templateString: string, context: unknown): MarkdownString {
  const handlebars = getHandlebarsWithHelpers();

  const template = handlebars.compile(templateString);

  const markdownString = template(context);
  const result = new MarkdownString(markdownString, true);
  result.isTrusted = true;
  return result;
}
