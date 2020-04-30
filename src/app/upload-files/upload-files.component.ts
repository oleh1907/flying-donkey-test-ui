import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { FilesService } from '../services/files.service';
import { Subscription } from 'rxjs';
import { FilesAPIService } from '../services/files-api.service';
import { FileInstance } from '../models/file-instance.model';

enum UploadStatuses {
  None,
  InProccess,
  Done,
  Error,
}

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css'],
})
export class UploadFilesComponent implements OnInit, OnDestroy {
  extensions: string[];
  extensionsChangedSub: Subscription;

  file: File;

  UploadStatuses = UploadStatuses;
  uploadStatus: UploadStatuses = UploadStatuses.None;
  errorMessage: string;

  constructor(
    private filesService: FilesService,
    private filesAPIService: FilesAPIService
  ) {}

  ngOnInit(): void {
    this.extensionsChangedSub = this.filesService.extensionsChanged.subscribe(
      (extensions: string[]) => {
        this.extensions = extensions;
      }
    );
    this.extensions = this.filesService.getExtensions();
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  onSubmit(form: NgForm) {
    const username = form.value.username;

    this.uploadStatus = UploadStatuses.InProccess;

    this.filesAPIService.uploadFile(username, this.file).subscribe(
      (file: FileInstance) => {
        this.filesService.addFile(file);
        this.uploadStatus = UploadStatuses.Done;
      },
      (err) => {
        this.uploadStatus = UploadStatuses.Error;
        this.errorMessage = 'Error: ' + err.error;
      }
    );

    form.resetForm();
  }

  ngOnDestroy(): void {
    this.extensionsChangedSub.unsubscribe();
  }
}
