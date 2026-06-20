import { Component, inject } from '@angular/core';
import { EmployeeApi } from '../services/employee-api';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employees',
  imports: [],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})

export class Employees {
  private employeeApi = inject(EmployeeApi)

  employees: Employee[] = [];
  responseMessage = '';
  responseSuccess = false;

  getEmployees(){

    console.log("getting employees...")

    this.employeeApi.getEmployees().subscribe({
      next: (response) => {
        this.responseSuccess = response.success;
        this.responseMessage = response.message;
        this.employees = response.data;
        console.log(response);
      },
      error: (error) => {
        this.responseSuccess = error.success;
        this.responseMessage = error.message;
        console.log(error);
      }
    })
  }
}
