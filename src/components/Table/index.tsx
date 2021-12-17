import React from 'react';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';
import { ClassNameMap } from '@mui/styles';

interface ITableProps {
  tableStyles: ClassNameMap<any>;
}

const Table: React.FC<ITableProps & DataGridProps> = (props) => {
  const { tableStyles } = props;
  return (
    <DataGrid
      {...props}
      classes={{
        ...tableStyles,
      }}
    />
  );
};

export default Table;
