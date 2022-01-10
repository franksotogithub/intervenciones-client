import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '@app/global/constants';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProgramacionModel } from '../../shared/models/programacion/programacion.model';
import { ProgramacionService } from '../../shared/services/programacion/programacion.service';

import {  WKT,GeoJSON} from 'ol/format';
import * as turf from '@turf/turf';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

import {Map,tileLayer,marker} from 'leaflet';
import * as L from 'leaflet';
import { UtilHelper } from '@app/util/util.helper';
import { ProgramacionActividadUI } from '../../shared/models/programacion-actividad/programacion-actividad.ui';
import { MetaAnualUI } from '../../shared/models/meta-anual/meta-anual.ui';
import { MetaAnualService } from '../../shared/services/meta-anual/meta-anual.service';
import { ProgramacionActividadModel } from '../../shared/models/programacion-actividad/programacion-actividad.model';
import { ProgramacionActividadService } from '../../shared/services/programacion-actividad/programacion-actividad.service';
/*import { geojsonToWKT } from "@terraformer/wkt";*/

/*
declare let geojsonToWKT: any;
declare let  wktToGeoJSON :any;
var _this=this;
*/
var _this=this;
@Component({
  selector: 'app-programacion-form',
  templateUrl: './programacion-form.component.html',
  styleUrls: ['./programacion-form.component.scss'],
  providers:[ConfirmationService,MessageService]
})
export class ProgramacionFormComponent implements OnInit ,AfterViewInit{
  urlReverseGeocode="https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode";
  urlSuggest=`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest`;
  urlFindAddressCandidates=`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates`;

  map!:Map ;
  programacionModel !:ProgramacionModel ;
  title :string='';
  currentPage:string ='';
  displayDialogProgramacionActividad:boolean=false;
  loading: boolean = false;
  display :boolean = false;
  programacionFormGroup!:any ;
  graphicsLayer: any;
  drawItems:any;
  results:any[]=[];
  metaAnuales:MetaAnualUI[]=[];
  metaAnualSelect!:MetaAnualUI;


  //API_KEY ="AAPKd8485a61542546879a30f6253592219eTlqeQbra0smKAuDW-tcUE55FiZCbyzYoD8Fvpqa_HtEfQJa-NEibqLyQOuYQEap9";
  locatorUrl = "http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";
  editGraphic:any;

  private view: any = null;
  wkid=4326;


  prg_tipos =[{prg_tipo:1,prg_tipo_desc:'Punto'} , {prg_tipo:2,prg_tipo_desc:'Barrio'}]
  feature:any;
  pac_programado:number=0;
  programacionActividades: ProgramacionActividadUI[]=[];
  listDeleteprogramacionActividades :ProgramacionActividadUI[]=[];
  programacionActividadModel : ProgramacionActividadModel= new ProgramacionActividadModel();
  anio=new Date().getFullYear();
  filters = {asi_anio:this.anio ,prg_id:0};

  filtersAsignacion ={ asi_anio:this.anio ,prg_id:0 };

  activivadProgramadoValid =false;


  constructor(
    private formBuilder: RxFormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private programacionService:ProgramacionService,
    private zone: NgZone,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private metaAnualService: MetaAnualService,
    private programacionActividadService: ProgramacionActividadService
  ) {

    /*esriConfig.apiKey =this.API_KEY;*/
  }


