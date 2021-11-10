import { UserProps } from './user.model';

export type ReviewProps = {
  id: number;
  title: string;
  subTitle?: string;
  shortDescription?: string;
  image: string;
  updateDate: Date;
  reviewer: UserProps;
};
