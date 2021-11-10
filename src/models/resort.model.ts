import { RoomProps } from './room.model';
import { UserProps } from './user.model';

export type ResortProps = {
  length: number;
  id: number;
  name: string;
  images: Array<string>;
  bedroom: number;
  bathroom: number;
  price: number;
  isActive: boolean;
  lowestPrice: number;
  isSuggest: boolean;
  isPetAllowed: boolean;
  resortCategories: Array<ResortCategoryProps>;
  resortTags: Array<ResortTagProps>;
  resortType: ResortTypeProps;
  resortZones: Array<ResortZoneProps>;
  resortProperties: Array<ResortPropertyProps>;
  rooms: Array<RoomProps>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recommends: any;
  hosts: UserProps;
};

export type ResortPropertyProps = {
  id: number;
  name: string;
  image: string;
  isActive: boolean;
  type: string;
};

export type ResortCategoryProps = {
  id: number;
  name: string;
  image: string;
  isActive: boolean;
};

export type ResortZoneProps = {
  id: number;
  name: string;
  isActive: boolean;
};

export type ResortTagProps = {
  id: number;
  name: string;
  isActive: boolean;
};

export type ResortTypeProps = {
  id: number;
  name: string;
  isActive: boolean;
};