  ngAfterViewInit(): void {




  }


getSuggestions(query:string){

    let outSR=encodeURIComponent(`{"wkid":${this.wkid}}`);
    let maxSuggestions =6;
    let text =encodeURIComponent(`${query}`);


    let params = `outSR=${outSR}&maxSuggestions=${maxSuggestions}&text=${text}&countryCode=PE&f=json`;

    fetch(`${this.urlSuggest}?${params}`).then(response=>response.json()).then(data=>{

      if(data ){
        this.results =data.suggestions.map((r:any)=> {return {text:r?.text,magicKey: r?.magicKey}});
      }


    })


}

selectLocation(event:any){
  let text =event.text;
  let magicKey =event.magicKey;
  this.programacionModel.prg_direccion =event.text;
  this.findAdressCandidate(magicKey,text);

}


reverseGeocode(x:number, y:number){
let location = encodeURIComponent(`{"spatialReference":{"wkid":${this.wkid}},"x":${x},"y":${y}}`);
let params=`location=${location}&f=json`;

  fetch(this.urlReverseGeocode+'?' + params).then(response => response.json())
   .then(

    data => {

      if(data && data.address){
        this.results=[{text:data.address.Address,magicKey:""}]
        this.programacionModel.prg_direccion =data.address.Address;
      }

      console.log('data>>>',data)
    }

   )
}

findAdressCandidate(magicKey:string,singleLine:string,){
 let SingleLine =encodeURIComponent(`${singleLine}`);
 let outFields=  encodeURIComponent(`Addr_type,Match_addr,StAddr,City`);
 let outSR = encodeURIComponent(`{"wkid":${this.wkid}}`);
 let maxLocations =6;
let params=`outSR=${outSR}&outFields=${outFields}&magicKey=${magicKey}&maxLocations=${maxLocations}&SingleLine=${SingleLine}&f=json`;

fetch( this.urlFindAddressCandidates+'?'+params).then(response => response.json()).then(data=>{

  if(data.candidates && data){

    let x=data.candidates[0].location.x;
    let y=data.candidates[0].location.y;
    this.addFeatureIni(true,y, x);
    this.currentLocation(y,x);
  }
});
}


  ngOnChanges(){




  }


  ngOnInit(): void {
    this.changeActivivadProgramadoValid();
    this.listMetaAnual(this.filtersAsignacion);
    this.settingPage();

    this.settingForm();
    this.zone.runOutsideAngular(() => {

    });

  }

  settingPage(){
    this.title = 'Nueva Programacion de Intervencion';
    this.activeRouter.url
      .subscribe(response=>{
        this.currentPage = response[response.length - 1].path;



        switch (this.currentPage) {
          case  Constants.PATH_CREATE:
            this.title ='Nueva  Programacion de Intervencion';
            this.programacionModel =new ProgramacionModel();
            this.initializeMap();
            this.getCurrentPoint(true);
            /*this.perfiles =[];*/
            break;

          case  Constants.PATH_UPDATE:
            this.title ='Actualizar Programacion de Intervencion';
            this.listerParams();
            break;

        }
        console.log('this.currentPage>>>',this.currentPage);
      });
  }


  listerParams(){
    this.activeRouter.params.subscribe(params=>{
        let idindicador=params['idProgramacion'];
        this.programacionService.programacionGet(idindicador)?.subscribe(res=>{
          console.log('res>>',res)
          if(res){
            this.programacionModel = new  ProgramacionModel(res);


            this.initializeMap();
            this.getCurrentPoint(true,this.programacionModel.prg_geom_json);
            if(this.programacionModel.prg_id){
              this.listProgramacionActividad(this.programacionModel.prg_id);
            }


            console.log('this.programacionModel>>>',this.programacionModel);

          }

        });
    });

  }



  settingForm(): void {
    this.programacionFormGroup = this.formBuilder.formGroup(new ProgramacionModel());

    this.programacionFormGroup.valueChanges.subscribe((change:any) => {

      this.programacionModel.is_valid = this.programacionFormGroup.valid;

     });

  }

