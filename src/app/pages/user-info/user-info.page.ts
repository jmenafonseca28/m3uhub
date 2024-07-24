import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/models/IUser.model';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UserInfoPage implements OnInit {

  user: User = {} as User;
  passChange = { oldPass: '', newPass: '', confirmPass: '' };

  constructor(private storage: Storage) { }

  ngOnInit() {
    this.user = {} as User;
    this.storage.get('user').then((user: User) => {
      this.user = user;
    });
  }

  changePassword() { }

  any() { }

}
