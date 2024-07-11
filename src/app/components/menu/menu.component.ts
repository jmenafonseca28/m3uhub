import { Component, OnInit } from '@angular/core';
import { IonContent, IonMenu, IonList, IonMenuToggle, IonItem, IonLabel } from '@ionic/angular/standalone';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonMenu,
    IonContent, IonMenuToggle, IonItem, IonLabel, RouterLink]
})
export class MenuComponent implements OnInit {

  isLogged = false;

  constructor(private storage: Storage, private router: Router) { }

  async ngOnInit() {
    await this.storage.create();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkLoginStatus();
      }
    });
  }

  async checkLoginStatus() {
    if (await this.storage.get('user') !== null) {
      this.isLogged = true;
    } else {
      const path = window.location.pathname;
      this.isLogged = false;
      if (path !== '/register' && path !== '/login') this.router.navigate(['/login']);
    }
    this.updateMenuState();
  }

  updateMenuState() {
    const menu = document.getElementById("menu") as HTMLInputElement;
    menu && (menu.disabled = !this.isLogged);
  }

  logout(): void {
    this.storage.remove('user');
    this.isLogged = false;
    this.router.navigate(['/login']);
  }

}
