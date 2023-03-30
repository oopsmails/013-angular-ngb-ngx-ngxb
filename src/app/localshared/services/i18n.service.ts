import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import en from '../../../assets/i18n/en.json';
import fr from '../../../assets/i18n/fr.json';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private data = { en, fr };

  enFlattened = new Object();
  frFlattened = new Object();

  constructor(private translate: TranslateService) {
    this.flatten('', this.data['en'], this.enFlattened);
    this.flatten('', this.data['fr'], this.frFlattened);
  }

  getJsonValueI18n(key: string, args?: any): string {
    const value = (this.translate.currentLang === 'en' ? this.enFlattened[key] : this.frFlattened[key]) || key;
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

  flatten(prefix: string, obj: any, target: any) {
    if (!obj) {
      return;
    }
    Object.getOwnPropertyNames(obj).forEach((f) => {
      const value = obj[f];
      if (value) {
        const newPrefix = prefix ? prefix + '.' + f : f;
        if (typeof value === 'string' || value instanceof String) {
          target[newPrefix] = value;
        } else {
          this.flatten(newPrefix, value, target);
        }
      }
      return;
    });
  }
}
