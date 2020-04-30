import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilesService } from './files.service';
import { FileInstance } from '../models/file-instance.model';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FilesAPIService {
  constructor(private http: HttpClient, private filesService: FilesService) {}

  fetchFiles() {
    return this.http
      .get<FileInstance[]>(environment.apiBaseUrl + '/files')
      .pipe(
        tap((files) => {
          if (files) {
            this.filesService.setFiles(files);
          }
        })
      );
  }

  fetchFilesExtensions() {
    return this.http
      .get<string[]>(environment.apiBaseUrl + '/files/extensions')
      .pipe(
        tap((extensions) => {
          if (extensions) {
            this.filesService.setExtensions(extensions);
          }
        })
      );
  }

  uploadFile(username: string, fileToUpload: File) {
    let data = new FormData();
    data.append('userWhoUploaded', username);
    data.append('file', fileToUpload);

    return this.http.post<FileInstance>(
      environment.apiBaseUrl + '/files/upload',
      data
    );
  }
}
