import { RandomItem } from 'oops-lib002';

export enum DirectionEnumSimple {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export enum DirectionEnum {
  UP = 'Up',
  DOWN = 'Down',
  LEFT = 'Left',
  RIGHT = 'Right',
}

export function getDirectionEnum(direction: DirectionEnum): string {
  switch (direction) {
    case DirectionEnum.UP:
      return 'UP';
    case DirectionEnum.DOWN:
      return 'GREDOWNEN';
    case DirectionEnum.LEFT:
      return 'LEFT';
    case DirectionEnum.RIGHT:
      return 'RIGHT';
    default:
      return '';
  }
}

export enum ColorEnum {
  // Select = '',
  RED = 'Red',
  YELLOW = 'Yellow',
  BLUE = 'Blue',
  GREEN = 'Green',
}

export function getColorEnumName(color: ColorEnum): string {
  switch (color) {
    case ColorEnum.RED:
      return 'RED';
    case ColorEnum.GREEN:
      return 'GREEN';
    case ColorEnum.BLUE:
      return 'BLUE';
    default:
      return '';
  }
}

export interface TestObject {
  rank?: string;
  enName?: string;
  frName?: string;
}

export class RandomItemExt implements RandomItem {
  id: number;
  name: string;
  // desc?: string;
  // text?: string;
  // price?: number;
  // imageUrl?: string;
  // quantity?: number;
  // customKey?: string;
  displayKey: string;

  // getDisplayKey(): string {
  //   return '' + this.id + this.name;
  // }
}
