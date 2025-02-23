import React, { useEffect, useRef, useState } from 'react';
import { mathQuillPromise } from '../lib/mathquill';

interface MathInputProps {
  value: string;
  onChange: (latex: string) => void;
  placeholder?: string;
  className?: string;
}

interface ToolbarButton {
  label: string;
  latex: string;
  tooltip: string;
}

const toolbarButtons: ToolbarButton[] = [
  { label: 'xⁿ', latex: '^{}', tooltip: 'Power' },
  { label: '√', latex: '\\sqrt{}', tooltip: 'Square root' },
  { label: 'π', latex: '\\pi', tooltip: 'Pi' },
  { label: 'θ', latex: '\\theta', tooltip: 'Theta' },
  { label: '∫', latex: '\\int', tooltip: 'Integral' },
  { label: '∑', latex: '\\sum', tooltip: 'Sum' },
  { label: '±', latex: '\\pm', tooltip: 'Plus-minus' },
  { label: '÷', latex: '\\div', tooltip: 'Divide' },
  { label: '≤', latex: '\\le', tooltip: 'Less than or equal' },
  { label: '≥', latex: '\\ge', tooltip: 'Greater than or equal' },
  { label: '≠', latex: '\\ne', tooltip: 'Not equal' },
  { label: '∞', latex: '\\infty', tooltip: 'Infinity' },
];

export default function MathInput({ value, onChange, placeholder, className = '' }: MathInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mathFieldRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initMathQuill = async () => {
      if (initialized) return;
      
      try {
        await mathQuillPromise;
        
        if (!isMounted || !containerRef.current || !window.MathQuill) return;

        const MQ = window.MathQuill.getInterface(2);
        const config = {
          spaceBehavesLikeTab: false,
          autoOperatorNames: 'sin cos tan ln log',
          handlers: {
            enter: () => null,
            space: () => {
              if (mathFieldRef.current) {
                mathFieldRef.current.typedText(' ');
                return false;
              }
            },
            edit: () => {
              if (mathFieldRef.current) {
                const latex = mathFieldRef.current.latex();
                onChange(latex);
              }
            }
          }
        };

        mathFieldRef.current = MQ.MathField(containerRef.current, config);

        // Set initial value
        if (value) {
          mathFieldRef.current.latex(value);
        }

        setIsReady(true);
        setInitialized(true);
      } catch (error) {
        console.error('Error initializing MathQuill:', error);
      }
    };

    initMathQuill();

    return () => {
      isMounted = false;
    };
  }, [value, onChange, initialized]);

  // Update value when prop changes
  useEffect(() => {
    if (mathFieldRef.current && isReady && value !== mathFieldRef.current.latex()) {
      mathFieldRef.current.latex(value);
    }
  }, [value, isReady]);

  const handleToolbarClick = (e: React.MouseEvent, latex: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (mathFieldRef.current) {
      mathFieldRef.current.write(latex);
      mathFieldRef.current.focus();
    }
  };

  return (
    <div className={`math-input-wrapper ${className}`}>
      {/* Math Input Field with Placeholder */}
      <div className="relative mb-2">
        <div 
          ref={containerRef}
          className="mq-editable-field mq-math-mode"
          onClick={() => mathFieldRef.current?.focus()}
        />
        {placeholder && !value && (
          <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
            {placeholder}
          </div>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-1">
        {toolbarButtons.map((button) => (
          <button
            key={button.latex}
            onClick={(e) => handleToolbarClick(e, button.latex)}
            type="button"
            title={button.tooltip}
            className="px-2 py-1 text-sm text-gray-700 dark:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}
