import { CartService } from './../../services/domain/cart.service';
import { ProdutoService } from './../../services/domain/produto.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public cartService: CartService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let produto_id = this.navParams.get('produto_id'); //obtém o id enviado na navegação de protudos.ts
    let loader = this.presentLoading();
    this.produtoService.findById(produto_id)
      .subscribe(response => {
        this.item = response;
        loader.dismiss();
        this.getImageUrlIfExists();
      },
      error => {});
  }

  getImageUrlIfExists(){
    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
      },
      error => {});
  }

  addToCart(produto: ProdutoDTO){
    this.cartService.addProduto(produto); //adiciona o produto no carrinho
    this.navCtrl.setRoot('CartPage');  //navega para a pagina do carrinho
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
    });
    loader.present();
    return loader;
  }
}
