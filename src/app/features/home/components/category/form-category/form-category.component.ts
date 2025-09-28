import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { IonButton, IonInput, IonItem, IonLabel, IonList } from '@ionic/angular/standalone';
import { Category } from '@core/entities/category';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
  ]
})
export class FormCategoryComponent {
  @Output() save = new EventEmitter<Omit<Category, 'id'>>();
  @Input() form!: FormGroup;

  submit() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
      this.form.reset();
    }
  }
}
