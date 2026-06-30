import { Routes } from "@angular/router";
import { Employees } from "./employees/employees";
import { Departments } from "./departments/departments";
import { Home } from "./home/home";
import { Auth } from "./auth/auth";
import { authGuard } from "./services/auth.guard";
import { Profile } from "./profile/profile";

export const routes: Routes = [
    { path: 'auth', component: Auth },
    { path: '', component: Home, canActivate: [authGuard] },
    { path: 'employees', component: Employees, canActivate: [authGuard] },
    { path: 'departments', component: Departments, canActivate: [authGuard]},
    { path: 'profile', component: Profile, canActivate: [authGuard] },
    { path: '**', redirectTo: '' }
]