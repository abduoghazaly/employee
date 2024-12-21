import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { API_URL } from '../core/model/api-url';
import { IEmployee } from '../model/employee.model';
import { FormBuilder, Validators } from '@angular/forms';
import { LETTERS_ONLY_REGEX } from '../shared/utilities/regex';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  http = inject(HttpClient);
  private fb = inject(FormBuilder);
  employees = signal<IEmployee[]>([]);
  form = this.fb.group({
    employeeId: this.fb.control<number | null>(null),
    employeeFirstName: [
      '',
      [Validators.required, Validators.pattern(LETTERS_ONLY_REGEX)],
    ],
    employeeLastName: [
      '',
      [Validators.required, Validators.pattern(LETTERS_ONLY_REGEX)],
    ],
    employeePhone: ['', [Validators.required]],
    employeeEmail: ['', [Validators.required, Validators.email]],
    employeeSalary: this.fb.control<number | null>(null, [Validators.required]),
  });

  resetForm() {
    this.form.reset();
    this.form.patchValue({
      employeeId: null,
      employeeFirstName: '',
      employeeLastName: '',
      employeeEmail: '',
      employeePhone: '',
      employeeSalary: null,
    });
  }

  getEmployees(search: string, mock: boolean = false): Observable<IEmployee[]> {
    if (mock)
      return of(
        this.employees().filter((x) =>
          search
            ? [x.employeeFirstName, x.employeeLastName].join().includes(search)
            : true
        )
      );
    let params = new HttpParams();
    params = params.append('search', search);
    return this.http.get<IEmployee[]>(API_URL.employees, { params });
  }

  getEmployee(id: number, mock: boolean = false) {
    if (mock) {
      return of(this.employees().find((x) => x.employeeId == id));
    }
    return this.http.get(API_URL.employee(id));
  }

  createEmployee(employee: IEmployee, mock: boolean = false) {
    if (mock) {
      employee.employeeId =
        this.employees().length > 0
          ? this.employees()[this.employees().length - 1]?.employeeId + 1
          : 1;
      this.employees.update((e) => [...e, employee]);
      this.resetForm();
      return of('created successfully');
    }
    return this.http.post(API_URL.employees, employee);
  }

  updateEmployee(employee: IEmployee, mock: boolean = false) {
    if (mock) {
      this.employees.update((e) =>
        e.map((x) => (x.employeeId == employee.employeeId ? employee : x))
      );
      this.resetForm();
      return of('update successfully');
    }
    return this.http.put(API_URL.employee(employee.employeeId), employee);
  }

  deleteEmployee(employee: IEmployee, mock: boolean = false) {
    if (mock) {
      this.employees.update((e) =>
        e.filter((x) => x.employeeId != employee.employeeId)
      );
      return of('deleted successfully');
    }
    return this.http.delete(API_URL.employee(employee.employeeId));
  }
}
