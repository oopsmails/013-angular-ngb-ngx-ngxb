import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import en from '../../../assets/i18n/en.json';
import fr from '../../../assets/i18n/fr.json';

@Pipe({ name: 'messageTranslate', pure: false })
export class MessageTranslatePipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(key: string, args?: any): string {
    const en = this.flatten(this.translate.getTranslation('en'));
    const fr = this.flatten(this.translate.getTranslation('fr'));
    const value = this.translate.currentLang === 'en' ? en[key] : fr[key];
    return this.interpolate(value, args);
  }

  interpolate(value: string, args?: any): string {
    if (!args) {
      return value;
    }

    return value.replace(/\{([^}]+)\}/g, (match: string, key: string) => {
      return args[key] || '';
    });
  }

  flatten(obj: any, prefix = ''): any {
    return Object.keys(obj).reduce((acc, k) => {
      const pre = prefix.length ? prefix + '.' : '';
      if (typeof obj[k] === 'object') {
        Object.assign(acc, this.flatten(obj[k], pre + k));
      } else {
        acc[pre + k] = obj[k];
      }
      return acc;
    }, {});
  }
}
