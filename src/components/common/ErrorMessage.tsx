import React from 'react';

interface Props {
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => {
  return <div className="error">{message}</div>;
};

export default ErrorMessage;
