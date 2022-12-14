import { Model } from 'sequelize-typescript';

export type NonAbstract<T> = { [P in keyof T]: T[P] };
export type Constructor<T> = new () => T;
export type NonAbstractTypeOfModel<T> = Constructor<T> &
  NonAbstract<typeof Model>;
