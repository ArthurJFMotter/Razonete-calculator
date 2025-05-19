import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RazoneteComponent } from './razonete/razonete.component';

const routes: Routes = [
  { path: 'razonete', component: RazoneteComponent },
  { path: '', component: RazoneteComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]               
})
export class AppRoutingModule { }