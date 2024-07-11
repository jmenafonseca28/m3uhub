import { Channel } from "./IChannel.model";

export interface ChannelRequest {
    id: string;
    channelId: string;
    playlistId: string;
    channel: Channel;
}