import { createReactBlockSpec } from '@blocknote/react';
import { Box } from '@mui/material';

export const CodeBlockSpec = createReactBlockSpec(
  {
    type: 'proCodeBlock',
    content: 'inline',
    propSchema: {
      textColor: {
        default: 'default',
      },
      backgroundColor: {
        default: 'default',
      },
    },
  },
  {
    render: ({ editor }) => {
      return (
        <Box>
          <Box ref={editor.mount} />
        </Box>
      );
    },
  },
);
