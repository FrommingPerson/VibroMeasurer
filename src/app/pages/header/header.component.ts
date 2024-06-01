import {Component, EventEmitter, Output} from '@angular/core';
import {DataService} from "../../../../data.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() toggleModal = new EventEmitter<void>();

  toggle() {
    this.toggleModal.emit();
  }
  constructor(public data: DataService) {
  }
}
