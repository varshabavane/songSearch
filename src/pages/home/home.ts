import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { Media, MediaObject } from "@ionic-native/media";
import { FileChooser } from "@ionic-native/file-chooser";
import { File, FileEntry, IFile } from "@ionic-native/file";
import { FilePath } from "@ionic-native/file-path";

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
    private media: Media,
    public filePath: FilePath,
    public file: File
  ) {
    this.tracks = [
      {
        title: "hrudyat vaje smthng",
        artist: "rohit raut",
        playing: false,
        songPath: "/android_asset/www/assets/songs/hrudyat vaje smthng.mp3",
        progress: 0,
        img: "/android_asset/www/assets/imgs/2.jpg"
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
            this.nativePath = result;
            let pathalone = this.nativePath.substring(8);
            // alert("pathalone " + pathalone);
            let newSong = {
              title: "aafreen",
              artist: "sonu nigam",
              playing: "false",
              songPath: pathalone,
              progress: "0",
              img: "android/assets/imgs/1.mp3"
            };
            this.tracks.push(newSong);
          },
          err => {
            console.log(err);
          }
        );
      })
      .catch(e => console.log(e));
  }
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
    let musicDuration = this.media
      .create(this.currentTrack.songPath)
      .getDuration();
    console.log(musicDuration);
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
    if (this.songNo > 3) {
      return 0;
    }

    let file = new File();
    this.file
      .listDir(file.externalRootDirectory, path)
      .then(
        result => {
          console.log(JSON.stringify(result));
          for (let item of result) {
            if (
              item.isDirectory == true &&
              item.name != "." &&
              item.name != ".."
            ) {
              this.getFileList(path + "/" + item.name);
            } else {
              this.fileType(item);
            }
          }
        },
        error => {
          console.log("inside err " + error);
        }
      )

      .catch(e => {
        console.log(JSON.stringify(e));
      });
  }

  fileSearch() {
    /* test */

    this.file
      .listDir(this.file.externalRootDirectory, "")
      .then(result => {
        alert(JSON.stringify(result));
        for (let item of result) {
          if (
            item.isDirectory == true &&
            item.name != "." &&
            item.name != ".."
          ) {
            this.folderCount++;

            this.getFileList(item.name); //Get all the files inside the folder. recursion will probably be useful here.
          } else if (item.isFile == true) {
            this.fileType(item);
          }
        }
      })
      .catch(e => {
        console.log(JSON.stringify(e));
      });
  }

  FileDir() {}

  /* for searching filetype */
  fileType(songDetail) {
    if (this.songNo > 3) {
      return 0;
    }
    try {
      let filetype = new File();
      filetype
        .resolveLocalFilesystemUrl(
          this.file.externalRootDirectory + songDetail.fullPath
        )
        .then((songDetail: FileEntry) => {
          console.log("songdetail: ", JSON.stringify(songDetail));
          return new Promise((resolve, reject) => {
            songDetail.file(
              sDetail => resolve(sDetail),
              error => reject(error)
            );
          }).then((sDetail: IFile) => {
            if (sDetail.type == "audio/mpeg") {
              console.log("mp3songs " + JSON.stringify(sDetail));

              /* trim path */
              let pathalone = (
                this.file.externalRootDirectory + songDetail.fullPath
              ).substring(8);
              alert("pathalone " + pathalone);
              this.tracks.push({
                title: songDetail.name,
                artist: songDetail.name /* need artist details */,
                playing: false,
                songPath: pathalone,
                progress: 0,
                img: "/android_asset/www/assets/imgs/5.jpg"
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
