import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { ExchangePage } from '../pages/exchange/exchange';
import { ExchangeDetailPage } from '../pages/exchange-detail/exchange-detail';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ExchangeService } from '../services/exchange.service';
import { CandlestickChartComponent } from '../components/candlestick-chart/candlestick-chart';
import { VolumeChartComponent } from '../components/volume-chart/volume-chart';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    ExchangePage,
    ExchangeDetailPage,
    TabsPage,
    CandlestickChartComponent,
    VolumeChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    ExchangePage,
    ExchangeDetailPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ExchangeService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
