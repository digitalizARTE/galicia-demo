import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import * as Mousetrap from 'Mousetrap';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { mapStyle } from './map-style-config';
import { DefaultService, MerchantData } from 'src/api';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild(MatSidenavContainer, null) sidenavContainer: MatSidenavContainer;

  /**
   * Map reference.
   */
  private map;

  /**
   * Windows reference.
   */
  private windows: any;

  public categories: string[];

  public cities: string[];

  public states: string[];

  public filters: string[];

  public categoriesTooltip: string;

  private merchants: MerchantData[] = [
    {
      'id': 500,
      'name': 'SUPER',
      'category': 'Combustibles',
      'streetName': 'AMADEO JACQUES',
      'streetNumber': '957',
      'city': 'GENERAL PAZ',
      'state': 'CHACO',
      'zip': '7979',
      'lat': '-33.899568',
      'lng': '-11.272268'
    },
    {
      'id': 501,
      'name': 'MiMO',
      'category': 'Indumentario',
      'streetName': 'GALLO',
      'streetNumber': '9899',
      'city': 'MERLO',
      'state': 'BUENOS AIRES',
      'zip': '5291',
      'lat': '-65.806257',
      'lng': '-37.313049'
    },
    {
      'id': 502,
      'name': 'PELITO',
      'category': 'Indumentario',
      'streetName': 'PASAJE PARTICULAR',
      'streetNumber': '8968',
      'city': 'LAS FLORES',
      'state': 'BUENOS AIRES',
      'zip': '7671',
      'lat': '-14.382610',
      'lng': '-61.640780'
    },
    {
      'id': 503,
      'name': 'BENSIMONA',
      'category': 'Indumentario',
      'streetName': 'YAPEYU',
      'streetNumber': '621',
      'city': 'RAMALLO',
      'state': 'ENTRE RÍOS',
      'zip': '1307',
      'lat': '-96.806015',
      'lng': '-15.761765'
    },
    {
      'id': 504,
      'name': 'LEGACYTE',
      'category': 'Indumentario',
      'streetName': 'AGUILAR',
      'streetNumber': '9802',
      'city': 'PRESIDENTE PERÓN',
      'state': 'LA RIOJA',
      'zip': '1245',
      'lat': '-34.749732',
      'lng': '-60.869873'
    },
    {
      'id': 505,
      'name': 'SOTILE',
      'category': 'Gastronomia',
      'streetName': 'MAR ARGENTINO',
      'streetNumber': '4422',
      'city': 'AZUL',
      'state': 'ENTRE RÍOS',
      'zip': '7841',
      'lat': '-41.739300',
      'lng': '-79.294571'
    },
    {
      'id': 506,
      'name': 'EMPORIO',
      'category': 'Gastronomia',
      'streetName': 'CALCENA',
      'streetNumber': '3884',
      'city': 'TANDIL',
      'state': 'SAN LUIS',
      'zip': '1457',
      'lat': '-25.923822',
      'lng': '-76.928097'
    }
  ];
  private controls: FormGroup;

  get categoriesCtrl(): AbstractControl {
    return this.controls.get('categoriesCtrl');
  }

  get statesCtrl(): AbstractControl {
    return this.controls.get('statesCtrl');
  }

  get citiesCtrl(): AbstractControl {
    return this.controls.get('citiesCtrl');
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.windows = <any>window;
    this.map = new this.windows.google.maps.Map(document.getElementById('map'), this.getMapConfig());
    this.listenMoustrapEvents();
    // this.api.merchantsGet('ba439b7e66c5fa80669b219fd566e9e7').subscribe((merchants) => {
    //   this.merchants = merchants;
    //   console.log('merchants: %o', merchants);
    // });
    this.categories = [...new Set(this.merchants.map(x => x.category.trim()))].sort();
    this.cities = [...new Set(this.merchants.map(x => x.city.trim()))].sort();
    this.states = [...new Set(this.merchants.map(x => x.state.trim()))].sort();
    this.controls = this.fb.group({
      categoriesCtrl: [],
      statesCtrl: [],
      citiesCtrl: []
    });

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
      .bind('a', () => { }, 'keyup');

    Mousetrap
      .bind('m', () => { }, 'keyup');
  }
}
