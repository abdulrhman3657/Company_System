import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { EmployeeApi } from '../services/employee-api';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employees',
  imports: [],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})

export class Employees {
  private employeeApi = inject(EmployeeApi);
  private cdr = inject(ChangeDetectorRef);

  employees: Employee[] = [];
  employee: Employee | null = null;
  responseMessage = '';
  responseSuccess = false;
  employeeId: number | null = null;
  addEmployeeSuccessMessage = ''

  getEmployees() {

    console.log("getting employees...")

    this.employeeApi.getEmployees().subscribe({
      next: (response) => {
        // responseSuccess is true
        this.responseSuccess = response.success;
        this.responseMessage = response.message;
        this.employees = response.data;
        this.cdr.detectChanges();
        console.log(response);
      },
      error: (error) => {
        // responseSuccess is false
        this.responseSuccess = error.error.success;
        this.responseMessage = error.error.message;
        console.log(error);
      }
    })
  }

  getEmployeeById(id: number) {

    this.employeeId = id;

    this.employeeApi.getEmployeeById(id).subscribe({
      next: (response) => {
        this.responseSuccess = response.success;
        this.responseMessage = response.message;
        this.employee = response.data;
        this.cdr.detectChanges();
        console.log(response);
      },
      error: (error) => {
        this.responseSuccess = error.error.success;
        this.responseMessage = error.error.message;
        console.log(error);
      }
    })

  }

  addEmployee(employee: Employee) {
    this.employeeApi.addEmployee(employee).subscribe({
      next: (response) => {
        this.responseSuccess = response.success;
        this.responseMessage = response.message;
        this.addEmployeeSuccessMessage = response.message;
        this.cdr.detectChanges();
        console.log(response);
      },
      error: (error) => {
        this.responseSuccess = error.error.success;
        this.responseMessage = error.error.message;
        console.log(error);
      }
    })
  }
}
