import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditprodukPage } from './editproduk.page';

const routes: Routes = [
  {
    path: '',
    component: EditprodukPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditprodukPageRoutingModule {}
