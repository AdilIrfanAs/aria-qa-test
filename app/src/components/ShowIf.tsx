import React from 'react';

interface ShowIfProps {
  condition: boolean;
  children: React.ReactNode;
}

export const ShowIf: React.FC<ShowIfProps> = (props) => {
  const { condition, children } = props;

  return condition ? <>{children}</> : null;
};
