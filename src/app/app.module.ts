import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Media } from "@ionic-native/media";
import { FileChooser } from "@ionic-native/file-chooser";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { ProgressBarComponent } from "../components/progress-bar/progress-bar";

import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
@NgModule({
  declarations: [MyApp, HomePage, ProgressBarComponent],
  imports: [BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Media,
    FileChooser,
    File,
    FilePath
  ]
})
export class AppModule {}
