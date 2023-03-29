import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import en from '../../../assets/i18n/en.json';
import fr from '../../../assets/i18n/fr.json';

@Pipe({ name: 'messageTranslate00', pure: false })
export class MessageTranslatePipe00 implements PipeTransform {
  private data = { en, fr };
  private currentLang = 'fr';

  constructor(private translateService: TranslateService) {}

  // transform(key: string, args?: any): any {
  //   const separator = '.';
  //   const keys = key.split(separator);

  //   let value = this.translateService.currentLang === 'en' ? en : fr;

  //   for (const k of keys) {
  //     value = value[k];
  //   }

  //   if (args) {
  //     value = this.interpolate(value.toString(), args);
  //   }

  //   return value;
  // }

  // transform(value: string, args: any): any {
  //   if (!value) return;
  //   let translation = this.getTranslation(value, args);
  //   if (args) {
  //     const keys = Object.keys(args);
  //     keys.forEach((key) => {
  //       translation = translation.replace(`{{${key}}}`, args[key]);
  //     });
  //   }
  //   return translation;
  // }

  // getTranslation(key: string, args?: any): string {
  //   const translation = this.translateService.instant(key);
  //   return this.interpolate(translation, args);
  // }

  // private interpolate(value: string, args?: any): string {
  //   if (!args) {
  //     return value;
  //   }

  //   return value.replace(/{([^}]+)}/g, (match, key) => {
  //     return typeof args[key] !== 'undefined' ? args[key] : match;
  //   });
  // }

  transform(key: string, args: any): string {
    let message = this.getMessage(key);
    if (!message) {
      return key;
    }
    if (args) {
      Object.keys(args).forEach((key) => {
        message = message.replace(`{${key}}`, args[key]);
      });
    }
    return message;
  }

  /**
   * This is also working
   *
   * @param key
   * @param context
   * @returns
   */
  transform_also_work(key: string, context?: Record<string, any>): string {
    let message = this.getMessage(key);
    if (context) {
      for (const key in context) {
        message = message.replace(`{${key}}`, context[key]);
      }
    }
    return message;
  }

  private getMessage(key: string): string {
    // You can implement your own message lookup logic here
    // For example, you can use a service to load messages from a file
    // or a backend API
    // const messages = {
    //   greeting: 'Hello {name}!',
    //   farewell: 'Goodbye {name}!',
    // };
    // return messages[key] || key;

    // const lang = 'en'; // get the current language from a service or some other means
    return this.data[this.currentLang][key] || key;
  }
}
