// Event Bus para comunicação entre microfrontends
type EventCallback = (...args: any[]) => void;

class EventBus {
  private events: Map<string, EventCallback[]> = new Map();

  // Registrar um listener para um evento
  on(event: string, callback: EventCallback): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(callback);
  }

  // Remover um listener
  off(event: string, callback: EventCallback): void {
    if (!this.events.has(event)) return;
    
    const callbacks = this.events.get(event)!;
    const index = callbacks.indexOf(callback);
    if (index > -1) {
      callbacks.splice(index, 1);
    }
  }

  // Emitir um evento
  emit(event: string, ...args: any[]): void {
    if (!this.events.has(event)) return;
    
    const callbacks = this.events.get(event)!;
    callbacks.forEach(callback => {
      try {
        callback(...args);
      } catch (error) {
        console.error(`Erro no evento ${event}:`, error);
      }
    });
  }

  // Limpar todos os listeners
  clear(): void {
    this.events.clear();
  }
}

// Instância global do Event Bus
export const eventBus = new EventBus();

// Tipos de eventos
export interface MicrofrontendEvents {
  // Eventos de transação
  'transaction:created': (transaction: any) => void;
  'transaction:updated': (transaction: any) => void;
  'transaction:deleted': (transactionId: string) => void;
  
  // Eventos de saldo
  'balance:updated': (balance: number) => void;
  
  // Eventos de navegação
  'navigation:changed': (route: string) => void;
  
  // Eventos de tema
  'theme:changed': (theme: 'light' | 'dark') => void;
  
  // Eventos de autenticação
  'auth:login': (user: any) => void;
  'auth:logout': () => void;
}

// Hooks para facilitar o uso
export const useEventBus = () => {
  return {
    on: eventBus.on.bind(eventBus),
    off: eventBus.off.bind(eventBus),
    emit: eventBus.emit.bind(eventBus),
  };
};

// Hook específico para React
export const useMicrofrontendEvents = () => {
  const { on, off, emit } = useEventBus();

  return {
    // Transações
    onTransactionCreated: (callback: (transaction: any) => void) => on('transaction:created', callback),
    onTransactionUpdated: (callback: (transaction: any) => void) => on('transaction:updated', callback),
    onTransactionDeleted: (callback: (transactionId: string) => void) => on('transaction:deleted', callback),
    emitTransactionCreated: (transaction: any) => emit('transaction:created', transaction),
    emitTransactionUpdated: (transaction: any) => emit('transaction:updated', transaction),
    emitTransactionDeleted: (transactionId: string) => emit('transaction:deleted', transactionId),
    
    // Saldo
    onBalanceUpdated: (callback: (balance: number) => void) => on('balance:updated', callback),
    emitBalanceUpdated: (balance: number) => emit('balance:updated', balance),
    
    // Navegação
    onNavigationChanged: (callback: (route: string) => void) => on('navigation:changed', callback),
    emitNavigationChanged: (route: string) => emit('navigation:changed', route),
    
    // Tema
    onThemeChanged: (callback: (theme: 'light' | 'dark') => void) => on('theme:changed', callback),
    emitThemeChanged: (theme: 'light' | 'dark') => emit('theme:changed', theme),
    
    // Autenticação
    onAuthLogin: (callback: (user: any) => void) => on('auth:login', callback),
    onAuthLogout: (callback: () => void) => on('auth:logout', callback),
    emitAuthLogin: (user: any) => emit('auth:login', user),
    emitAuthLogout: () => emit('auth:logout'),
  };
}; 