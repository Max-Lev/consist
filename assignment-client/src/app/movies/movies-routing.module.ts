import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesContainerComponent } from './movie-container.component';
import { moviesResolver } from './resolvers/movies.resolver';

const routes: Routes = [
  {
    path:'',component:MoviesContainerComponent,
    resolve: {
      moviesResolver: moviesResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
