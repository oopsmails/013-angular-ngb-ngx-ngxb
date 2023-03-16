import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Car, CarDataService } from 'oops-lib002';
import { Observable, Subject } from 'rxjs';
import { SANDBOX_BACK_TO_HOME, SANDBOX_HOME_LINK } from '../hm.constants';

@Component({
  selector: 'app-hm-dnd',
  templateUrl: './hm.dnd.component.html',
  styleUrls: ['./hm.dnd.component.scss'],
})
// Ref: https://threeventures.com/how-to-build-html-drag-and-drop-in-angular/
export class HomeMadeDragAndDropComponent {
  private COMPONENT_NAME = 'HomeMadeDragAndDropComponent';
  linkText = SANDBOX_BACK_TO_HOME;
  routerLinkInput = SANDBOX_HOME_LINK;

  private draggableElements = 3;
  private zonePrefix = 'zone-';
  public droppableObjects: Array<any> = [];
  public draggableObjects: Array<Array<any>> = [[], [], []];

  constructor() {
    // NOTE: This is just for the demo - But it gives you an idea of how to set a drag/drop implementation
    for (let i = 0; i < this.draggableElements; i++) {
      // Define the droppable objects
      this.droppableObjects.push({
        data: {
          column: i,
        },
        zone: this.zonePrefix + i,
      });
      // Define the draggable objects relative to their position
      this.draggableObjects[i].push({
        data: {
          id: i,
          payload: 'Some data you need to pass',
          name: 'Draggable - ' + i,
          currentColumn: i,
        },
        zones: this.generateZones(i),
      });
    }
  }

  /**
   * @desc responsible for generating the zones that a draggable element can go too.
   * @param {number} zone - the zone that the draggable element is a part of
   * @returns Array<string> an array of zone IDs that the draggable element can be dropped into
   */
  private generateZones(zone: number): Array<string> {
    // Generate all available zones
    const zones: Array<string> = [];
    for (let i = 0; i < this.draggableElements; i++) {
      zones.push(this.zonePrefix + i);
    }
    // Remove the current zone
    zones.splice(zone, 1);
    return zones;
  }

  /**
   * @desc responsible for handling the zone drop event
   * @param {any} event - the event data specific to the implementation
   */
  public onZoneDrop(event: any) {
    // Update your data here
    // Add the droppable to the new zone, with updated data
    this.draggableObjects[event.zone.column].push({
      data: {
        id: event.data.id,
        payload: event.data.payload,
        name: event.data.name,
        currentColumn: event.zone.column,
      },
      zones: this.generateZones(event.zone.column),
    });

    // Find the ID and remove it
    for (let i = 0; i < this.draggableObjects[event.data.currentColumn].length; i++) {
      if (event.data.id === this.draggableObjects[event.data.currentColumn][i].data.id) {
        // Remove the droppable from the old zone
        this.draggableObjects[event.data.currentColumn].splice(i, 1);
      }
    }
  }
}
