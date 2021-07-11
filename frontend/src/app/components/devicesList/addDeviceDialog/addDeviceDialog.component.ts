import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category';
import { DeviceService } from 'src/app/services/device';
import { Category } from 'src/app/types';

type DeviceData = {
  color: string;
  partNumber: number;
  category: number;
};

@Component({
  selector: 'add-device-dialog',
  templateUrl: './addDeviceDialog.component.html',
  styleUrls: ['./addDeviceDialog.component.css'],
})
export class AddDeviceDialogComponent implements OnInit {
  selected = 0;
  device: DeviceData = {
    color: '',
    category: 0,
    partNumber: 0,
  };
  categories: Category[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddDeviceDialogComponent>,
    private deviceService: DeviceService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categoryService
      .getCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  addDevice() {
    // if (this.category) {
    this.deviceService
      .addDevice({ ...this.device, category: this.selected })
      .subscribe((addedDevice) => {
        this.dialogRef.close(addedDevice);
      });
    // }
  }
}
