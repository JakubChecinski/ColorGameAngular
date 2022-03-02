import { Component, OnInit, ViewChild } from '@angular/core';
import { DisplayedShapeComponent } from '../displayed-shape/displayed-shape.component';
import { GameScoreComponent } from '../game-score/game-score.component';
import { GameTimerComponent } from '../game-timer/game-timer.component';

/*
  home component
*/


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent {
  gameHasStarted = false;
  @ViewChild('gameScore') gameScore!: GameScoreComponent;
  @ViewChild('gameTimer') gameTimer!: GameTimerComponent;
  @ViewChild('displayedShape') displayedShape!: DisplayedShapeComponent;

  maxAnswers = 5;
  correctAnswers = 0;

  startGame() {
    this.displayedShape.setNextRiddle();
    this.gameHasStarted = true;
    this.displayedShape.showRiddle();
    this.gameTimer.startTimer();
  }

  guess(colorName: string) {
    if (!this.gameHasStarted) return;
    if (colorName === this.displayedShape.getRiddleAnswer()) {
      this.correctAnswers++;
      if (this.correctAnswers >= this.maxAnswers) this.endGame(true);
      else this.displayedShape.setNextRiddle();
    }
    else this.endGame(false);
  }

  endGame(playerHasWon: boolean) {
    this.gameTimer.stopTimer();
    this.gameHasStarted = false;
    this.correctAnswers = 0;
    if (playerHasWon) {
      this.displayedShape.infoText = '';
      this.gameScore.setScore(this.gameTimer.getScore());
    }
    else this.displayedShape.infoText =
      "Sorry, but the correct answer was: " + this.displayedShape.getRiddleAnswer();
    this.displayedShape.hideRiddle();
  }

}
