import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import en from '../../../assets/i18n/en.json';
import fr from '../../../assets/i18n/fr.json';

@Pipe({ name: 'messageTranslate', pure: false })
export class MessageTranslatePipe implements PipeTransform {
  private data = { en, fr };
  private currentLang = 'fr';

  constructor(private translateService: TranslateService) {}

  // transform(value: string, args: any): any {
  //   if (!value) return;
  //   let translation = this.translateService.instant(value);
  //   if (args) {
  //     const keys = Object.keys(args);
  //     keys.forEach((key) => {
  //       translation = translation.replace(`{{${key}}}`, args[key]);
  //     });
  //   }
  //   return translation;
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
