import { NgModule } from '@angular/core';
import {SettingsComponent} from  './pages/settings/settings.component'
import { RouterModule, Routes } from '@angular/router';
import {ChartComponent} from "./pages/chart/chart.component";
export const routes: Routes = [{path:"settings", component:SettingsComponent}, {path:"chart", component: ChartComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

