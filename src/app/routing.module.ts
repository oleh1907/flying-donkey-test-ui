import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FilesResolverService } from './services/files-resolver.service';
import { NgModule } from '@angular/core';
import { ExtensionsResolverService } from './services/extensions-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    resolve: [ExtensionsResolverService, FilesResolverService],
  },
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class RoutingModule {}
