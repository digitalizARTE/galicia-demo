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


  private markers: any[];

  private heatCoors: any[] = [];

  private HEATMAPLAYER: any = null;

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
      'lat': '-34.594167',
      'lng': '-58.553650'
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

    this.renderHeatmap();

    this.markers = this.merchants.map(x => new this.windows.google.maps.Marker({
      position: new this.windows.google.maps.LatLng(parseFloat(x.lat), parseFloat(x.lng)),
      map: this.map,
      title: `${x.name} (${x.category})`
    }));
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

  public renderHeatmap(): void {
    const map: any = this.map;

    // tslint:disable-next-line:max-line-length
    const dataMock = [{ 'lat': -34.556306, 'lng': -58.414168 }, { 'lat': -34.4379744, 'lng': -58.8359624 }, { 'lat': -34.814428, 'lng': -58.540793 }, { 'lat': -34.5792915, 'lng': -58.4392647 }, { 'lat': -34.5970889, 'lng': -58.3754798 }, { 'lat': -34.59886, 'lng': -58.371487 }, { 'lat': -34.6293992, 'lng': -58.442448 }, { 'lat': -34.564636, 'lng': -58.4610525 }, { 'lat': -34.6043712, 'lng': -58.3751437 }, { 'lat': -34.814428, 'lng': -58.540793 }, { 'lat': -34.814428, 'lng': -58.540793 }, { 'lat': -34.556306, 'lng': -58.414168 }, { 'lat': -34.5972399, 'lng': -58.4159819 }, { 'lat': -34.5608787, 'lng': -58.4633516 }, { 'lat': -34.605833, 'lng': -58.363611 }, { 'lat': -34.9040599, 'lng': -58.7325253 }, { 'lat': -34.5835554, 'lng': -58.4284781 }, { 'lat': -34.601895, 'lng': -58.3809039 }, { 'lat': -34.9040599, 'lng': -58.7325253 }, { 'lat': -34.5932838, 'lng': -58.5958274 }, { 'lat': -34.5864871, 'lng': -58.4122418 }, { 'lat': -34.6511027, 'lng': -58.5371238 }, { 'lat': -34.556306, 'lng': -58.414168 }, { 'lat': -34.6028193, 'lng': -58.412786 }];
    this.windows = <any>window;
    dataMock
      .forEach((x) => {
        this.heatCoors.push(new this.windows.google.maps.LatLng(x.lat, x.lng));
      });
    this.windows = <any>window;
    this.HEATMAPLAYER = new this.windows.google.maps.visualization.HeatmapLayer({
      data: this.heatCoors,
      map: map
    });

    const GRADIENT: string[] = [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ];

    this.HEATMAPLAYER.set('gradient', GRADIENT);
    this.HEATMAPLAYER.set('opacity', null);
    this.HEATMAPLAYER.set('radius', null);
    this.HEATMAPLAYER.set('maxIntensity', 2);
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
