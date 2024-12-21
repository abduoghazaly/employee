import { KeyValuePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input-text',
  imports: [
    InputTextModule,
    FloatLabel,
    ReactiveFormsModule,
    KeyValuePipe,
    TranslateModule,
  ],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
})
export class InputTextComponent {
  control = input.required<FormControl>();
  label = input.required<string>();

  errorMessages: { [key: string]: (errorValue: any) => string } = {
    required: () => 'validations.required',
    pattern: (e) => 'validations.pattern',
    email: () => 'validations.email',
  };

  getErrorMessage(errorKey: string, errorValue: any): string {
    const message = this.errorMessages[errorKey];
    return message ? message(errorValue) : 'validations.invalid';
  }
}
