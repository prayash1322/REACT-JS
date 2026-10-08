'use client';

import './StarBorder.css';

const StarBorder = ({
  as: Component = 'button',
  className = '',
  innerClassName = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  backgroundColor = '#000000',
  textColor = '#ffffff',
  borderColor = '#222222',
  borderRadius,
  hoverOnly = false,
  children,
  innerStyle,
  style,
  ...rest
}) => {
  return (
    <Component
      className={`star-border-container ${hoverOnly ? 'hover-only' : ''} ${className}`.trim()}
      style={{
        padding: `${thickness}px`,
        borderRadius,
        ...style
      }}
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div
        className={`inner-content ${innerClassName}`.trim()}
        style={{
          background: backgroundColor,
          color: textColor,
          borderColor,
          borderRadius: borderRadius ? `calc(${borderRadius} - ${thickness}px)` : undefined,
          ...innerStyle
        }}
      >
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
