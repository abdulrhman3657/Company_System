import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { AuthRequest, TokenResponse } from '../models/auth';
import { ApiResponse } from '../models/api-response';
import { User } from '../models/User';
import { tap } from 'rxjs';

@Service()
export class AuthApi {
    private http = inject(HttpClient);
    private apiUrl ='http://localhost:5273/api/Auth';
    private tokenKey = 'access_token';

    register(request: AuthRequest) {
        // post /api/auth/register, body: { username, password }
        return this.http.post<ApiResponse<User>>(`${this.apiUrl}/register`, request);
    }

    login(request: AuthRequest) {
        return this.http.post<ApiResponse<TokenResponse>>(`${this.apiUrl}/login`, request)
            // pipe run this code before the final subscriber receives the result
            .pipe(
                // do the side effect code without changing the response
                tap((response) => {
                    // store accessToken after successful login
                    if (response.success && response.data?.accessToken) {
                        localStorage.setItem(this.tokenKey, response.data.accessToken);
                    }
                })
            )
    }

    logout() {
        localStorage.removeItem(this.tokenKey);
    }

    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    isLoggedIn() {
        return this.getToken() !== null;
    }

    editUser(id: string, username: string) {
        return this.http.put<ApiResponse<User>>(`${this.apiUrl}/${id}`, { username });
    }

    deleteUser(id: string) {
        return this.http.delete<ApiResponse<User>>(`${this.apiUrl}/${id}`);
    }

    // helper method
    getCurrentUserFromToken() {
    const token = this.getToken();

    if (!token) {
        return null;
    }

    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));

    return {
        id: decodedPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
        username: decodedPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        role: decodedPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    };
    }
}
