export interface TickerSymbol {
  CurrencyPair: string;
  LastValue: number;
  LowestAsk: number;
  HighestBid: number;
  PercentChange: number;
  BaseVolume: number;
  QuoteVolume: number;
  IsFrozen: boolean;
  High24Hr: number;
  Low24Hr: number;
}
