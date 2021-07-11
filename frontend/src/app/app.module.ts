import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DevicesListComponent } from './components/devicesList/devicesList.component';
import { CategoriesListComponent } from './components/categoriesList/categoriesList.component';
import { AddCategoryDialogCompoent } from './components/categoriesList/addCategoryDialog/addCategoryDialog.component';
import { AddDeviceDialogComponent } from './components/devicesList/addDeviceDialog/addDeviceDialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DevicesListComponent,
    CategoriesListComponent,
    AddCategoryDialogCompoent,
    AddDeviceDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
