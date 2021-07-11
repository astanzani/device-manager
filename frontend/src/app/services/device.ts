import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from '../types';

type DeviceData = {
  color: string;
  partNumber: number;
  category: number;
};

@Injectable({ providedIn: 'root' })
export class DeviceService {
  private url = '/devices';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  public getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.url);
  }

  public addDevice(device: DeviceData) {
    return this.http.post<Device>(this.url, device, {
      headers: this.headers,
    });
  }

  public deleteDevice(id: Device['id']) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
