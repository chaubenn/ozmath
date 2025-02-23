// MathQuill setup and initialization
import jQuery from 'jquery';

// Ensure jQuery is globally available for MathQuill
window.jQuery = jQuery;
window.$ = jQuery;

// Create global object for MathQuill
if (typeof window !== 'undefined') {
  (window as any).global = window;
}

// Since MathQuill is now loaded in index.html, we just need to wait for it to be available
const mathQuillPromise = new Promise<void>((resolve) => {
  const checkMathQuill = () => {
    if (window.MathQuill) {
      resolve();
    } else {
      setTimeout(checkMathQuill, 100);
    }
  };
  checkMathQuill();
});

export { mathQuillPromise };
export default jQuery;
