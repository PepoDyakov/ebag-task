import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import iconMap from './iconMap';

interface IIconProps {
  iconName: string;
  className: string;
}

const Icon: React.FC<IIconProps> = (props) => {
  return (
    <FontAwesomeIcon
      {...props}
      icon={iconMap[props.iconName]}
      title={props.iconName}
    />
  );
};

export default Icon;
