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
import { emptyTexts } from 'src/app/utils/Logic';

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
      this.showMessage('Por favor, rellene todos los campos');
      return;
    }

    const loadingIndicator = await this.showLoadingIndicator();

    this.authService.login(this.user).subscribe({
      next: async (response) => {
        if (!response.success) {
          this.showMessage(response.message);
          loadingIndicator.dismiss();
          return;
        }

        await this.storage.set('user', response.data);
        loadingIndicator.dismiss();
        this.router.navigate(['/homepage']);
      },
      error: (error) => {
        loadingIndicator.dismiss();
        this.showMessage('Usuario o contraseña incorrectos');
      }
    });
  }

  private showMessage(message: string) {
    this.errorMessage = message;
    this.setOpen(true);
  }

  private validateInputs() {
    return emptyTexts(this.user.email, this.user.password)
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
