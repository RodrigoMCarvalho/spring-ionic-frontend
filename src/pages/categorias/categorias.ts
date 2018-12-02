import { API_CONFIG } from './../../config/api.config';
import { CategoriaDTO } from './../../models/categoria.dto';
import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  items: CategoriaDTO[]; //lista que será exposta na página

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public CategoriaService : CategoriaService) {
  }

  ionViewDidLoad() {
    this.CategoriaService.findAll()
      .subscribe(response => {
        //console.log(response); imprime no console
        this.items = response;  //armazena a resposta na variável items
      },
      error => {});
  }

  showProdutos() {
    this.navCtrl.push('ProdutosPage');
  }
}
