import { Component, OnInit } from '@angular/core';
import { ShapeDataService } from '../services/shapedata.service';

@Component({
  selector: 'app-displayed-shape',
  templateUrl: './displayed-shape.component.html',
  styleUrls: ['./displayed-shape.component.css']
})

export class DisplayedShapeComponent implements OnInit
{
  visible = false;
  riddleShape = 'triangle';
  riddleFontColor = '';
  riddleBackground = '';
  riddleBorder = 'transparent transparent transparent transparent';
  riddleText = '';
  infoText = '';

  constructor(private service: ShapeDataService) { }

  ngOnInit(): void { }

  getRiddleAnswer(): string
  {
    switch (this.riddleShape)
    {
      case 'triangle':
        return this.riddleText;
      case 'square':
        return this.service.getName(this.riddleBackground);
      default:
        return this.service.getName(this.riddleFontColor);
    }
  }

  showRiddle()
  {
    this.visible = true;
  }

  hideRiddle()
  {
    this.visible = false;
  }

  setNextRiddle()
  {
    this.setRiddleShape();
    let backgroundColor = this.setRiddleColorsAndText();
    switch (this.riddleShape)
    {
      case 'triangle':
        this.riddleBackground = 'transparent';
        this.riddleBorder = 'transparent transparent ' + backgroundColor + ' transparent';
        break;
      default:
        this.riddleBackground = backgroundColor;
        this.riddleBorder = 'transparent transparent transparent transparent';
        break;
    }
  }

  private setRiddleShape()
  {
    let shapeCode = Math.floor(Math.random() * 3);
    switch (shapeCode) {
      case 0:
        this.riddleShape = 'square';
        break;
      case 1:
        this.riddleShape = 'circle';
        break;
      case 2:
        this.riddleShape = 'triangle';
        break;
    }
  }

  private setRiddleColorsAndText(): string
  {
    let foregroundColorCode = this.setForegroundColor();
    let backgroundColorCode = foregroundColorCode;
    do {
      backgroundColorCode = Math.floor(Math.random() * 4);
    } while (foregroundColorCode === backgroundColorCode);
    this.setRiddleText(foregroundColorCode, backgroundColorCode);
    return this.service.getHtml(backgroundColorCode);
  }

  private setForegroundColor(): number
  {
    let colorCode = Math.floor(Math.random() * 4);
    this.riddleFontColor = this.service.getHtml(colorCode);
    return colorCode;
  }

  private setRiddleText(foregroundColorCode:number, backgroundColorCode:number)
  {
    let textColorCode = foregroundColorCode;
    do {
      textColorCode = Math.floor(Math.random() * 4);
    } while (textColorCode === foregroundColorCode || textColorCode === backgroundColorCode);
    this.riddleText = this.service.getName(textColorCode);
  }


}
