import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SettingsDataModel} from "./src/app/Models/SettingsDataModel";

@Injectable()
export class SettingsService {

  private readonly localStorageKey = 'appSettings';

  private settingsSubject = new BehaviorSubject<SettingsDataModel>(this.getSettingsFromLocalStorage());
  public settings$ = this.settingsSubject.asObservable();

  constructor() {
    this.settingsSubject.subscribe(settings => {
      this.saveSettingsToLocalStorage(settings);
    });
  }

  toggleCharts() {
    let settings = this.settingsSubject.value;
    settings.charts = !settings.charts;
    this.settingsSubject.next(settings);
  }

  toggleDarkMode() {
    let settings = this.settingsSubject.value;
    settings.darkMode = !settings.darkMode;
    if (settings.darkMode) {
      settings.themeMode = "dark";
      settings.color = "#1E293B";
    } else {
      settings.themeMode = "light";
      settings.color = undefined;
    }
    this.settingsSubject.next(settings);
  }

  toggleEnabled() {
    let settings = this.settingsSubject.value;
    settings.enabled = !settings.enabled;
    this.settingsSubject.next(settings);
  }

  private saveSettingsToLocalStorage(settings: SettingsDataModel) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(settings));
  }

  private getSettingsFromLocalStorage(): SettingsDataModel {
    const settingsJson = localStorage.getItem(this.localStorageKey);
    return settingsJson ? JSON.parse(settingsJson) : {
      darkMode: false,
      enabled: true,
      charts: true,
      themeMode: "light",
      color: undefined,
    };
  }
}
