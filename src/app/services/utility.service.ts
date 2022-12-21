import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private loadCtrl: LoadingController, 
    private toastCtrl: ToastController) {}

    async mensagemCarregando(message: string, duration: number){
      const carregar = this.loadCtrl.create({
        mode: 'ios',
        message,
        duration
      });

      (await carregar).present();
    }

    async toastMessage(message: string, position: "top" | "middle" | "bottom", duration: number, color: string){
      const aviso = this.toastCtrl.create({
        message,
        position,
        duration,
        color
      });
      (await aviso).present();

        setTimeout(this.metodoF5, 2000);
    }

    metodoF5(){
        location.reload();
    }
}