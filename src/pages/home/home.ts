import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { Media, MediaObject } from "@ionic-native/media";
import { FileChooser } from "@ionic-native/file-chooser";
import { File, FileEntry, IFile } from "@ionic-native/file";
import { FilePath } from "@ionic-native/file-path";
/*local storage */
import { MusicDataProvider } from "../../providers/music-data/music-data";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  /* Music Search */
  folderCount;
  /* ********** */

  music: MediaObject;

  nativePath: string;

  tracks: any;
  playing: boolean;
  currentTrack: any;
  progressInterval: any;
  songNo = 0;

  constructor(
    public navCtrl: NavController,
    private fileChooser: FileChooser,
    // private filePath: FilePath,
    private media: Media,
    public filePath: FilePath,
    public file: File,
    public musicData: MusicDataProvider
  ) {
    this.tracks = [
      {
        title: "hrudyat vaje smthng",
        artist: "rohit raut",
        playing: false,
        songPath: "/android_asset/www/assets/songs/hrudyat vaje smthng.mp3",
        progress: 0,
        img: "/android_asset/www/assets/imgs/2.jpg"
      },
      {
        title: "love u zindagi",
        artist: "alia",
        playing: false,
        songPath: "/android_asset/www/assets/songs/lvuZindgi.mp3",
        progress: 0,
        img: "/android_asset/www/assets/imgs/5.jpg"
      }
      // {
      //   title: "pahli najarme",
      //   artist: "avdutgupte",
      //   playing: false,
      //   songPath: "/android_asset/www/assets/songs/pahlinajarme.mp3",
      //   progress: 0,
      //   img: "/android_asset/www/assets/imgs/2.jpg"
      // },
      // {
      //   title: "Gannayka dj",
      //   artist: "",
      //   playing:false,
      //   songPath: "/android_asset/www/assets/songs/gannayka.mp3",
      //   progress: 0,
      //   img: "/android_asset/www/assets/imgs/3.jpg"
      // },
      // {
      //   title: "tik-tik",
      //   artist: "atif aslam",
      //   playing: false,
      //   songPath: "/android_asset/www/assets/songs/tik-tik.mp3",
      //   progress: 0,
      //   img: "/android_asset/www/assets/imgs/4.jpg"
      // },
      // {
      //   title: "sojajara",
      //   artist: "papon",
      //   playing: false,
      //   songPath: "/android_asset/www/assets/songs/sojajara.mp3",
      //   progress: 0,
      //   img: "/android_asset/www/assets/imgs/1.jpg"
    ];
    this.currentTrack = this.tracks[0];

    
  }

  test() {
    // alert("hello");
    this.musicData.getMusicData().then(songDetails => {
      if (songDetails) {
        this.tracks = songDetails;
        alert("songDetails " + JSON.stringify(songDetails));
      }
    });

    
  }

  saveMusic() {
    //this.tracks.push(musicData);
    alert('save')
    this.musicData.saveMusicData(this.tracks);
    
  }

  // ionViewDidLoad(){
  //   this.musicData.saveMusicData(this.tracks)
  // }

  filechooser() {
    this.fileChooser
      .open()
      .then(uri => {
        (<any>window).FilePath.resolveNativePath(
          uri,
          result => {
            // alert("result" + result);
            // alert("uri" + uri);
            // this.audioPlay(result);
            this.nativePath = result;
            let pathalone = this.nativePath.substring(8);
            //alert("pathalone " + pathalone);
            let newSong = {
              title: "aafreen",
              artist: "sonu nigam",
              playing: "false",
              songPath: pathalone,
              progress: "0",
              img: "android/assets/imgs/1.mp3"
            };
            this.tracks.push(newSong);
            // alert(JSON.stringify(this.tracks));
            //  this.playTrack()
          },
          err => {
            console.log(err);
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
      this.currentTrack.progress < 100
        ? this.currentTrack.progress++
        : (this.currentTrack.progress = 0);
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

  /* MUSIC File Search */

  getFileList(path: string) {
    // if (this.songNo > 3) {
    //   return 0;
    // }
    // alert("foldername: " + path);
    let file = new File();
    this.file
      .listDir(file.externalRootDirectory, path)
      .then(
        result => {
          for (let item of result) {
            if (
              item.isDirectory == true &&
              item.name != "." &&
              item.name != ".."
            ) {
              // if(this.songNo<=3){
              //  this.getFileList(path + "/" + item.name);
              //}
              this.getFileList(path + "/" + item.name);
            } else {
              // alert("fileName insde filelist " + JSON.stringify(item.fullPath));
              // this.file
              this.fileType(item);
            }
          }
        },
        error => {
          // alert("inside err " + error);
        }
      )
      // .then(() => alert("filelist" + JSON.stringifythis._fileList[0]))
      .catch(e => {
        console.log(JSON.stringify(e));
      });
  }

  fileSearch() {
    // alert("hello");
    // if (this.songNo > 3) {
    //   return 0;
    // }
    /* test */

    this.file
      .listDir(this.file.externalRootDirectory, "")
      .then(result => {
        for (let item of result) {
          if (
            item.isDirectory == true &&
            item.name != "." &&
            item.name != ".."
          ) {
            // if (this.songNo > 3) {
            //   return 0;
            // }
            this.folderCount++;

            this.getFileList(item.name); //Get all the files inside the folder. recursion will probably be useful here.
          } else if (item.isFile == true) {
            //File found
            //alert("fileName inside fileSearch" + JSON.stringify(item));
            // this._fileList.push({
            //   name: item.name,
            //   path: item.fullPath
            // });
            this.fileType(item);
          }
        }
      })
      .catch(e => {
        console.log(JSON.stringify(e));
      });
  }

  FileDir() {
    //alert("filelist:" + JSON.parse(this._fileList[0]));
  }
  /* for searching filetype */
  fileType(songDetail) {
    // alert("songPath " + JSON.stringify(songDetail));
    // if (this.songNo > 3) {
    //   return 0;
    // }
    try {
      let filetype = new File();
      filetype
        .resolveLocalFilesystemUrl(
          this.file.externalRootDirectory + songDetail.fullPath
        )
        .then((songDetail: FileEntry) => {
          // alert("songDetail: " + JSON.stringify(songDetail));
          console.log("songdetail: ", JSON.stringify(songDetail));
          return new Promise((resolve, reject) => {
            songDetail.file(
              sDetail => resolve(sDetail),
              error => reject(error)
            );
          }).then((sDetail: IFile) => {
            //alert("Detail: " + JSON.stringify(sDetail));
            if (sDetail.type == "audio/mpeg") {
              console.log("mp3songs " + JSON.stringify(sDetail));

              /* trim path */
              let pathalone = (
                this.file.externalRootDirectory + songDetail.fullPath
              ).substring(8);
              // alert("pathalone " + pathalone);
              this.tracks.push({
                title: songDetail.name,
                artist: songDetail.name /* need artist details */,
                playing: false,
                songPath: pathalone,
                progress: 0,
                img: "/android_asset/www/assets/imgs/5.jpg"
                // name: songDetail.name,
                // path: songDetail.fullPath
              });
              this.songNo = this.songNo + 1;
            }
          });
        });
    } catch {
      e => console.log(JSON.stringify(e));
    }
  }
}
