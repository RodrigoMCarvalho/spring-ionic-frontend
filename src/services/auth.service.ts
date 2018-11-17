import { LocalUser } from './../models/localUser';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { JwtHelper } from 'angular2-jwt';


@Injectable()
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    public http : HttpClient,
    public storage: StorageService){
  }

  authenticate(creds : CredenciaisDTO) {
    return this.http.post(
        `${API_CONFIG.baseUrl}/login`,
        creds,
        {
            observe: 'response', //para evitar um erro de parse em JSON num corpo vazio
            responseType: 'text'
        });
}

  sucessfullLogin(authorizationValue: string){
    let tok = authorizationValue.substring(7); //recortar o string a partir do sétimo caracter
    let user : LocalUser = {
      token: tok,
      email: this.jwtHelper.decodeToken(tok) //pega o email do token
    };
    this.storage.setLocalUser(user); //salvar o usuário no LocalStorage ( HTML5 )
  }

  logout(){
    this.storage.setLocalUser(null);
  }


}
