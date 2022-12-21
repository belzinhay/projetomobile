import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Receita } from 'src/app/model/receita.model';
import { DatabaseService } from 'src/app/services/database.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  
livro: Receita[] =[];
  img='https://img.elo7.com.br/product/zoom/1F6ACCE/caderno-de-receitas-receitas.jpg';
  constructor(
    private banco: DatabaseService,
    private alert: AlertController,
    private util: UtilityService,
    private action: ActionSheetController
  ) { }

  ngOnInit(): void {
    this.util.mensagemCarregando("Aguarde", 1500);
    this.banco.getReceita().subscribe(results => this.livro = results);
  }

  async mensagemAlert(){
    const alerta = this.alert.create({
      mode:"ios",
      header: 'Cadastrar Receitas',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nome da Receita'
        },
        {
          name: 'ingredientes',
          type: 'text',
          placeholder: 'Ingredientes'
        },
        {
          name: 'quantidade',
          type: 'text',
          placeholder: 'Quantidade'
        },
        {
          name: 'modo',
          type: 'text',
          placeholder: 'Modo de Preparo'
        }
      ],
      
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancel',
          handler: () => {
            this.util.toastMessage("Cancelado", "bottom", 2000, "danger");
          }
        },
        {
          text: 'Cadastrar',
          handler: (guardar) => {
            let receita = {receita: guardar.nome, ingrediente: guardar.ingrediente, modo: guardar.modo, status:false};
            
            try{
              this.banco.postReceita(receita);
            }catch(err){
              console.log(err)
            }finally{
              this.util.toastMessage("Receita Cadastrada", "bottom", 2000, "success");
            }
          }
        }
      ]

    });
    (await alerta).present();
}

async actionFolha(livro: Receita){
  const sheet = this.action.create({
    mode: 'ios',
    header: 'Opções',
    buttons: [
      {
        text: livro.status ? 'Já preparei' : 'Não preparei ainda',
        icon: livro.status ? 'radio-button-off' : 'checkmark-cicle',
        handler: () => {
          livro.status = !livro.status;
          this.banco.updateStatus(livro);
          livro.status ? this.util.toastMessage("Receita Feita", "bottom", 2000, "secondary") : this.util.toastMessage("Receita desmarcada", "bottom", 2000, "primary");
        }
      },
      {
        text: 'Cancelar',
        role: 'Cancel',
        handler: () => {}
      }
    ]
  });
  (await sheet).present();
}

deletarReceita(id: number){
  try{
    this.banco.deletaReceita(id);
  }catch(err){
    console.log(err);
  }finally{
    this.util.toastMessage("Receita Excluída", "bottom", 2000, "danger");
  }
}
}
