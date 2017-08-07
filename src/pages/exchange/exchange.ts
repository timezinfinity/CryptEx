import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { ExchangeService } from '../../services/exchange.service';
import { TickerSymbol } from '../../models';
import { ExchangeDetailPage } from '../exchange-detail/exchange-detail';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { fadeInAnimation } from '../../animations/index';
import { ExchangePopupComponent } from '../../components/exchange-popup/exchange-popup';

@Component({
  selector: 'page-exchange',
  templateUrl: 'exchange.html',
  animations: [
    trigger('symbolState', [
      state('*', style({
        background: 'transparent'
      })),
      transition('* => positive', animate(1500, keyframes([
        style({ background: 'transparent', offset: 0 }),
        style({ background: 'green', offset: 0.5 }),
        style({ background: 'transparent', offset: 1 }),
      ]))),
      transition('positive => positive', animate(1500, keyframes([
        style({ background: 'transparent', offset: 0 }),
        style({ background: 'green', offset: 0.5 }),
        style({ background: 'transparent', offset: 1 }),
      ]))),
      transition('* => negative', animate(1500, keyframes([
        style({ background: 'transparent', offset: 0 }),
        style({ background: 'red', offset: 0.5 }),
        style({ background: 'transparent', offset: 1 }),
      ]))),
      transition('negative => negative', animate(1500, keyframes([
        style({ background: 'transparent', offset: 0 }),
        style({ background: 'red', offset: 0.5 }),
        style({ background: 'transparent', offset: 1 }),
      ]))),
    ])
  ],
})
export class ExchangePage {

  private detailPage = ExchangeDetailPage;

  public ticker: TickerSymbol[];

  constructor(public navCtrl: NavController, public exchangeService: ExchangeService, public popoverController: PopoverController) {
    this.exchangeService.Ticker$.subscribe(this.onTickerUpdate.bind(this));
    this.navCtrl.config.setTransition('md-transition', this.navCtrl.config.getTransition('ios-transition'));
  }

  private onTickerUpdate(data: TickerSymbol[]) {
    this.ticker = data.sort((a, b) => { return a.DisplayName > b.DisplayName ? 1 : -1 });
  }

  private presentExchangeList(event: any) {
    let popover = this.popoverController.create(ExchangePopupComponent);
    popover.present({
      ev: event
    });
  }
}
