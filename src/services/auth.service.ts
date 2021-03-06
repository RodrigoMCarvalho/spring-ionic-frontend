import { CartService } from './domain/cart.service';
import { LocalUser } from './../models/localUser';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { JwtHelper } from 'angular2-jwt';
import { Thumbnail } from 'ionic-angular';


@Injectable()
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    public http : HttpClient,
    public storage: StorageService,
    public cartService: CartService){
  }

  authenticate(creds : CredenciaisDTO) {
    return this.http.post(
        `${API_CONFIG.baseUrl}/login`,
        creds,
        {
            observe: 'response',
            responseType: 'text' //para evitar um erro de parse em JSON num corpo vazio
        });
  }

  refreshToken() {
    return this.http.post(
        `${API_CONFIG.baseUrl}/auth/refresh_token`,
        {},
        {
            observe: 'response',
            responseType: 'text' //para evitar um erro de parse em JSON num corpo vazio
        });
  }

  sucessfullLogin(authorizationValue: string){
    let tok = authorizationValue.substring(7); //recortar o string a partir do sétimo caracter
    let user : LocalUser = {
      token: tok,
      email: this.jwtHelper.decodeToken(tok).sub //pega o email do token / sub -> pega apenas o email do json
    };
    this.storage.setLocalUser(user); //salvar o usuário no LocalStorage ( HTML5 )
    this.cartService.createOrClearCart();  //limpa o carrinho quando o usuario se loga
  }

  logout(){
    this.storage.setLocalUser(null);
  }


}
