import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import {Map,tileLayer,marker} from 'leaflet';
import * as L from 'leaflet';
import { EjecucionModel } from '../../shared/models/ejecucion/ejecucion.model';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EjecucionService } from '../../shared/services/ejecucion/ejecucion.service';
import {  WKT,GeoJSON} from 'ol/format';
import { Constants } from '@app/global/constants';
import { EjecucionActividadUI } from '../../shared/models/ejecucion-actividad/ejecucion-actividad.ui';
import { ProgramacionActividadUI } from '../../shared/models/programacion-actividad/programacion-actividad.ui';
import { MetaAnualUI } from '../../shared/models/meta-anual/meta-anual.ui';
import { MetaAnualService } from '../../shared/services/meta-anual/meta-anual.service';
import { EjecucionActividadService } from '../../shared/services/ejecucion-actividad/ejecucion-actividad.service';
import { EjecucionActividadModel } from '../../shared/models/ejecucion-actividad/ejecucion-actividad.model';
import { ProgramacionActividadService } from '../../shared/services/programacion-actividad/programacion-actividad.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { ProgramacionActividadModel } from '../../shared/models/programacion-actividad/programacion-actividad.model';
import { PrimeIcons } from "primeng/api";
import { PersonaUI } from '@app/shared/models/persona/persona.ui';
import { PersonaService } from '@app/shared/services/persona/persona.service';
import { ArchivoService } from '@app/shared/services/archivo/archivo.service';
import { FileUpload } from 'primeng/fileupload';
import { EjecucionEvidenciaService } from '../../shared/services/ejecucion-evidencia/ejecucion-evidencia.service';
import { EjecucionValidacionService } from '../../shared/services/ejecucion-validacion/ejecucion-validacion.service';
import { EjecucionEvidenciaUI } from '../../shared/models/ejecucion-evidencia/ejecucion-evidencia.ui';
import { EjecucionValidacionModel } from '../../shared/models/ejecucion-validacion/ejecucion-validacion.model';
@Component({
  selector: 'app-ejecucion-form',
  templateUrl: './ejecucion-form.component.html',
  styleUrls: ['./ejecucion-form.component.scss'],
  providers:[ConfirmationService,MessageService]
})
export class EjecucionFormComponent implements OnInit ,AfterViewInit {
  @ViewChild('fileInput') fileInput!: FileUpload;
  @ViewChild('mapViewNode')
  private mapViewNode!: ElementRef<HTMLElement>;;
  urlReverseGeocode="https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode";
  urlSuggest=`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest`;
  urlFindAddressCandidates=`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates`;

  map!:Map ;
  ejecucionModel !:EjecucionModel ;
  title :string='';
  currentPage:string ='';
  displayDialogProgramacionActividad:boolean=false;
  loading: boolean = false;
  display :boolean = false;
  ejecucionFormGroup!:any ;
  ejecucionActividadFormGroup!:any;
  graphicsLayer: any;
  drawItems:any;
  results:any[]=[];
  ejecucionActividades :EjecucionActividadUI[]=[];
  locatorUrl = "http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";
  editGraphic:any;

  private view: any = null;
  wkid=4326;
  prg_tipos =[{prg_tipo:1,prg_tipo_desc:'General'} , {prg_tipo:1,prg_tipo_desc:'Barrio'}]
  feature:any;
  pac_programado:number=0;

  ejecucionActividad:EjecucionActividadModel= new EjecucionActividadModel();

  uploadedFiles:any[]=[];
  estados =[
    {
    eej_id:1,eej_nombre:'REGISTRADO'
  },
  {
    eej_id:2,eej_nombre:'OBSERVADO'
  },
  {
    eej_id:3,eej_nombre:'RESPONDIDO'
  },
  {
    eej_id:4,eej_nombre:'APROBADO'
  }


]
selectedEstado:any;
  /*ejecucionActividades: EjecucionActividadUI[]=[];
  listDeleteejecucionActividades :EjecucionActividadUI[]=[];
  ejecucionActividadModel : EjecucionActividadModel= new EjecucionActividadModel();
*/


metaAnualesDataTable:ProgramacionActividadUI[]=[];
  metaAnualSelect!:ProgramacionActividadUI;

