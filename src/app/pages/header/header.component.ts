import {Component, EventEmitter, Output} from '@angular/core';
import {SettingsService} from "../../../../settings.service";
import {DeviceDataModel} from "../../Models/DeviceDataModel";
import {DeviceService} from "../../../sevices/device.service";
import {SettingsDataModel} from "../../Models/SettingsDataModel";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() toggleModal = new EventEmitter<void>();

  protected settings: SettingsDataModel = {
    darkMode: false,
    enabled: true,
    charts: true,
    themeMode: "light",
    color: undefined,
  }

  device: DeviceDataModel | null = null;
  toggle() {
    this.toggleModal.emit();
  }
  constructor(protected readonly _settingsService: SettingsService, private readonly _deviceService: DeviceService) {
    this._settingsService.settings$.subscribe(settings => this.settings = settings);
    this._deviceService.device$.subscribe(x => this.device = x);
  }
}
