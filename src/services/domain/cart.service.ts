import { StorageService } from './../storage.service';
import { Injectable } from '@angular/core';
import { Cart } from '../../models/cart';
import { ProdutoDTO } from '../../models/produto.dto';

@Injectable()
export class CartService{

  constructor(public storage: StorageService){
  }

  createOrClearCart(): Cart {
    let cart: Cart = {items:[]};  //cria um carrinho vazio
    this.storage.setCart(cart);  //armazena ele no localStorage
    return cart; //retorna o cart
  }

  getCart(): Cart {
    let cart: Cart = this.storage.getCart();
    if(cart == null){
      cart = this.createOrClearCart();  // se o cart não existir, deverá ser criado
    }
    return cart; //retorna um cart novo ou o armazenado no storage
  }

  addProduto(produto: ProdutoDTO) : Cart {
    let cart = this.getCart();  // trata se o carrinho existe
    let position = cart.items.findIndex(x => x.produto.id == produto.id)    //encontrar a posição de um elemento
    if(position == -1) {  //findIndex retorna -1 se o produto nao existir
      cart.items.push({quantidade: 1, produto: produto});
    }
    this.storage.setCart(cart);
    return cart;
  }
}
