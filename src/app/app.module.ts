import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { NgApexchartsModule } from "ng-apexcharts";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import { HeaderComponent } from './pages/header/header.component';
import { SettingsComponent } from './pages/settings/settings.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, SettingsComponent],
  imports: [BrowserModule, NgApexchartsModule, RouterOutlet, RouterLinkActive, RouterLink],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
