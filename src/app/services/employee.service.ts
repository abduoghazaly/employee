import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { of } from 'rxjs';
import { API_URL } from '../core/model/api-url';
import { IEmployee } from '../model/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  http = inject(HttpClient);
  employees = signal<IEmployee[]>([]);

  getEmployees(search: string, mock: boolean = false) {
    if (mock)
      return of(
        this.employees().filter((x) =>
          [
            ...x.employeeFirstName,
            ...x.employeeLastName,
            ...x.employeeEmail,
            ...x.employeePhone,
          ].includes(search)
        )
      );
    let params = new HttpParams();
    params = params.append('search', search);
    return this.http.get(API_URL.employees, { params });
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
      return of('created successfully');
    }
    return this.http.post(API_URL.employees, employee);
  }

  updateEmployee(employee: IEmployee, mock: boolean = false) {
    if (mock) {
      this.employees.update((e) =>
        e.map((x) => (x.employeeId == employee.employeeId ? employee : x))
      );
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
