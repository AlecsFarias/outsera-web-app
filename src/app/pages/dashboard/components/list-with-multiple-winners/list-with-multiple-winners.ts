import { Component, OnInit } from '@angular/core';
import {
  BaseTableComponent,
  TableColumn,
} from '../../../../components/base-table/base-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-with-multiple-winners',
  imports: [CommonModule, BaseTableComponent],
  templateUrl: './list-with-multiple-winners.html',
  styleUrl: './list-with-multiple-winners.scss',
})
export class ListWIthMultipleWinners implements OnInit {
  tableColumns: TableColumn[] = [
    { key: 'id', label: 'ID', width: '80px' },
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Função' },
    { key: 'status', label: 'Status', width: '120px' },
  ];

  tableData: any[] = [];
  filteredData: any[] = [];
  loading = false;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    // Simulando uma chamada para API
    setTimeout(() => {
      this.tableData = [
        {
          id: 1,
          name: 'João Silva',
          email: 'joao@email.com',
          role: 'Administrador',
          status: 'Ativo',
        },
        {
          id: 2,
          name: 'Maria Santos',
          email: 'maria@email.com',
          role: 'Editor',
          status: 'Ativo',
        },
        {
          id: 3,
          name: 'Pedro Costa',
          email: 'pedro@email.com',
          role: 'Visualizador',
          status: 'Inativo',
        },
        {
          id: 4,
          name: 'Ana Oliveira',
          email: 'ana@email.com',
          role: 'Editor',
          status: 'Ativo',
        },
        {
          id: 5,
          name: 'Carlos Pereira',
          email: 'carlos@email.com',
          role: 'Administrador',
          status: 'Ativo',
        },
      ];
      this.filteredData = [...this.tableData];
      this.loading = false;
    }, 1500);
  }

  onSearch(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.filteredData = [...this.tableData];
      return;
    }

    this.filteredData = this.tableData.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }
}
