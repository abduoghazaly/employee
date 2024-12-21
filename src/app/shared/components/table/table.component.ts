import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';

export interface ITableColumn {
  label: string;
  field: string;
}

@Component({
  selector: 'app-table',
  imports: [TableModule, TranslateModule, CommonModule, NgTemplateOutlet],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  items = input.required<any[]>();
  headers = input.required<ITableColumn[]>();
  actionTemplate = input<any>();
}
