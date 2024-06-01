import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {VibrationDataModel} from "./src/app/Models/VibrationDataModel";

interface switches {
  darkMode: string[],
  OnOrOff: boolean,
  TheOtherCharts: boolean,
}

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  constructor() {
  }

  switcher: switches = {
    darkMode: [],
    OnOrOff: true,
    TheOtherCharts: true,
  }

  array: string[] = [];
  arr: boolean[] = [true];
  offon: boolean[] = [true];
  chartNumber: string[] = [];

  nextCount(data: any) {
    this.array.push(data);
  }

  add(data: any) {
    this.arr.push(data);
  }

  changeStatusOfSwitcher(data: boolean, count: number) {
    switch (count) {
      case 1:
        this.switcher.darkMode.push("gggg");
        break;
      case 2:
        this.switcher.OnOrOff = data;
        break;
      case 3:
        this.switcher.TheOtherCharts = data;
        break;
    }
  }

  adding(data: boolean) {
    this.offon.push(data);
  }

  charts(data: string) {
    this.chartNumber.push(data);
  }
}
