import { I18nService } from 'src/app/localshared/services/i18n.service';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import en from '../../../assets/i18n/en.json';
import fr from '../../../assets/i18n/fr.json';

@Pipe({ name: 'messageTranslate', pure: false })
export class MessageTranslatePipe implements PipeTransform {
  constructor(private translate: TranslateService, private i18nService: I18nService) {}

  transform(key: string, args?: any): string {
    return this.i18nService.getJsonValueI18n(key, args);
  }
}
