import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { SearchPalette } from '../SearchPalette/SearchPalette';
import type { TaskSearchItems } from '../../../../types/workspace.types';
import {
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
} from '@/pages/Workspace/Workspace.styles';
import {
  BackButton,
  EditorHeader as StyledEditorHeader,
} from './EditorHeader.styles';

interface EditorHeaderProps {
  onBack: () => void;
  showPalette: boolean;
  setShowPalette: (b: boolean) => void;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  filteredTasks: TaskSearchItems[];
  filterTab: 'TASKS' | 'SUBTASKS';
  setFilterTab: (t: 'TASKS' | 'SUBTASKS') => void;
  selectTask: TaskSearchItems | null;
  selectedSubtaskIndex: number | null;
  handleSelectTask: (
    task: TaskSearchItems | null,
    index: number | null,
  ) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: (field: any, value: any) => void;
}

export const EditorHeader = ({
  onBack,
  showPalette,
  setShowPalette,
  searchTerm,
  setSearchTerm,
  filteredTasks,
  filterTab,
  setFilterTab,
  selectTask,
  selectedSubtaskIndex,
  handleSelectTask,
  setValue,
}: EditorHeaderProps) => {
  return (
    <StyledEditorHeader>
      <HeaderLeft>
        <BackButton
          startIcon={<ArrowBackIcon sx={{ fontSize: 14 }} />}
          onClick={onBack}
        >
          BACK TO WORKSPACES
        </BackButton>
      </HeaderLeft>

      <HeaderCenter
        id="joyride-editor-search"
        sx={{ position: 'relative', zIndex: 50, mx: 2 }}
      >
        <SearchPalette
          showPalette={showPalette}
          setShowPalette={setShowPalette}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredTasks={filteredTasks}
          filterTab={filterTab}
          setFilterTab={setFilterTab}
          selectTask={selectTask}
          selectedSubtaskIndex={selectedSubtaskIndex}
          handleSelectTask={handleSelectTask}
          setValue={setValue}
        />
      </HeaderCenter>

      <HeaderRight />
    </StyledEditorHeader>
  );
};
