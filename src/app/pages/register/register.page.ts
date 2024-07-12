import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class RegisterPage {

  user = { name: '', lastName: '', email: '', password: '', confirmPassword: '' };

  alertButtons = ['ok'];

  isAlertOpen = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private loadingController: LoadingController, private router: Router) {
    addIcons({ heart });
  }


  async register() {

    if (!this.validateInputs()) {
      this.showMessages('Por favor, rellene todos los campos');
      return;
    }

    if (this.user.password !== this.user.confirmPassword) {
      this.showMessages('Las contraseñas no coinciden');
      return;
    }

    const loadingIndicator = await this.showLoadingIndicator();

    this.authService.register(this.user).subscribe({
      next: async (response) => {
        if (!response.success) {
          this.showMessages(response.message);
          return;
        }

        this.router.navigate(['/login']);
      },
      error: async (error) => {
        this.showMessages('Ha ocurrido un error inesperado');
      }
    });

    loadingIndicator.dismiss();
  }

  private showMessages(message: string) {
    this.errorMessage = message;
    this.setOpen(true);
  }

  private validateInputs() {
    return this.user.name.trim().length > 0 && this.user.lastName.trim().length > 0
      && this.user.email.trim().length > 0 && this.user.password.trim().length > 0
      && this.user.confirmPassword.trim().length > 0;
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  private async showLoadingIndicator() {
    const loadingIndicator = await this.loadingController.create({
      message: 'Registrándose...',
    });
    await loadingIndicator.present();
    return loadingIndicator;
  }

}
