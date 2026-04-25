import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { 
  Flag as FlagIcon, 
  CircleOutlined as CircleOutlinedIcon, 
  CheckCircleOutline as CheckCircleOutlineIcon, 
  History as HistoryIcon 
} from '@mui/icons-material';

import {
  StyledPopover,
  Section,
  SectionTitle,
  ItemRow,
  ItemLabel,
  RadioCircle,
  CategoryRow,
  CategoryItem,
  Dot,
  Footer,
  ClearButton,
  ApplyButton,
  AccessTimeIcon,
} from '../Popover.styles';

export interface FilterState {
  priorities: string[];
  categories: string[];
  statuses: string[];
}

interface FilterPopoverProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onApply?: (filters: FilterState) => void;
  onClear?: () => void;
  tags: string[];
  activeFilterState?: FilterState;
}

import { getTagColors } from '../../../Tasks/components/TaskDetailModal/TaskDetailModal.utils';

export const FilterPopover: React.FC<FilterPopoverProps> = ({
  anchorEl,
  open,
  onClose,
  onApply,
  onClear,
  tags,
  activeFilterState,
}) => {
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>(activeFilterState?.priorities || []);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(activeFilterState?.categories || []);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(activeFilterState?.statuses || []);

  const [prevOpen, setPrevOpen] = useState(open);

  if (open && !prevOpen) {
    setPrevOpen(true);
    setSelectedPriorities(activeFilterState?.priorities || []);
    setSelectedCategories(activeFilterState?.categories || []);
    setSelectedStatuses(activeFilterState?.statuses || []);
  } else if (!open && prevOpen) {
    setPrevOpen(false);
  }

  const toggleSelection = (
    item: string,
    current: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (current.includes(item)) {
      setter(current.filter((i) => i !== item));
    } else {
      setter([...current, item]);
    }
  };

  const handleClear = () => {
    setSelectedPriorities([]);
    setSelectedCategories([]);
    setSelectedStatuses([]);
    if (onClear) onClear();
  };

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
      {/* BY PRIORITY */}
      <Section>
        <SectionTitle>By Priority</SectionTitle>
        <ItemRow onClick={() => toggleSelection('High', selectedPriorities, setSelectedPriorities)}>
          <ItemLabel>
            <FlagIcon sx={{ color: 'error.main', fontSize: 16 }} />
            <Typography variant="body2" sx={{ fontSize: '13px' }}>
              High Priority
            </Typography>
          </ItemLabel>
          <RadioCircle selected={selectedPriorities.includes('High')} />
        </ItemRow>
        <ItemRow
          onClick={() => toggleSelection('Medium', selectedPriorities, setSelectedPriorities)}
        >
          <ItemLabel>
            <FlagIcon sx={{ color: 'warning.main', fontSize: 16 }} />
            <Typography variant="body2" sx={{ fontSize: '13px' }}>
              Medium Priority
            </Typography>
          </ItemLabel>
          <RadioCircle selected={selectedPriorities.includes('Medium')} />
        </ItemRow>
        <ItemRow onClick={() => toggleSelection('Low', selectedPriorities, setSelectedPriorities)}>
          <ItemLabel>
            <FlagIcon sx={{ color: 'primary.main', fontSize: 16 }} />
            <Typography variant="body2" sx={{ fontSize: '13px' }}>
              Low Priority
            </Typography>
          </ItemLabel>
          <RadioCircle selected={selectedPriorities.includes('Low')} />
        </ItemRow>
      </Section>
      <Section>
        <SectionTitle>By Tags</SectionTitle>
        <CategoryRow>
          {tags.map((tag: string) => (
            <CategoryItem
              key={tag}
              selected={selectedCategories.includes(tag)}
              onClick={() => toggleSelection(tag, selectedCategories, setSelectedCategories)}
            >
              <Dot color={getTagColors(tag).color} />
              <Typography variant="body2" sx={{ fontSize: '13px' }}>
                {tag}
              </Typography>
            </CategoryItem>
          ))}
        </CategoryRow>
      </Section>

      {/* BY STATUS */}
      <Section>
        <SectionTitle>By Status</SectionTitle>
        <ItemRow onClick={() => toggleSelection('ToDo', selectedStatuses, setSelectedStatuses)}>
          <ItemLabel>
            <CircleOutlinedIcon sx={{ color: '#c9d1d9', fontSize: 16 }} />
            <Typography variant="body2" sx={{ fontSize: '13px' }}>
              To Do
            </Typography>
          </ItemLabel>
          <RadioCircle selected={selectedStatuses.includes('ToDo')} />
        </ItemRow>
        <ItemRow
          onClick={() => toggleSelection('Completed', selectedStatuses, setSelectedStatuses)}
        >
          <ItemLabel>
            <CheckCircleOutlineIcon sx={{ color: 'success.main', fontSize: 16 }} />
            <Typography variant="body2" sx={{ fontSize: '13px' }}>
              Completed
            </Typography>
          </ItemLabel>
          <RadioCircle selected={selectedStatuses.includes('Completed')} />
        </ItemRow>
        <ItemRow onClick={() => toggleSelection('Pending', selectedStatuses, setSelectedStatuses)}>
          <ItemLabel>
            <AccessTimeIcon sx={{ color: 'warning.main', fontSize: 16 }} />
            <Typography variant="body2" sx={{ fontSize: '13px' }}>
              Pending
            </Typography>
          </ItemLabel>
          <RadioCircle selected={selectedStatuses.includes('Pending')} />
        </ItemRow>
        <ItemRow onClick={() => toggleSelection('Backlog', selectedStatuses, setSelectedStatuses)}>
          <ItemLabel>
            <HistoryIcon sx={{ color: '#c9d1d9', fontSize: 16 }} />
            <Typography variant="body2" sx={{ fontSize: '13px' }}>
              Backlog
            </Typography>
          </ItemLabel>
          <RadioCircle selected={selectedStatuses.includes('Backlog')} />
        </ItemRow>
      </Section>

      {/* FOOTER */}
      <Footer>
        <ClearButton onClick={handleClear}>Clear All</ClearButton>
        <ApplyButton
          onClick={() => {
            if (onApply)
              onApply({
                priorities: selectedPriorities,
                categories: selectedCategories,
                statuses: selectedStatuses,
              });
            onClose();
          }}
        >
          Apply Filters
        </ApplyButton>
      </Footer>
    </StyledPopover>
  );
};
