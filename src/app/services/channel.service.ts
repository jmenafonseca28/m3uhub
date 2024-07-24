import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/ConfigService';
import { ResponseApi } from '../models/IResponseApi.model';
import { Channel } from '../models/IChannel.model';

/**
 * Service for managing channels.
 */
@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  private API_URL: string = this.configService.buildApiUrl('Channel');
  private SUB_API_URL: string = this.configService.buildApiUrl('PlayList');

  private httpHeaders = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': ''
    },
    responseType: 'json'
  };

  constructor(private http: HttpClient, private configService: ConfigService) { }

  /**
   * Toggles the order of a channel in the playlist.
   * @param channelId - The ID of the channel.
   * @param orderList - The new order of the channel in the playlist.
   * @param token - The authorization token.
   * @returns An Observable of type ResponseApi.
   */
  toggleOrderList(channelId: string, orderList: number, token: string): Observable<ResponseApi> {
    this.httpHeaders.headers['Authorization'] = `Bearer ${token}`;
    return this.http.patch<ResponseApi>(`${this.API_URL}/ToggleOrder/${channelId}/${orderList}/`, null, { headers: this.httpHeaders.headers });
  }

  /**
   * Retrieves all channels in a playlist.
   * @param playListId - The ID of the playlist.
   * @param token - The authorization token.
   * @returns An Observable of type ResponseApi.
   */
  getAllChannels(playListId: string, token: string, page: number = 1): Observable<ResponseApi> {
    this.httpHeaders.headers['Authorization'] = `Bearer ${token}`;
    return this.http.get<ResponseApi>(`${this.API_URL}/GetChannelsByPlaylist/${playListId}/${page}`, { headers: this.httpHeaders.headers });
  }

  /**
   * Downloads a playlist.
   * @param playListId - The ID of the playlist.
   * @param token - The authorization token.
   * @returns An Observable of a file M3U with the playlist.
   */
  downloadPlayList(playListId: string, token: string): Observable<any> {
    const headers = {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      responseType: 'blob'
    }
    return this.http.get(`${this.SUB_API_URL}/exportPlayList/${playListId}/`, { responseType: 'blob', headers: headers.headers });
  }

  /**
   * Imports channels from a file into a playlist.
   * @param file - The file containing the channels.
   * @param playListId - The ID of the playlist.
   * @param token - The authorization token.
   * @returns A Promise of type Response.
   */
  importChannels(file: File, playListId: string, token: string): Promise<Response> {

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const formData = new FormData();
    formData.append("file", file);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData
    };

    return fetch(`${this.API_URL}/ImportChannels/${playListId}`, requestOptions);
  }

  /**
   * Retrieves a channel by its ID.
   * @param channelId - The ID of the channel.
   * @param token - The authorization token.
   * @returns An Observable of type ResponseApi.
   */
  getChannelById(channelId: string, token: string): Observable<ResponseApi> {
    this.httpHeaders.headers['Authorization'] = `Bearer ${token}`;
    return this.http.get<ResponseApi>(`${this.API_URL}/GetChannel/${channelId}/`, { headers: this.httpHeaders.headers });
  }

  /**
   * Creates a new channel.
   * @param channel - The channel object to create.
   * @param token - The authorization token.
   * @returns An Observable of type ResponseApi.
   */
  createChannel(channel: Channel, token: string): Observable<ResponseApi> {
    this.httpHeaders.headers['Authorization'] = `Bearer ${token}`;
    return this.http.post<ResponseApi>(`${this.API_URL}/CreateChannel/`, channel, { headers: this.httpHeaders.headers });
  }

  /**
   * Updates an existing channel.
   * @param channel - The channel object to update.
   * @param token - The authorization token.
   * @returns An Observable of type ResponseApi.
   */
  updateChannel(channel: Channel, token: string): Observable<ResponseApi> {
    this.httpHeaders.headers['Authorization'] = `Bearer ${token}`;
    return this.http.put<ResponseApi>(`${this.API_URL}/UpdateChannel/`, channel, { headers: this.httpHeaders.headers });
  }

  /**
   * Deletes a channel by its ID.
   * @param channelId - The ID of the channel to delete.
   * @param token - The authorization token.
   * @returns An Observable of type ResponseApi.
   */
  deleteChannel(channelId: string, token: string): Observable<ResponseApi> {
    this.httpHeaders.headers['Authorization'] = `Bearer ${token}`;
    return this.http.delete<ResponseApi>(`${this.API_URL}/DeleteChannel/${channelId}/`, { headers: this.httpHeaders.headers });
  }
}
