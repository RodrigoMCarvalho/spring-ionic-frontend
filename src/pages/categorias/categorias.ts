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

  items: CategoriaDTO[];

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
      error => {
        console.log(error);
      });
  }

}
