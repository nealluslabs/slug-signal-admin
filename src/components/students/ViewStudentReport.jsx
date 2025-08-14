import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Divider, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const columns = [
  {
    field: 'id',
    headerName: '#', 
    width: 100,
    renderCell: (params) => {
    },
  },
  {
    field: 'studentName', 
    headerName: 'Student',
    width: 200,
    renderCell: (params) => {
      const fullName = `${params.row.fname} ${params.row.lname}`;
      return <div>{fullName}</div>;
    },
  },
  { field: 'gender', headerName: 'Gender', width: 200 },
  { field: 'class', headerName: 'Class', width: 200 },
  { field: 'section', headerName: 'Section', width: 200 },
  {
    field: 'actions',
    headerName: '',
    width: 300,
  },
];

export default function ViewStudentsReport({ students }) {
  const navigate = useNavigate();
  const handleActionClick = (student) => {
    navigate('/dashboard/view-exam-report', { state: { student } });
  };

  const handleAddResult = (student) => {
    navigate('/dashboard/action-reports', { state: { student } });
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={students}
        columns={columns.map((col) => {
          if (col.field === 'actions') {
            return {
              ...col,
              renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    onClick={() => handleActionClick(params?.row)}
                    variant="contained"
                    style={{ minWidth: '85px', backgroundColor: "#D72A34", marginRight: '20px' }}
                  >
                    View Result
                  </Button>
                  {/* <Button
                    onClick={() => handleAddResult(params?.row)}
                    variant="contained"
                    style={{ minWidth: '85px', backgroundColor: "#D72A34" }}
                  >
                    Add Result
                  </Button> */}
                </div>
              ),
            };
          }
          return col;
        })}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}