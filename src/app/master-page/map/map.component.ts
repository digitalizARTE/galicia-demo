import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import * as Mousetrap from 'Mousetrap';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { mapStyle } from './map-style-config';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild(MatSidenavContainer, null) sidenavContainer: MatSidenavContainer;

  /**
   * Toggle assistant sidebar flag.
   */
  public openAssistantSidebar: boolean;

  /**
   * Toggle message sidebar flag.
   */
  public openMessageSidebar: boolean = true;

  /**
   * Map reference.
   */
  private map;

  /**
   * Windows reference.
   */
  private windows: any;

  constructor() {
  }

  ngOnInit() {
    this.windows = <any>window;
    this.map = new this.windows.google.maps.Map(document.getElementById('map'), this.getMapConfig());
    this.listenMoustrapEvents();
  }

  ngOnDestroy(): void {
  }

  private getMapConfig() {
    return {
      zoom: 16,
      styles: mapStyle,
      center: this.getDefaultCoords(),
      control: {}
    };
  }

  /**
   * Devuelve las coordenadas por default.
   */
  private getDefaultCoords(): any {
    const ret: any = { lat: -34.595398, lng: -58.383452 };
    return ret;
  }

  /**
   * Init listener of mousetrap.
   */
  private listenMoustrapEvents() {
    Mousetrap
      .bind('a', () => { this.openAssistantSidebar = !this.openAssistantSidebar; }, 'keyup');

    Mousetrap
      .bind('m', () => { this.openMessageSidebar = !this.openMessageSidebar; }, 'keyup');
  }
}
