import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {VibrationDataModel} from "../app/Models/VibrationDataModel";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";

@Injectable({providedIn: 'root'})
export class SensorService {
  private sensorDataSubject: BehaviorSubject<VibrationDataModel[]> = new BehaviorSubject<VibrationDataModel[]>([]);
  public sensorData$: Observable<VibrationDataModel[]> = this.sensorDataSubject.asObservable();
  public hubConnection: HubConnection | undefined;
  constructor(public http: HttpClient) {
    this.buildConnection();
    this.startConnection();
  }

  private buildConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl( "http://localhost:5293/mainHub")
      .withAutomaticReconnect()
      .build();
  }

  private startConnection(): void {
    if (!this.hubConnection) return;
    this.hubConnection
      .start()
      .then(() => {
        this.hubConnection?.on("ReceiveSensorData", (sensorData: VibrationDataModel) => {
          console.log('From the sensor.service: ', sensorData);
          console.log(sensorData);
          let data = this.sensorDataSubject.value;
          data.push(sensorData);
          this.sensorDataSubject.next(data);
        });
        console.log("Connection started");
      })
      .catch((err) => {
        console.error("Error while starting connection: " + err);
      });
  }

  getData() {
    return this.http.get<VibrationDataModel>("http://localhost:5293/Sensor/dataFromMqtt");
  }

  getDataList(skip: number, take: number) {
    return this.http.get<VibrationDataModel[]>(`http://localhost:5293/Sensor/allData?take=${take}&skip=${skip}`).pipe(tap(data => {
      this.sensorDataSubject.next(data);
    }));
  }
}
