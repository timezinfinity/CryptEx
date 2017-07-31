export interface TickerSymbol {
  DisplayName: string;
  CurrencyPair: string;
  LastValue: any;
  LowestAsk: any;
  HighestBid: any;
  PercentChange: number;
  BaseVolume: any;
  QuoteVolume: any;
  IsFrozen: any;
  High24Hr: any;
  Low24Hr: any;
  State: any;
}

export interface SymbolChartData {
  Date: any;
  High: number;
  Low: number;
  Open: number;
  Close: number;
  Volume: number;
  QuoteVolume: number;
  WeightedAverage: number;
}
