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
import { MainChartComponent } from './pages/chart/main-chart.component';
import {SettingsService} from "../../settings.service";
import {SensorService} from "../sevices/sensor.service";
import {HttpClientModule,HttpClient} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DatePipe } from '@angular/common'
import {DeviceService} from "../sevices/device.service";

@NgModule({
  declarations: [AppComponent, HeaderComponent, SettingsComponent, MainChartComponent, AppComponent],
  imports: [BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,HttpClientModule, MatSlideToggleModule, RouterModule.forRoot([]), BrowserModule, NgApexchartsModule, RouterOutlet, RouterLinkActive, RouterLink, AppRoutingModule, MatButton],
  providers: [
    provideAnimationsAsync(),
    SettingsService,
    SensorService,
    DeviceService,
    HttpClient,
    HttpClientModule,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
