import React from 'react';
import { Box, Typography } from '@mui/material';
import { FileDownloadOutlined, Add } from '@mui/icons-material';
import {
  HeaderContainer,
  FilterButton,
  ActionButton,
} from '../../Insights.styles';
import type { InsightsHeaderProps } from './InsightsHeader.types';

export const InsightsHeader: React.FC<InsightsHeaderProps> = ({
  filter,
  filters,
  onFilterChange,
}) => {
  return (
    <HeaderContainer>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Análisis de {filter === 'Daily' ? 'Hoy' : filter === 'Weekly' ? 'la Semana' : 'el Mes'}
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            Resumen de Productividad
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <ActionButton>
            <FileDownloadOutlined fontSize="small" />
            Exportar
          </ActionButton>
          <ActionButton primary>
            <Add fontSize="small" />
            Crear Reporte
          </ActionButton>
        </Box>
      </Box>

      <Box display="flex" gap={1} mt={2}>
        {filters.map((f) => (
          <FilterButton
            key={f}
            active={filter === f}
            onClick={() => onFilterChange(f)}
          >
            {f === 'Daily' ? 'Diario' : f === 'Weekly' ? 'Semanal' : 'Mensual'}
          </FilterButton>
        ))}
      </Box>
    </HeaderContainer>
  );
};
