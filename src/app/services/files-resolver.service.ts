import { Injectable } from '@angular/core';
import { FileInstance } from '../models/file-instance.model';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { FilesAPIService } from './files-api.service';
import { FilesService } from './files.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilesResolverService implements Resolve<FileInstance[]> {
  constructor(
    private filesAPIService: FilesAPIService,
    private filesService: FilesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): FileInstance[] | Observable<FileInstance[]> | Promise<FileInstance[]> {
    const files = this.filesService.getFiles();

    if (files.length === 0) {
      return this.filesAPIService.fetchFiles();
    } else {
      return files;
    }
  }
}
