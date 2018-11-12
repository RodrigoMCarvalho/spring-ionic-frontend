import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {  //propagar os erros

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("PASSOU NO INTERCEPTOR")
        return next.handle(req)
        .catch((error, caught) => {

          let errorObj = error;
          if(errorObj.error){
            errorObj = errorObj.error;
          }
          if(!errorObj.status){  //teste caso nao seja JSON
            errorObj = JSON.parse(errorObj);
          }

          console.log("Erro detectado pelo interceptor");
          console.log(errorObj);
          return Observable.throw(error);
        }) as any;
    }
  }

    export const ErrorInterceptorProvider = {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
  };

