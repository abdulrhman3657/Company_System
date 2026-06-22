import { HttpInterceptorFn } from "@angular/common/http";

// every HttpClient request passes through this function
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('access_token');

    // check if the user has saved JWT
    // if there is no login, continue the request unchanged
    if(!token) {
        return next(req);
    }

    // angular request are immutable, so you cannot directly edit req
    // you need to create a copy and add the Authorization header
    const authReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });

    // send the modified request forward
    return next(authReq);
}