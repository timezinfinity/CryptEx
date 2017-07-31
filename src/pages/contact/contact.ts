import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { fadeInAnimation } from '../../animations/index';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(public navCtrl: NavController) {

  }

}
