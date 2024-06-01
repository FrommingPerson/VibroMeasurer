import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { NgApexchartsModule } from "ng-apexcharts";
import {RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from "@angular/router";
import { HeaderComponent } from './pages/header/header.component';
import { SettingsComponent } from './pages/settings/settings.component';
import {AppRoutingModule} from "./app-routing.module";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import {MatButton} from "@angular/material/button";
import { ChartComponent } from './pages/chart/chart.component';
import {DataService} from "../../data.service";
import {SensorService} from "../sevices/sensor.service";
import {HttpClientModule,HttpClient} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DatePipe } from '@angular/common'

@NgModule({
  declarations: [AppComponent, HeaderComponent, SettingsComponent, ChartComponent, AppComponent],
  imports: [BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,HttpClientModule, MatSlideToggleModule, RouterModule.forRoot([]), BrowserModule, NgApexchartsModule, RouterOutlet, RouterLinkActive, RouterLink, AppRoutingModule, MatButton],
  providers: [
    provideAnimationsAsync(),
    DataService,
    SensorService,
    HttpClient,
    HttpClientModule,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
