import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ViewFilesComponent } from './view-files/view-files.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { RoutingModule } from './routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ViewFilesComponent,
    UploadFilesComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, RoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
