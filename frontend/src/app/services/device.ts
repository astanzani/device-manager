import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from '../types';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  private url = 'http://localhost:8080/devices';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  public getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.url);
  }

  public addDevice(device: Omit<Device, 'id'>) {
    return this.http.post<Device>(this.url, device, {
      headers: this.headers,
    });
  }

  public deleteDevice(id: Device['id']) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
