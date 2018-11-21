import { API_CONFIG } from './../config/api.config';
import { LocalUser } from './../models/localUser';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {  //propagar os erros

    constructor(public storage : StorageService){
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let localUser = this.storage.getLocalUser();
        let N = API_CONFIG.baseUrl.length; //tamanho do link
        let requestToApi = req.url.substring(0, N); //se a requisição é para a API

        if(localUser && requestToApi){
          const autheReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)}); //clonar a requisição original, adicionando o Authorization e token
          return next.handle(autheReq);
        }
        else {
          return next.handle(req); //propaga a requisição sem adicionar cabeçalho
        }
    }
  }

    export const AuthInterceptorProvider = {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
  };