  listDeleteEjecucionActividades :EjecucionActividadUI[]=[];
  listDeleteEjecucionEvidencias :EjecucionEvidenciaUI[]=[];
  fileList =[];


  metasAnualesCompleta:ProgramacionActividadUI[] =[];
  anio=new Date().getFullYear();
  filters ={ asi_anio:this.anio,  programado:1 }

  personas : PersonaUI[]=[];
  personaSelect !:PersonaUI;
  ejecucionEvidencias:EjecucionEvidenciaUI[]=[]
  ejecucionValicacion :EjecucionValidacionModel = new EjecucionValidacionModel();
  ejecucionValicacionTemp :EjecucionValidacionModel = new EjecucionValidacionModel();

  ejecucionValidaciones :EjecucionValidacionModel[]=[];

  events1: any[]=[];


  constructor(

    private formBuilder: RxFormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private ejecucionService:EjecucionService,
    private ejecucionActividadService :EjecucionActividadService,
    private zone: NgZone,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private metaAnualService: MetaAnualService,
    private programacionActividad: ProgramacionActividadService,
    private personaService: PersonaService,
    private archivoService: ArchivoService,
    private ejecucionEvidenciaService:EjecucionEvidenciaService,
private ejecucionValidacionService: EjecucionValidacionService

    //private ejecucionActividadService: EjecucionActividadService

  ) { }
  ngAfterViewInit(): void {

   /* throw new Error('Method not implemented.');*/


  }

  ngOnInit(): void {
    this.listPersonas();
    this.listMetaAnual();
    this.settingPage();

    this.settingForm();
    this.zone.runOutsideAngular(() => {

    });

/*

    this.events1 = [
      {
        status: "Ordered",
        date: "15/10/2020 10:30",
        icon: PrimeIcons.SHOPPING_CART,
        color: "#9C27B0",
        image: "game-controller.jpg"
      },
      {
        status: "Processing",
        date: "15/10/2020 14:00",
        icon: PrimeIcons.COG,
        color: "#673AB7"
      },
      {
        status: "Shipped",
        date: "15/10/2020 16:15",
        icon: PrimeIcons.ENVELOPE,
        color: "#FF9800"
      },
      {
        status: "Delivered",
        date: "16/10/2020 10:00",
        icon: PrimeIcons.CHECK,
        color: "#607D8B"
      }
    ];

*/
  }

  setEjecucionValidacion(){

    this.ejecucionValicacionTemp =new EjecucionValidacionModel();

    switch (this.currentPage) {
      case  Constants.PATH_CREATE:
        /*this.title ='Nueva  Ejecucion ';
        this.ejecucionModel =new EjecucionModel();
        setTimeout(()=>{
          this.initializeMap();
          this.getCurrentPoint(true);
        }, 1000);

*/

this.estados =[
  {
  eej_id:1,eej_nombre:'REGISTRADO'
},



]

this.ejecucionValicacionTemp.eej_id=1;

        break;

      case  Constants.PATH_UPDATE:
        console.log('this.ejecucionModel>>>',this.ejecucionModel);
        if(this.ejecucionModel.eej_id ==1 || this.ejecucionModel.eej_id ==3){
          this.estados =[
            {
              eej_id:2,eej_nombre:'OBSERVADO'
            },
           /* {
              eej_id:3,eej_nombre:'RESPONDIDO'
            },*/
            {
              eej_id:4,eej_nombre:'APROBADO'
            }



          ];
          this.ejecucionValicacionTemp.eej_id=2;
        }

        else if(this.ejecucionModel.eej_id ==2 ){
          this.estados =[

            {
              eej_id:3,eej_nombre:'RESPONDER'
            },




          ];

          this.ejecucionValicacionTemp.eej_id=3;
        }

    }

  }

