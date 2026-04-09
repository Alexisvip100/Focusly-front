import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Slide, Grow, Zoom, Button, IconButton } from '@mui/material';
import {
  SmartToy as RobotIcon,
  Close as CloseIcon,
  Send as SendIcon,
  Bolt as EnergyIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import {
  ChatContainer,
  FloatingButton,
  NotificationCard,
  ChatWindow,
  Header,
  MessageList,
  MessageBubble,
  InputArea,
  StyledInput,
  RobotIconWrapper,
  SendButton,
  SubtaskCard,
  AddButton,
} from './ChatAI.styles';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  type?: 'text' | 'subtask-list';
}

const mockSubtasks = [
  { id: 1, title: 'Market Research & Benchmarking', duration: '4 hours', energy: 'Low' },
  { id: 2, title: 'Draft GTM Strategy Document', duration: '6 hours', energy: 'High' },
  { id: 3, title: 'Stakeholder Feedback Round 1', duration: '2 hours', energy: 'Medium' },
];

interface ChatAIProps {
  rightOffset?: number;
}

export const ChatAI = ({ rightOffset = 100 }: ChatAIProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'user', text: 'Break this big project into smaller tasks' },
    {
      id: '2',
      sender: 'ai',
      text: "I've analyzed the Product Launch requirements. Here is a friendly breakdown of 3 recommended subtasks to get you moving:",
      type: 'subtask-list',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: 'user', text: inputValue },
    ]);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <ChatContainer rightOffset={rightOffset}>
      {/* Notification Card (Only visible when chat is closed) */}
      <Slide direction="up" in={!isOpen && showNotification} mountOnEnter unmountOnExit>
        <NotificationCard elevation={0}>
          <Box display="flex" gap={2} alignItems="start">
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'info.main', mt: 1 }} />
            <Box flex={1}>
              <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                <EnergyIcon sx={{ color: 'warning.main', fontSize: 16 }} />
                <Typography variant="subtitle2" color="text.primary" fontWeight="bold">
                  Energy Optimization
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" fontSize="13px" sx={{ mb: 1.5 }}>
                Energy dip predicted at 2 PM. Consider scheduling lighter admin tasks.
              </Typography>
              <Button
                size="small"
                variant="outlined"
                sx={{
                  color: 'text.secondary',
                  borderColor: 'divider',
                  textTransform: 'none',
                  fontSize: '12px',
                  padding: '4px 12px',
                  '&:hover': { borderColor: 'text.primary', color: 'text.primary' },
                }}
              >
                Auto-Reschedule
              </Button>
            </Box>
            <Box
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                setShowNotification(false);
              }}
            >
              <CloseIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            </Box>
          </Box>
        </NotificationCard>
      </Slide>

      {/* Main Chat Window */}
      <Grow in={isOpen} mountOnEnter unmountOnExit>
        <ChatWindow elevation={0}>
          {/* Header */}
          <Header>
            <Box display="flex" alignItems="center" gap={2}>
              <RobotIconWrapper>
                <RobotIcon fontSize="small" />
              </RobotIconWrapper>
              <Box>
                <Typography variant="subtitle1" color="white" fontWeight="bold" lineHeight={1.2}>
                  Lumina
                </Typography>
                <Typography variant="caption" color="rgba(255,255,255,0.7)">
                  AI Productivity Buddy
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={() => setIsOpen(false)} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Header>

          {/* Messages */}
          <MessageList>
            {messages.map((msg) => (
              <Box
                key={msg.id}
                display="flex"
                flexDirection="column"
                alignItems={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
              >
                {msg.sender === 'ai' && (
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      bgcolor: '#2563eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 0.5,
                      ml: 1,
                    }}
                  >
                    <RobotIcon sx={{ fontSize: 14, color: '#fff' }} />
                  </Box>
                )}
                <MessageBubble isUser={msg.sender === 'user'}>
                  <Typography variant="body2">{msg.text}</Typography>
                  {msg.type === 'subtask-list' && (
                    <Box mt={2}>
                      {mockSubtasks.map((task) => (
                        <SubtaskCard key={task.id}>
                          <Box>
                            <Typography
                              variant="subtitle2"
                              color="text.primary"
                              fontSize="13px"
                              fontWeight="600"
                            >
                              {task.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Est. {task.duration} • {task.energy} energy
                            </Typography>
                          </Box>
                          <AddButton size="small">
                            <AddIcon fontSize="small" />
                          </AddButton>
                        </SubtaskCard>
                      ))}
                    </Box>
                  )}
                </MessageBubble>
              </Box>
            ))}
            <div ref={endRef} />
          </MessageList>

          {/* Input */}
          <InputArea>
            <StyledInput
              placeholder="Tell Lumina what's on your mind..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              fullWidth
              autoComplete="off"
            />
            <SendButton onClick={handleSend} disabled={!inputValue.trim()}>
              <SendIcon fontSize="small" />
            </SendButton>
          </InputArea>
        </ChatWindow>
      </Grow>

      {/* Floating Toggle Button */}
      <Zoom in={!isOpen} unmountOnExit>
        <FloatingButton onClick={() => setIsOpen(true)}>
          <RobotIcon fontSize="large" />
        </FloatingButton>
      </Zoom>
    </ChatContainer>
  );
};
