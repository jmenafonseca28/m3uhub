import { Component, OnInit } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/models/IUser.model';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Playlist } from 'src/app/models/IPlaylist.model';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-edit-playlist',
  templateUrl: './edit-playlist.component.html',
  styleUrls: ['./edit-playlist.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, RouterLink]
})
export class EditPlaylistComponent implements OnInit {

  playlist: Playlist = {} as Playlist;
  user: User = {} as User;
  isAlertOpen = false;
  errorMessage: string = '';

  alertButtons = ['Ok'];

  constructor(private popoverController: PopoverController, private playlistService: PlaylistService, private storage: Storage) { }

  ngOnInit() {
    this.storage.get('user').then((user) => {
      this.user = user;
    });
  }

  saveChanges() {
    if (!this.playlist.id || !this.user.token) return;


    this.playlistService.updatePlaylist(this.playlist, this.user.token).subscribe({
      next: (response) => {
        this.closePopover();
      },
      error: (error) => {
        this.closePopover();
        this.showMessage('Error al actualizar la playlist');
      }
    });
  }

  private showMessage(message: string) {
    this.errorMessage = message;
    this.setOpen(true);
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  closePopover() {
    this.popoverController.dismiss();
  }
}

