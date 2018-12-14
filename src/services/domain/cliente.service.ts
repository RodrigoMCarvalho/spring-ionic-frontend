import { StorageService } from './../storage.service';
import { API_CONFIG } from './../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ClienteDTO } from '../../models/cliente.dto';
import { ResponseType } from '@angular/http';

@Injectable()
export class ClienteService {

    constructor(
      public http : HttpClient,
      public storage : StorageService){
    }

    findById(id : string) {
      return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    findByEmail(email : string) {  //retorna todos os dados do cliente, inclusive seus enderecos
      return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    getImageFromBucket(id: string) : Observable<any> {
      let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`

      return this.http.get(url, {responseType : 'blob'});
    }

    insert(obj: ClienteDTO) {
      return this.http.post(
        `${API_CONFIG.baseUrl}/clientes`,
        obj,
        {
          observe: 'response',
          responseType: 'text' //para evitar um erro de parse em JSON num corpo vazio
      });
    }
}