  save(){

    this.confirmationService.confirm({
      message: 'Esta seguro que desea guardar la informacion?',
      accept: () => {
        switch (this.currentPage) {
          case  Constants.PATH_UPDATE:
            this.updateWKT();
            this.programacionService.programacionUpdate(this.programacionModel)?.subscribe((res)=>{

              if(res && res.id){
                this.saveProgramacionActividad(res.id);

              this.messageService.add({severity:'info', summary:'Datos guardados'});
              setTimeout(()=>{ this.regresar(); }, 2000);
              }

            });
            break;
          case  Constants.PATH_CREATE:
            this.updateWKT();
            this.programacionService.programacionUpdate(this.programacionModel)?.subscribe((res)=>{
              if(res && res.id){
                this.saveProgramacionActividad(res.id);
                this.messageService.add({severity:'info', summary:'Datos guardados'});
                setTimeout(()=>{ this.regresar(); }, 2000);

              }

            });
            break;
        }




      },
      acceptLabel: 'Si',
    });

  }

  regresar(){
    this.router.navigate(['meta/programacion']);
  }



  initializeMap(): any {
    this.map = new Map("mapViewNode").setView([-12.0328,-77.1298], 17);
    tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    {
      maxZoom: 21,
      maxNativeZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],

     })
    .addTo(this.map);

    this.drawItems = new L.FeatureGroup();
    this.map.addLayer(this.drawItems);


    /*this.getCurrentPoint(true);*/

    var drawControl = new L.Control.Draw({
      position: 'topright',
      draw: {
          polyline: false,
          polygon: false,
          marker: false,
          circle: false,
          rectangle: false,
      },
      edit: {
          featureGroup: this.drawItems,
          remove: true
      }
    });

    this.map.addControl(drawControl);


    this.map.on(L.Draw.Event.EDITED,  (event) =>{
      var layer = event.layer;


      this.updateWKT(true);

    });

  }

  changeTipo(){
    console.log('this.programacionModel.prg_tipo>>>',this.programacionModel.prg_tipo)
    let latitude =this.programacionModel.prg_lat;
    let longitude =this.programacionModel.prg_lon;

    if(this.programacionModel.prg_lat && this.programacionModel.prg_lon){
      if(this.programacionModel.prg_tipo==2){
        this.addPolygon(true,latitude,longitude);
      }
      else if (this.programacionModel.prg_tipo==1){
        this.addPoint(true,latitude,longitude);
      }
    }


  }

  /*addNewPolygon(latitude:any,longitude:any){
    if(this.feature)this.drawItems.removeLayer(this.feature);
    let r=0.0005;
    let coords = [[ latitude-r ,longitude-r],[latitude+r ,longitude-r],[latitude+r ,longitude+r],[latitude-r ,longitude+r]];
    this.feature = L.polygon(coords, {color: 'blue'});
    this.drawItems.addLayer( this.feature);

    this.updateWKT(false);



  }
*/

addPolygon(is_new:boolean,latitude:any,longitude:any, prg_geom_json_string?:any){

  if(this.feature)this.drawItems.removeLayer(this.feature);

  if(is_new){
    let r=0.0005;
    let coords = [[ latitude-r ,longitude-r],[latitude+r ,longitude-r],[latitude+r ,longitude+r],[latitude-r ,longitude+r]];
    this.feature = L.polygon(coords, {color: 'blue'});
    this.drawItems.addLayer( this.feature);

    this.updateWKT(false);
  }

  else{



    let prg_geom_json=JSON.parse(prg_geom_json_string);
    console.log('prg_geom_json>>>',prg_geom_json);
     let coords = prg_geom_json.coordinates;
     /*this.feature=L.geoJSON(prg_geom_json);
     this.drawItems.addLayer(this.feature);*/
     console.log('coords[0][0]>>>',coords[0]);
     let newCoords=[coords[0].map((c:any)=> { return [c[1],c[0]]})]

    this.feature = L.polygon(newCoords, {color: 'blue'});

    /*L.geoJSON(prg_geom_json, {
      onEachFeature: (e:any)=>{
        console.log('feature>>>',e)

      }
  })*/

    this.drawItems.addLayer( this.feature);
  }


}

