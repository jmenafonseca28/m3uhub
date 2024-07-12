import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicModule, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Channel } from 'src/app/models/IChannel.model';
import { User } from 'src/app/models/IUser.model';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import Hls from 'hls.js';
import { EditChannelComponent } from 'src/app/components/channel/edit-channel/edit-channel.component';

@Component({
  selector: 'app-channel-view',
  templateUrl: './channel-view.page.html',
  styleUrls: ['./channel-view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChannelViewPage implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('video') video: ElementRef<HTMLVideoElement> = {} as ElementRef<HTMLVideoElement>;
  popover: HTMLIonPopoverElement = {} as HTMLIonPopoverElement;
  channel: Channel = {} as Channel;
  user: User = {} as User;
  playListId: string = '';

  constructor(private storage: Storage, private router: Router,
    private popoverController: PopoverController) {
    addIcons({ arrowBackOutline });
  }

  ngOnInit() {
    this.storage.get('channel').then((channel) => {
      if (channel !== this.channel) this.channel = channel;
      this.storage.get('user').then((user) => {
        this.user = user;
      });
    });
  }

  ngAfterViewInit() {
    this.storage.get('channel').then((channel) => {
      this.channel = channel;
      this.playChannel();
    });
  }

  ngOnDestroy() {
    this.offChannelView();
  }

  offChannelView() {
    this.video.nativeElement.pause();
    this.channel = {} as Channel;
  }

  playChannel() {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.channel.url);
      hls.attachMedia(this.video.nativeElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.video.nativeElement.play();
      });
    } else if (this.video.nativeElement.canPlayType('application/vnd.apple.mpegurl')) {
      this.video.nativeElement.src = this.channel.url;
      this.video.nativeElement.addEventListener('loadedmetadata', () => {
        this.video.nativeElement.play();
      });
    }
  }

  onComeBack() {
    const id = this.channel.playlistId;
    this.offChannelView();
    this.router.navigate(['/channel-list/' + id]);
  }

  async presentPopover() {
    this.video.nativeElement.pause();
    this.popover = await this.popoverController.create({
      component: EditChannelComponent,
      translucent: true,
      backdropDismiss: true,
      animated: true,
    });
    this.popover.componentProps = { channel: this.channel };
    this.popover.onDidDismiss().then(() => {
      this.video.nativeElement.play();
    });
    return await this.popover.present();
  }

}
