import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, CircularProgress, Divider, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

import { saveFarmerInFocus } from 'src/redux/reducers/group.slice';
import { useDispatch } from 'react-redux'
import { makeStyles } from '@mui/styles';
import { fetchFarmerById } from 'src/redux/actions/group.action';

const random = Math.random() * 11;
console.log('Math random is-->', random);
//const noimage = Math.random()*11 < 1 ? farmer1 : Math.random()*11 < 2 ? farmer2: Math.random()*11 < 3 ? farmer3: Math.random()*11 < 4 ?farmer4 : Math.random()*11 < 5 ?farmer5 : Math.random()*11 < 6 ?farmer6 : Math.random()*11 < 7 ?farmer7 : Math.random()*11 < 8 ? farmer8: Math.random()*11 < 9 ? farmer9: Math.random()*11 < 10 ?farmer10 :farmer10

const useStyles = makeStyles({
  row: {
    backgroundColor: '#F9F9F9',
    marginTop: '3px',
    marginBottom: '3px',
    fontFamily: 'poppins',
  },
});

const columns = !isMobile
  ? [
      /*{
    field: 'id',
    headerName: '#', 
    width: 250,
    renderCell: (params) => {
    },
  },*/
      {
        field: 'user',
        headerName: 'Full Name',
        width: 270,
        height: 250,
        fontWeight: 700,
        // fontSize: '4rem',
        renderCell: (user) => {
          var returnStyle = (user) => {
            return user;
          };

            const firstName =user?.firstName;
          return (
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.5rem', width: 100 }}
            >
            
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <div>{/*THE NUMBERS SHOULD GO HERE */}</div>
              </div>

              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  width: '40px',
                  fontSize: '1rem',
                }}
              >
                {firstName.toUpperCase()}
              </span>
            </div>
          );
        },
      },
      {
        field: 'image',
        headerName: 'Image',
        width: 290,
        height: 450,
        renderCell: (params) => {
          return (
            <div style={{ fontSize: '1rem', color: 'black', width: 70, height: 70 }}>
              {' '}
              {/* {params.row.startDate && new Date(params.row.startDate).toDateString()} */}
              <img src={params.row.image} style={{borderRadius: 50}}/>
            </div>
          );
        },
      },
      {
        field: 'email',
        headerName: 'User Email',
        width: 290,
        height: 450,
        renderCell: (params) => {
          return (
            <div style={{ fontSize: '1rem', color: 'black' }}>
              {' '}
              {params.row.email}
            </div>
          );
        },
      },
      {
        field: 'actions',
        headerName: '',
        width: 180,
        height: 250,
      },
    ]
  : [
      {
        field: 'user',
        headerName: 'Full Name',
        width: 270,
        height: 250,
        fontSize: '3rem',
        renderCell: (params) => {
          var returnStyle = (params) => {
            return params.row.index;
          };

        //   const email = `${params.email}`;
          return (
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.5rem', width: 100 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <div>{/*THE NUMBERS SHOULD GO HERE */}</div>
              </div>

              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  width: '40px',
                  fontSize: '1rem',
                }}
              >
                {/* {params.email} */}
              </span>
            </div>
          );
        },
      },

      {
        field: 'actions',
        headerName: '',
        width: 180,
        height: 250,
      },
    ];

export default function UserStatsTable({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleActionClick = (student) => {
    navigate('/dashboard/edit-student', { state: { student } });
  };

  const handleCellClick = (param, event) => {
    event.defaultMuiPrevented = param.field !== 'actions';
    console.log('STOPPING PROPAGATIONS!');
    event.stopPropagation();
  };

  const [loading, setLoading] = React.useState(false);

  return (
    <div style={{ height: 530, width: '100%' }}>
      {!classes.row ? (
        <CircularProgress />
      ) : (
        <DataGrid
          sx={{
            border: 'none', // Removes the outer border completely
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'white',
              color: 'black',
              fontWeight: 'bold',
              borderBottom: 'none', // removes header bottom border
               fontSize: '1.2rem',
               fontWeight: 700,
            },
            '& .MuiDataGrid-row': {
              color: 'black',
            },
            '& .MuiDataGrid-row:nth-of-type(even)': {
              backgroundColor: '#ffffff',
            },
            '& .MuiDataGrid-row:nth-of-type(odd)': {
              backgroundColor: '#f4f4f4',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none', // removes horizontal grid lines
            },
            '& .MuiDataGrid-columnSeparator': {
              display: 'none', // removes vertical lines
            },
            '& .MuiDataGrid-virtualScroller': {
              overflow: 'hidden',
            },
            scrollbarWidth: 'none', // Firefox scrollbar
            '&::-webkit-scrollbar': {
              display: 'none', // Chrome/Safari scrollbar
            },
          }}
          //getRowClassName={(params) => (classes.row)}
          onCellClick={handleCellClick}
          rows={user}
          rowHeight={80}
          columns={columns.map((col, index) => {
            if (col.field === 'actions') {
              return {
                ...col,
                renderCell: (params) => (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', }}>
                    {
                      <Button
                        onClick={() => {
                          //    setLoading(true)
                          //    dispatch(saveFarmerInFocus(params.row))
                          //    setTimeout(()=>{
                          //
                          //    navigate('/dashboard/farmer-profile')
                          //
                          //  },
                          //    600)
                          //    setTimeout(()=>{
                          //
                          //      setLoading(false)
                          //
                          //    },
                          //      1000)
                        }}
                        variant="contained"
                        style={{ minWidth: '130px', backgroundColor: 'black', color: 'white', marginRight: '20px' }}
                      >
                        {'View'}
                      </Button>
                    }
                  </div>
                ),
              };
            } else if (col.field === 'user') {
              return {
                ...col,
                renderCell: (params) => (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: '0.8rem', // reduced from 2.5rem to match header alignment
                      width: '100%', // match the column width
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <div>{/*THE NUMBERS SHOULD GO HERE */}</div>
                    </div>
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        textAlign: 'left',
                        flex: 1, // lets the text fill the available cell space
                        fontSize: '1rem',
                      }}
                    >
                    {params.row.user
                      .split(" ")
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}                    
                      </span>
                  </div>
                ),
              };
            }

            return col;
          })}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection={false}
        />
      )}
    </div>
  );
}
