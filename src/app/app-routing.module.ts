import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { PersonalTimeComponent } from './personalTime/personalTime.component';
import { PreTimeTestComponent } from './preTimeTest/preTimeTest.component';
import { AddPreTimeComponent } from './addPreTime/addPreTime.component';
import { EditDeleteTimeComponent } from './editDeleteTime/editDeleteTime.component';


const routes: Routes = [
  { path: '', component: MenuComponent }, // Abre como index no meu MenuComponent
  { path: 'personal-time', component: PersonalTimeComponent }, // Rota para o Component de Tempos Pessoais
  { path: 'preTime-test', component: PreTimeTestComponent }, // Rota para o Component de Tempos Pesonalizados
  { path: 'addPreTime-test', component: AddPreTimeComponent }, // Rota para addiconar Tempos Pesonalizados
  { path: 'editDelete-time', component: EditDeleteTimeComponent }, // Rota para editar ou eliminar Tempos Pesonalizados
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
