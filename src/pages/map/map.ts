import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 
import { ViewChild} from '@angular/core';
import { Platform } from 'ionic-angular';
import { ElementRef } from '@angular/core';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


declare var google;




@IonicPage({
    name: 'map'
})
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

    options : GeolocationOptions;
    currentPos : Geoposition;
    
   @ViewChild('map') mapElement: ElementRef;
    map: any; 
    
  constructor(public navCtrl: NavController, public navParams: NavParams,private geolocation : Geolocation,public plt: Platform,mapElement: ElementRef) {
//      this.plt.ready().then((readySource) => {
//          console.log('Platform ready from', readySource);
//          // Platform now ready, execute any required native code
//          this.getUserPosition();
//        });
      }
  


    // Wait the native plugin is ready.
//platform.ready().then(() => {
//  this.getUserPosition();
//});


    addMap(lat,long){

        let latLng = new google.maps.LatLng(lat, long);

        let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.addMarker();
    }
    
    addMarker(){
        let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
        });

        let content = "<p>This is your current position !</p>";          
        let infoWindow = new google.maps.InfoWindow({
        content: content
        });

        google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
        });
    }
    

    
    
    showNearbyResto(){
        
    }
    
}
