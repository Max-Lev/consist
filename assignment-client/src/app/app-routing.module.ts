import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { moviesResolver } from './movies/resolvers/movies.resolver';


const routes: Routes = [
  { path: 'home', component: HomeComponent },

  {
    path: 'movies',
    loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule),
    resolve: {
      moviesResolver: moviesResolver
    }
  },

  { path: '', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
