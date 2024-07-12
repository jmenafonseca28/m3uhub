import { Component, OnInit } from '@angular/core';
import { Channel } from 'src/app/models/IChannel.model';
import { User } from 'src/app/models/IUser.model';
import { IonicModule, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ChannelService } from 'src/app/services/channel.service';
import { addIcons } from 'ionicons';
import { alertCircleOutline } from 'ionicons/icons';
import { ErrorMessages } from 'src/app/utils/ErrorMessages';
import { SuccessMessages } from 'src/app/utils/SuccessMessages';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-channel',
  templateUrl: './edit-channel.component.html',
  styleUrls: ['./edit-channel.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class EditChannelComponent implements OnInit {

  channel: Channel = {} as Channel;
  user: User = {} as User;

  isAlertOpen: boolean = false;
  errorMessage: string = '';
  alertButtons = ['Ok'];

  isOpenToast: boolean = false;
  messageToast: string = '';

  constructor(private popoverController: PopoverController, private storage: Storage, private channelService: ChannelService) {
    addIcons({ alertCircleOutline });
  }

  ngOnInit() {
    this.storage.get('user').then((user) => {
      this.user = user;
    });
  }

  closePopover() {
    this.popoverController.dismiss();
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  toggleToast() {
    this.isOpenToast = !this.isOpenToast;
  }

  private showMessages(message: string) {
    this.errorMessage = message;
    this.setOpen(true);
  }

  private showToast(message: string) {
    this.messageToast = message;
    this.toggleToast();
  }

  onSubmit() {

    if (!this.user.token || !this.channel.id) {
      this.showMessages(ErrorMessages.TRY_AGAIN);
      return;
    };

    if (!this.channel.title || !this.channel.url) {
      this.showMessages(ErrorMessages.EMPTY_FIELDS);
      return;
    };

    this.channelService.updateChannel(this.channel, this.user.token).subscribe({
      next: (response) => {
        this.showToast(SuccessMessages.CHANNEL_UPDATED);
        this.closePopover();
      },
      error: (error) => {
        this.showMessages(ErrorMessages.TRY_AGAIN);
        this.closePopover();
      }
    });
  }

}
