import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Divider, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import redboy from 'src/assets/images/maccies.png';
import greenboy from 'src/assets/images/starbucks.png';
import athlete from 'src/assets/images/atlanta.png';
import amfootball from 'src/assets/images/bain.jpeg'



const columns = [
  /*{
    field: 'id',
    headerName: '#', 
    width: 250,
    renderCell: (params) => {
    },
  },*/
  {
    field: 'studentName', 
    headerName: '# Brands',
    width: 350,
    renderCell: (params) => {
      const fullName = `${params.row.fname} ${params.row.lname}`;
      return <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"60%"}}>
        
        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start"}}><div>{/*THE NUMBERS SHPULD GO HERE */}</div> <img src={params.row.id === '0S91dTHhu7t0Zc6645Gb'?redboy:params.row.id === '75LPiOJKwtndeC67o5d3'?greenboy:params.row.id === '8Gnbs3WPwJ7ZzzvHgORs'?athlete:amfootball} style ={{height:"50px",width:"60px",borderRadius:"8px"}}/></div>
      
       <span style={{display:"flex",alignItems:"center",justifyContent:"flex-start"}}>{fullName}</span>

      </div>;
    },
  },
  { field: 'class', headerName: 'Class', width: 250 },
  { field: 'amount', headerName: 'Amount',  width: 250, renderCell: (params) => {
    return <div>$1,000</div>;
  }, },
  { field: 'paymentStatus', headerName: 'Status', width: 250, renderCell: (params) => {
    return <div>{!params.row.paymentStatus ? 'Not Paid' : params.row.paymentStatus}</div>;
  }, },
  {
    field: 'actions',
    headerName: '',
    width: 250,
  },
];

export default function StudentFinanceStatsAthlete({ students }) {
  const navigate = useNavigate();
  const handleActionClick = (student) => {
    navigate('/dashboard/edit-student', { state: { student } });
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
                    //onClick={() => handleActionClick(params?.row)}
                    variant="contained"
                    style={{ minWidth: '105px', backgroundColor: "#D72A34", marginRight: '20px' }}
                  >
                   View
                  </Button>
                  {/* <Button
                    onClick={() => handleAddResult(params?.row)}
                    variant="contained"
                    style={{ minWidth: '85px', backgroundColor: "#000000" }}
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