export interface DeviceDataModel {
  deviceMac: number;
  deviceId: number;
  cardMountFailed: boolean;
  cardType: number;
  cardSize: number;
  freeSize: number;
  openError: boolean;
  writeError: boolean;
  rssi: number;
  signalQuality: number;
  ip?: string;
  ssid?: string;
  bssid?: string;
  channel: number;
  mac?: string;
  pubSubClientBufferStatus?: string;

}
