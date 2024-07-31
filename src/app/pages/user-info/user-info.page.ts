import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/models/IUser.model';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';
import { emptyTexts } from 'src/app/utils/Logic';
import { addIcons } from 'ionicons';
import { createOutline } from 'ionicons/icons';

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

  alertButtons = ['ok'];

  isAlertOpen = false;
  message: string = '';
  header: string = '';
  subHeader: string = '';

  isUpdateProfile = true;

  constructor(private storage: Storage, private authService: AuthService) {
    addIcons({ createOutline });
  }

  ngOnInit() {
    this.passChange = { oldPass: '', newPass: '', confirmPass: '' };
    this.user = {} as User;
    this.storage.get('user').then((user: User) => {
      this.user = user;
    });
  }

  changePassword() {

    if (!this.validateInputs() || !this.user.id || !this.user.token) {
      this.showErrorMessage('Error intente en otro momento.');
      return;
    }

    this.authService.changePassword(this.user.id, {
      password: this.passChange.oldPass,
      newPassword: this.passChange.newPass
    }, this.user.token).subscribe({
      next: (response) => {
        if (!response.success) {
          this.showErrorMessage(response.data ?? response.message ?? 'Ha ocurrido un error. Por favor, inténtelo de nuevo.');
          this.passChange = { oldPass: '', newPass: '', confirmPass: '' };
          return;
        }
        this.showSuccessMessage('La contraseña se ha cambiado correctamente.');
        this.passChange = { oldPass: '', newPass: '', confirmPass: '' };
      },
      error: (error) => {
        this.showErrorMessage('Ha ocurrido un error. Por favor, inténtelo de nuevo.');
        this.passChange = { oldPass: '', newPass: '', confirmPass: '' };
      }
    });

  }

  updateProfile() {
    if (!this.user.id || !this.user.token) {
      this.showErrorMessage('Error intente en otro momento.');
      return;
    }

    const sendUser = {
      name: this.user.name,
      lastName: this.user.lastName,
      email: this.user.email,
      password: ""
    };

    this.authService.updateProfile(this.user.id, sendUser, this.user.token).subscribe({
      next: (response) => {
        if (!response.success) {
          this.showErrorMessage(response.data ?? response.message ?? 'Ha ocurrido un error. Por favor, inténtelo de nuevo.');
          return;
        }
        this.showSuccessMessage('El perfil se ha actualizado correctamente.');
        this.toggleUpdateProfile();
        if (response.data) this.updateStorageUser(response.data);
      },
      error: (error) => {
        this.showErrorMessage('Ha ocurrido un error. Por favor, inténtelo de nuevo.');
      }
    });
  }

  toggleUpdateProfile() {
    this.isUpdateProfile = !this.isUpdateProfile;
  }

  private validateInputs(): boolean {
    return emptyTexts(this.passChange.oldPass, this.passChange.newPass, this.passChange.confirmPass)
      && this.passChange.newPass === this.passChange.confirmPass;
  }

  public setOpen(isOpen: boolean): void {
    this.isAlertOpen = isOpen;
  }

  private showErrorMessage(message: string) {
    this.header = 'Ops..';
    this.subHeader = 'Parece que algo salió mal. Inténtalo de nuevo.';
    this.message = message;
    this.setOpen(true);
  }

  private showSuccessMessage(message: string) {
    this.header = '¡Éxito!';
    this.subHeader = 'La operación se ha completado con éxito.';
    this.message = message;
    this.setOpen(true);
  }

  private updateStorageUser(user: User) {
    this.storage.set('user', user).then(() => {
      this.user = user;
    });
  }

}
