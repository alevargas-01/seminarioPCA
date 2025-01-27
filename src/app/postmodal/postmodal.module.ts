import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostmodalPageRoutingModule } from './postmodal-routing.module';

import { PostmodalPage } from './postmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostmodalPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [PostmodalPage]
})
export class PostmodalPageModule {}
