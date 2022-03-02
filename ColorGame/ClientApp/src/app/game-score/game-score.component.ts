import { Component, OnInit } from '@angular/core';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { BackendService } from '../services/backend.service';

/*
  this component keeps track of and displays the game scores
  there are three types of scores in the game:
    1) current/previous game score [currentScore] - changes after every game
    2) best score of this session [bestScoreSession] - will reset when the component is refreshed
    3) best score of all time [bestScoreAllTime] - will be saved to DB in the case of logged in users
*/

@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
})

export class GameScoreComponent implements OnInit
{
  bestScoreSession = "0.0";
  bestScoreAllTime = "0.0";
  currentScore = "0.0";
  isAuthenticated = false;

  constructor(private service: BackendService, private authorizeService: AuthorizeService) { }

  ngOnInit(): void
  {
    this.refreshComponent();
  }

  refreshComponent() {
    this.authorizeService.isAuthenticated()
      .subscribe(responseData => {
        if (responseData) {
          this.service.getBestScoreAllTime()
            .subscribe(score => { this.bestScoreAllTime = score.toFixed(1); })
          this.isAuthenticated = true;
        }
      });
  }

  setScore(value: number)
  {
    this.currentScore = value.toFixed(1);
    if (value < +this.bestScoreSession || +this.bestScoreSession <= 0.0)
    {
      this.bestScoreSession = value.toFixed(1);
    }
    if (value < +this.bestScoreAllTime || +this.bestScoreAllTime <= 0.0)
    {
      this.bestScoreAllTime = value.toFixed(1);
      this.authorizeService.isAuthenticated()
        .subscribe(responseData => {
          if (responseData) {
            this.service.updateBestScoreAllTime(+this.currentScore);
          }
        });
    }
  }

}
