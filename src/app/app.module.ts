import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http'
import { IonicApp, IonicModule, IonicErrorHandler, PopoverController } from 'ionic-angular';
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
import { WindowSize } from '../utils/WindowSize';
import { CustomChartComponent } from '../components/custom-chart/custom-chart';
import { ExchangePopupComponent } from '../components/exchange-popup/exchange-popup';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    ExchangePage,
    ExchangeDetailPage,
    TabsPage,
    CandlestickChartComponent,
    VolumeChartComponent,
    CustomChartComponent,
    ExchangePopupComponent
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
    TabsPage,
    ExchangePopupComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ExchangeService,
    WindowSize,
    PopoverController,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
