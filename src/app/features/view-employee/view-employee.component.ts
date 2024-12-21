import { Component, input } from '@angular/core';
import { IEmployee } from '../../model/employee.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-view-employee',
  imports: [TranslateModule],
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.scss',
})
export class ViewEmployeeComponent {
  employee = input.required<IEmployee>();
}
