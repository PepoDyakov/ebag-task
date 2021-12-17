import React from 'react';
import Icon from '../Icon';

import styles from './StatusRow.module.scss';

interface IStatusRowProps {
  statuses: string[];
}

const StatusRow: React.FC<IStatusRowProps> = ({ statuses }) => {
  return (
    <div className={styles.statusRow}>
      {statuses.map((status, id) => {
        if (!!status && status.length > 0) {
          return (
            <Icon iconName={status} key={id} className={styles.statusRowIcon} />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default StatusRow;
