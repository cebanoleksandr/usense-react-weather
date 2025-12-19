import React, { useRef, useEffect, type ReactElement } from 'react';
import ReactDOM from 'react-dom';

export interface IContextMenuItem {
  text: string;
  onSelect(item: IContextMenuItem): void;
  color?: string;
  subItems?: IContextMenuItem[];
}

export interface IContextMenu {
  state: boolean;
  setState(state: boolean): void;
  children: ReactElement<{ ref?: React.Ref<HTMLElement> }>;
  items: IContextMenuItem[];
}

const ContextMenu: React.FC<IContextMenu> = ({ state, setState, children, items }) => {
  const optionsRef = useRef<HTMLDivElement>(null);
  const activatorRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setState(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [optionsRef, setState]);

  function getPositions(activator: HTMLElement) {
    const positions = activator.getBoundingClientRect();

    return {
      top: `${positions.bottom + window.scrollY + 12}px`,
      left: `${positions.right + window.scrollX - 280}px`,
    };
  }

  return (
    <>
      {React.cloneElement(children, { ref: activatorRef })}

      {state && (
        ReactDOM.createPortal(
          <div
            ref={optionsRef}
            className='absolute z-10 bg-white rounded-xl shadow-soft w-72 border border-grey-3 max-h-50 overflow-auto scrollbar-md'
            style={getPositions(activatorRef.current!)}
          >
            <div className='my-3 font-bold text-center'>Recent searches</div>

            {items.map(item => (
              <div
                key={item.text}
                className={
                  [
                    'px-5 py-3',
                    'cursor-pointer hover:bg-gray-100 active:bg-gray-200 transition duration-300',
                    item.color ? `text-${item.color}`: '',
                  ].join(' ')
                }
                onClick={() => item.onSelect(item)}
              >
                {item.text}
              </div>
            ))}

            {!items.length && (
              <div className='font-bold text-gray-500 text-center mb-3'>
                No recent searches
              </div>
            )}
          </div>,
          document.body
        )
      )}
    </>
  );
};

export default ContextMenu;
