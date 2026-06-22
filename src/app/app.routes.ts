import { Routes } from "@angular/router";
import { Employees } from "./employees/employees";
import { Departments } from "./departments/departments";
import { Home } from "./home/home";

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'employees', component: Employees },
    { path: 'departments', component: Departments}
]