import React, { useState, useRef } from 'react';

// Main App component
const App = () => {
  // Initial state for the list items, mimicking the structure from the image
  const [items, setItems] = useState([
    {
      id: 'india-gate',
      title: 'India Gate',
      rating: '4.6',
      reviews: '281,124',
      description: 'India Gate is a war memorial located in New Delhi, along the Rajpath. It is dedicated to the 82,000 soldiers, both Indian and British.',
      imageUrl: 'https://placehold.co/100x100/AEC6CF/FFFFFF?text=IG' // Placeholder for India Gate
    },
    {
      id: 'red-fort',
      title: 'Red Fort',
      rating: '4.5',
      reviews: '168,729',
      description: 'The Red Fort is a historical fort in the old Delhi area, on the banks of Yamuna.',
      imageUrl: 'https://placehold.co/100x100/FFDDC1/FFFFFF?text=RF' // Placeholder for Red Fort
    },
    {
      id: 'qutub-minar',
      title: 'Qutub Minar',
      rating: '4.5',
      reviews: '151,556',
      description: 'Qutub Minar is a minaret or a victory tower located in the Qutub complex, a UNESCO World Heritage Site in Delhi\'s Mehrauli area.',
      imageUrl: 'https://placehold.co/100x100/B0E0E6/FFFFFF?text=QM' // Placeholder for Qutub Minar
    },
    {
      id: 'lotus-temple',
      title: 'Lotus Temple',
      rating: '4.5',
      reviews: '67,772',
      description: 'Located in the national capital of New Delhi, the Lotus Temple is an edifice dedicated to the Baha\'i faith.',
      imageUrl: 'https://placehold.co/100x100/ADD8E6/FFFFFF?text=LT' // Placeholder for Lotus Temple
    }
  ]);

  // Ref to store the ID of the item currently being dragged
  const dragItem = useRef(null);
  // Ref to store the ID of the item that is being dragged over
  const dragOverItem = useRef(null);

  // Function to handle the start of a drag operation
  const handleDragStart = (e, id) => {
    dragItem.current = id; // Set the current dragged item's ID
    e.dataTransfer.effectAllowed = 'move'; // Indicate that the item can be moved
  };

  // Function to handle drag over another item
  const handleDragOver = (e, id) => {
    e.preventDefault(); // Prevent default to allow dropping
    dragOverItem.current = id; // Set the item being dragged over
  };

  // Function to handle dropping an item and reordering the list
  const handleDrop = () => {
    const draggedId = dragItem.current;
    const droppedOverId = dragOverItem.current;

    // If both items are valid and different
    if (draggedId && droppedOverId && draggedId !== droppedOverId) {
      // Find the indices of the dragged and dropped-over items
      const draggedIndex = items.findIndex(item => item.id === draggedId);
      const droppedOverIndex = items.findIndex(item => item.id === droppedOverId);

      // Create a new array to avoid direct mutation of state
      const newItems = [...items];
      // Remove the dragged item from its original position
      const [draggedItem] = newItems.splice(draggedIndex, 1);
      // Insert the dragged item at the new position
      newItems.splice(droppedOverIndex, 0, draggedItem);

      // Update the state with the reordered list
      setItems(newItems);
    }

    // Reset refs after drop
    dragItem.current = null;
    dragOverItem.current = null;
  };

  // Function to handle the end of a drag operation
  const handleDragEnd = () => {
    // Reset refs if drag ends without a successful drop (e.g., dropped outside)
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 font-sans antialiased">
      {/* Tailwind CSS CDN for styling */}
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <style>
        {`
        body {
          font-family: 'Inter', sans-serif;
        }
        .draggable-list-item {
          cursor: grab;
          transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
        }
        .draggable-list-item:active {
          cursor: grabbing;
        }
        .dragging {
          opacity: 0.5; /* Visual feedback for the item being dragged */
          border: 2px dashed #6366f1; /* Indigo 500 */
        }
        .drag-over {
          background-color: #e0e7ff; /* Light indigo for drag-over effect */
        }
        /* Custom scrollbar for better aesthetics */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        `}
      </style>

      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg my-8">
        {/* Header Section: Day Input */}
        <div className="flex items-center justify-between mb-6">
          <input
            type="text"
            value="Day"
            className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 focus:border-blue-500 outline-none pb-1"
            readOnly // For now, keep it read-only as per design, can be made editable
          />
          {/* You can add a dropdown icon here if needed, similar to Figma */}
        </div>

        {/* List of draggable items */}
        <div className="flex flex-col gap-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              id={item.id}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, item.id)}
              onDragOver={(e) => handleDragOver(e, item.id)}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
              className={`draggable-list-item flex items-center p-4 border border-gray-200 rounded-lg shadow-sm
                          ${dragItem.current === item.id ? 'dragging' : ''}
                          ${dragOverItem.current === item.id && dragItem.current !== item.id ? 'drag-over' : ''}`}
            >
              {/* Drag handle icon */}
              <div className="mr-4 text-gray-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>

              {/* Item image */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg mr-4 shadow-sm"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/100x100/CCCCCC/000000?text=Image`; }}
              />

              {/* Item details */}
              <div className="flex-1 min-w-0"> {/* min-w-0 added for flex item to shrink correctly */}
                <h3 className="text-lg font-semibold text-gray-800 truncate">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-1 flex items-center">
                  <span className="font-medium text-yellow-500 mr-1">★ {item.rating}</span>
                  <span className="text-xs text-gray-500">({item.reviews})</span>
                </p>
                <p className="text-gray-700 text-sm line-clamp-2">{item.description}</p>
              </div>

              {/* Action icons */}
              <div className="ml-4 flex flex-col items-center justify-center gap-2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101m-2.293 2.293l-1.102 1.101m-2.293 2.293l-1.102 1.101" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Add Credit Section */}
        <div className="flex items-center justify-between mt-6 p-4 bg-gray-50 rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            {/* "W" icon for credit */}
            <div className="bg-blue-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm">W</div>
            <span className="text-gray-700 font-semibold">Credit</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Plus button */}
            <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold pb-1 shadow-md">
              +
            </button>
            {/* Three dots menu */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
