import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { UserBase } from 'src/app/models/IUserBase.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { personAddSharp, personSharp } from 'ionicons/icons';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {

  user: UserBase = { email: '', password: '' };

  alertButtons = ['ok'];

  isAlertOpen = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private storage: Storage,
    private router: Router,
  ) {
    addIcons({ personSharp, personAddSharp });
  }

  public register(): void {
    this.router.navigate(['/register']);
  }

  public async login(): Promise<void> {

    if (!this.validateInputs()) {
      this.errorMessage = 'Por favor, rellene todos los campos';
      this.setOpen(true);
      return;
    }

    const loadingIndicator = await this.showLoadingIndicator();

    this.authService.login(this.user).subscribe({
      next: async (response) => {
        if (!response.success) {
          this.errorMessage = response.message;
          this.setOpen(true);
          return;
        }

        await this.storage.set('user', response.data);
        this.router.navigate(['/homepage']);
      },
      error: (error) => {
        this.errorMessage = 'Usuario o contraseña incorrectos';
        this.setOpen(true);
      }
    });
    loadingIndicator.dismiss();
  }

  private validateInputs() {
    return this.user.email.trim().length > 0 && this.user.password.trim().length > 0
      && this.user.email.includes('@') && this.user.email.includes('.');
  }

  public setOpen(isOpen: boolean): void {
    this.isAlertOpen = isOpen;
  }

  private async showLoadingIndicator() {
    const loadingIndicator = await this.loadingController.create({
      message: 'Iniciando sesión...',
    });
    await loadingIndicator.present();
    return loadingIndicator;
  }
}
