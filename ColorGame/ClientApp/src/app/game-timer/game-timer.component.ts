import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-timer',
  templateUrl: './game-timer.component.html',
})

export class GameTimerComponent implements OnInit
{
  seconds = 0;
  decimals = 0;
  myTimer: any;
  startDate: any;

  constructor() { }

  ngOnInit(): void
  {
  }

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
