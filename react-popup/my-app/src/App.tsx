import React, { useRef, useState } from 'react';
import Popup from './Popup';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="p-4">
      <p className="mb-4">This is a paragraph above the button.</p>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-blue-500 text-white rounded">
        Pop up!
      </button>
      <p className="mt-4">This is a paragraph below the button.</p>
      <Popup
        isOpen={isOpen}
        positionTo={buttonRef.current}
        onClose={() => setIsOpen(false)}>
        <ul className="list-none p-2">
          <li className="p-1 hover:bg-gray-200 cursor-pointer">Menu Item 1</li>
          <li className="p-1 hover:bg-gray-200 cursor-pointer">Menu Item 2</li>
          <li className="p-1 hover:bg-gray-200 cursor-pointer">Menu Item 3</li>
          <li className="p-1 hover:bg-gray-200 cursor-pointer">Menu Item 4</li>
        </ul>
      </Popup>
    </div>
  );
};

export default App;
