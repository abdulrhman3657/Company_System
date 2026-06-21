import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ApiResponse } from '../models/api-response';
import { Department } from '../models/department';

@Service()
export class DepartmentApi {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:5273/api/employee';

    // get all departments
    getDepartments() {
        return this.http.get<ApiResponse<Department[]>>(this.apiUrl);
    }

    // get department by id
    getDepartmentById(id: number) {
        return this.http.get<ApiResponse<Department>>(`${this.apiUrl}/${id}`)
    }

    // add a new department
    addDepartment(department: Department){
        return this.http.post<ApiResponse<Department>>(this.apiUrl, department);
    }
}