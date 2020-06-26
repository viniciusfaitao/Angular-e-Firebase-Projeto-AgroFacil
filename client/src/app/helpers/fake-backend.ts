import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    return of(null)
      .pipe(
        mergeMap(() => {
          if (
            request.url.endsWith('/users/authenticate') &&
            request.method === 'POST'
          ) {
            const filteredUsers = users.filter((user) => {
              return (
                user.username === request.body.username &&
                user.password === request.body.password
              );
            });

            if (filteredUsers.length) {
              const user = filteredUsers[0];
              const body = {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token',
              };

              return of(new HttpResponse({ status: 200, body: body }));
            } else {
              return throwError({
                error: { message: 'Usuario e/ou Senha incorreta' },
              });
            }
          }

          if (request.url.endsWith('/users') && request.method === 'GET') {
            if (
              request.headers.get('Authorization') === 'Bearer fake-jwt-token'
            ) {
              return of(new HttpResponse({ status: 200, body: users }));
            } else {
              return throwError({
                status: 401,
                error: { message: 'Não autorizado' },
              });
            }
          }

          if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
            if (
              request.headers.get('Authorization') === 'Bearer fake-jwt-token'
            ) {
              const urlParts = request.url.split('/');
              const id = parseInt(urlParts[urlParts.length - 1], 10);
              const matchedUsers = users.filter((item) => item.id === id);
              const user = matchedUsers.length ? matchedUsers[0] : null;

              return of(new HttpResponse({ status: 200, body: user }));
            } else {
              return throwError({
                status: 401,
                error: { message: 'Não autorizado' },
              });
            }
          }

          if (
            request.url.endsWith('/users/register') &&
            request.method === 'POST'
          ) {
            const newUser = request.body;

            const duplicateUser = users.filter(
              (user) => user.username === newUser.username
            ).length;
            if (duplicateUser) {
              return throwError({
                error: { message: 'Nome "' + newUser.username + '" ja existe' },
              });
            }

            newUser.id = users.length + 1;
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            return of(new HttpResponse({ status: 200 }));
          }

          if (
            request.url.match(/\/users\/\d+$/) &&
            request.method === 'DELETE'
          ) {
            if (
              request.headers.get('Authorization') === 'Bearer fake-jwt-token'
            ) {
              const urlParts = request.url.split('/');
              const id = parseInt(urlParts[urlParts.length - 1], 10);
              for (let i = 0; i < users.length; i++) {
                const user = users[i];
                if (user.id === id) {
                  users.splice(i, 1);
                  localStorage.setItem('users', JSON.stringify(users));
                  break;
                }
              }

              return of(new HttpResponse({ status: 200 }));
            } else {
              return throwError({
                status: 401,
                error: { message: 'Não autorizado' },
              });
            }
          }

          return next.handle(request);
        })
      )
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
