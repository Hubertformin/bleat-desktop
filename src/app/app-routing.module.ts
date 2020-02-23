import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {LibraryComponent} from './views/library/library.component';
import {DownloadComponent} from './views/download/download.component';
import {FavoritesComponent} from './views/favorites/favorites.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'views/library',
    pathMatch: 'full'
  },
  /*{
    path: 'folder/:id',
    loadChildren: () => import('./pages/folder.module').then(m => m.FolderPageModule)
  },*/
  {
    path: 'views',
    children: [
      {path: '', redirectTo: 'library', pathMatch: 'full'},
      {path: 'library', component: LibraryComponent},
      {path: 'downloads', component: DownloadComponent},
      {path: 'favorites', component: FavoritesComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
