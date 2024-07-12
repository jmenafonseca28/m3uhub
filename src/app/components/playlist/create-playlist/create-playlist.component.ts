import { Component, OnInit } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Playlist } from 'src/app/models/IPlaylist.model';
import { User } from 'src/app/models/IUser.model';
import { PlaylistService } from 'src/app/services/playlist.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class CreatePlaylistComponent implements OnInit {

  playlist: Playlist = {} as Playlist;
  user: User = {} as User;
  isAlertOpen = false;
  errorMessage: string = '';

  alertButtons = ['Ok'];


  constructor(private playlistService: PlaylistService, private storage: Storage,
    private popoverController: PopoverController) { }

  ngOnInit(): void {
    this.storage.get('user').then((user) => {
      this.user = user;
      this.playlist.userId = user.id;
    });
  }

  private showMessage(message: string) {
    this.errorMessage = message;
    this.setOpen(true);
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  onSubmit() {
    if (!this.user.token) return;

    if (!this.playlist.name || this.playlist.name.trim() === '') {
      this.showMessage('El nombre de la playlist es requerido');
      return;
    }

    this.playlistService.createPlaylist(this.playlist, this.user.token).subscribe({
      next: (response) => {
        this.closePopover();
      },
      error: (error) => {
        this.closePopover();
        this.showMessage('Algo salió mal');
      }
    });
  }

  closePopover() {
    this.popoverController.dismiss();
  }

}
