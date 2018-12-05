import { API_CONFIG } from './../../config/api.config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id'); //obtém o id que foi passado pela página de categorias
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
        this.items = response['content']; //atributo aonde o Spring envia os dados. OBS: Pode ser visto através do Postman
        this.loadImageUrls();
      },
      error => {});
  }

  loadImageUrls() {
    for (var i=0; i < this.items.length; i++){
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        error => {});
    }
  }

  showDetails(){
    this.navCtrl.push('ProdutoDetailPage');
  }
}
