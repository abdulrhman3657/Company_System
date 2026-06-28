import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DepartmentApi } from '../services/department-api';
import { Department } from '../models/department';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-departments',
  imports: [FormsModule],
  templateUrl: './departments.html',
  styleUrl: './departments.css',
})

export class Departments implements OnInit {
  private departmentApi = inject(DepartmentApi);
  private cdr = inject(ChangeDetectorRef);

  departments: Department[] = [];
  department: Department | null = null;
  responseMessage = '';
  responseSuccess = false;
  departmentId: number | null = null;
  addDepartmentSuccessMessage = '';
  showAddForm = false;
  newDepartment: Department = {
    name: ''
  };
  editingDepartment: Department | null = null;

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments() {
    this.departmentApi.getDepartments().subscribe({
      next: (response) => {
        this.responseSuccess = response.success;
        this.responseMessage = response.message;
        this.departments = response.data ?? [];
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
        this.showAddForm = false;
        this.resetNewDepartment();
        this.getDepartments();
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.responseSuccess = error.error.success;
        this.responseMessage = error.error.message;
      }
    })
  }

  startAdd() {
    this.showAddForm = true;
    this.editingDepartment = null;
    this.responseMessage = '';
  }

  cancelAdd() {
    this.showAddForm = false;
    this.resetNewDepartment();
  }

  resetNewDepartment() {
    this.newDepartment = {
      name: ''
    };
  }

  saveAdd() {
    if (!this.newDepartment.name.trim()) {
      return;
    }

    this.addDepartment(this.newDepartment);
  }

  startEdit(department: Department) {
    this.editingDepartment = {
      id: department.id,
      name: department.name
    };
    this.showAddForm = false;
    this.responseMessage = '';
  }

  cancelEdit() {
    this.editingDepartment = null;
  }

  saveEdit() {
    if (this.editingDepartment?.id == null) {
      return;
    }

    this.editDepartment(this.editingDepartment.id, this.editingDepartment);
  }

  editDepartment(id: number, department: Department) {
    this.departmentId = id;

    this.departmentApi.editDepartment(id, department).subscribe({
      next: (response) => {
        this.responseSuccess = response.success;
        this.responseMessage = response.message;
        this.department = response.data;
        this.editingDepartment = null;
        this.getDepartments();
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.responseSuccess = error.error.success;
        this.responseMessage = error.error.message;
      }
    })
  }

  deleteDepartment(id: number) {
    this.departmentId = id;

    this.departmentApi.deleteDepartment(id).subscribe({
      next: (response) => {
        this.responseSuccess = response.success;
        this.responseMessage = response.message;

        this.departments = this.departments.filter(department => department.id !== id);

        if (this.department?.id === id) {
          this.department = null;
        }

        this.cdr.detectChanges();
      },
      error: (error) => {
        this.responseSuccess = error.error.success;
        this.responseMessage = error.error.message;
      }
    })
  }
}
