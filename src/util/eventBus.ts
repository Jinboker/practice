const topics = {};

export default {
  /**
   * 订阅消息
   * @param topic 订阅消息名
   * @param listener 消息发布时触发的回调
   */
  on: (topic: string, listener: (...arg: any[]) => void) => {
    let topicListeners = topics[topic] = topics[topic] || [];

    topicListeners.push(listener);
  },

  /**
   * 移除注册信息
   * @param topic 消息名
   * @param listener  移除的注册函数,不传则移除全部注册
   */
  off: (topics: string[], listener?: () => void) => {
    topics.forEach(ele => {
      if (!topics[ele]) return;

      let topicListeners = topics[ele];

      if (listener) {
        const listenerIndex = topicListeners.indexOf(listener);

        ~listenerIndex && (topicListeners[listenerIndex] = null);
      } else {
        topicListeners.length = 0;
      }
    });
  },

  /**
   * 发布消息，支持链式调用
   */
  dispatch: function (topic: string, ...args: any[]) {
    let i = 0;
    const listeners = topics[topic] || [];

    while(i < listeners.length) {
      const listener = listeners[i];

      listener === null
        ? listeners.splice(i, 1)
        : ( listener.apply(null, args), i++ );
    }

    return this;
  }
}
