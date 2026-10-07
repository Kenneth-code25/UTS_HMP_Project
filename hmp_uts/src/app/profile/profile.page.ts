import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  constructor(private animationCtrl: AnimationController) { }
  fadeInAvatar() {
    const avatarElement = document.querySelector('#myAvatar') as
      HTMLElement;
    const animation = this.animationCtrl
      .create()
      .addElement(avatarElement)
      .duration(5000) // Animation duration in milliseconds
      .iterations(3) // do animation 3 times
      .keyframes([
        { offset: 0, opacity: '0' }, // Start with full opacity
        { offset: 0.2, opacity: '0.2' },
        { offset: 0.4, opacity: '0.4' },
        { offset: 0.6, opacity: '0.6' },
        { offset: 0.8, opacity: '0.8' },
        { offset: 1, opacity: '1' },
      ]);
    animation.play();
  }
  SGAvatar() {
   const avatarElement = document.querySelector('#myAvatar') as HTMLElement;
    const animation = this.animationCtrl
        .create()
        .addElement(avatarElement)
      .duration(1200) // Animation duration in milliseconds
        .iterations(1) // do animation 1 time
        .keyframes([
            { offset: 0, transform: 'scale(1.0)' }, 
         
            { offset: 0.5, transform: 'scale(0.5)' }, 
            { offset: 1.0, transform: 'scale(1.2)' }, 
        ]);
    animation.play();
}

  ionViewDidEnter() {
    this.SGAvatar() ;
  }
  ngOnInit() {
  }

}