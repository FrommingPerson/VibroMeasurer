import {Injectable} from "@angular/core";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {environment} from "../environments/environment";

@Injectable({providedIn: 'root'})
export class SignalRService {
  public hubConnection: HubConnection | undefined;
  private apiUrl = environment.apiUrl;

  private buildConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.apiUrl}/mainHub`)
      .withAutomaticReconnect()
      .build();
  }

  private startConnection(): void {
    if (!this.hubConnection) return;
    this.hubConnection
      .start()
      .then(() => {
        console.log("Connection started");
      })
      .catch((err) => {
        console.error("Error while starting connection: " + err);
      });
  }

  constructor() {
    this.buildConnection();
    this.startConnection();
  }
}
