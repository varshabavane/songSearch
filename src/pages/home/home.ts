import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  music: MediaObject;

  nativePath: string;

  tracks: any;
  playing: boolean;
  currentTrack: any;
  progressInterval: any;
  constructor(
    public navCtrl: NavController,
    private fileChooser: FileChooser,
    // private filePath: FilePath,
    private media: Media
  ) {
    this.tracks = [
      {
        title: "hrudyat vaje smthng",
        artist: "rohit raut",
        playing: false,
        songPath: "/android_asset/www/assets/songs/hrudyat vaje smthng.mp3",
        progress:0,
        img: "/android_asset/www/assets/imgs/2.jpg"
      },
      {
        title: "love u zindagi",
        artist: "alia",
        playing:false,
        songPath: "/android_asset/www/assets/songs/lvuZindgi.mp3",
        progress: 0,
        img: "/android_asset/www/assets/imgs/3.jpg"
      },
      {
        title: "pahli najarme",
        artist: "avdutgupte",
        playing: false,
        songPath: "/android_asset/www/assets/songs/pahlinajarme.mp3",
        progress: 0,
        img: "/android_asset/www/assets/imgs/2.jpg"
      },
      {
        title: "Gannayka dj",
        artist: "",
        playing:false,
        songPath: "/android_asset/www/assets/songs/gannayka.mp3",
        progress: 0,
        img: "/android_asset/www/assets/imgs/3.jpg"
      },
      {
        title: "tik-tik",
        artist: "atif aslam",
        playing: false,
        songPath: "/android_asset/www/assets/songs/tik-tik.mp3",
        progress: 0,
        img: "/android_asset/www/assets/imgs/4.jpg"
      },
      {
        title: "sojajara",
        artist: "papon",
        playing: false,
        songPath: "/android_asset/www/assets/songs/sojajara.mp3",
        progress: 0,
        img: "/android_asset/www/assets/imgs/1.jpg"
      }
    ];
    this.currentTrack = this.tracks[0];
  }

  filechooser() {
    this.fileChooser
      .open()
      .then(uri => {
        (<any>window).FilePath.resolveNativePath(
          uri,
          result => {
            alert("result" + result);
            alert("uri" + uri);
            // this.audioPlay(result);
            this.nativePath = result;
            let pathalone = this.nativePath.substring(8);
            let newSong = {
              title: "aafreen",
              artist: "sonu nigam",
              playing: "false",
              songPath: pathalone,
              progress: "0",
              img: "android/assets/imgs/1.mp3"
            };
            this.tracks.push(newSong);
            alert(JSON.stringify(this.tracks));
            //  this.playTrack()
          },
          err => {
            alert(err);
          }
        );
      })
      .catch(e => console.log(e));
  }
  // audioPlay(res) {
  //   this.nativePath = res;
  //   alert(this.nativePath);
  //   let pathalone = this.nativePath.substring(8);
  //   alert("pathalone" + pathalone);
  //   this.music.pause();
  //   this.music = this.media.create(pathalone);

  //   this.music.play();
  // }

  playTrack(track) {
    for (let checktrack of this.tracks) {
      if (checktrack.playing) {
        this.pauseTrack(checktrack);
      }
    }
    track.playing = true;
    this.currentTrack = track;
    this.music = this.media.create(this.currentTrack.songPath);
    this.music.play();
    this.progressInterval = setInterval(() => {
     this.currentTrack.progress < 100 ? this.currentTrack.progress++ : (this.currentTrack.progress = 0);
    }, 10000);
  }

  pauseTrack(track) {
    track.playing = false;
    this.music.pause();
    clearInterval(this.progressInterval);
  }

  nextTrack() {
    let index = this.tracks.indexOf(this.currentTrack);
    index >= this.tracks.length - 1 ? (index = 0) : index++;
    this.playTrack(this.tracks[index]);
  }

  prevTrack() {
    let index = this.tracks.indexOf(this.currentTrack);
    index > 0 ? index-- : (index = this.tracks.length - 1);
    this.playTrack(this.tracks[index]);
  }
}

  
