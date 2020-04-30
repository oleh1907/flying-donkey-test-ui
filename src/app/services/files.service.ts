import { Injectable } from '@angular/core';
import { FileInstance } from '../models/file-instance.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private files: FileInstance[] = [];
  filesChanged = new Subject<FileInstance[]>();

  private extensions: string[] = [];
  extensionsChanged = new Subject<string[]>();

  constructor() {}

  getFiles() {
    return this.files.slice();
  }

  setFiles(files: FileInstance[]) {
    this.files = files;
    this.filesChanged.next(files.slice());
  }

  getExtensions() {
    return this.extensions.slice();
  }

  setExtensions(extensions: string[]) {
    this.extensions = extensions;
    this.extensionsChanged.next(extensions.slice());
  }

  addFile(file: FileInstance) {
    this.files.push(file);
    this.filesChanged.next(this.files.slice());
  }
}
