import { Component, OnInit } from '@angular/core';

/*
  this component measures and displays the time since the current game has started
*/


@Component({
  selector: 'app-game-timer',
  templateUrl: './game-timer.component.html',
})

export class GameTimerComponent
{
  seconds = 0;
  decimals = 0;
  myTimer: any;
  startDate: any;

  constructor() { }

  startTimer() : void
  {
    this.myTimer = setInterval(() => this.countDownTimer(), 100);
    this.startDate = Date.now();
  }

  stopTimer() : void
  {
    clearInterval(this.myTimer);
  }

  getScore() : number
  {
    return this.seconds + this.decimals / 10;
  }

  countDownTimer() : void
  {
    var currentTime = Date.now() - this.startDate;
    this.seconds = Math.floor(currentTime / 1000);
    this.decimals = Math.floor((currentTime - 1000 * this.seconds) / 100);
  }

}
