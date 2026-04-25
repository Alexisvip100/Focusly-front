import { Typography } from "@mui/material";
import { ApplyButton, ClearButton, Footer, ItemLabel, ItemRow, Section, SectionTitle, StyledPopover } from "../Popover.styles";
import { useState } from "react";
import { 
    AccessTime as AccessTimeIcon, 
    PriorityHigh as PriorityHighIcon, 
    SwapVert as SwapVertIcon, 
    History as HistoryIcon, 
    Check as CheckIcon 
} from '@mui/icons-material';

interface SortPopoverProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    onClose: () => void;
    onApply?: (sort: SortState) => void;
    onClear?: () => void;
    activeSort?: SortState;
}

export interface SortState {
    sort?: string;
    order?: string;
}

export interface TaskSortInput {
    sort?: string;
    order?: string;
}

export const SortPopover = ({ open, anchorEl, onClose, onApply, onClear, activeSort }: SortPopoverProps) => {
    const [selectedSort, setSelectedSort] = useState<string | undefined>(activeSort?.sort);
    const [selectedOrder, setSelectedOrder] = useState<string | undefined>(activeSort?.order);

    const [prevOpen, setPrevOpen] = useState(open);

    if (open && !prevOpen) {
        setPrevOpen(true);
        setSelectedSort(activeSort?.sort);
        setSelectedOrder(activeSort?.order);
    } else if (!open && prevOpen) {
        setPrevOpen(false);
    }

    const handleSelect = (sort: string, order: string) => {
        if (selectedSort === sort && selectedOrder === order) {
            setSelectedSort(undefined);
            setSelectedOrder(undefined);
        } else {
            setSelectedSort(sort);
            setSelectedOrder(order);
        }
    };

    const handleClear = () => {
        setSelectedSort(undefined);
        setSelectedOrder(undefined);
        if (onClear) onClear();
    };

    const isSelected = (sort: string, order: string) => selectedSort === sort && selectedOrder === order;

    return (
        <StyledPopover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <Section>
                <SectionTitle>Sort By</SectionTitle>

                <ItemRow onClick={() => handleSelect('deadline', 'asc')}>
                    <ItemLabel>
                        <AccessTimeIcon sx={{ color: isSelected('deadline', 'asc') ? '#58a6ff' : '#8b949e', fontSize: 20 }} />
                        <Typography variant="body2" sx={{ fontSize: '13px', color: isSelected('deadline', 'asc') ? '#c9d1d9' : '#8b949e' }}>
                            Soonest Deadline
                        </Typography>
                    </ItemLabel>
                    {isSelected('deadline', 'asc') && <CheckIcon sx={{ color: '#58a6ff', fontSize: 16 }} />}
                </ItemRow>

                <ItemRow onClick={() => handleSelect('priority_level', 'desc')}>
                    <ItemLabel>
                        <PriorityHighIcon sx={{ color: isSelected('priority_level', 'desc') ? '#58a6ff' : '#8b949e', fontSize: 20 }} />
                        <Typography variant="body2" sx={{ fontSize: '13px', color: isSelected('priority_level', 'desc') ? '#c9d1d9' : '#8b949e' }}>
                            Highest Priority
                        </Typography>
                    </ItemLabel>
                    {isSelected('priority_level', 'desc') && <CheckIcon sx={{ color: '#58a6ff', fontSize: 16 }} />}
                </ItemRow>

                <ItemRow onClick={() => handleSelect('estimate_minutes', 'asc')}>
                    <ItemLabel>
                        <SwapVertIcon sx={{ color: isSelected('estimate_minutes', 'asc') ? '#58a6ff' : '#8b949e', fontSize: 20 }} />
                        <Typography variant="body2" sx={{ fontSize: '13px', color: isSelected('estimate_minutes', 'asc') ? '#c9d1d9' : '#8b949e' }}>
                            Estimated Effort (Low to High)
                        </Typography>
                    </ItemLabel>
                    {isSelected('estimate_minutes', 'asc') && <CheckIcon sx={{ color: '#58a6ff', fontSize: 16 }} />}
                </ItemRow>

                <ItemRow onClick={() => handleSelect('created_at', 'desc')}>
                    <ItemLabel>
                        <HistoryIcon sx={{ color: isSelected('created_at', 'desc') ? '#58a6ff' : '#8b949e', fontSize: 20 }} />
                        <Typography variant="body2" sx={{ fontSize: '13px', color: isSelected('created_at', 'desc') ? '#c9d1d9' : '#8b949e' }}>
                            Recently Created
                        </Typography>
                    </ItemLabel>
                    {isSelected('created_at', 'desc') && <CheckIcon sx={{ color: '#58a6ff', fontSize: 16 }} />}
                </ItemRow>
            </Section>

            {/* FOOTER */}
            <Footer>
                <ClearButton onClick={handleClear}>Clear All</ClearButton>
                <ApplyButton onClick={() => {
                    if (onApply) onApply({
                        sort: selectedSort,
                        order: selectedOrder,
                    });
                    onClose();
                }}>Apply Sort</ApplyButton>
            </Footer>
        </StyledPopover>
    );
};