addPoint(isNew:boolean,latitude:any,longitude:any){
  if(this.feature)this.drawItems.removeLayer(this.feature);
  let current_location = L.icon({
    iconUrl: 'assets/img/marker-icon.png',
  });
  if(isNew){

    this.feature= L.marker([latitude, longitude], {icon: current_location});
    this.drawItems.addLayer( this.feature);
    this.updateWKT(false);
  }
  else{
    this.feature= L.marker([latitude, longitude], {icon: current_location});
    this.drawItems.addLayer( this.feature);
  }





  //this.updateWKT(false);
}

  getCurrentPoint(addMarker:boolean,prg_geom_json ?:string){


      if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition((data) => {

          if(data){


            if(prg_geom_json && this.programacionModel.prg_lat &&  this.programacionModel.prg_lon){

              console.log('prg_geom_json>>>',prg_geom_json);
              this.currentLocation(this.programacionModel.prg_lat,this.programacionModel.prg_lon);

              (addMarker)?this.addFeatureIni(false,this.programacionModel.prg_lat,this.programacionModel.prg_lon,prg_geom_json):false;



            }

            else {


              this.currentLocation(data.coords.latitude,data.coords.longitude);

              (addMarker)?this.addFeatureIni(true,data.coords.latitude,data.coords.longitude):false;

              this.reverseGeocode(data.coords.longitude,data.coords.latitude,);


            }



           }
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }

    }


    currentLocation(latitude:number,longitude:number,zoom?:number){
      const location=(zoom)? this.map.setView(new L.LatLng( latitude, longitude),20):this.map.setView(new L.LatLng( latitude, longitude),this.map.getZoom());
      this.programacionModel.prg_lon =longitude;
      this.programacionModel.prg_lat =latitude;

    }



    addFeatureIni(isNew :boolean,latitude:any, longitude:any ,prg_geom_json_string?:any){


       if(this.feature)this.drawItems.removeLayer(this.feature);

       if(this.programacionModel.prg_tipo ==1){
        this.addPoint(isNew,latitude,longitude);

      }

      else if(this.programacionModel.prg_tipo ==2) {


        this.addPolygon(isNew,latitude,longitude,prg_geom_json_string);

      }
      /*console.log('latitude:',latitude,'longitude:',longitude)*/


      /*if(isNew && this.programacionModel.prg_tipo ==1){
        this.addPoint(latitude,longitude);

      }

      else if(isNew && this.programacionModel.prg_tipo ==2) {


        this.addNewPolygon(latitude,longitude);

      }

      else if(isNew && this.programacionModel.prg_tipo ==1) {


        this.addPoint(latitude,longitude);

      }*/



    }

    updateWKT(updateFeature:boolean=false){
      let layerGeoJSON = this.drawItems.toGeoJSON();
      let wkt_options = {};
      let geojson_format = new GeoJSON();
      let testFeature = geojson_format.readFeatures(layerGeoJSON);
      console.log('layerGeoJSON.features>>>',layerGeoJSON.features);
      console.log('testFeature>>>',testFeature);
      let wkt = new WKT(wkt_options);
      let out = wkt.writeFeatures(testFeature);
      this.programacionModel.prg_geom_wkt=out;


      if(updateFeature && layerGeoJSON && layerGeoJSON.features && layerGeoJSON.features[0]){
        if(this.programacionModel.prg_tipo==1){
          this.programacionModel.prg_lon=layerGeoJSON.features[0].geometry.coordinates[0];
          this.programacionModel.prg_lat=layerGeoJSON.features[0].geometry.coordinates[1];

        }

        else if (this.programacionModel.prg_tipo==2){

          let coords=layerGeoJSON.features[0].geometry.coordinates;
          let poly1 = turf.polygon(coords);
          let centroid = turf.centroid(poly1);
          this.programacionModel.prg_lat=centroid.geometry.coordinates[1];
          this.programacionModel.prg_lon=centroid.geometry.coordinates[0];

        }



      }



    }




  findLocations(event:any){
    if(this.programacionModel.prg_direccion && this.programacionModel.prg_direccion?.length>5){

     this.getSuggestions(this.programacionModel.prg_direccion);

    }



  }


  agregarActividad(){
    this.displayDialogProgramacionActividad=true;

  }

   changeActivivadProgramadoValid(){
     this.activivadProgramadoValid=(this.metaAnualSelect && this.metaAnualSelect.asi_id  && this.pac_programado>0 )?true:false;



   }

   clickSelectMetaAnualSelect(metaAnual: MetaAnualUI){
     this.metaAnualSelect=metaAnual;
     this.changeActivivadProgramadoValid();

   }
   /*(click)="metaAnualSelect=metaAnual"*/

  aceptarGuardarActividad(){
    let programacionActividad: ProgramacionActividadModel = new ProgramacionActividadModel();
    programacionActividad.pac_id =0;
    programacionActividad.pac_programado = this.pac_programado;
    programacionActividad.asi_id = this.metaAnualSelect.asi_id;
    programacionActividad.lia_nombre =this.metaAnualSelect.lia_nombre;
    programacionActividad.pro_nombre = this.metaAnualSelect.pro_nombre;
    programacionActividad.ger_nombre= this.metaAnualSelect.ger_nombre;
    programacionActividad.ind_nombre = this.metaAnualSelect.ind_nombre;
    programacionActividad.sge_nombre = this.metaAnualSelect.sge_nombre;
    programacionActividad.act_nombre = this.metaAnualSelect.act_nombre;
    programacionActividad.asi_meta =this.metaAnualSelect.asi_meta;
    programacionActividad.asi_anio =this.metaAnualSelect.asi_anio;
    this.programacionActividades.push(programacionActividad);
    this.displayDialogProgramacionActividad=false;


  }



  listProgramacionActividad(idProgramacion:number){
    this.filters.prg_id=idProgramacion;
    this.programacionActividadService.programacionActividadList(this.filters)?.subscribe(res=>{
      this.programacionActividades=res;

    });


  }

  eliminarActividad(programacionActividad: ProgramacionActividadUI){
     if(programacionActividad.pac_id==0){
      const index = this.programacionActividades.indexOf(programacionActividad);
      this.programacionActividades.splice(index, 1);


     }

     else{
      const index = this.programacionActividades.indexOf(programacionActividad);
      this.programacionActividades.splice(index, 1);
      this.listDeleteprogramacionActividades.push(programacionActividad);

     }
  }

  saveProgramacionActividad(idProgramacion:number){
    console.log('this.programacionActividades>>>',this.programacionActividades);
    let promiseList:any[]=[]
    if(this.programacionActividades && this.programacionActividades.length>0 ){
      this.programacionActividades.map((e)=>{ e.prg_id=idProgramacion});
      this.programacionActividades.filter(e=> e.pac_id==0).forEach(up=>{
        promiseList.push(this.programacionActividadService.programacionActividadCreate(up));
      });


    }
    if (promiseList.length>0) {
      forkJoin(promiseList).subscribe(
        (resList) => {

          resList.forEach((res) => {

            console.log(res);
          });


        },
        (err) => {
          console.log(err);
        }
      );
    }




    let promiseListDelete:any[]=[]
    if(this.listDeleteprogramacionActividades && this.listDeleteprogramacionActividades.length>0 ){
      this.listDeleteprogramacionActividades.forEach(up=>{
        if(up.pac_id)
        promiseList.push(this.programacionActividadService.programacionActividadDelete(up.pac_id)  );
      });


    }

    if (promiseListDelete.length>0) {
      forkJoin(promiseListDelete).subscribe(
        (resList) => {

          resList.forEach((res) => {

            console.log(res);
          });


        },
        (err) => {
          console.log(err);
        }
      );
    }

  }

  listMetaAnual(filters?:any){

    this.metaAnualService.metaAnualList(filters)?.subscribe((list:MetaAnualUI[])=>{
        this.metaAnuales = list;
    });
  }

  changeFilter(){
    this.listMetaAnual(this.filtersAsignacion);
  }

}
