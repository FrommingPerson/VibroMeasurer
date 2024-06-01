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
import {DataService} from "../../data.service";
import {data} from "autoprefixer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  darkMode = signal<boolean>(false);

  @HostBinding('class.dark') get mode() {
    return this.data.array[this.data.array.length - 1];
  }

  @HostListener('window:keyup.escape', ['$event']) escape(e: KeyboardEvent) {
    console.log('escape captured', e);
    if (this.isModalOpened) {
    this.toggleModal();
    }

  }

    // theme = localStorage.getItem('theme');

  public series!: ApexAxisChartSeries;
  public chart!: ApexChart;
  public xaxis!: ApexXAxis;
  public yaxis!: ApexYAxis;
  public title!: ApexTitleSubtitle;

  constructor(private router: Router, private data: DataService) {
    this.initChart();
  }

  isZoomed = true;
  isModalOpened = false;

  toggleModal() {
    this.isModalOpened = !this.isModalOpened;
    // console.log(`From the child component: ${this.data.arr[this.data.arr.length - 1]}`);
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
      data: [16, 46, 35, 51, 46, 62, 66, 91, 168],
    },
      {
        name: "Средний показатель",
        data: [6, 31, 56, 41, 41, 26, 76, 11, 46],
      },
      {
        name: "Минимаьный показатель",
        data: [20, 21, 75, 41, 39, 42, 29, 11, 9],
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