  settingForm(): void {
    this.ejecucionFormGroup = this.formBuilder.formGroup(new EjecucionModel());

    this.ejecucionFormGroup.valueChanges.subscribe((change:any) => {

      this.ejecucionModel.is_valid = this.ejecucionFormGroup.valid;

     });

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
  this.ejecucionModel.eje_direccion =event.text;
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
        this.ejecucionModel.eje_direccion =data.address.Address;
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
    this.addMarkerCurrentLocation(y, x);
    this.currentLocation(y,x);
  }
});
}




settingPage(){
  this.title = 'Nueva Ejecucion ';
  this.activeRouter.url
    .subscribe(response=>{
      this.currentPage = response[response.length - 1].path;



      switch (this.currentPage) {
        case  Constants.PATH_CREATE:
          this.title ='Nueva  Ejecucion ';
          this.ejecucionModel =new EjecucionModel();
          console.log( ' this.ejecucionModel>>',this.ejecucionModel );
          this.setEjecucionValidacion();
          setTimeout(()=>{
            this.initializeMap();
            this.getCurrentPoint(true);
          }, 1000);



          break;

        case  Constants.PATH_UPDATE:
          this.title ='Actualizar Ejecucion ';
          this.listerParams();
          break;

      }
      console.log('this.currentPage>>>',this.currentPage);
    });
}


listerParams(){
  this.activeRouter.params.subscribe(params=>{
      let idindicador=params['idEjecucion'];
      this.ejecucionService.ejecucionGet(idindicador)?.subscribe(res=>{
        console.log('res>>',res)
        if(res){
          this.ejecucionModel = new  EjecucionModel(res);

          setTimeout(()=>{
            this.initializeMap();

            if(this.ejecucionModel.eje_geom_wkt){
              this.getCurrentPoint(true,this.ejecucionModel.eje_geom_wkt);
            }
          }, 1000);


          if(this.ejecucionModel.eje_id){
            this.listEjecucionActividad(this.ejecucionModel.eje_id);

            this.listEjecucionEvidencia(this.ejecucionModel.eje_id);
            this.listEjecucionValidacion(this.ejecucionModel.eje_id);
            this.setEjecucionValidacion();
          }


          console.log('this.ejecucionModel>>>',this.ejecucionModel);

        }

      });
  });

}


regresar(){
  this.router.navigate(['meta/ejecucion']);
}



initializeMap(): any {
  this.map = new Map("mapViewNode").setView([-12.0328,-77.1298], 15);
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


    this.updateWKT();

  });

}


