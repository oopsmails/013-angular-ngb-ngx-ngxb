import { Component } from '@angular/core';

interface Object {
  id: number;
  name: string;
  city: string;
}

const OBJECTS: Object[] = [
  { id: 1, name: 'Object 1', city: 'City 1' },
  { id: 2, name: 'Object 2', city: 'City 2' },
  { id: 3, name: 'Object 3', city: 'City 3' },
];

@Component({
  selector: 'app-homemade',
  templateUrl: './hm.editable.component.html',
  styleUrls: ['./hm.editable.component.scss'],
})
export class HomeMadeEditableComponent {
  objects = OBJECTS;
  cities = ['City 1', 'City 2', 'City 3'];

  editMode = false;
  editedObject: Object = null;

  enableEditMode(object: Object) {
    this.editMode = true;
    this.editedObject = object;
  }

  disableEditMode() {
    this.editMode = false;
    this.editedObject = null;
  }

  isNameFieldDisabled(): boolean {
    return this.editedObject && this.editedObject.id === 2;
  }

  saveObject() {
    this.disableEditMode();
  }

  cancelEdit() {
    this.disableEditMode();
  }
}
