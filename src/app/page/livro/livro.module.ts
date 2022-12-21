import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivroPageRoutingModule } from './livro-routing.module';

import { LivroPage } from './livro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivroPageRoutingModule
  ],
  declarations: [LivroPage]
})
export class LivroPageModule {}
