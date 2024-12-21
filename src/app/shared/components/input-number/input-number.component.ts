import { KeyValuePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FloatLabel } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-input-number',
  imports: [
    InputNumberModule,
    FloatLabel,
    ReactiveFormsModule,
    KeyValuePipe,
    TranslateModule,
  ],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss',
})
export class InputNumberComponent {
  control = input.required<FormControl>();
  label = input.required<string>();

  errorMessages: { [key: string]: (errorValue: any) => string } = {
    required: () => 'validations.required',
  };

  getErrorMessage(errorKey: string, errorValue: any): string {
    const message = this.errorMessages[errorKey];
    return message ? message(errorValue) : 'validations.invalid';
  }
}
