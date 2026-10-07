import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  storefrontOutline, cartOutline, searchOutline, cubeOutline, receiptOutline,
  moonOutline, personOutline, cardOutline, peopleOutline, schoolOutline,
} from 'ionicons/icons';


@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: false,
})
export class AboutPage implements OnInit {

  
constructor() {
  addIcons({
    storefrontOutline, cartOutline, searchOutline, cubeOutline, receiptOutline,
    moonOutline, personOutline, cardOutline, peopleOutline, schoolOutline,
  });
}

  ngOnInit() {
  }

}
