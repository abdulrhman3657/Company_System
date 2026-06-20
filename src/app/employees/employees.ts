import { Component, inject } from '@angular/core';
import { EmployeeApi } from '../services/employee-api';

@Component({
  selector: 'app-employees',
  imports: [],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})

export class Employees {
  private employeeApi = inject(EmployeeApi)

  employees: any = [];

  getEmployees(){

    console.log("getting employees...")

    this.employeeApi.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees.data;
        console.log(this.employees);
      },
      error: () => {
        console.log("failed...");
      }
    })
  }
}