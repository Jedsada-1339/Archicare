import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Area {
  total: number;
  usable: number;
  terrace: number;
  garden: number;
}

export interface Rooms {
  bedrooms: number;
  bathrooms: number;
  livingRoom: boolean;
  kitchen: boolean;
  balcony: boolean;
}

export interface Tag {
  onestoryhouse: boolean;
  twostoryhouse: boolean;
  apartment: boolean;
  townhouse: boolean;
}

export interface Like {
  likecount: number;
  dislikecount: number;
}

export interface Creator {
  id: number;
  username: string;
}

export interface HouseDetail {
  id: number;
  title: string;
  content: string;
  area: Area;
  rooms: Rooms;
  tag: Tag;
  like: Like;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
  creator: Creator;
}

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  private apiUrl = 'http://localhost:3000/api/houses';

  constructor(private http: HttpClient) { }

  getHouses(): Observable<HouseDetail[]> {
    return this.http.get<HouseDetail[]>(this.apiUrl);
  }

  getHouseById(id: number): Observable<HouseDetail> {
    return this.http.get<HouseDetail>(`${this.apiUrl}/${id}`);
  }

  // สำหรับดึงข้อมูลแนะนำ (อาจจะเป็น houses อื่นๆ)
  getRecommendedHouses(excludeId?: number): Observable<HouseDetail[]> {
    const url = excludeId ? `${this.apiUrl}?exclude=${excludeId}` : this.apiUrl;
    return this.http.get<HouseDetail[]>(url);
  }
}