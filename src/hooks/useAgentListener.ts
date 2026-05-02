import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';

const AGENTS_API_URL = import.meta.env.VITE_AGENTS_API_URL || 'http://localhost:8000';
const BUSINESS_ID = 'focusly';

/**
 * useAgentListener Hook
 * 
 * Connects to the Alexia Agents backend via WebSocket to receive real-time 
 * commands from the AI agent, such as automatic navigation.
 */
export const useAgentListener = () => {
  const navigate = useNavigate();
  const { user, isLogged } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isLogged || !user) return;

    // We use the user ID as the session identifier for the agent
    // This allows the agent (e.g. via WhatsApp) to control the web UI
    const sid = user.id; 
    const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsHost = AGENTS_API_URL.replace(/^https?:\/\//, '');
    const wsUrl = `${proto}//${wsHost}/api/v1/ws/chat/${sid}`;

    console.log('[AgentListener] Connecting to:', wsUrl);
    
    let ws: WebSocket;
    let reconnectTimeout: NodeJS.Timeout;

    const connect = () => {
      ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('[AgentListener] Connected');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          // Listen for a custom payload that specifies navigation
          if (data.type === 'NEW_MESSAGE' && data.payload) {
            const { body, payload } = data.payload;
            
            // Check for explicit navigation in payload
            if (payload && payload.next_page) {
               console.log('[AgentListener] Navigating to:', payload.next_page);
               navigate(`/${payload.next_page}`);
            }
            
            // Fallback: simple text parsing (optional/experimental)
            if (body && body.includes('NAVIGATE_TO:')) {
               const page = body.split('NAVIGATE_TO:')[1].trim();
               navigate(`/${page}`);
            }
          }
        } catch (error) {
          console.error('[AgentListener] Error parsing message:', error);
        }
      };

      ws.onclose = () => {
        console.log('[AgentListener] Disconnected. Reconnecting...');
        reconnectTimeout = setTimeout(connect, 3000);
      };

      ws.onerror = (err) => {
        console.error('[AgentListener] WebSocket Error:', err);
      };
    };

    connect();

    return () => {
      if (ws) ws.close();
      clearTimeout(reconnectTimeout);
    };
  }, [isLogged, user, navigate]);
};
