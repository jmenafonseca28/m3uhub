import { Component, OnInit } from '@angular/core';
import { IonicModule, PopoverController } from "@ionic/angular";
import { FormsModule } from '@angular/forms';
import { Channel } from 'src/app/models/IChannel.model';
import { User } from 'src/app/models/IUser.model';
import { ChannelService } from 'src/app/services/channel.service';
import { Storage } from '@ionic/storage';
import { addIcons } from 'ionicons';
import { alertCircleOutline } from 'ionicons/icons';
import { ErrorMessages } from 'src/app/utils/ErrorMessages';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class CreateChannelComponent implements OnInit {

  channel: Channel = {} as Channel;
  user: User = {} as User;
  playlistId: string = '';

  isAlertOpen: boolean = false;
  errorMessage: string = '';
  alertButtons: string[] = ['Ok'];

  constructor(
    private popoverController: PopoverController, private channelService: ChannelService,
    private storage: Storage
  ) {
    addIcons({ alertCircleOutline });
  }

  ngOnInit() {
    this.storage.get('user').then((user) => {
      this.user = user;
    });

    this.channel.playlistId = this.playlistId;
  }

  private showMessages(message: string) {
    this.errorMessage = message;
    this.setOpen(true);
  }

  onSubmit() {

    if (!this.user.token || !this.channel.playlistId) {
      this.showMessages(ErrorMessages.TRY_AGAIN);
      return;
    };

    if (!this.channel.title || !this.channel.url) {
      this.showMessages(ErrorMessages.EMPTY_FIELDS);
      return;
    }

    this.channel.tvgId = this.channel.tvgName;

    this.channelService.createChannel(this.channel, this.user.token).subscribe({
      next: (response) => {
        this.closePopover();
      },
      error: (error) => {
        this.showMessages(ErrorMessages[error.name as keyof typeof ErrorMessages] || ErrorMessages.Default);
      }
    });
  }

  closePopover() {
    this.popoverController.dismiss();
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

}
