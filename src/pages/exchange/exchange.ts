import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ExchangeService } from '../../services/exchange.service';
import { TickerSymbol } from '../../models';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'page-exchange',
  templateUrl: 'exchange.html',
  animations: [
    trigger('symbolState', [
      state('*', style({
        background: 'transparent'
      })),
      transition('* => positive', animate(1500, keyframes([
        style({ background: 'transparent', offset: 0}),
        style({ background: 'green', offset: 0.5}),
        style({ background: 'transparent', offset: 1}),
      ]))),
      transition('* => negative', animate(1500, keyframes([
        style({ background: 'transparent', offset: 0}),
        style({ background: 'red', offset: 0.5}),
        style({ background: 'transparent', offset: 1}),
      ]))),
    ])
  ]
})
export class ExchangePage {

  public ticker: TickerSymbol[];

  constructor(public navCtrl: NavController, public exchangeService: ExchangeService) {
    this.exchangeService.ticker$.subscribe(this.onTickerUpdate.bind(this));

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

  private onTickerUpdate(data: TickerSymbol[]) {
    this.ticker = data.sort((a, b) => { return a.DisplayName > b.DisplayName ? 1 : -1 });
  }

}
