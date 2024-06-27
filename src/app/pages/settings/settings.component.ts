import {Component, HostBinding, OnDestroy, OnInit, signal} from '@angular/core';
import {SettingsService} from "../../../../settings.service";
import {VibrationDataModel} from "../../Models/VibrationDataModel";
import {SensorService} from "../../../sevices/sensor.service";
import moment from "moment";
import {data} from "autoprefixer";
import {SettingsDataModel} from "../../Models/SettingsDataModel";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})


export class SettingsComponent implements OnInit {

  protected settings: SettingsDataModel = {
    darkMode: false,
    enabled: true,
    charts: true,
    themeMode: "light",
    color: undefined,
  }
  constructor(
    protected readonly _settingsService: SettingsService,
    private readonly _sensorService: SensorService,
  ) {
    console.log(data);
  }

  ngOnInit() {
    this._settingsService.settings$.subscribe(settings => this.settings = settings);
    this.getData();
  }

  getData() {
    this._sensorService.getData().subscribe({
      next: (data) => {
        console.log(data);
        let information = <VibrationDataModel>data;
        console.log(moment(data.date).format('yyyy/MM/DD  HH:mm'))
      }
    })
  }

}
