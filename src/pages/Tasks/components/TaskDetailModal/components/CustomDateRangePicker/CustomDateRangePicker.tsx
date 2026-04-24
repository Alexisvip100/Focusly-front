import { useState } from 'react';
import { Box, Typography, Popover, Button } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import type { PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { isSameDay, isAfter, isBefore, format } from 'date-fns';
import { CalendarToday as CalendarIcon } from '@mui/icons-material';
import { CustomPickersDay, dateRangeInputSx, calendarPopperSx } from './CustomDateRangePicker.styles';

interface CustomDateRangePickerProps {
    startDate: Date | null;
    endDate: Date | null;
    onChange: (start: Date | null, end: Date | null) => void;
}

export const CustomDateRangePicker = ({ startDate, endDate, onChange }: CustomDateRangePickerProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [internalStart, setInternalStart] = useState<Date | null>(startDate);
    const [internalEnd, setInternalEnd] = useState<Date | null>(endDate);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setInternalStart(startDate);
        setInternalEnd(endDate);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleApply = () => {
        onChange(internalStart, internalEnd);
        handleClose();
    };

    const handleDateChange = (newDate: Date | null) => {
        if (!newDate) return;

        if (!internalStart || (internalStart && internalEnd)) {
            // Start fresh selection
            setInternalStart(newDate);
            setInternalEnd(null);
        } else if (internalStart && !internalEnd) {
            if (isBefore(newDate, internalStart)) {
                // If clicked before start, reset start
                setInternalStart(newDate);
            } else {
                // Complete range
                setInternalEnd(newDate);
            }
        }
    };

    function Day(props: PickersDayProps) {
        const { day, ...other } = props;

        // Ensure we have valid dates for comparison
        const start = internalStart;
        const end = internalEnd;

        const isFirstDay = start ? isSameDay(day, start) : false;
        const isLastDay = end ? isSameDay(day, end) : false;

        const dayIsBetween =
            start && end && isAfter(day, start) && isBefore(day, end);

        return (
            <CustomPickersDay
                {...other}
                day={day}
                disableMargin
                selected={false} // We handle selection visuals manually
                dayIsBetween={!!dayIsBetween}
                isFirstDay={isFirstDay}
                isLastDay={isLastDay}
                onClick={() => handleDateChange(day)}
            />
        );
    }

    const formattedRange =
        startDate && endDate
            ? `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d')}`
            : startDate
                ? `${format(startDate, 'MMM d')} - ...`
                : 'Select Date Range';

    const selectionCount =
        internalStart && internalEnd
            ? Math.round((internalEnd.getTime() - internalStart.getTime()) / (1000 * 60 * 60 * 24)) + 1
            : internalStart
                ? 1
                : 0;

    return (
        <>
            <Box onClick={handleOpen} sx={dateRangeInputSx}>
                <CalendarIcon sx={{ fontSize: 20, color: '#64748b', mr: 1.5 }} />
                <Typography sx={{ fontSize: '14px', color: '#94a3b8' }}>
                    {formattedRange}
                </Typography>
            </Box>

            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={calendarPopperSx}
            >
                <Box sx={{ width: '320px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, px: 2, pt: 1 }}>
                        <Typography sx={{ color: 'white', fontWeight: 600 }}>
                            {internalStart ? format(internalStart, 'MMMM yyyy') : 'Select Date'}
                        </Typography>
                    </Box>
                    <DateCalendar
                        value={internalStart} // Just to control view, selection handled custom
                        onChange={() => { }} // Handled in Day component
                        slots={{ day: Day }}
                        showDaysOutsideCurrentMonth
                        views={['day']}
                        sx={{
                            '& .MuiPickersSlideTransition-root': {
                                minHeight: '240px'
                            }
                        }}
                    />
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 2,
                        pt: 2,
                        borderTop: '1px solid #334155'
                    }}>
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                            {selectionCount > 0 ? `${selectionCount} days selected` : 'Select range'}
                        </Typography>
                        <Button
                            onClick={handleApply}
                            variant="text"
                            size="small"
                            sx={{ textTransform: 'none', color: '#3b82f6', fontWeight: 600 }}
                        >
                            Apply
                        </Button>
                    </Box>
                </Box>
            </Popover>
        </>
    );
};
