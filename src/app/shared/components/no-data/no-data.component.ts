import { Component, Input } from '@angular/core';
import { IonGrid, IonText } from "@ionic/angular/standalone";

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss'],
  imports: [
    IonGrid,
    IonText
  ]
})
export class NoDataComponent {
  @Input() text!: string;

  imgNoData = "/assets/images/no_data.png";
}
