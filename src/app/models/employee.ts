import { Department } from "./department";

export interface Employee {
    Id: number;
    FirstName: string;
    LastName: string;
    Salary: number;
    DepartmentId?: number;
    Department?: Department;
}