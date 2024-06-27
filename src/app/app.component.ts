import {Component, HostBinding, HostListener, Output, signal, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {SettingsComponent} from './pages/settings/settings.component'
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle,
} from "ng-apexcharts";
import {SettingsService} from "../../settings.service";
import {data} from "autoprefixer";
import {DeviceService} from "../sevices/device.service";
import {DeviceDataModel} from "./Models/DeviceDataModel";
import {SettingsDataModel} from "./Models/SettingsDataModel";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @HostBinding('class.dark') get darkTheme() {
    return this.settings.darkMode;
  }

  @HostListener('window:keyup.escape', ['$event']) escape(e: KeyboardEvent) {
    console.log('escape captured', e);
    if (this.isModalOpened) {
    this.toggleModal();
    }

  }

  devices: DeviceDataModel[] = [];
  isZoomed = true;
  isModalOpened = false;


  protected settings: SettingsDataModel = {
    darkMode: false,
    enabled: true,
    charts: true,
    themeMode: "light",
    color: undefined
  }

  constructor(private router: Router, private _settingsService: SettingsService, private _deviceService: DeviceService) {
    this._settingsService.settings$.subscribe(settings => this.settings = settings);
    this._deviceService.devices$.subscribe(x => this.devices = x);
    this._deviceService.getAllDevices().subscribe();
  }

  toggleModal() {
    this.isModalOpened = !this.isModalOpened;
    // console.log(`From the child component: ${this.data.arr[this.data.arr.length - 1]}`);
  }

  selectDevice(device: DeviceDataModel) {
    this._deviceService.selectDevice(device);
  }
}


