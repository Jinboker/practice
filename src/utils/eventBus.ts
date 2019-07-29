class EventBus {
  private handlers: {[eventName: string]: Function[]} = {}

  on(eventName: string, handler: Function) {
    if (!(eventName in this.handlers)) {
      this.handlers[eventName] = []
    }

    this.handlers[eventName].push(handler)
  }

  emit(eventName: string, payload: any) {
    const handlers = this.handlers[eventName]

    if (handlers) {
      handlers.forEach(item => {
        item(payload)
      })
    }
  }

  off(eventName: string, handler?: Function) {
    const handlers = this.handlers[eventName]

    if (!handlers) return

    if (handler) {
      const len = handlers.length

      for (let i = len; i > 0; i--) {
        if (handlers[i] === handler) {
          handlers.splice(i, 1)
        }
      }
    } else {
      delete this.handlers[eventName]
    }
  }
}

export const eventBus = new EventBus()
