import React, { useState } from 'react';
import Joyride, { STATUS, type CallBackProps, type Step, ACTIONS, EVENTS } from 'react-joyride';
import { useTheme } from '@mui/material';
import { TaskBar } from '@/pages/Home/components/Sidebar/types/Sidebar.types';

const TOUR_STORAGE_KEY = 'focusly_tour_seen';

interface OnboardingTourProps {
  activeTab: TaskBar;
  onTabChange: (tab: TaskBar) => void;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ onTabChange }) => {
  const theme = useTheme();
  const [run, setRun] = useState(() => !localStorage.getItem(TOUR_STORAGE_KEY));
  const [stepIndex, setStepIndex] = useState(0);

  const steps: Step[] = [
    {
      target: '#joyride-logo',
      content: '¡Bienvenido a Focusly! Tu nuevo centro de control para la productividad y el enfoque.',
      disableBeacon: true,
      placement: 'right',
    },
    {
      target: '#joyride-add-task',
      content: 'Comienza creando tu primera tarea. Puedes asignar duraciones, prioridades y etiquetas.',
      placement: 'right',
    },
    {
      target: '#joyride-daily-plan',
      content: 'El Plan Diario muestra tu agenda. Arrastra y suelta tareas para organizar tu jornada.',
      placement: 'right',
    },
    {
      target: '#joyride-tasks',
      content: 'Haz clic aquí para gestionar todas tus tareas con herramientas avanzadas.',
      placement: 'right',
    },
    // --- TASKS TAB ---
    {
      target: '#joyride-tasks-list',
      content: 'Aquí es donde se mostrarán todas tus tareas organizadas. Puedes ver detalles haciendo clic en ellas.',
      placement: 'bottom',
    },
    {
      target: '#joyride-tasks-search',
      content: 'Usa el buscador para localizar rápidamente tareas por título, etiqueta o proyecto.',
      placement: 'bottom',
    },
    {
      target: '#joyride-tasks-filters',
      content: 'Filtra y ordena tus tareas para enfocarte en lo más importante en cada momento.',
      placement: 'bottom',
    },
    {
      target: '#joyride-tasks-completed',
      content: 'Usa este botón para mostrar u ocultar las tareas que ya has completado.',
      placement: 'bottom',
    },
    {
      target: '#joyride-tasks-view-toggle',
      content: 'Cambia la visualización (Lista, Cuadrícula o Tablero) según cómo prefieras trabajar.',
      placement: 'bottom',
    },
    // --- WORKSPACE TAB ---
    {
      target: '#joyride-workspace',
      content: 'Workspace es el lugar para tus planes estratégicos y documentos colaborativos.',
      placement: 'right',
    },
    {
      target: '#joyride-workspace-search',
      content: 'Busca planes de trabajo específicos o filtra entre tus documentos y carpetas.',
      placement: 'bottom',
    },
    {
      target: '#joyride-workspace-folders',
      content: 'Organiza tus notas en carpetas personalizadas para mantener todo en orden.',
      placement: 'top',
    },
    {
      target: '#joyride-workspace-create-note',
      content: 'Crea una nueva nota estratégica para profundizar en tus proyectos.',
      placement: 'right',
    },
    // --- INSIGHTS TAB ---
    {
      target: '#joyride-insights',
      content: 'Insights te ayuda a entender tus patrones de trabajo y rendimiento.',
      placement: 'right',
    },
    {
      target: '#joyride-insights-stats',
      content: 'Visualiza tus métricas clave: horas de enfoque, tareas completadas y puntuación de energía.',
      placement: 'bottom',
    },
    {
      target: '#joyride-insights-trends',
      content: 'Este gráfico muestra tus tendencias de productividad a lo largo de la semana.',
      placement: 'top',
    },
    {
      target: '#joyride-insights-distribution',
      content: 'Analiza en qué categorías de trabajo estás invirtiendo la mayor parte de tu tiempo.',
      placement: 'top',
    },
    {
      target: '#joyride-insights-heatmap',
      content: 'El Mapa de Actividad revela tus "Horas Doradas" de máximo rendimiento diario.',
      placement: 'top',
    },
    // --- GENERAL TOOLS ---
    {
      target: '#joyride-energy',
      content: 'Predecimos tus niveles de energía según tus hábitos para ayudarte a evitar el agotamiento.',
      placement: 'top',
    },
    {
      target: '#joyride-chat-ai',
      content: '¿Necesitas ayuda? Nuestra IA puede ayudarte a organizar tareas o darte consejos de productividad.',
      placement: 'left',
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, index, action } = data;

    if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      const nextIndex = index + (action === ACTIONS.PREV ? -1 : 1);
      
      // Navigation Logic (Adjusted indices)
      if (nextIndex >= 4 && nextIndex <= 8) onTabChange(TaskBar.Tasks);
      else if (nextIndex >= 10 && nextIndex <= 13) onTabChange(TaskBar.Workspace);
      else if (nextIndex >= 15 && nextIndex <= 18) onTabChange(TaskBar.Insights);
      else onTabChange(TaskBar.DailyPlan);

      setStepIndex(nextIndex);
    }

    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      setRun(false);
      localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      stepIndex={stepIndex}
      continuous
      scrollToFirstStep
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      locale={{
        back: 'Atrás',
        close: 'Cerrar',
        last: 'Finalizar',
        next: 'Siguiente',
        skip: 'Saltar tour'
      }}
      styles={{
        options: {
          arrowColor: theme.palette.background.paper,
          backgroundColor: theme.palette.background.paper,
          overlayColor: 'rgba(0, 0, 0, 0.65)',
          primaryColor: theme.palette.primary.main,
          textColor: theme.palette.text.primary,
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: 16,
          padding: 20,
          fontFamily: '"Outfit", sans-serif',
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        buttonBack: {
          color: theme.palette.text.secondary,
          marginRight: 10,
        },
        buttonNext: {
          borderRadius: 8,
          fontWeight: 700,
        },
        buttonSkip: {
          color: theme.palette.text.secondary,
        },
      }}
    />
  );
};
