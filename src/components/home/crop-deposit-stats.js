import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Divider, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import redboy from 'src/assets/images/cropcompany.png';
import greenboy from 'src/assets/images/cropcompany.png';
import athlete from 'src/assets/images/cropcompany.png';
import amfootball from 'src/assets/images/cropcompany.png';

const farmer1 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863974/farmer8_l3ewpm.png"
const farmer2 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863990/farmer2_icjojq.png"
const farmer3 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863997/farmer5_ip0m4q.png"
const farmer4 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863998/farmer7_zsvpiv.png"
const farmer5 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863996/farmer3_ngfl1i.png"
const farmer6 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866493/farmer1_ijfjvu.png"
const farmer7 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866568/farmer10_bnpjqc.png"
const farmer8 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866571/farmer9_l6pqj5.png"
const farmer9 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866573/farmer4_mp8ffo.png"
const farmer10 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866573/farmer6_fnwxhj.png"



const columns = [
  /*{
    field: 'id',
    headerName: '#', 
    width: 250,
    renderCell: (params) => {
    },
  },*/
  {
    field: 'companyName', 
    headerName: '# Farmer',
    width: 350,
    renderCell: (params) => {
      //const fullName = `${params.row.fName} ${params.row.lName}`;
      return <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"2.5rem",width:450,fontSize:"1rem"}}>
        
        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",fontSize:"1rem"}}><div>{/*THE NUMBERS SHPULD GO HERE */}</div> <img src={params.row.photo?params.row.photo:params.row.index === 0?farmer1:params.row.index === 1?farmer2:params.row.index ===2 ?farmer3:params.row.index ===3 ?farmer4:params.row.index ===4 ?farmer5:farmer6  } style ={{height:"50px",width:"60px",borderRadius:"16px"}}/></div>
      
       <span style={{display:"flex",alignItems:"center",justifyContent:"flex-start",textAlign:"left",fontSize:"1rem"}}>{params.row.companyName}</span>

      </div>;
    },
  },

  { field: 'crop', headerName: 'Crop', width: 250, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}}>{params.row.cropName}</div>;
  },  },

  { field: 'earnings', headerName: 'Quantity', width: 250, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}} >{params.row.earnings}</div>;
  },  },
  { field: 'harvestDate', headerName: 'Deposit Date',  width: 250, renderCell: (params) => {
    return <div style={{fontSize:"1rem"}}>{params.row.depositDate}</div>;
  }, },
  
  {
    field: 'actions',
    headerName: '',
    width: 150,
  },
];

export default function CropDepositStats({ cropDeposits }) {
  const navigate = useNavigate();
  const handleActionClick = (student) => {
    navigate('/dashboard/edit-student', { state: { student } });
  };

  


  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={cropDeposits}
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