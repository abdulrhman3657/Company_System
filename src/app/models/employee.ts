import { Department } from "./department";

export interface Employee {
    id?: number;
    firstName: string;
    lastName: string;
    salary: number;
    departmentId?: number | null;
    department?: Department | null;
}