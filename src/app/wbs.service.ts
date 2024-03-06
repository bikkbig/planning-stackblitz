import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WbsData } from './data';

@Injectable({
  providedIn: 'root',
})
export class WbsService {
  getWbsEntries(): Observable<{ Name: string; Code: string }[]> {
    return of(WbsData as { Name: string; Code: string }[]);
  }
}
