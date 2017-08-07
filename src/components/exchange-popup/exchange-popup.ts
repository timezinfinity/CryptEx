import { Component } from '@angular/core';
import { ExchangeService } from '../../services/exchange.service';
import { Exchange } from '../../services/exchanges/exchange.interface';

@Component({
  selector: 'exchange-popup',
  templateUrl: 'exchange-popup.html'
})
export class ExchangePopupComponent {

  constructor(private exchangeService: ExchangeService) {
  }

  private close(item: any) {
    this.exchangeService.setCurrentExchange(item);
  }
}
