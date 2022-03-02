import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })

/*
  a utility service for conversions between in-game shape codes and color strings or HTML values 
*/

export class ShapeDataService
{
  public getHtml(code: number): string
  {
    switch (code) {
      case 0:
        return "#0000ff"; // blue
      case 1:
        return "#00cc00"; // green
      case 2:
        return "#ffff00"; // yellow
      default:
        return "#ff0000"; // red
    }
  }

  public getName(codeOrHtml: any): string
  {
    switch (codeOrHtml)
    {
      case 0:
        return "blue";
      case 1:
        return "green";
      case 2:
        return "yellow";
      case "#0000ff":
        return "blue";
      case "#00cc00":
        return "green";
      case "#ffff00":
        return "yellow";
      default:
        return "red";
    }
  }

}
