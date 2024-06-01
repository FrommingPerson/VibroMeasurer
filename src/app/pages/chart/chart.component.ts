import {Component, HostListener, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle,
} from "ng-apexcharts";
import {DataService} from "../../../../data.service";
import {VibrationDataModel} from "../../Models/VibrationDataModel";
import {SensorService} from "../../../sevices/sensor.service";
import moment from "moment/moment";
import {DatePipe} from "@angular/common";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  @ViewChild("chart", {static: false}) chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | undefined;


  isModalOpened = false;
  sensorDatas: VibrationDataModel[] = [];

  @HostListener('window:keyup.escape', ['$event']) escape(e: KeyboardEvent) {
    console.log('escape captured', e);
    if (this.isModalOpened) {
    }
  }

  constructor(private router: Router, private readonly _dataService: DataService, private readonly _sensorService: SensorService, private readonly _datePipe: DatePipe) {
    this._sensorService.sensorData$.subscribe({
      next: (data) => {
        this.sensorDatas = data;
        this.updateSeries();
        // console.log(`The data that is being transferred by WebSocket: ${data}`);
      }
    });
    this._sensorService.getDataList(0, 15).subscribe(() => this.initChart());
  }

  private initChart() {
    console.log(this.sensorDatas);
    let result = this.sensorDatas.map(x => {
      console.log(x.id);
      return x.axMax
    });
    console.log(result);
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
        zoom: {
          enabled: true,
          type: 'x',
        }
      },
      title: {
        text: "График"
      },
      xaxis: {
        categories: this.sensorDatas.map(x => this._datePipe.transform(x.date, 'shortTime'))
      }
    };
  }

  public updateSeries() {
    if (this.chartOptions === undefined) return;
    console.log(this.sensorDatas);
    this.chartOptions.series = [
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
    ];
    this.chartOptions.xaxis = {categories: this.sensorDatas.map(x => this._datePipe.transform(x.date, 'shortTime'))};
  }

}
