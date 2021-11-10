import { RoomProps } from './room.model';
import { UserProps } from './user.model';

export type BookingProps = {
  id: number;
  name: string;
  bookingCode: string;
  reservationPrice?: number;
  servicePrice?: number;
  paymentMethod: string;
  additonalPrice?: number;
  discountPrice?: number;
  totalPrice?: number;
  createDate: Date;
  updateDate?: Date;
  vat?: number;
  email?: string;
  address?: string;
  addionalBed?: number;

  tel: string;
  lineId: string;
  checkIn: string;
  checkOut: string;
  status: string;
  room: RoomProps;
  user: UserProps;
};
