import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeApi } from '../services/employee-api';
import { Employee } from '../models/employee';
import { DepartmentApi } from '../services/department-api';
import { Department } from '../models/department';

@Component({
  selector: 'app-employees',
  imports: [FormsModule],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})

export class Employees implements OnInit {
  private employeeApi = inject(EmployeeApi);
  private cdr = inject(ChangeDetectorRef);
  private departmentApi = inject(DepartmentApi);

  departments: Department[] = [];
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
    this.getDepartments();
  }

  getEmployees() {

    console.log("getting employees...")

    this.employeeApi.getEmployees().subscribe({
      next: (response) => {
        // responseSuccess is true
        this.responseSuccess = response.success;
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

  getDepartments(){
    this.departmentApi.getDepartments().subscribe({
      next: (response) => {
        this.departments = response.data ?? [];
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.responseSuccess = error.error.success;
        this.responseMessage = error.error.message;
      }
    });
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
    const firstName = this.newEmployee.firstName.trim();
    const lastName = this.newEmployee.lastName.trim();

    if(!firstName || !lastName) {
      this.responseSuccess = false;
      this.responseMessage = 'First name and last name are required';
      this.cdr.detectChanges();
      return;
    }

    if (this.newEmployee.salary <= 0) {
      this.responseSuccess = false;
      this.responseMessage = 'Salary must be greater than 0';
      this.cdr.detectChanges();
      return;
    }

    if (this.newEmployee.departmentId == null) {
      this.responseSuccess = false;
      this.responseMessage = 'Department is required';
      this.cdr.detectChanges();
      return;
    }

    this.newEmployee.firstName = firstName;
    this.newEmployee.lastName = lastName;

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

    const firstName = this.editingEmployee.firstName.trim();
    const lastName = this.editingEmployee.lastName.trim();

    if (!firstName || !lastName) {
      this.responseSuccess = false;
      this.responseMessage = 'First name and last name are required';
      this.cdr.detectChanges();
      return;
    }

    if (this.editingEmployee.salary <= 0) {
      this.responseSuccess = false;
      this.responseMessage = 'Salary must be greater than 0';
      this.cdr.detectChanges();
      return;
    }

    if (this.editingEmployee.departmentId == null) {
      this.responseSuccess = false;
      this.responseMessage = 'Department is required';
      this.cdr.detectChanges();
      return;
    }

    this.editingEmployee.firstName = firstName;
    this.editingEmployee.lastName = lastName;

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
