import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  pedido: PedidoDTO;
  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  formGroup: FormGroup; //formulário para controlar os dados de entrada

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuild: FormBuilder) {

      this.pedido = this.navParams.get('pedido'); //obter o objeto "pedido" que vier da outra página
      console.log(this.pedido);

      this.formGroup = this.formBuild.group({
        numeroDeParcelas: [1, Validators.required],
        "@type": ["pagamentoComCartao", Validators.required] //palavra que identifica a classe no json
      })
  }

  nextPage() {
    this.pedido.pagamento = this.formGroup.value;
    //console.log(this.pedido);
    this.navCtrl.setRoot('OrderConfirmationPage', { pedido: this.pedido });
  }

}
