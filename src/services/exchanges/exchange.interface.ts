import { TickerSymbol, SymbolChartData } from '../../models';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

export interface Exchange {
  Type: string;
  Ticker: Array<TickerSymbol>;
  TickerSubject: BehaviorSubject<Array<TickerSymbol>>;
  Ticker$: Observable<Array<TickerSymbol>>;

  connectToLiveFeed();
}
