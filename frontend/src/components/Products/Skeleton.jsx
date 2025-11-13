import React from 'react';
import './Skeleton.css';

const Skeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-button"></div>
    </div>
  );
};

export default Skeleton;
