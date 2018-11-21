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

    findByEmail(email : string) : Observable<ClienteDTO> {

      return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    getImageFromBucket(id: string) : Observable<any> {
      let url = `${API_CONFIG.baseUrl}/cp${id}.jpg`

      return this.http.get(url, {responseType : 'blob'});
    }
}
