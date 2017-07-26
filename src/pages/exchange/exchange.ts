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
    //this.exchangeService.tickerUpdates().subscribe((data) => { this.ticker = data; });
    this.exchangeService.ticker$.subscribe(data => { this.ticker = data; });

/*     this.ticker = [{
        CurrencyPair: 'BTC_USDT',
        LastValue: '2500.054',
        LowestAsk: '2501',
        HighestBid: '2501',
        PercentChange: '-5.45',
        BaseVolume: '1000000',
        QuoteVolume: '100000',
        IsFrozen: false,
        High24Hr: '2600',
        Low24Hr: '2478'
      }] */
  }

}
