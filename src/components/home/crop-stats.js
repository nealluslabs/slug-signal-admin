import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Divider, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import redboy from 'src/assets/images/corn.jpeg';
import greenboy from 'src/assets/images/potato.jpeg';
import athlete from 'src/assets/images/plantain.jpeg';
import amfootball from 'src/assets/images/amfootball.jpeg'


const columns = [
  /*{
    field: 'id',
    headerName: '#', 
    width: 250,
    renderCell: (params) => {
    },
  },*/
  {
    field: 'cropName', 
    headerName: '#Produce Name',
    width: 350,
    renderCell: (params) => {
      //const fullName = `${params.row.fName} ${params.row.lName}`;
      return <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"1.5rem",width:200}}>
        
        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start"}}><div>{/*THE NUMBERS SHPULD GO HERE */}</div> <img src={params.row.image &&params.row.image } style ={{height:"40px",width:"50px",borderRadius:"8px"}}/></div>
      
       <span style={{display:"flex",alignItems:"center",justifyContent:"flex-start",textAlign:"left"}}>{params.row.cropName}</span>

      </div>;
    },
  },
  { field: 'cropType', headerName: 'Produce Type', width: 200, renderCell: (params) => {
    return <div>{params.row.cropType}</div>;
  },  },
  { field: 'lastHarvest', headerName: 'Last Harvest',  width: 200, renderCell: (params) => {
    return <div>{params.row.lastHarvest}</div>;
  }, },
  { field: 'harvestDate', headerName: 'Harvest Date', width: 250, renderCell: (params) => {
    return <div>{params.row.harvestDate && params.row.harvestDate }</div>;
  }, },
  {
    field: 'actions',
    headerName: '',
    width: 200,
  },
];

export default function CropStats({ crops }) {
  const navigate = useNavigate();
  const handleActionClick = (student) => {
    navigate('/dashboard/edit-student', { state: { student } });
  };


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={crops}
        columns={columns.map((col) => {
          if (col.field === 'actions') {
            return {
              ...col,
              renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    //onClick={() => handleActionClick(params?.row)}
                    variant="contained"
                    style={{ minWidth: '130px', backgroundColor: "#2DA840", marginRight: '20px' }}
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