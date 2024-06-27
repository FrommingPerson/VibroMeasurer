import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {VibrationDataModel} from "../app/Models/VibrationDataModel";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {SignalRService} from "./signalR.service";
import {environment} from "../environments/environment";

@Injectable({providedIn: 'root'})
export class SensorService {
  private apiUrl = environment.apiUrl;
  private sensorDataSubject: BehaviorSubject<VibrationDataModel[]> = new BehaviorSubject<VibrationDataModel[]>([]);
  public sensorData$: Observable<VibrationDataModel[]> = this.sensorDataSubject.asObservable();
  private sensorDataBySignalRSubject: BehaviorSubject<VibrationDataModel | null> = new BehaviorSubject<VibrationDataModel | null>(null);
  public sensorDataBySignalR$: Observable<VibrationDataModel | null> = this.sensorDataBySignalRSubject.asObservable();

  private selectedDeviceId: number | null = null;

  constructor(public http: HttpClient, private readonly _signalR: SignalRService) {
    this._signalR.hubConnection?.on("ReceiveSensorData", (sensorData: VibrationDataModel) => {
      if (this.selectedDeviceId !== sensorData.deviceId) return;
      this.sensorDataBySignalRSubject.next(sensorData);
      console.log('From the sensor.service: ', sensorData.date);
      let data = this.sensorDataSubject.value;
      data.push(sensorData);
      if (data.length > 10) {
        data.splice(0, 1);
      }
      this.sensorDataSubject.next(data);
    });
  }

  getData() {
    return this.http.get<VibrationDataModel>(`${this.apiUrl}/Sensor/dataFromMqtt`);
  }

  getDataList(skip: number, take: number, deviceId: number) {
    this.selectedDeviceId = deviceId;
    return this.http.get<VibrationDataModel[]>(`${this.apiUrl}/Sensor/allData/${deviceId
    }?take=${take}&skip=${skip}`).pipe(tap(data => {
      this.sensorDataSubject.next(data);
    }));
  }
}
