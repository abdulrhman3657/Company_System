import { Routes } from "@angular/router";
import { Employees } from "./employees/employees";
import { Departments } from "./departments/departments";

export const routes: Routes = [
    { path: 'employees', component: Employees },
    { path: 'departments', component: Departments}
]