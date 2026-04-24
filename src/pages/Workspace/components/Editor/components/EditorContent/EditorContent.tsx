import { Box, Typography } from '@mui/material';
import { Folder as FolderIcon } from '@mui/icons-material';
import { BlockNoteView } from '@blocknote/mantine';
import { SuggestionMenuController } from '@blocknote/react';
import {
  EditorContent as StyledEditorContent,
  FolderBadge,
  TitleInput,
  BlockNoteWrapper
} from './EditorContent.styles';

interface EditorContentProps {
  currentFolder?: { name: string; color?: string };
  currentTitle: string;
  setTitle: (t: string) => void;
  editor: any;
  onContentChange: () => void;
  getCustomSlashMenuItems: (editor: any) => any[];
}

export const EditorContent = ({
  currentFolder,
  currentTitle,
  setTitle,
  editor,
  onContentChange,
  getCustomSlashMenuItems,
}: EditorContentProps) => {
  return (
    <StyledEditorContent>
      <Box display="flex" alignItems="center" gap={1.5}>
        {currentFolder && (
          <FolderBadge bgColor={currentFolder.color}>
            <FolderIcon sx={{ fontSize: 12 }} />
            <Typography variant="caption" fontWeight={700} sx={{ textTransform: 'uppercase' }}>
              {currentFolder.name}
            </Typography>
          </FolderBadge>
        )}
      </Box>

      <TitleInput
        placeholder="Untitled Document"
        value={currentTitle}
        onChange={(e) => setTitle(e.target.value)}
      />

      <BlockNoteWrapper>
        <BlockNoteView
          editor={editor}
          theme="dark"
          slashMenu={false}
          onChange={onContentChange}
        >
          <SuggestionMenuController
            triggerCharacter={'/'}
            getItems={async (query) =>
              getCustomSlashMenuItems(editor).filter((item) =>
                item.title.toLowerCase().includes(query.toLowerCase())
              )
            }
          />
        </BlockNoteView>
      </BlockNoteWrapper>
    </StyledEditorContent>
  );
};
