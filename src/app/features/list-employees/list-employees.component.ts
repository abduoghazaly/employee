import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { TranslateModule } from '@ngx-translate/core';
import {
  ITableColumn,
  TableComponent,
} from '../../shared/components/table/table.component';
import { EmployeeService } from '../../services/employee.service';
import { IEmployee } from '../../model/employee.model';
import { combineLatest, of, startWith, switchMap } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ViewEmployeeComponent } from '../view-employee/view-employee.component';

@Component({
  selector: 'app-list-employees',
  imports: [
    BreadcrumbComponent,
    TranslateModule,
    TableComponent,
    ButtonModule,
    DrawerModule,
    AddEmployeeComponent,
    ViewEmployeeComponent,
  ],
  providers: [],
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.scss',
})
export class ListEmployeesComponent {
  employeeService = inject(EmployeeService);
  confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService);
  destroyRef = inject(DestroyRef);

  addEmployeeDrawer = signal(false);
  viewEmployeeDrawer = false;
  selectedEmployee = signal<IEmployee | null>(null);
  search = signal<string>('');
  headers: ITableColumn[] = [
    { label: 'firstName', field: 'employeeFirstName' },
    { label: 'lastName', field: 'employeeLastName' },
    { label: 'phone', field: 'employeePhone' },
    { label: 'email', field: 'employeeEmail' },
    { label: 'salary', field: 'employeeSalary' },
  ];

  employees = toSignal(
    combineLatest([
      toObservable(this.search),
      toObservable(this.addEmployeeDrawer),
      toObservable(this.employeeService.employees),
    ]).pipe(
      startWith([]),
      switchMap(() => this.employeeService.getEmployees(this.search(), true))
    ),
    { initialValue: [] }
  );

  addEmployee() {
    this.employeeService.resetForm();
    this.addEmployeeDrawer.set(true);
  }

  editEmployee(employee: IEmployee) {
    this.employeeService.resetForm();
    this.employeeService.form.patchValue({
      employeeId: employee.employeeId,
      employeeFirstName: employee.employeeFirstName,
      employeeLastName: employee.employeeLastName,
      employeeEmail: employee.employeeEmail,
      employeePhone: employee.employeePhone,
      employeeSalary: employee.employeeSalary,
    });
    this.addEmployeeDrawer.set(true);
  }

  viewEmployee(employee: IEmployee) {
    this.selectedEmployee.set(employee);
    this.viewEmployeeDrawer = true;
  }

  deleteEmployee(employee: IEmployee, event: Event) {
    console.log(employee);
    console.log(event);

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this employee?',
      header: 'Delete Employee',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {
        this.employeeService
          .deleteEmployee(employee, true)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Confirmed',
                detail: 'Record deleted',
              });
            },
          });
      },
      reject: () => {},
    });
  }
}
