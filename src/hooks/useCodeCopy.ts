import { useEffect } from 'react';

export const useCodeCopy = (content: string | undefined) => {
  useEffect(() => {
    if (!content) return;

    // Find all pre tags
    const preTags = document.querySelectorAll('pre');

    preTags.forEach((pre) => {
      // Check if button already exists to avoid duplicates
      if (pre.querySelector('.copy-btn')) return;

      // Create container for relative positioning
      const wrapper = document.createElement('div');
      wrapper.style.position = 'relative';
      
      // Insert wrapper before pre, then move pre inside
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      // Create button
      const button = document.createElement('button');
      button.className = 'copy-btn';
      button.innerText = 'Copy';
      button.style.position = 'absolute';
      button.style.top = '0.5rem';
      button.style.right = '0.5rem';
      button.style.padding = '0.25rem 0.75rem';
      button.style.fontSize = '0.75rem';
      button.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      button.style.border = '1px solid rgba(255, 255, 255, 0.2)';
      button.style.borderRadius = '0.25rem';
      button.style.color = '#A1A1AA';
      button.style.cursor = 'pointer';
      button.style.transition = 'all 0.2s';

      button.addEventListener('click', () => {
        const code = pre.querySelector('code')?.innerText || pre.innerText;
        navigator.clipboard.writeText(code);
        button.innerText = 'Copied!';
        button.style.color = '#10B981';
        button.style.borderColor = '#10B981';
        
        setTimeout(() => {
          button.innerText = 'Copy';
          button.style.color = '#A1A1AA';
          button.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }, 2000);
      });

      wrapper.appendChild(button);
    });
  }, [content]);
};
