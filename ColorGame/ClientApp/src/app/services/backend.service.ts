import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class BackendService
{
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getBestScoreAllTime()
  {
    return this.http.get<number>(this.baseUrl + 'weatherforecast');
  }

  updateBestScoreAllTime(newScore: number)
  {
    //this.http.post<number>(this.url + 'BestScore/Update', newScore, this.httpOptions).subscribe();
  }

}
