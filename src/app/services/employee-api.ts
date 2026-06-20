import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

interface EmployeeResponse  {
    data: any[];
}

@Service()
export class EmployeeApi {
    private http = inject(HttpClient)

    private apiUrl = 'http://localhost:5273/api/employee';

    // get all employees
    getEmployees() {
        return this.http.get<EmployeeResponse>(this.apiUrl);
    }
}