getCurrentPoint(addMarker:boolean,prg_geom_json ?:string){


    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition((data) => {

        if(data){


          if(prg_geom_json && this.ejecucionModel.eje_lat &&  this.ejecucionModel.eje_lon){
            this.currentLocation(this.ejecucionModel.eje_lat,this.ejecucionModel.eje_lon);

            (addMarker)?this.addMarkerCurrentLocation(this.ejecucionModel.eje_lat,this.ejecucionModel.eje_lon):false;



          }

          else {


            this.currentLocation(data.coords.latitude,data.coords.longitude);

            (addMarker)?this.addMarkerCurrentLocation(data.coords.latitude,data.coords.longitude):false;

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
    this.ejecucionModel.eje_lon =longitude;
    this.ejecucionModel.eje_lat =latitude;

  }



  addMarkerCurrentLocation(latitude:any, longitude:any){
     if(this.feature)this.drawItems.removeLayer(this.feature);

    var current_location = L.icon({
      iconUrl: 'assets/img/marker-icon.png',
    });
    console.log('latitude:',latitude,'longitude:',longitude)

    this.feature= L.marker([latitude, longitude], {icon: current_location});

    this.drawItems.addLayer( this.feature);
    this.updateWKT();






  }

  updateWKT(){
    let layerGeoJSON = this.drawItems.toGeoJSON();
    let wkt_options = {};
    let geojson_format = new GeoJSON();
    let testFeature = geojson_format.readFeatures(layerGeoJSON);
    let wkt = new WKT(wkt_options);
    let out = wkt.writeFeatures(testFeature);
    this.ejecucionModel.eje_geom_wkt=out;


    if(layerGeoJSON && layerGeoJSON.features && layerGeoJSON.features[0]){
      /*if(this.ejecucionModel.prg_tipo==1){
        this.ejecucionModel.prg_lon=layerGeoJSON.features[0].geometry.coordinates[0];
        this.ejecucionModel.prg_lat=layerGeoJSON.features[0].geometry.coordinates[1];

      }*/

      this.ejecucionModel.eje_lon=layerGeoJSON.features[0].geometry.coordinates[0];
        this.ejecucionModel.eje_lat=layerGeoJSON.features[0].geometry.coordinates[1];



    }



  }




findLocations(event:any){
  if(this.ejecucionModel.eje_direccion && this.ejecucionModel.eje_direccion?.length>5){

   this.getSuggestions(this.ejecucionModel.eje_direccion);

  }



}

save(){
  this.confirmationService.confirm({
    message: 'Esta seguro que desea guardar la informacion?',
    accept: () => {
      switch (this.currentPage) {
        case  Constants.PATH_UPDATE:
          this.updateWKT();
          this.ejecucionService.ejecucionUpdate(this.ejecucionModel)?.subscribe((res)=>{
console.log('res>>>',res);
            if(res && res.id){

              this.saveEjecucionActividad(res.id);
              if (this.fileInput && this.fileInput.files) {
                this.saveEvidencia(res.id);
              }

              this.saveEjecucionValidacion(res.id);



            this.messageService.add({severity:'info', summary:'Datos guardados'});
            setTimeout(()=>{ this.regresar(); }, 1000);
            }

          });
          break;
        case  Constants.PATH_CREATE:
          this.updateWKT();
          this.ejecucionService.ejecucionCreate(this.ejecucionModel)?.subscribe((res)=>{

            if(res && res.id){
              this.saveEjecucionActividad(res.id);


              if (this.fileInput && this.fileInput.files) {
                this.saveEvidencia(res.id);
              }

              this.saveEjecucionValidacion(res.id);


              this.messageService.add({severity:'info', summary:'Datos guardados'});
              setTimeout(()=>{ this.regresar(); }, 1000);

            }

          });
          break;
      }




    },
    acceptLabel: 'Si',
  });
}

saveEjecucionActividad(idEjecucion:number){


  console.log('this.programacionActividades>>>',this.ejecucionActividades);
  let promiseList:any[]=[]
  if(this.ejecucionActividades && this.ejecucionActividades.length>0 ){
    this.ejecucionActividades.map((e)=>{ e.eje_id=idEjecucion});
    this.ejecucionActividades.filter(e=> e.eac_id==0).forEach(up=>{
      promiseList.push(this.ejecucionActividadService.ejecucionActividadCreate(up));
    });


  }

  console.log('promiseList>>>',promiseList);
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
  if(this.listDeleteEjecucionActividades && this.listDeleteEjecucionActividades.length>0 ){
    this.listDeleteEjecucionActividades.forEach(up=>{
      if(up.pac_id)
      promiseList.push(this.ejecucionActividadService.ejecucionActividadDelete(up.pac_id)  );
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


onUpload(event:any) {
  console.log('event>>>',event);
  for(let file of event.files) {
      console.log('file>>',file);
      this.uploadedFiles.push(file);
  }


  }



saveEvidencia(idEjecucion:number){



  let promiseList:any[]=[]
  if( this.fileInput &&  this.fileInput.files.length>0 ){
    this.fileInput.files.forEach((file) => {
      promiseList.push(this.archivoService.subirFoto(file));
    });

  }


  if (promiseList.length>0) {
    forkJoin(promiseList).subscribe(
      (resList) => {

        resList.forEach((res) => {

          console.log(res);

          if(res && res.file && res.file.filename){
            let ejecucionEvidencia : EjecucionEvidenciaUI ={eev_foto:res.file.filename, eev_id:0,eje_id:idEjecucion,img:''}


            this.ejecucionEvidenciaService.ejecucionEvidenciaCreate(ejecucionEvidencia)?.subscribe((res)=>{
               console.log('res>>',res);
            })

          }

        });


      },
      (err) => {
        console.log(err);
      }
    );
  }

  let promiseDeleteList:any[]=[]
  if(this.listDeleteEjecucionEvidencias.length>0){
    this.listDeleteEjecucionEvidencias.forEach((de) => {

      promiseDeleteList.push(this.ejecucionEvidenciaService.ejecucionEvidenciaDelete(de.eev_id));
    });
  }


  if (promiseDeleteList.length>0) {
    forkJoin(promiseDeleteList).subscribe(
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



settingFormEjecucionActividad(): void {
  this.ejecucionActividadFormGroup = this.formBuilder.formGroup(new EjecucionActividadModel());

  this.ejecucionActividadFormGroup.valueChanges.subscribe((change:any) => {



      this.ejecucionActividad.is_valid = this.ejecucionActividadFormGroup.valid;


   });

}
seleccionarMetaAnual(metaAnual:ProgramacionActividadUI){
  this.metaAnualSelect=metaAnual;
  this.ejecucionActividad.asi_id = this.metaAnualSelect.asi_id;
  this.ejecucionActividadFormGroup.get('asi_id').setValue(this.metaAnualSelect.asi_id);

}


agregarActividad(){
  this.displayDialogProgramacionActividad=true;

  this.metaAnualSelect = new  ProgramacionActividadModel();
  this.ejecucionActividad= new EjecucionActividadModel();
  this.settingFormEjecucionActividad();
}


removerActividad(ejecucionActividad:EjecucionActividadUI){
  if(ejecucionActividad.eje_id==0){
    const index = this.ejecucionActividades.indexOf(ejecucionActividad);
    this.ejecucionActividades.splice(index, 1);

   }

   else{
    const index = this.ejecucionActividades.indexOf(ejecucionActividad);
    this.ejecucionActividades.splice(index, 1);
    this.listDeleteEjecucionActividades.push(ejecucionActividad);

   }
}

aceptarGuardarActividad(){
  /*let ejecucionActividad: EjecucionActividadModel = new EjecucionActividadModel();*/


  this.ejecucionActividad.eac_id =0;
  this.ejecucionActividad.asi_id = this.metaAnualSelect.asi_id;
  this.ejecucionActividad.lia_nombre =this.metaAnualSelect.lia_nombre;
  this.ejecucionActividad.pro_nombre = this.metaAnualSelect.pro_nombre;
  this.ejecucionActividad.ger_nombre= this.metaAnualSelect.ger_nombre;
  this.ejecucionActividad.ind_nombre = this.metaAnualSelect.ind_nombre;
  this.ejecucionActividad.act_nombre = this.metaAnualSelect.act_nombre;
  this.ejecucionActividad.asi_meta =this.metaAnualSelect.asi_meta;
  this.ejecucionActividad.asi_anio =this.metaAnualSelect.asi_anio;
  this.ejecucionActividad.pac_id = this.metaAnualSelect.pac_id;
  this.ejecucionActividad.prg_id = this.metaAnualSelect.prg_id;
  this.ejecucionActividad.eac_programado = this.metaAnualSelect.pac_programado;
  this.ejecucionActividades.push(this.ejecucionActividad);
  this.displayDialogProgramacionActividad=false;


}


listEjecucionActividad(idEjecucion:number){

  this.ejecucionActividadService.ejecucionActividadList({eje_id:idEjecucion})?.subscribe(res=>{
    this.ejecucionActividades =res;

  });


}

listEjecucionEvidencia(idEjecucion:number){

  this.ejecucionEvidenciaService.ejecucionEvidenciaList({eje_id:idEjecucion})?.subscribe(res=>{
    this.ejecucionEvidencias =res;

  });


}


listEjecucionValidacion (idEjecucion:number){
  let payload={eje_id:idEjecucion}
  this.ejecucionValidacionService.ejecucionValidacionList(payload)?.subscribe(res=>{

    this.ejecucionValidaciones =res;

    this.events1 = this.ejecucionValidaciones.sort((a:any,b:any)=> { return a.eva_id - b.eva_id}).map((v:EjecucionValidacionModel)=> {return {status:v.eej_nombre , date: v.fecha_crea,mensaje: v.eva_mensaje} })

  })
}

saveEjecucionValidacion(idEjecucion:number){

  this.ejecucionValicacion.eje_id =idEjecucion;
  switch (this.currentPage) {
    case Constants.PATH_CREATE:
      this.enviarValidacion();
      this.ejecucionValidacionService.ejecucionValidacionCreate(this.ejecucionValicacion)?.subscribe(res=>{
        console.log('res>>>',res);
      });
break;
      case Constants.PATH_UPDATE:

        if(this.ejecucionValicacion && this.ejecucionValicacion.es_enviado){
          this.ejecucionValidacionService.ejecucionValidacionUpdate(this.ejecucionValicacion)?.subscribe(res=>{
            console.log('res>>>',res);
          });

        }
break;

  }
}

listMetaAnual(){


  this.programacionActividad.programacionActividadList(this.filters)?.subscribe((list:ProgramacionActividadUI[])=>{

    console.log('list>>>',list);

    this.metasAnualesCompleta =list;


    this.filterProgramado();


  })
}
changeFilter(){
this.listMetaAnual();
}

filterProgramado(){
  console.log('this.filters.programado>>>',this.filters.programado);
  console.log('metasAnualesCompleta>>>',this.metasAnualesCompleta);

  if(this.filters.programado==1)
    {
      this.metaAnualesDataTable =  this.metasAnualesCompleta.filter(e=>{return e.pac_id }); // programado

    }

    else{
      this.metaAnualesDataTable =  this.metasAnualesCompleta.filter(e=>{return e.pac_id==null }); // no programado
    }
}

removerEvidencia(e:any, i:number,ejecucionEvidencia:EjecucionEvidenciaUI){


  this.ejecucionEvidencias.indexOf(ejecucionEvidencia);
  this.ejecucionEvidencias.splice(i, 1);
  this.listDeleteEjecucionEvidencias.push(ejecucionEvidencia);

  /*  if(ejecucionActividad.eje_id==0){
      const index = this.ejecucionActividades.indexOf(ejecucionActividad);
      this.ejecucionActividades.splice(index, 1);

     }

     else{
      const index = this.ejecucionActividades.indexOf(ejecucionActividad);
      this.ejecucionActividades.splice(index, 1);
      this.listDeleteEjecucionActividades.push(ejecucionActividad);

     }*/






}

listPersonas(){
  this.personaService.personaList()?.subscribe(res=>{
      this.personas=res;
  });
}


enviarValidacion(){
this.ejecucionValicacion.es_enviado=true;
/*this.ejecucionValidaciones.push(this.ejecucionValicacion);

console.log('this.events1>>',this.events1);*/
/*this.events1.push({status:this.ejecucionValicacion.eej_nombre, date:this.ejecucionValicacion.fecha_crea })*/
this.ejecucionValicacion.eej_id= this.ejecucionValicacionTemp.eej_id;
this.ejecucionValicacion.eva_mensaje = this.ejecucionValicacionTemp.eva_mensaje;
//this.ejecucionValidacion. =ejecucionValicacionTemp
let id=this.ejecucionValicacionTemp.eej_id;
let estado=this.estados.find((e)=>{return e.eej_id==id});
this.ejecucionValicacion.eej_nombre=estado?.eej_nombre;
/*
let event={status: this.ejecucionValicacion.eej_nombre,date:'15/10/2020 10:30' }
this.events1.push(event);
*/

console.log('this.events1>>',this.events1);
/*if(this.ejecucionModel && this.ejecucionModel.eje_id)
this.listEjecucionValidacion(this.ejecucionModel.eje_id);*/

}



changeEstado(){
/*
  let id=this.ejecucionValicacion.eej_id;
  let estado=this.estados.find((e)=>{return e.eej_id==id});
  this.ejecucionValicacion.eej_nombre=estado?.eej_nombre;
*/

}

}
