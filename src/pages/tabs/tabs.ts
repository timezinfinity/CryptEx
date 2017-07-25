import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { ExchangePage } from '../exchange/exchange';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabExchange = ExchangePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
