import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ExchangeService } from '../../services/exchange.service';
import { TickerSymbol } from '../../models';

@Component({
  selector: 'page-exchange',
  templateUrl: 'exchange.html'
})
export class ExchangePage {

  public ticker: TickerSymbol[];

  constructor(public navCtrl: NavController, public exchangeService: ExchangeService) {
    this.exchangeService.tickerUpdate.subscribe((data) => { this.ticker = data; });
  }

}
