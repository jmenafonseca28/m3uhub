import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/ConfigService';
import { ResponseApi } from '../models/IResponseApi.model';
import { Playlist } from '../models/IPlaylist.model';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for managing playlists.
 */
export class PlaylistService {
  private API_URL = this.configService.buildApiUrl('PlayList');

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
   * Retrieves all playlists for a given user.
   * @param userId - The ID of the user.
   * @param token - The authentication token.
   * @returns An Observable of type ResponseApi.
   */
  getAllPlaylists(userId: string, token: string): Observable<ResponseApi> {
    this.httpHeaders.headers['Authorization'] = `Bearer ${token}`;
    return this.http.get<ResponseApi>(`${this.API_URL}/getPlayListsByUserId/${userId}`, { headers: this.httpHeaders.headers });
  }

  /**
   * Retrieves a playlist by its ID.
   * @param id - The ID of the playlist.
   * @param token - The authentication token.
   * @returns An Observable of type ResponseApi.
   */
  getPlaylistById(id: string, token: string): Observable<ResponseApi> {
    this.httpHeaders.headers['Authorization'] = `Bearer ${token}`;
    return this.http.get<ResponseApi>(`${this.API_URL}/getById/${id}`, { headers: this.httpHeaders.headers });
  }

  /**
   * Creates a new playlist.
   * @param playlistData - The data of the playlist to create.
   * @param token - The authentication token.
   * @returns An Observable of type ResponseApi.
   */
  createPlaylist(playlistData: Playlist, token: string): Observable<ResponseApi> {
    this.httpHeaders.headers['Authorization'] = `Bearer ${token}`;
    return this.http.post<ResponseApi>(`${this.API_URL}/createPlayList`, playlistData, { headers: this.httpHeaders.headers });
  }

  /**
   * Deletes a playlist by its ID.
   * @param id - The ID of the playlist to delete.
   * @param token - The authentication token.
   * @returns An Observable of type ResponseApi.
   */
  deletePlaylist(id: string, token: string): Observable<ResponseApi> {
    this.httpHeaders.headers['Authorization'] = `Bearer ${token}`;
    return this.http.delete<ResponseApi>(`${this.API_URL}/deletePlayList/${id}`, { headers: this.httpHeaders.headers });
  }

  /**
   * Updates a playlist.
   * @param playlistData - The updated data of the playlist.
   * @param token - The authentication token.
   * @returns An Observable of type ResponseApi.
   */
  updatePlaylist(playlistData: Playlist, token: string): Observable<ResponseApi> {
    this.httpHeaders.headers['Authorization'] = `Bearer ${token}`;
    return this.http.put<ResponseApi>(`${this.API_URL}/updatePlayList/`, playlistData, { headers: this.httpHeaders.headers });
  }
}

