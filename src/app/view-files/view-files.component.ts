import { Component, OnInit, OnDestroy } from '@angular/core';
import { FileInstance } from '../models/file-instance.model';
import { FilesService } from '../services/files.service';
import { Subscription, Subject } from 'rxjs';

class FileTable {
  constructor(public extension: string, public files: FileInstance[]) {}
}

@Component({
  selector: 'app-view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.css'],
})
export class ViewFilesComponent implements OnInit, OnDestroy {
  fileTables: FileTable[];
  fileChangesSub: Subscription;

  extensions: string[];
  extensionsChangedSub: Subscription;

  constructor(private filesService: FilesService) {}

  ngOnInit(): void {
    this.extensionsChangedSub = this.filesService.extensionsChanged.subscribe(
      (extensions: string[]) => {
        this.extensions = extensions;
      }
    );
    this.extensions = this.filesService.getExtensions();

    this.fileChangesSub = this.filesService.filesChanged.subscribe(
      (files: FileInstance[]) => {
        this.sortFilesByTables(files);
      }
    );
    this.sortFilesByTables(this.filesService.getFiles());
  }

  private sortFilesByTables(files: FileInstance[]) {
    this.fileTables = [];

    this.extensions.forEach((extension) => {
      const filesWithThisExtension = files.filter(
        (file) => file.name.substr(file.name.lastIndexOf('.')) === extension
      );
      this.fileTables.push(new FileTable(extension, filesWithThisExtension));
    });
  }

  ngOnDestroy(): void {
    this.fileChangesSub.unsubscribe();
    this.extensionsChangedSub.unsubscribe();
  }
}
