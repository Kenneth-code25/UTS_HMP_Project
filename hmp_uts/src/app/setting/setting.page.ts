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

    if (document.body.classList.contains('theme-red')) {
      this.selectedTheme = 'red';
    } else if (document.body.classList.contains('theme-blue')) {
      this.selectedTheme = 'blue';
    }
  }
toggleDarkMode(event: any) {
    const isChecked = event.detail.checked;
    document.body.classList.toggle('dark', isChecked);
  }
  changeTheme(event: any) {
    this.selectedTheme = event.detail.value;

    // Hapus class tema warna sebelumnya
    document.body.classList.remove('theme-red', 'theme-blue');

    // Tambahkan class tema warna baru
    if (this.selectedTheme !== 'default') {
      document.body.classList.add(`theme-${this.selectedTheme}`);
    }
  }
}
