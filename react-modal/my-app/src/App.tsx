import { useState } from 'react';
import Modal from './Modal';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Delete Me!</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>Are you sure you want to delete?</p>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
        <button
          onClick={() => {
            alert('Item deleted!');
            setIsOpen(false);
          }}>
          Delete
        </button>
      </Modal>
    </div>
  );
}

export default App;
