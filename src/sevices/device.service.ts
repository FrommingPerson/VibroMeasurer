import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {DeviceDataModel} from "../app/Models/DeviceDataModel";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {VibrationDataModel} from "../app/Models/VibrationDataModel";
import {SignalRService} from "./signalR.service";
import {environment} from "../environments/environment";

@Injectable({providedIn: 'root'})
export class DeviceService {
  private apiUrl = environment.apiUrl;
  private devicesSubject: BehaviorSubject<DeviceDataModel[]> = new BehaviorSubject<DeviceDataModel[]>([]);
  public devices$: Observable<DeviceDataModel[]> = this.devicesSubject.asObservable();
  private selectedDeviceSubject: BehaviorSubject<DeviceDataModel | null> = new BehaviorSubject<DeviceDataModel | null>(null);
  public device$: Observable<DeviceDataModel | null> = this.selectedDeviceSubject.asObservable();

  constructor(private http: HttpClient, private readonly _signalR: SignalRService) {
    let selectedDeviceId = localStorage.getItem("selectedDevice");
    if (selectedDeviceId !== null) {
      this.getDevice(parseInt(selectedDeviceId)).subscribe();
      // this._signalR.hubConnection?.on("ReceiveDeviceData", (deviceData: DeviceDataModel) => {
      //   console.log('From the device.service: ', deviceData.signalQuality);
      //   let data = this.selectedDeviceSubject.value;
      //   data = deviceData;
      //   this.selectedDeviceSubject.next(data);
      // });
    }
  }

  getAllDevices() {
    return this.http.get<DeviceDataModel[]>(`${this.apiUrl}/Device`).pipe(tap((devices) => {
      this.devicesSubject.next(devices);
    }));
  }

  getDevice(id: number) {
    console.log(id);
    return this.http.get<DeviceDataModel>(`${this.apiUrl}/Device/${id}`).pipe(tap((device) => {
      this.selectedDeviceSubject.next(device);
    }));
  }

  selectDevice(device: DeviceDataModel) {
    this.selectedDeviceSubject.next(device); //todo : you must add subscribe on websocket's changes
    localStorage.setItem("selectedDevice", device.deviceId.toString());
  }
}
