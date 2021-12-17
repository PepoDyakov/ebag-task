import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  GridCellParams,
  GridColDef,
  GridSelectionModel,
} from '@mui/x-data-grid';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { fetchMockData } from './server';

import StatusRow from './components/StatusRow';
import Table from './components/Table';

import styles from './App.module.scss';
import { Button } from '@mui/material';

library.add(fas);

const PAGE_SIZE_OPTIONS = [1, 5, 10, 25, 50, 100, 250, 500, 1000];

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxHeight: '100rem',
    overflowY: 'scroll',
  },
  columnHeaders: {
    backgroundColor: '#009879',
  },
  columnHeaderTitle: {
    color: '#ffffff',
    fontSize: '1.4rem',
    fontWeight: '700',
  },
  headerTitleContainer: {
    '& > .MuiCheckbox-root': {
      color: '#ffffff',
    },
  },
  row: {
    '&:nth-of-type(even)': {
      backgroundColor: '#f3f3f3',
    },
  },
  cell: {
    fontSize: '1.2rem',
  },
  buttonText: {
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '0.5rem',
  },
  footerContainer: {
    '& > .MuiTablePagination-selectLabel': {
      fontSize: '1rem',
    },
  },
});

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [enableDeleteButton, setEnableDeleteButton] = useState<boolean>(false);
  const [mockData, setMockData] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_OPTIONS[4]);

  const columns: GridColDef[] = [
    {
      field: 'orderId',
      headerName: 'Order ID',
      sortable: false,
      width: 150,
    },
    {
      field: 'name',
      headerName: 'Client Name',
      type: 'string',
      width: 150,
    },
    {
      field: 'amount',
      headerName: 'Order Amount',
      type: 'number',
      width: 150,
    },
    {
      field: 'date',
      headerName: 'Order Date',
      type: 'date',
      width: 150,
    },
    {
      field: 'paymentType',
      headerName: 'Payment Type',
      type: 'string',
      width: 150,
    },
    {
      field: 'newClient',
      headerName: 'New Client',
      type: 'boolean',
      renderCell: (cellValues: GridCellParams) => {
        if (
          cellValues.row.newClient === undefined ||
          cellValues.row.newClient === null
        ) {
          return <p>N/A</p>;
        } else {
          return <p>{cellValues.row.newClient ? 'Yes' : 'No'}</p>;
        }
      },
    },
    {
      field: 'Statuses',
      headerName: 'Statuses',
      renderCell: (cellValues: GridCellParams) => {
        return <StatusRow statuses={cellValues.row.statuses} />;
      },
      filterable: false,
      sortable: false,
      width: 150,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const mockData = await fetchMockData();
      setMockData(mockData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const classes = useStyles();

  const handleRowSelection = (selectionModel: GridSelectionModel) => {
    setSelectedRows(selectionModel);
    setEnableDeleteButton(true);
  };

  const handleDeleteRows = () => {
    const remainingRows = mockData.filter(
      (row) => !selectedRows.includes(row.id)
    );
    setMockData(remainingRows);
    setSelectedRows([]);
    setEnableDeleteButton(false);
  };

  return (
    <div className={styles.App}>
      {loading ? (
        <div className={styles.loading}>Really big loading text...</div>
      ) : (
        <div className={styles.tableWrapper}>
          <Button
            color="error"
            size="large"
            variant="contained"
            disabled={!enableDeleteButton}
            onClick={handleDeleteRows}
            classes={{ text: classes.buttonText }}
          >
            Delete
          </Button>
          <Table
            checkboxSelection={true}
            columns={columns}
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newSize) => setPageSize(newSize)}
            onSelectionModelChange={handleRowSelection}
            page={page}
            pageSize={pageSize}
            pagination
            rows={mockData}
            rowsPerPageOptions={PAGE_SIZE_OPTIONS}
            tableStyles={classes}
          />
        </div>
      )}
    </div>
  );
}

export default App;
