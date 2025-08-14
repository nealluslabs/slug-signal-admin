import {useEffect,useState} from "react"

import { Box, TextField, Typography , Select,
  MenuItem,
  FormControl,
  InputLabel,Autocomplete} from "@mui/material";

// Icon
import { Close } from '@mui/icons-material';

// Component 
import OwnerHeaderComponent from "./owner-header.component";
import { useDispatch } from "react-redux";
import { saveCurrentSong } from "src/redux/reducers/group.slice";
import { useSelector } from "react-redux";
import { notifyErrorFxn } from "src/utils/toast-fxn";
import { fetchAllCollaborators } from "src/redux/actions/group.action";

const OwnershipFormComponent = () => {
    const dispatch = useDispatch()

    const {currentSong,allCollaborators} = useSelector((state)=> state.group)

    useEffect(()=>{
      dispatch(fetchAllCollaborators())
      },[])
      

    const [currentWriters,setCurrentWriters] = 
    useState(
    [
        {writerName:"Tom Smith",percentSplit:"20%"},
        {writerName:"Doug Crockford",percentSplit:"80%"},
        
    ]
     )

    const [currentPublishers,setCurrentPublishers]= 
    useState(
    [
        {publisherName:"Tom Smith",percentSplit:"20%"},
        {publisherName:"Doug Crockford",percentSplit:"80%"},
        
    ]
     )


    const [currentMasters,setCurrentMasters] = 
    useState(
    [
        {masterName:"Tom Smith", percentSplit:"20%"},
        {masterName:"Doug Crockford", percentSplit:"80%"},
        
    ]
)

const validatePercentageSplits = (publishers) => {
  const totalPercentage = publishers.reduce((sum, publisher) => {
      return sum + parseFloat(publisher.percentSplit);
  }, 0);

  if (totalPercentage > 100) {
     return false
  }
  else{
    return true
  } 

}

useEffect(()=>{

    let newSongDetails = {...currentSong}
    let metadata2 =currentSong.metadata?{...currentSong.metadata}:{}

   metadata2["composers"] = currentWriters
   metadata2["masters"] = currentMasters
   metadata2["publishers"] = currentPublishers
   
    dispatch(saveCurrentSong(
        {...newSongDetails,
          metadata:metadata2
      }))

},[currentMasters,currentWriters,currentPublishers])



useEffect(()=>{

  if( !validatePercentageSplits(currentWriters) ){
    notifyErrorFxn("All writers' splits must not total more than 100%")
    let updatedWriters = [...currentWriters]

   updatedWriters =  [...currentWriters].map(writer => ({
      ...writer,
      percentSplit: "0%"
  }));

    setCurrentWriters(updatedWriters);
   
  }

  if( !validatePercentageSplits(currentPublishers) ){
    notifyErrorFxn("All publishers' splits must not total more than 100%")
    let updatedPublishers = [...currentPublishers]

     updatedPublishers =  [...currentPublishers].map(publisher => ({
       ...publisher,
       percentSplit: "0%"
   }));


    setCurrentPublishers(updatedPublishers);
   
  }

  if( !validatePercentageSplits(currentMasters) ){
    notifyErrorFxn("All masters' splits must not total more than 100%")
    let updatedMasters = [...currentMasters]

    updatedMasters =  [...currentMasters].map(master => ({
      ...master,
      percentSplit: "0%"
  }));



    setCurrentMasters(updatedMasters);
   
  }


},[currentMasters,currentWriters,currentPublishers])

/*WRITER CHANGE NAME */
const handleWriterNameChange = (index, value) => {
    const updatedWriters = [...currentWriters];
   // updatedWriters[index].writerName = value;
   updatedWriters[index] = { ...updatedWriters[index], writerName: value };
    setCurrentWriters(updatedWriters);
  };

  const handleWritersPercentSplitChange = (index, value) => {
    const updatedWriters = [...currentWriters];

 
    //updatedWriters[index].percentSplit = value;
    updatedWriters[index] = { ...updatedWriters[index], percentSplit: value };
    setCurrentWriters(updatedWriters);
  };

  const handleRemoveWriter = (index) => {
    const updatedWriters = currentWriters.filter((_, i) => i !== index);
    setCurrentWriters(updatedWriters);
  };

  const handleAddWriter = (setCurrentWriters,currentWriters) => {
    const updatedWriters = [...currentWriters, { writerName: "", percentSplit: "" }];
    setCurrentWriters(updatedWriters);
  };
  /*WRITER CHANGE NAME  END */


  /*PUBLISHER CHANGE NAME */
const handlePublisherNameChange = (index, value) => {
    const updatedPublishers = [...currentPublishers];
    //updatedPublishers[index].publisherName = value;
    updatedPublishers[index] = { ...updatedPublishers[index], publisherName: value };
    setCurrentPublishers(updatedPublishers);
  };

  const handlePublishersPercentSplitChange = (index, value) => {
    const updatedPublishers = [...currentPublishers];
    //updatedPublishers[index].percentSplit = value;


    updatedPublishers[index] = { ...updatedPublishers[index], percentSplit: value };
    setCurrentPublishers(updatedPublishers);
  };

  const handleRemovePublisher = (index) => {
    const updatedPublishers = currentPublishers.filter((_, i) => i !== index);
    setCurrentPublishers(updatedPublishers);
  };

  const handleAddPublisher = (setCurrentPublishers,currentPublishers) => {
    const updatedPublishers = [...currentPublishers, { publisherName: "", percentSplit: "" }];
    setCurrentPublishers(updatedPublishers);
  };
  /*PUBLISHER CHANGE NAME  END */


  /*MASTER CHANGE NAME */
const handleMasterNameChange = (index, value) => {
    const updatedMasters = [...currentMasters];
   //updatedMasters[index].masterName = value;
    updatedMasters[index] = { ...updatedMasters[index], masterName: value };
    setCurrentMasters(updatedMasters);
  };

  const handleMastersPercentSplitChange = (index, value) => {
    const updatedMasters = [...currentMasters];
    //updatedMasters[index].percentSplit = value;


    updatedMasters[index] = { ...updatedMasters[index], percentSplit: value };
    setCurrentMasters(updatedMasters);
  };

  const handleRemoveMaster = (index) => {
    const updatedMasters = currentMasters.filter((_, i) => i !== index);
    setCurrentMasters(updatedMasters);
  };

  const handleAddMaster = (setCurrentMasters,currentMasters) => {
    const updatedMasters = [...currentMasters, { masterName: "", percentSplit: "" }];
    setCurrentMasters(updatedMasters);
  };
  /*MASTER CHANGE NAME  END */
  

    return (
        <Box style={{width:"45rem"}}>
            <OwnerHeaderComponent warning={ false } title="Writers/Composers" AddParty={handleAddWriter}  setParty={setCurrentWriters} party={currentWriters}/>

        {currentWriters && currentWriters.map((item,index)=>( 
                <Box key={index} my={1} sx={{ display: "flex", mt: 2 }}>
               <FormControl
  fullWidth
  variant="outlined"
  sx={{
    flex: 2.5,
    height: "1rem",
    fontSize: "12px",
    background: "white",
  }}
>
  <Autocomplete
    freeSolo
    value={item.writerName}
    onChange={(e, newValue) => handleWriterNameChange(index, newValue)}
    options={
      allCollaborators?.map((collab) =>
        collab.firstName && collab.lastName
          ? `${collab.firstName} ${collab.lastName}`
          : collab.username || ""
      ) || []
    }
    renderInput={(params) => (
      <TextField
        {...params}
        placeholder="Select or type writer"
        variant="outlined"
        size="small"
        sx={{
          fontSize: "12px",
          height: "2rem",
          color:"black",
          backgroundColor: "white",
          "& .MuiInputBase-input": {
            fontSize: "12px",
            padding: "6px",
            color: "black", // <-- black input text
          },
        }}
      />
    )}
    sx={{
      backgroundColor: "white",
      fontSize: "12px",
      "& .MuiAutocomplete-popupIndicator": {
        color: "#606060",
        color:"black"
      },
    }}
    ListboxProps={{
      style: {
        maxHeight: 100,
        backgroundColor: "white",
        color: "black",
        fontSize: "12px",
        border: "1px solid #606060",
      },
    }}
  />
</FormControl>
      
                <TextField
                  fullWidth
                  value={item.percentSplit}
                  variant="outlined"
                  onChange={(e) => handleWritersPercentSplitChange(index, e.target.value)}
                  InputProps={{
                    style: {
                      background: "white",
                      color: "black",
                      height: "2rem",
                      fontSize:"12px"
                    },
                  }}
                  sx={{
                    flex: 1,
                    ml: 2,
                    height: "1rem",
                    fontSize:"12px"
                  }}
                />
      
                <Close
                  sx={{ color: "#ff2c2c", cursor: "pointer" }}
                  onClick={() => handleRemoveWriter(index)}
                />
              </Box>
              ))
              }
      

            <OwnerHeaderComponent warning={ true } title="Publishing" AddParty={handleAddPublisher}  setParty={setCurrentPublishers} party={currentPublishers} />


         
        {currentPublishers && currentPublishers.map((item,index)=>( 
                <Box key={index} my={1} sx={{ display: "flex", mt: 2 }}>
              
              <FormControl
  fullWidth
  variant="outlined"
  sx={{
    flex: 2.5,
    height: "1rem",
    fontSize: "12px",
    background: "white",
  }}
>
  <Autocomplete
    freeSolo
    value={item.publisherName}
    onChange={(e, newValue) => handlePublisherNameChange(index, newValue)}
    options={
      allCollaborators?.map((collab) =>
        collab.firstName && collab.lastName
          ? `${collab.firstName} ${collab.lastName}`
          : collab.username || ""
      ) || []
    }
    renderInput={(params) => (
      <TextField
        {...params}
        placeholder="Select or type writer"
        variant="outlined"
        size="small"
        sx={{
          fontSize: "12px",
          height: "2rem",
          color:"black",
          backgroundColor: "white",
          "& .MuiInputBase-input": {
            fontSize: "12px",
            padding: "6px",
            color: "black", // <-- black input text
          },
        }}
      />
    )}
    sx={{
      backgroundColor: "white",
      fontSize: "12px",
      "& .MuiAutocomplete-popupIndicator": {
        color: "#606060",
        color:"black"
      },
    }}
    ListboxProps={{
      style: {
        maxHeight: 100,
        backgroundColor: "white",
        color: "black",
        fontSize: "12px",
        border: "1px solid #606060",
      },
    }}
  />
</FormControl>
      
      
                <TextField
                  fullWidth
                  value={item.percentSplit}
                  variant="outlined"
                  onChange={(e) => handlePublishersPercentSplitChange(index, e.target.value)}
                  InputProps={{
                    style: {
                      background: "white",
                      color: "black",
                      height: "2rem",
                      fontSize:"12px"
                    },
                  }}
                  sx={{
                    flex: 1,
                    ml: 2,
                    height: "1rem",
                    fontSize:"12px"
                  }}
                />
      
                <Close
                  sx={{ color: "#ff2c2c", cursor: "pointer" }}
                  onClick={() => handleRemovePublisher(index)}
                />
              </Box>
              ))
              }

            <OwnerHeaderComponent warning={ true } title="Masters"  AddParty={handleAddMaster}  setParty={setCurrentMasters} party={currentMasters} />


           
        {currentMasters && currentMasters.map((item,index)=>( 
                <Box key={index} my={1} sx={{ display: "flex", mt: 2 }}>
               <FormControl
  fullWidth
  variant="outlined"
  sx={{
    flex: 2.5,
    height: "1rem",
    fontSize: "12px",
    background: "white",
  }}
>
  <Autocomplete
    freeSolo
    value={item.masterName}
    onChange={(e, newValue) => handleMasterNameChange(index, newValue)}
    options={
      allCollaborators?.map((collab) =>
        collab.firstName && collab.lastName
          ? `${collab.firstName} ${collab.lastName}`
          : collab.username || ""
      ) || []
    }
    renderInput={(params) => (
      <TextField
        {...params}
        placeholder="Select or type writer"
        variant="outlined"
        size="small"
        sx={{
          fontSize: "12px",
          height: "2rem",
          color:"black",
          backgroundColor: "white",
          "& .MuiInputBase-input": {
            fontSize: "12px",
            padding: "6px",
            color: "black", // <-- black input text
          },
        }}
      />
    )}
    sx={{
      backgroundColor: "white",
      fontSize: "12px",
      "& .MuiAutocomplete-popupIndicator": {
        color: "#606060",
        color:"black"
      },
    }}
    ListboxProps={{
      style: {
        maxHeight: 100,
      
        color: "black",
        fontSize: "12px",
        border: "1px solid #606060",
      },
    }}
  />
</FormControl>
      
      
                <TextField
                  fullWidth
                  value={item.percentSplit}
                  variant="outlined"
                  onChange={(e) => handleMastersPercentSplitChange(index, e.target.value)}
                  InputProps={{
                    style: {
                      background: "white",
                      color: "black",
                      height: "2rem",
                      fontSize:"12px"
                    },
                  }}
                  sx={{
                    flex: 1,
                    ml: 2,
                    height: "1rem",
                    fontSize:"12px"
                  }}
                />
      
                <Close
                  sx={{ color: "#ff2c2c", cursor: "pointer" }}
                  onClick={() => handleRemoveMaster(index)}
                />
              </Box>
              ))
              }

        </Box>
    )
}

export default OwnershipFormComponent;
