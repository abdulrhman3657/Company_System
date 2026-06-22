import { Routes } from "@angular/router";
import { Employees } from "./employees/employees";
import { Departments } from "./departments/departments";
import { Home } from "./home/home";
import { Auth } from "./auth/auth";

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'auth', component: Auth },
    { path: 'employees', component: Employees },
    { path: 'departments', component: Departments}
]