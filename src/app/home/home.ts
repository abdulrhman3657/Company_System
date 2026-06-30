import { ChangeDetectorRef, Component, inject, OnInit } from "@angular/core";
import { EmployeeApi } from "../services/employee-api";
import { DepartmentApi } from "../services/department-api";
import { AuthApi } from "../services/auth-api";


@Component({
    selector: 'app-home',
    imports: [],
    templateUrl: './home.html',
    styleUrl: './home.css'
})

export class Home implements OnInit {
    private employeeApi = inject(EmployeeApi);
    private departmentApi = inject(DepartmentApi);
    private authApi = inject(AuthApi);
    private cdr = inject(ChangeDetectorRef)

    username = '';
    role = '';
    employeeCount = 0;
    departmentCount = 0;

    ngOnInit() {
        const user = this.authApi.getCurrentUserFromToken();

        if(user) {
            this.username = user.username;
            this.role = user.role;
        }

        this.employeeApi.getEmployees().subscribe({
            next: (response) => {
                this.employeeCount = response.data?.length ?? 0;
                this.cdr.detectChanges()
            }
        });

        this.departmentApi.getDepartments().subscribe({
            next: (response) => {
                this.departmentCount = response.data?.length ?? 0;
                this.cdr.detectChanges();
            }
        });
    }
}