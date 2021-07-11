import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

import { CategoryService } from '../../services/category';
import { DeviceService } from '../../services/device';
import { Category, Device } from '../../types';
import { AddDeviceDialogComponent } from './addDeviceDialog/addDeviceDialog.component';

@Component({
  selector: 'devices-list',
  templateUrl: './devicesList.component.html',
  styleUrls: ['./devicesList.component.css'],
})
export class DevicesListComponent implements AfterViewInit {
  @ViewChild(MatTable) table!: MatTable<any>;
  devices: Device[] = [];
  displayedColumns: string[] = [
    'id',
    'color',
    'partNumber',
    'categoryName',
    'delete',
  ];

  constructor(private deviceService: DeviceService, public dialog: MatDialog) {}

  ngAfterViewInit() {
    this.fetchDevices();
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddDeviceDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((addedDevice: Device) => {
      this.devices.push(addedDevice);
      this.table.renderRows();
    });
  }

  delete(device: Device) {
    this.devices = this.devices.filter((d) => d.id !== device.id);
    this.deviceService.deleteDevice(device.id).subscribe();
  }

  private fetchDevices() {
    this.deviceService.getDevices().subscribe((devices) => {
      this.devices = devices;
      this.table.renderRows();
    });
  }
}
