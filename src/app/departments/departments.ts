import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { DepartmentApi } from '../services/department-api';
import { Department } from '../models/department';

@Component({
  selector: 'app-departments',
  imports: [],
  templateUrl: './departments.html',
  styleUrl: './departments.css',
})

export class Departments {
  private departmentApi = inject(DepartmentApi);
  private cdr = inject(ChangeDetectorRef);

    departments: Department[] = [];
    department: Department | null = null;
    responseMessage = '';
    responseSuccess = false;
    departmentId: number | null = null;
    addDepartmentSuccessMessage = '';

  getDepartments() {
    this.departmentApi.getDepartments().subscribe({
      next: (response) => {
        this.responseSuccess = response.success;
        this.responseMessage = response.message;
        this.departments = response.data;
        console.log(response)
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.responseSuccess = error.error.success;
        this.responseMessage = error.error.message;
      }
    })
  }

  getDepartmentById(id: number) {

    this.departmentId = id;

    this.departmentApi.getDepartmentById(id).subscribe({
      next: (response) => {
        this.responseSuccess = response.success;
        this.responseMessage = response.message;
        this.department = response.data;
        console.log(response);
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.responseSuccess = error.error.success;
        this.responseMessage = error.error.message;
      }
    })
  }

  addDepartment(department: Department) {
    this.departmentApi.addDepartment(department).subscribe({
      next: (response) => {
        this.responseSuccess = response.success;
        this.responseMessage = response.message;
        this.addDepartmentSuccessMessage = response.message;
        console.log(response);
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.responseSuccess = error.error.success;
        this.responseMessage = error.error.message;
      }
    })
  }
}
