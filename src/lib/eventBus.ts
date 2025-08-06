// Event Bus para comunicação entre microfrontends
type EventCallback = (...args: unknown[]) => void;

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
  emit(event: string, ...args: unknown[]): void {
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

// Hooks para facilitar o uso
export const useEventBus = () => {
  return {
    on: eventBus.on.bind(eventBus),
    off: eventBus.off.bind(eventBus),
    emit: eventBus.emit.bind(eventBus),
  };
}; 