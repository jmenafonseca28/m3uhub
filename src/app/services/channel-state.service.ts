import { Injectable } from '@angular/core';
import { Channel } from 'src/app/models/IChannel.model';

@Injectable({
  providedIn: 'root'
})
export class ChannelStateService {
  private channels: Channel[] = [];
  private currentPage: number = 1;
  private allCharged: boolean = false;
  private pageInfo: any = {};

  getChannels(): Channel[] {
    return this.channels;
  }

  setChannels(channels: Channel[]) {
    channels.forEach(channel => {
      if (!this.channels.find(c => c.id === channel.id)) {
        this.channels.push(channel);
      }
    });
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  isAllCharged(): boolean {
    return this.allCharged;
  }

  setAllCharged(allCharged: boolean) {
    this.allCharged = allCharged;
  }

  getPageInfo(): any {
    return this.pageInfo;
  }

  setPageInfo(pageInfo: any) {
    this.pageInfo = pageInfo;
  }
}
