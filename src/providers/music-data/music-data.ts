import { Injectable } from "@angular/core";
/*for local storage */
import { Storage } from "@ionic/storage";

@Injectable()
export class MusicDataProvider {
  constructor(public storage:Storage) {
  
  }
  saveMusicData(musicData){
    this.storage.set('songDetails',musicData)

  }

  getMusicData(){
   return this.storage.get('songDetails')
  }
}
