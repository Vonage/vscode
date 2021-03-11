import Handlebars from 'handlebars';

export function getHandlebarsWithHelpers(): typeof Handlebars {
  const handlebars = Handlebars;

  handlebars.registerHelper('eq', (a: string, b: string) => {
    return a === b;
  });

  handlebars.registerHelper('join', (a: never[] | undefined, b: never[] | undefined) => {
    if (!a) {
      return b;
    } else if (!b) {
      return a;
    } else {
      return a.concat(b);
    }
  });

  handlebars.registerHelper('properCase', (text: string) => {
    const words = text.split('_');
    return words.map(w => {
      if (w.length < 4) {
        return w.toLocaleUpperCase();
      } else {
        return w[0].toLocaleUpperCase() + w.substr(1, w.length - 1);
      }
    }).join(' ');
  });

  handlebars.registerHelper('substr', (a: string, from: number, length?: number | unknown) => {
    // If length is unspecified, it has a weird function value which we should treat as undefined
    return a.substr(from, typeof length === 'number' && Number.isInteger(length) ? length : undefined);
  });

  handlebars.registerHelper('nonEmptyObj', (obj: any | undefined) => {
    return obj && Object.keys(obj).length !== 0;
  });

  return handlebars;
}