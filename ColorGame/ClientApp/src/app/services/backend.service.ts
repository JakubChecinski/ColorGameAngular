import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { Observable, empty  } from 'rxjs';
@Injectable({ providedIn: 'root' })

/*
  a dedicated service to perform all communications with backend
*/

export class BackendService
{
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private authorizeService: AuthorizeService  ) { }

  getBestScoreAllTime()
  {
    return this.http.get<number>(this.baseUrl + 'bestscore/get');
  }

  updateBestScoreAllTime(newScore: number)
  {
    this.http.post<number>(this.baseUrl + 'bestscore/update/' + newScore, newScore).subscribe();
  }

}
