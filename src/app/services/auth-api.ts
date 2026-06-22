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
}
