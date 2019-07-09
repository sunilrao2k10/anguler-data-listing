import { Component, EventEmitter, OnInit} from '@angular/core';
import { ApiService } from './api.service';
import { AgmMarker } from '@agm/core';
import { FormsModule }   from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  searchText:string
  title: string = 'Demo Listing Data';
  lat: number = 51.509865;
  lng: number = -0.118092;
  selectedLocation = [];
  listingData: any;
  activeMarker = -1;
  activeMarkerToggle: boolean = false;

  constructor(
    private _api: ApiService
  ){
    this._api.fetchData().subscribe(data => {
      this.activeMarker = -1;
      this.listingData = data;
      this.listingData.forEach(element => {
        element['activeMarkerToggle'] = false;
      });
      console.table(this.listingData);       
    })
  }
  ngOnInit(): void{
    
  }
  filteredData() {
    return (this.listingData || []).filter(item => item.id.toString().indexOf(this.searchText) > -1);
  }

  didTapOnMarker(event: EventEmitter<AgmMarker>, idx: number, id, item) {         
    item.activeMarkerToggle = !item.activeMarkerToggle
    this.activeMarker = idx;                      
    var removeItem = this.selectedLocation.some((item) => {
      return item.id == id;
    });          
    if(removeItem){
      this.selectedLocation = this.selectedLocation.filter((item)=>{
        return item.id != id;
      });      
    } else {
      this.selectedLocation.push(this.listingData[idx]);  
    }           
  }

  getStatusIcon(idx: number , item) {        
    return `http://team-scale.com/TestData/ng_text_v15/${item.activeMarkerToggle ? 'blue' : 'orange' }_marker.png`;
  }


}
