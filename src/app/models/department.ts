import { Employee } from "./employee";

export interface Department {
    Id: number;
    Name: string;
    Employee?: Employee
}