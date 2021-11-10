import { ResortPropertyProps, ResortProps } from './resort.model';

export type RoomProps = {
  id: number;
  name: string;
  images: Array<string>;
  guest: number;
  bed: number;
  bedroom: number;
  bathroom: number;
  bedType: Array<string>;
  reservationPrice: number;
  price: number;
  additionalPrice: number;
  youtube: string;
  content: string;
  description: string;
  tag: Array<string>;
  resort: ResortProps;
  resortProperties: Array<ResortPropertyProps>;
  isRecommend: boolean;
  updateDate: Date;
  isActive: boolean;
};
