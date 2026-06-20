export interface User {
    Id: number;
    Username: string;
    PasswordHash: string;
    Role: string;
    RefreshToken: string;
    RefreshTokenExpiryTime: Date; // ?
}