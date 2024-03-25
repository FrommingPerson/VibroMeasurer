import { NgModule } from '@angular/core';
import {SettingsComponent} from  './pages/settings/settings.component'
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path: "settings-component", component: SettingsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
