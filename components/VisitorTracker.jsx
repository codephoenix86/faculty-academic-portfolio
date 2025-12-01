// 'use client';

// import { useEffect } from 'react';

// export default function VisitorTracker({ profileId }) {
//   useEffect(() => {
//     // Check if user has already been counted in this session
//     const hasVisited = sessionStorage.getItem('visitor_counted');
    
//     if (!hasVisited && profileId) {
//       // Call API to increment count
//       fetch('/api/increment-visitor', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ profileId }),
//       })
//       .then(() => {
//         // Mark as counted for this session
//         sessionStorage.setItem('visitor_counted', 'true');
//       })
//       .catch((error) => {
//         console.error('Error tracking visitor:', error);
//       });
//     }
//   }, [profileId]);

//   return null;
// }

'use client';

import { useEffect } from 'react';
import { create } from 'zustand';

// Create a global store for visitor count
export const useVisitorStore = create((set) => ({
  visitorCount: 0,
  setVisitorCount: (count) => set({ visitorCount: count }),
}));

export default function VisitorTracker({ profileId, initialCount }) {
  const setVisitorCount = useVisitorStore((state) => state.setVisitorCount);

  useEffect(() => {
    // Set initial count immediately
    setVisitorCount(initialCount);

    // Check if user has already been counted in this session
    const hasVisited = sessionStorage.getItem('visitor_counted');
    
    if (!hasVisited && profileId) {
      // Call API to increment count
      fetch('/api/increment-visitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId }),
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.count) {
          // Update the global store with the new count
          setVisitorCount(data.count);
        }
        // Mark as counted for this session
        sessionStorage.setItem('visitor_counted', 'true');
      })
      .catch((error) => {
        console.error('Error tracking visitor:', error);
      });
    }
  }, [profileId, initialCount, setVisitorCount]);

  return null;
}