import * as moment from 'moment';

import { WeekDay } from '../enums';

export const formatDate = (time: number = Date.now(), format = 'YYYY-DD-MM') => {
  return moment.unix(time).format(format);
};

export const formatDateTime = (time: number = Date.now(), format = 'YYYY-DD-MM HH:mm:ss') => {
  return moment.unix(time).format(format);
};

export const getDayOfWeek = (findDay: WeekDay): number => {
  return moment().day(findDay).day();
};
