import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonList, IonItem, IonCard, IonCardContent, IonButton, IonFab, IonFabButton, IonIcon, IonAlert } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, lockClosedOutline } from 'ionicons/icons';
import { Playlist } from 'src/app/models/IPlaylist.model';
import { User } from 'src/app/models/IUser.model';
import { Router } from '@angular/router';
import { PlaylistService } from 'src/app/services/playlist.service';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CreatePlaylistComponent } from 'src/app/components/playlist/create-playlist/create-playlist.component';
import { EditPlaylistComponent } from 'src/app/components/playlist/edit-playlist/edit-playlist.component';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
  standalone: true,
  imports: [IonAlert, IonIcon, IonFabButton, IonFab, IonButton, IonCardContent,
    IonCard, IonItem, IonList, IonButtons, IonContent, IonHeader, IonTitle,
    IonToolbar, CommonModule, FormsModule, IonMenuButton]
})
export class PlaylistPage implements OnInit {

  popover: HTMLIonPopoverElement = {} as HTMLIonPopoverElement;
  playlistsList: Playlist[] = [];
  user: User = {} as User;
  alertButtons = [{ text: 'Ok' }];

  playListToDelete: Playlist = {} as Playlist;

  isDeletePlaylistOpen = false;

  isAlertOpen = false;

  errorMessage: string = '';

  deletePlaylistButtons = [
    {
      text: 'Si',
      handler: () => {
        this.confirmDeletePlaylist();
        this.setDeletePlaylistOpen(false);
      }
    },
    {
      text: 'No',
      handler: () => {
        this.setDeletePlaylistOpen(false);
        this.playListToDelete = { id: '', name: '', userId: '' };
      }
    }
  ];

  constructor(private router: Router, private playlistService: PlaylistService
    , private popoverController: PopoverController, private storage: Storage) {
    addIcons({ add, lockClosedOutline });
  }

  ngOnInit() {
    this.storage.get('user').then((user) => {
      this.user = user;
      this.loadPlaylists();
    });
  }

  loadPlaylists() {
    if (!this.user.id || !this.user.token) return;

    this.playlistService.getAllPlaylists(this.user.id, this.user.token).subscribe((response) => {
      this.playlistsList = response.data;
      if (this.playlistsList && this.playlistsList.length === 0) {
        this.errorMessage = 'No se encontraron listas de reproducción';
        this.setOpen(true);
      }
    });
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  setDeletePlaylistOpen(isOpen: boolean) {
    this.isDeletePlaylistOpen = isOpen;
  }

  selectPlaylist(playlist: Playlist) {
    this.router.navigate(['/channel/' + playlist.id]);
  }

  deletePlaylist(playlist: Playlist) {
    this.playListToDelete = playlist;
    this.setDeletePlaylistOpen(true);
  }

  confirmDeletePlaylist() {
    if (!this.playListToDelete.id || !this.user.token) return;

    this.playlistService.deletePlaylist(this.playListToDelete.id, this.user.token).subscribe(() => {
      this.playListToDelete = { id: '', name: '', userId: '' };
      this.loadPlaylists();
    });
  }

  async presentCreatePlaylistPopover() {
    this.popover = await this.popoverController.create({
      component: CreatePlaylistComponent,
      translucent: true,
      backdropDismiss: true,
    });
    this.popover.onDidDismiss().then(() => {
      this.loadPlaylists();
    });
    return await this.popover.present();
  }

  async presentEditPlaylistPopover(playlist: Playlist) {
    this.popover = await this.popoverController.create({
      component: EditPlaylistComponent,
      componentProps: {
        playlist: playlist
      },
      translucent: true,
      backdropDismiss: true,
    });
    this.popover.onDidDismiss().then(() => {
      this.loadPlaylists();
    });
    return await this.popover.present();
  }
}
