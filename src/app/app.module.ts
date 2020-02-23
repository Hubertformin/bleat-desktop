import { NgModule, ErrorHandler as BaseErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ErrorHandler } from './shared/handlers/error.handler';
import { HttpInterceptor } from './shared/interceptors/http.interceptor';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {LibraryComponent} from './views/library/library.component';
import {DownloadComponent} from './views/download/download.component';
import {FavoritesComponent} from './views/favorites/favorites.component';
import {MusicPlayerModule} from './modules/music-player/music-player.module';

@NgModule({
  declarations: [AppComponent, LibraryComponent, DownloadComponent, FavoritesComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
      MusicPlayerModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: BaseErrorHandler, useClass: ErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
