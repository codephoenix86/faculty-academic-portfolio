'use client';

import { useEffect } from 'react';

export default function VisitorTracker({ profileId }) {
  useEffect(() => {
    // Check if user has already been counted in this session
    const hasVisited = sessionStorage.getItem('visitor_counted');
    
    if (!hasVisited && profileId) {
      // Call API to increment count
      fetch('/api/increment-visitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId }),
      })
      .then(() => {
        // Mark as counted for this session
        sessionStorage.setItem('visitor_counted', 'true');
      })
      .catch((error) => {
        console.error('Error tracking visitor:', error);
      });
    }
  }, [profileId]);

  return null;
}