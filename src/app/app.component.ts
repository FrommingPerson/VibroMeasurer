import {Component, HostListener, Output, ViewChild} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle,
} from "ng-apexcharts";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @HostListener('window:keyup.escape', ['$event']) escape(e: KeyboardEvent) {
    console.log('escape captured', e);
    if (this.isModalOpened) {
    this.toggleModal();
    }
  }

  public series!: ApexAxisChartSeries;
  public chart!: ApexChart;
  public xaxis!: ApexXAxis;
  public yaxis!: ApexYAxis;
  public title!: ApexTitleSubtitle;
  constructor() {
    this.initChart();
  }

  isZoomed = true;
  isModalOpened = false;

  toggleModal() {
    this.isModalOpened = !this.isModalOpened;
  }
  resize($event: string) {
    this.isZoomed = !this.isZoomed;
    let localChart = {...this.chart};
    localChart.height = this.isZoomed ? 590 : 526;
    this.chart = {...this.chart, ...localChart}
    console.log(this.chart.height);
  }
  initChart(): void {
    this.series = [{
      name: "Максимальный показатель",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
      {
        name: "Средний показатель",
        data: [1, 31, 55, 41, 41, 26, 79, 11, 48],
      },
      {
        name: "Минимаьный показатель",
        data: [120, 51, 65, 71, 29, 22, 19, 11, 9],
      }];
    this.chart = {
      type: "line",
      height: 590,
      zoom: {
        enabled: true,
        type: 'x', // Можно выбрать 'x', 'y' или 'xy' для масштабирования по соответствующим осям
      },
      toolbar: {
        autoSelected: 'zoom' // Позволяет автоматически выбирать инструмент зума
      }
    };
    this.xaxis = {
      categories: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен"]
    };
    this.yaxis = {
      title: {
        text: "Значения"
      }
    };
    this.title = {
      text: "Показатели вибрации",
      align: "center"
    };
  }

  protected readonly event = event;
  protected readonly console = console;
}


