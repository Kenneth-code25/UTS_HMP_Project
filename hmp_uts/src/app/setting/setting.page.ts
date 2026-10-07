import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
  standalone: false,
})
export class SettingPage implements OnInit {
isDarkModeEnabled: boolean = false;
selectedTheme: string = 'default'; // Default theme
  constructor() { }

  ngOnInit() {
    this.isDarkModeEnabled = document.body.classList.contains('dark');
  }
toggleDarkMode(event: any) {
    const isChecked = event.detail.checked;
    document.body.classList.toggle('dark', isChecked);
  }
}
