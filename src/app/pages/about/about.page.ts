import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonText, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoGithub, logoGitlab, logoLinkedin, mailOutline } from 'ionicons/icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [IonIcon, IonText, IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, CommonModule, FormsModule, IonList, IonItem, IonLabel]
})
export class AboutPage {

  constructor() {
    addIcons({ mailOutline, logoLinkedin, logoGithub, logoGitlab });
  }

}
