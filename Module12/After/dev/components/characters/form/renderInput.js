import React from 'react';

const renderInput = ({ input, value, title, placeholder, label,
      className, meta: { error, touched }, type, icon }) => (
    <div>
      <dt>{title}</dt>
      <dd>
        <input
          type={type || "text"}
          className={className} 
          placeholder={placeholder}
          {...input}
        />
        {icon}
        {error && <div className="alert alert-danger">{error}</div>}
    </dd>
    </div>
);

export default renderInput;
