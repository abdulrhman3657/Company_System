import { HttpClient } from '@angular/common/http';
import { Service, inject  } from '@angular/core';
import { Employee } from '../models/employee';
import { ApiResponse } from '../models/api-response';


@Service()
export class EmployeeApi {
    private http = inject(HttpClient)

    private apiUrl = 'http://localhost:5273/api/employee';

    // get all employees
    getEmployees() {
        return this.http.get<ApiResponse<Employee[]>>(this.apiUrl);
    }

    // get employee by id
    getEmployeeById(id: number) {
        return this.http.get<ApiResponse<Employee>>(`${this.apiUrl}/${id}`);
    }

    // add a new Employee
    addEmployee(employee: Employee){
        return this.http.post<ApiResponse<Employee>>(this.apiUrl, employee);
    }
}
