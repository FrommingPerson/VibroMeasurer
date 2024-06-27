import {Component, HostListener, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTheme,
  ApexFill,
  ApexTitleSubtitle,
  NgApexchartsModule, ChartComponent
} from "ng-apexcharts";
import {SettingsService} from "../../../../settings.service";
import {VibrationDataModel} from "../../Models/VibrationDataModel";
import {SensorService} from "../../../sevices/sensor.service";
import {DatePipe} from "@angular/common";
import {DeviceService} from "../../../sevices/device.service";
import {SettingsDataModel} from "../../Models/SettingsDataModel";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  theme: ApexTheme;
  fill: ApexFill;
};

@Component({
  selector: 'app-chart',
  templateUrl: './main-chart.component.html',
  styleUrl: './main-chart.component.scss'
})
export class MainChartComponent {
  @ViewChild("chart", {static: false}) chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> | undefined;

  protected settings: SettingsDataModel = {
    darkMode: false,
    enabled: true,
    charts: true,
    themeMode: "light",
    color: undefined,
  }

  isModalOpened = false;
  sensorDatas: VibrationDataModel[] = [];

  @HostListener('window:keyup.escape', ['$event']) escape(e: KeyboardEvent) {
    console.log('escape captured', e);
    if (this.isModalOpened) {
    }
  }

  constructor(private router: Router, private readonly _settingsService: SettingsService, private readonly _sensorService: SensorService, private readonly _datePipe: DatePipe, private readonly _deviceService: DeviceService) {
    this._settingsService.settings$.subscribe(settings => this.settings = settings);
    this._sensorService.sensorData$.subscribe({
      next: (data) => {
        this.sensorDatas = data;
        if (this.settings.enabled) {
          this.updateSeries();
        }
        // console.log('The data that is being transferred by WebSocket:', data);
      }
    });
    // this._sensorService.sensorDataBySignalR$.subscribe({
    //   next: (data) => {
    //     this.updateSeries();
    //   }
    // })
    this._deviceService.device$.subscribe(x => {
      if (x === null) return;
      this._sensorService.getDataList(0, 10, x?.deviceId).subscribe(() => this.initChart());
    });
  }

  private initChart() {
    let result = this.sensorDatas.map(x => {
      return x.axMax
    });
    this.chartOptions = {
      series: [
        {
          name: "Максимальный показатель",
          data: this.sensorDatas.map(x => x.axMax),
        },
        {
          name: "Средний показатель",
          data: this.sensorDatas.map(x => x.axAvg),
        },
        {
          name: "Минимальный показатель",
          data: this.sensorDatas.map(x => x.axMin),
        }
      ],
      chart: {
        height: 600,
        type: "line",
        background: this.settings.color,
        zoom: {
          enabled: true,
          type: 'x',
        },
      },
      theme: {
        mode: this.settings.themeMode,
      },
      fill: {
        colors: []
      },
      title: {
        text: "Показатели вибрации со станков",
        align: "center"
      },
      xaxis: {
        categories: this.sensorDatas.map(x => this._datePipe.transform(x.date, 'shortTime'))
      }
    };
  }


  public updateSeries() {
    this.chart?.updateOptions({
      xaxis: {
      categories: this.sensorDatas.map(x => this._datePipe.transform(x.date, 'shortTime'))
      }
    }, true);
    if (this.chartOptions === undefined) return;
    this.chart?.updateSeries([
      {
        data: this.sensorDatas.map(x => x.axMax),
        name: "Максимальный показатель"
      },
      {
        data: this.sensorDatas.map(x => x.axAvg),
        name: "Средний показатель"
      },
      {
        data: this.sensorDatas.map(x => x.axMin),
        name: "Минимальный показатель"
      }
    ], true)
  }
}

  // public updateSeries() {
  //   if (this.chartOptions === undefined) return;
  //   this.chartOptions.series = [
  //     {
  //       data: this.sensorDatas.map(x => x.axMax),
  //       name: "Максимальный показатель"
  //     },
  //     {
  //       data: this.sensorDatas.map(x => x.axAvg),
  //       name: "Средний показатель"
  //     },
  //     {
  //       data: this.sensorDatas.map(x => x.axMin),
  //       name: "Минимальный показатель"
  //     }
  //   ];
  //   this.chartOptions.xaxis = {categories: this.sensorDatas.map(x => this._datePipe.transform(x.date, 'shortTime'))};
  //   // this.chartOptions.theme = {mode: "dark"};
  // }
