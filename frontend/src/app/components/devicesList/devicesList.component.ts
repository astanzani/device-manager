import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTable } from '@angular/material/table';

import { CategoryService } from '../../services/category';
import { DeviceService } from '../../services/device';
import { Category, Device } from '../../types';

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

  constructor(private deviceService: DeviceService) {}

  ngAfterViewInit() {
    this.fetchDevices();
  }

  delete(device: Device) {
    console.log('delete category: ' + device.color);
  }

  private fetchDevices() {
    this.deviceService.getDevices().subscribe((devices) => {
      this.devices = devices;
      this.table.renderRows();
    });
  }
}
