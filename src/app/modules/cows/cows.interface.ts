import { Model, Types } from 'mongoose';
import { Breed, Category, Label } from './cows.enum';

export type ICows = {
  name: string;
  age: number;
  price: number;
  location: Location;
  breed: Breed;
  weight: number;
  label: Label;
  category: Category;
  seller: Types.ObjectId;
};
export type CowsModal = Model<ICows>;
export type ISearchTermField = {
  searchTerm?: string;
};
