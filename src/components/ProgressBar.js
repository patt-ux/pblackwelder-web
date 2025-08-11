import React, { useEffect, useRef, useState } from 'react';

const ProgressBar = ({ title, percent }) => {
  const [width, setWidth] = useState(0);
  const progressRef = useRef();

  useEffect(() => {
    // Animate the width after mount
    const timeout = setTimeout(() => {
      setWidth(percent);
    }, 100); // slight delay for animation effect
    return () => clearTimeout(timeout);
  }, [percent]);

  return (
    <div className="st-single-progressbar">
      <div className="st-progressbar-heading">
        <h3 className="st-progressbar-title">{title}</h3>
        <div className="st-progressbar-percentage">{percent}%</div>
      </div>
      <div className="st-progressbar" data-progress={percent}>
        <div
          className="st-progressbar-in"
          ref={progressRef}
          style={{ width: width + '%', transition: 'width 1.5s ease' }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;