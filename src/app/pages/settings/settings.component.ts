import {Component, HostBinding, OnDestroy, OnInit, signal} from '@angular/core';
import {DataService} from "../../../../data.service";
import {VibrationDataModel} from "../../Models/VibrationDataModel";
import {SensorService} from "../../../sevices/sensor.service";
import moment from "moment";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})


export class SettingsComponent implements OnInit {
  constructor(public data: DataService, public http: SensorService) {
    console.log(data);
  }

  ngOnInit() {
    this.getData();
  }

  darkMode = signal<boolean>(false);

  count: boolean = false;

  getData() {
    this.http.getData().subscribe({
      next: (data) => {
        console.log(data);
        let information = <VibrationDataModel>data;
        console.log(moment(data.date).format('yyyy/MM/DD  HH:mm'))
      }
    })
  }

  toggel() {
    this.darkMode.set(!this.darkMode());
    console.log(`The true dark mode: ${this.darkMode}`);
    this.count = !this.count;
    this.data.nextCount(this.count);
    this.data.nextCount(this.darkMode);
    if (!this.count) {
      location.reload();
    }
    console.log(`From the child component: ${this.data.array}`);
  }

  isCharts: boolean = this.data.arr[this.data.arr.length - 1];
  isOn: boolean = this.data.offon[this.data.offon.length -1];

  charts() {
    this.isCharts = !this.isCharts;
    console.log(this.isCharts);
    this.data.add(this.isCharts);
  }

  onOrOff() {
    this.isOn = !this.isOn;
    this.data.adding(this.isOn);
    console.log(this.data.offon);
  }
}
