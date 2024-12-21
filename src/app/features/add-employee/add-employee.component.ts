import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextComponent } from '../../shared/components/input-text/input-text.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { EmployeeService } from '../../services/employee.service';
import { IntlTelInputTextComponent } from '../../shared/components/intl-tel-input-text/intl-tel-input-text.component';
import { InputNumberComponent } from '../../shared/components/input-number/input-number.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IEmployee } from '../../model/employee.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-employee',
  imports: [
    ReactiveFormsModule,
    InputTextComponent,
    TranslateModule,
    ButtonModule,
    IntlTelInputTextComponent,
    InputNumberComponent,
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent {
  employeeService = inject(EmployeeService);
  destroyRef = inject(DestroyRef);
  messageService = inject(MessageService);

  addEmployeeDrawer = input<boolean>();
  addEmployeeDrawerChange = output<boolean>();

  form = this.employeeService.form;

  save() {
    this.form.markAllAsTouched();
    console.log(this.form);

    if (this.form.invalid) return;
    if (this.form.controls.employeeId.value) {
      this.employeeService
        .updateEmployee(this.form.value as unknown as IEmployee, true)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',

              detail: 'Employee data updated',
            }),
              this.addEmployeeDrawerChange.emit(false);
          },
        });
    } else {
      this.employeeService
        .createEmployee(this.form.value as unknown as IEmployee, true)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Employee add to our team',
            }),
              this.addEmployeeDrawerChange.emit(false);
          },
        });
    }
  }
}
