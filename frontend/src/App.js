import { useRef } from 'react';

function Sidebar() {
  const sidebarRef = useRef(null);

  return (
    <div ref={sidebarRef} className="sidebar">
      {/* Sidebar content */}
    </div>
  );
}
