import { Component, OnInit } from '@angular/core';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
})

export class GameScoreComponent implements OnInit
{
  bestScoreSession = "0.0";
  bestScoreAllTime = "0.0";
  score = "0.0";
  isAuthenticated = false;

  constructor(private service: BackendService, private authorizeService: AuthorizeService) { }

  ngOnInit(): void
  {
    this.authorizeService.isAuthenticated()
      .subscribe(responseData => {
        this.isAuthenticated = responseData;
        if (responseData)
        {
          this.service.getBestScoreAllTime()
            .subscribe(responseData => {
              this.bestScoreAllTime = responseData.toFixed(1);
            });
        }
      });
  }

  setScore(value: number)
  {
    this.score = value.toFixed(1);
    if (value < +this.bestScoreSession || +this.bestScoreSession <= 0.0)
    {
      this.bestScoreSession = this.score;
    }
    if (value < +this.bestScoreAllTime || +this.bestScoreAllTime <= 0.0)
    {
      this.service.updateBestScoreAllTime(+this.score);
      this.bestScoreAllTime = this.score;
    }
  }

}
