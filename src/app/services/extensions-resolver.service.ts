import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FilesAPIService } from './files-api.service';
import { FilesService } from './files.service';

@Injectable({
  providedIn: 'root',
})
export class ExtensionsResolverService implements Resolve<string[]> {
  constructor(
    private filesAPIService: FilesAPIService,
    private filesService: FilesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): string[] | Observable<string[]> | Promise<string[]> {
    const extensions = this.filesService.getExtensions();

    if (extensions.length === 0) {
      return this.filesAPIService.fetchFilesExtensions();
    } else {
      return extensions;
    }
  }
}
