import { KeyValuePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  CountryISO,
  IntlInputTelComponent,
  SearchCountryField,
} from 'p-intl-input-tel';

@Component({
  selector: 'app-intl-tel-input-text',
  imports: [
    IntlInputTelComponent,
    ReactiveFormsModule,
    KeyValuePipe,
    TranslateModule,
  ],
  templateUrl: './intl-tel-input-text.component.html',
  styleUrl: './intl-tel-input-text.component.scss',
})
export class IntlTelInputTextComponent {
  control = input.required<FormControl>();
  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;
  favoriteCountries = [CountryISO.Egypt, CountryISO.SaudiArabia];

  errorMessages: { [key: string]: (errorValue: any) => string } = {
    required: () => 'validations.required',
  };

  getErrorMessage(errorKey: string, errorValue: any): string {
    const message = this.errorMessages[errorKey];
    return message ? message(errorValue) : 'validations.invalid';
  }
}
