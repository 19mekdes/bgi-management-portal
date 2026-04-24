import { useState, useEffect, useCallback, useRef } from 'react';

interface WebSocketMessage {
  type: string;
  data: unknown;
}

interface UseWebSocketOptions {
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  autoConnect?: boolean;
}

interface UseWebSocketReturn {
  sendMessage: (message: string | object) => void;
  lastMessage: WebSocketMessage | null;
  readyState: number;
  isConnected: boolean;
  reconnect: () => void;
  disconnect: () => void;
}

export function useWebSocket(
  url: string,
  options: UseWebSocketOptions = {}
): UseWebSocketReturn {
  const {
    onOpen,
    onClose,
    onError,
    reconnectInterval = 3000,
    maxReconnectAttempts = 5,
    autoConnect = true,
  } = options;

  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const [readyState, setReadyState] = useState<number>(WebSocket.CONNECTING);
  const [reconnectAttempts, setReconnectAttempts] = useState<number>(0);
  
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isUnmountingRef = useRef<boolean>(false);

  const isConnected = readyState === WebSocket.OPEN;

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  const reconnect = useCallback(() => {
    if (isUnmountingRef.current) return;
    
    if (reconnectAttempts >= maxReconnectAttempts) {
      console.log('Max reconnection attempts reached');
      return;
    }
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    reconnectTimeoutRef.current = setTimeout(() => {
      if (!isUnmountingRef.current) {
        connect();
      }
    }, reconnectInterval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reconnectAttempts, maxReconnectAttempts, reconnectInterval]);

  const connect = useCallback(() => {
    if (isUnmountingRef.current) return;
    
    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = (event) => {
        setReadyState(WebSocket.OPEN);
        setReconnectAttempts(0);
        onOpen?.(event);
      };

      ws.onclose = (event) => {
        setReadyState(WebSocket.CLOSED);
        onClose?.(event);
        
        if (!isUnmountingRef.current && autoConnect) {
          setReconnectAttempts(prev => prev + 1);
          reconnect();
        }
      };

      ws.onerror = (event) => {
        onError?.(event);
      };

      ws.onmessage = (event) => {
        try {
          const parsedData = JSON.parse(event.data) as WebSocketMessage;
          setLastMessage(parsedData);
        } catch {
          setLastMessage({
            type: 'raw',
            data: event.data,
          });
        }
      };
    } catch (error) {
      console.error('WebSocket connection error:', error);
      if (autoConnect) {
        reconnect();
      }
    }
  }, [url, onOpen, onClose, onError, autoConnect, reconnect]);

  const sendMessage = useCallback((message: string | object) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const data = typeof message === 'string' ? message : JSON.stringify(message);
      wsRef.current.send(data);
    } else {
      console.warn('WebSocket is not connected');
    }
  }, []);

  useEffect(() => {
    if (autoConnect) {
      connect();
    }
    
    return () => {
      isUnmountingRef.current = true;
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [autoConnect, connect]);

  return {
    sendMessage,
    lastMessage,
    readyState,
    isConnected,
    reconnect,
    disconnect,
  };
}