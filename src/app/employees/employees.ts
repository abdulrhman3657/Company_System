import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeApi } from '../services/employee-api';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employees',
  imports: [FormsModule],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})

export class Employees implements OnInit {
  private employeeApi = inject(EmployeeApi);
  private cdr = inject(ChangeDetectorRef);

  employees: Employee[] = [];
  employee: Employee | null = null;
  responseMessage = '';
  responseSuccess = false;
  employeeId: number | null = null;
  addEmployeeSuccessMessage = ''
  showAddForm = false;
  newEmployee: Employee = {
    firstName: '',
    lastName: '',
    salary: 0,
    departmentId: null
  };

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {

    console.log("getting employees...")

    this.employeeApi.getEmployees().subscribe({
      next: (response) => {
        // responseSuccess is true
        this.responseSuccess = response.success;
        this.responseMessage = response.message;
        this.employees = response.data ?? [];
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
        this.showAddForm = false;
        this.resetNewEmployee();
        this.getEmployees();
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

  editingEmployee: Employee | null = null;

  startAdd() {
    this.showAddForm = true;
    this.editingEmployee = null;
    this.responseMessage = '';
  }

  cancelAdd() {
    this.showAddForm = false;
    this.resetNewEmployee();
  }

  resetNewEmployee() {
    this.newEmployee = {
      firstName: '',
      lastName: '',
      salary: 0,
      departmentId: null
    };
  }

  saveAdd() {
    if (this.newEmployee.departmentId == null) {
      return;
    }

    this.addEmployee(this.newEmployee);
  }

  startEdit(employee: Employee) {
    this.editingEmployee = { ...employee };
    this.showAddForm = false;
    this.responseMessage = '';
  }

  cancelEdit() {
    this.editingEmployee = null;
  }

  saveEdit() {
    if (this.editingEmployee?.id == null) {
      return;
    }

    this.editEmployee(this.editingEmployee.id, this.editingEmployee);
  }

  editEmployee(id: number, employee: Employee) {

    this.employeeId = id;

    this.employeeApi.editEmployee(id, employee).subscribe({
      next: (response) => {
        this.responseSuccess = response.success;
        this.responseMessage = response.message;
        this.employee = response.data;
        this.editingEmployee = null;

        this.getEmployees();
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.responseSuccess = error.error.success;
        this.responseMessage = error.error.message;
      }
    })
  }

  deleteEmployee(id: number) {

    this.employeeId = id;

    this.employeeApi.deleteEmployee(id).subscribe({
      next: (response) => {
        this.responseSuccess = response.success;
        this.responseMessage = response.message;

        this.employees = this.employees.filter(employee => employee.id !== id);

        if (this.employee?.id === id) {
          this.employee = null;
        }

        this.cdr.detectChanges();
      },
      error: (error) => {
        this.responseSuccess = error.error.success;
        this.responseMessage = error.error.message;
      }
    });
  }
}
