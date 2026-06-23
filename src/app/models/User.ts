export interface User {
    id: string;
    username: string;
    passwordHash: string;
    role: string;
    refreshToken: string | null;
    refreshTokenExpiryTime: string | null;
}