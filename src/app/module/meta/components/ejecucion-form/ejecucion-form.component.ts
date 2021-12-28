import { Component, OnInit } from '@angular/core';
import {Map,tileLayer,marker} from 'leaflet';
import * as L from 'leaflet';
import { EjecucionModel } from '../../shared/models/ejecucion/ejecucion.model';

@Component({
  selector: 'app-ejecucion-form',
  templateUrl: './ejecucion-form.component.html',
  styleUrls: ['./ejecucion-form.component.scss']
})
export class EjecucionFormComponent implements OnInit {
  urlReverseGeocode="https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode";
  urlSuggest=`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest`;
  urlFindAddressCandidates=`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates`;

  map!:Map ;
  programacionModel !:EjecucionModel ;
  title :string='';
  currentPage:string ='';
  displayDialogEjecucionActividad:boolean=false;
  loading: boolean = false;
  display :boolean = false;
  programacionFormGroup!:any ;
  graphicsLayer: any;
  drawItems:any;
  results:any[]=[];

  constructor() { }

  ngOnInit(): void {
  }

}
