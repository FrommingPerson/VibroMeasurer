import { NgModule } from '@angular/core';
import {SettingsComponent} from  './pages/settings/settings.component'
import { RouterModule, Routes } from '@angular/router';
import {MainChartComponent} from "./pages/chart/main-chart.component";
export const routes: Routes = [{path:"settings", component:SettingsComponent}, {path:"chart", component: MainChartComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

