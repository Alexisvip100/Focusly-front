import type { HeaderProps } from 'react-big-calendar';
import { format, isToday } from 'date-fns';

import { HeaderContainer, DayName, DayNumber } from './CalendarHeader.styles';

export const CalendarHeader = (props: HeaderProps) => {
  const { date } = props;
  const dayName = format(date, 'EEE');
  const dayNumber = format(date, 'd');
  const active = isToday(date);

  return (
    <HeaderContainer>
      <DayName>{dayName}</DayName>
      <DayNumber active={active}>{dayNumber}</DayNumber>
    </HeaderContainer>
  );
};
