import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserBase } from '../models/IUserBase.model';
import { User } from '../models/IUser.model';
import { ConfigService } from '../config/ConfigService';
import { ResponseApi } from '../models/IResponseApi.model';

@Injectable({
  providedIn: 'root'
})
/**
 * Service responsible for handling authentication-related operations.
 */
export class AuthService {

  private API_URL = this.configService.buildApiUrl('Userr');

  private httpHeaders = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    responseType: 'json'
  };

  constructor(private http: HttpClient, private configService: ConfigService) { }

  /**
   * Logs in a user.
   * @param user The user to be logged in.
   * @returns An Observable of type ResponseApi.
   */
  login(user: UserBase): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.API_URL}/login`, user, { headers: this.httpHeaders.headers });
  }

  /**
   * Registers a new user.
   * @param user The user to be registered.
   * @returns An Observable of type ResponseApi.
   */
  register(user: User): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.API_URL}/register`, user, { headers: this.httpHeaders.headers });
  }
}
