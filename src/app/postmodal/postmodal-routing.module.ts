import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostmodalPage } from './postmodal.page';

const routes: Routes = [
  {
    path: '',
    component: PostmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostmodalPageRoutingModule {}
