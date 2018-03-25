declare module '*.png';

declare module '*.mp3';

// 延迟函数的参数
interface DelayOption {
  count: number;
  amount: number;
}

interface Operate {
  W?: () => void;
  A?: () => void;
  S?: () => void;
  D?: () => void;
  H?: () => void;
  J?: () => void;
}
