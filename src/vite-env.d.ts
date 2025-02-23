/// <reference types="vite/client" />

declare module 'react-mathquill' {
  export const MathQuill: React.ComponentType<{
    latex: string;
    onChange: (mathField: any) => void;
    mathquillDidMount?: (mathField: any) => void;
    config?: {
      spaceBehavesLikeTab?: boolean;
      autoCommands?: string;
      autoOperatorNames?: string;
      handlers?: {
        enter?: () => void;
      };
    };
  }>;
}

// Add MathQuill global types
declare global {
  interface Window {
    MathQuill: {
      getInterface: (version: number) => any;
    };
  }
}
