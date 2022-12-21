import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';

import { Receita } from 'src/app/model/receita.model';
import { DatabaseService } from 'src/app/services/database.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.page.html',
  styleUrls: ['./livro.page.scss'],
})
export class LivroPage implements OnInit {

  livro: Receita [] = [];
  

  constructor(
    private banco: DatabaseService,
    private alert: AlertController,
    private util: UtilityService,
    private action: ActionSheetController
  ) { }

  ngOnInit(): void {
    this.util.mensagemCarregando("Aguarde...", 1500);
    this.banco.getReceita().subscribe(results => this.livro = results);
  }

  async mensagemAlert() {
    const alerta = this.alert.create({
      mode: "ios",
      header: 'Cadastrar nova receita:',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Nome da receita'
        },
        {
          name: 'ingredientes',
          type: 'text',
          placeholder: 'Ingredientes'   
        },
        {
          name: 'preparo',
          type: 'text',
          placeholder: 'Modo de Preparo'
        }
      ],

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.util.toastMessage("Cancelado", "bottom", 2000, "danger");
          }
        },
        {
          text: 'Cadastrar',
          handler: (guardar) => {
            let receita = {receita: guardar.nome, ingrediente: guardar.ingredientes, modo: guardar.preparo, status: false};
          try {
            this.banco.postReceita(receita);
          } catch(err) {
            console.log(err)
          } finally {
            this.util.toastMessage("Receita cadastrada", "bottom", 2000, "success");
          }
          } 
        }
      ]
    });

      (await alerta).present();
  }

  async actionFolha(livro: Receita) {
    const sheet = this.action.create({
      mode: "ios",
      header: "Opções",
      buttons: [
        {
          text: livro.status ? 'Já preparei' : 'Não preparei ainda',
          icon: livro.status ? 'checkmark-circle' : 'radio-button-off',
          handler: () => {
            livro.status = !livro.status;
            this.banco.updateStatus(livro);
            livro.status ? 
            this.util.toastMessage("Receita feita", "bottom", 2000, "primary") : this.util.toastMessage("Receita desmarcada", "bottom", 2000, "secondary");
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });

      (await sheet).present();
  }

  deletarReceita(id: number){
    try {
      this.banco.deletaReceita(id);
    } catch(err) {
      console.log(err);
    } finally {
      this.util.toastMessage("Receita excluída", "bottom", 2000, "danger");
    }
  }
}