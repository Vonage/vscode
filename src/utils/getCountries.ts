import { Memento, QuickPickItem } from 'vscode';
import { StorageKeys } from '../enums';

const countries = [
  { code: "AL", name: "Albania (+ 355)" },
  { code: "DZ", name: "Algeria (+213)" },
  { code: "AO", name: "Angola (+244)" },
  { code: "AR", name: "Argentina (+54)" },
  { code: "AU", name: "Australia (+61)" },
  { code: "AT", name: "Austria (+43)" },
  { code: "BS", name: "Bahamas (+1 242)" },
  { code: "BH", name: "Bahrain (+973)" },
  { code: "BB", name: "Barbados (+1 246)" },
  { code: "BY", name: "Belarus (+375)" },
  { code: "BE", name: "Belgium (+32)" },
  { code: "BJ", name: "Benin (+229)" },
  { code: "BO", name: "Bolivia (+591)" },
  { code: "BA", name: "Bosnia and Herzegovina (+387)" },
  { code: "BW", name: "Botswana (+267)" },
  { code: "BR", name: "Brazil (+55)" },
  { code: "BG", name: "Bulgaria (+359)" },
  { code: "CA", name: "Canada (+1)" },
  { code: "KH", name: "Cambodia (+855)" },
  { code: "KY", name: "Cayman Islands (+1 345)" },
  { code: "CL", name: "Chile (+56)" },
  { code: "CN", name: "China (+86)" },
  { code: "CO", name: "Colombia (+57)" },
  { code: "CR", name: "Costa Rica (+506)" },
  { code: "HR", name: "Croatia (+385)" },
  { code: "CY", name: "Cyprus (+357)" },
  { code: "CZ", name: "Czech Republic (+420)" },
  { code: "DK", name: "Denmark (+45)" },
  { code: "DO", name: "Dominican Republic (+18)" },
  { code: "EC", name: "Ecuador (+593)" },
  { code: "EG", name: "Egypt (+20)" },
  { code: "SV", name: "El Salvador (+503)" },
  { code: "EE", name: "Estonia (+372)" },
  { code: "FI", name: "Finland (+358)" },
  { code: "FR", name: "France (+33)" },
  { code: "GE", name: "Georgia (+995)" },
  { code: "DE", name: "Germany (+49)" },
  { code: "GH", name: "Ghana (+233)" },
  { code: "GR", name: "Greece (+30)" },
  { code: "GD", name: "Grenada (+1 473)" },
  { code: "GT", name: "Guatemala (+502)" },
  { code: "HK", name: "Hong Kong (+852)" },
  { code: "HN", name: "Honduras (+504)" },
  { code: "HU", name: "Hungary (+36)" },
  { code: "ID", name: "Indonesia (+62)" },
  { code: "IS", name: "Iceland (+354)" },
  { code: "IN", name: "India (+91)" },
  { code: "IE", name: "Ireland (+353)" },
  { code: "IL", name: "Israel (+972)" },
  { code: "IT", name: "Italy (+39)" },
  { code: "JM", name: "Jamaica (+1 876)" },
  { code: "JP", name: "Japan (+81)" },
  { code: "JO", name: "Jordan (+962)" },
  { code: "KZ", name: "Kazakhstan (+7)" },
  { code: "KE", name: "Kenya (+254)" },
  { code: "LV", name: "Latvia (+371)" },
  { code: "LI", name: "Liechtenstein (+423)" },
  { code: "LT", name: "Lithuania (+370)" },
  { code: "LU", name: "Luxembourg (+352)" },
  { code: "MO", name: "Macau (+853)" },
  { code: "MY", name: "Malaysia (+60)" },
  { code: "MT", name: "Malta (+356)" },
  { code: "MU", name: "Mauritius (+230)" },
  { code: "YT", name: "Mayotte (+262)" },
  { code: "MX", name: "Mexico (+52)" },
  { code: "MD", name: "Moldova (+373)" },
  { code: "MC", name: "Monaco (+377)" },
  { code: "NL", name: "Netherlands (+31)" },
  { code: "NZ", name: "New Zealand (+64)" },
  { code: "NI", name: "Nicaragua (+505)" },
  { code: "NG", name: "Nigeria (+234)" },
  { code: "NO", name: "Norway (+47)" },
  { code: "PK", name: "Pakistan (+92)" },
  { code: "PA", name: "Panama (+507)" },
  { code: "PE", name: "Peru (+51)" },
  { code: "PH", name: "Philippines (+63)" },
  { code: "PR", name: "Puerto Rico (+1)" },
  { code: "PL", name: "Poland (+48)" },
  { code: "PT", name: "Portugal (+351)" },
  { code: "RO", name: "Romania (+40)" },
  { code: "RU", name: "Russia (+7)" },
  { code: "RW", name: "Rwanda (+250)" },
  { code: "RE", name: "Reunion (+262)" },
  { code: "SA", name: "Saudi Arabia (+966)" },
  { code: "RS", name: "Serbia (+381)" },
  { code: "SG", name: "Singapore (+65)" },
  { code: "SK", name: "Slovakia (+421)" },
  { code: "SI", name: "Slovenia (+386)" },
  { code: "ZA", name: "South Africa (+27)" },
  { code: "KR", name: "South Korea (+82)" },
  { code: "ES", name: "Spain (+34)" },
  { code: "LK", name: "Sri Lanka (+94)" },
  { code: "SE", name: "Sweden (+46)" },
  { code: "CH", name: "Switzerland (+41)" },
  { code: "TJ", name: "Tajikistan (+992)" },
  { code: "TW", name: "Taiwan (+886)" },
  { code: "TH", name: "Thailand (+66)" },
  { code: "TT", name: "Trinidad and Tobago (+1 868)" },
  { code: "TR", name: "Turkey (+90)" },
  { code: "UA", name: "Ukraine (+380)" },
  { code: "AE", name: "United Arab Emirates (+971)" },
  { code: "GB", name: "United Kingdom (+44)" },
  { code: "US", name: "United States (+1)" },
  { code: "UY", name: "Uruguay (+598)" },
  { code: "UZ", name: "Uzbekistan (+998)" },
  { code: "VE", name: "Venezuela (+58)" },
  { code: "VN", name: "Vietnam (+84)" },
  { code: "ZM", name: "Zambia (+260)" }
];

export function getCountries (storage: Memento): QuickPickItem[] {
  const previousCountry: string | undefined = storage.get(StorageKeys.lastCountrySelected);
  return countries.map ( (i) => {  
    return {
      label: i.name,
      description: i.code,
      picked: (previousCountry && previousCountry === i.code) as boolean
    };
  });
}