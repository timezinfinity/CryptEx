import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ExchangeService } from '../../services/exchange.service';

@Component({
  selector: 'page-exchange',
  templateUrl: 'exchange.html'
})
export class ExchangePage {

  constructor(public navCtrl: NavController, public exchangeService: ExchangeService) {

  }

}
