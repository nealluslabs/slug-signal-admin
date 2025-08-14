import { db, fb, auth, storage } from '../../config/firebase';
import firebase from "firebase/app";
import "firebase/firestore";
import { clearUser, loginFailed, loginSuccess, logoutFxn, signupFailed, storeUserData } from '../reducers/auth.slice';
import { v4 as uuidv4 } from 'uuid';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { isItLoading, saveAllGroup,
   saveEmployeer, saveGroupMembers,
    saveMyGroup, savePrivateGroup,
     savePublicGroup,saveLoggedInFarmer,
      saveCurrentDepositsToDisplay, clearCurrentDepositsToDisplay,
      saveNewlyUploadedFullSong, saveNewlyUploadedFiles,
      saveNewlyUploadedPlaylist, savePlaylistName,
       saveAllSongs, saveAllPlaylists,saveAllFiles,
        saveAllSongsFromAPlaylist, isPlaylistSongsLoading,
         saveCurrentPlaylist, saveSelectedAudioId,
          saveSelectedAudio, saveSelectedAudioState,
           saveAllSongsFromCurrentPlaylistToEdit, saveCurrentlyEditingPlaylistName,
            saveCurrentlyEditingPlaylistId, saveNewPlaylistBeingCreated, 
            saveCurrentSongUploadId,saveCurrentSong, 
            saveAllSongsFromAllPlaylistsToEdit,
           saveSongCreatorSongs,
           saveAllCollaborators,
           savePlaylistCreatorPlaylists,
           saveContactsToChat,
           saveAllTrends,
           saveFilteredTrends} from '../reducers/group.slice';
import axios from 'axios';
import baseUrl from './baseUrl';
import { S3 } from "aws-sdk";

import { parseBlob } from 'music-metadata';
import { QuickUpdateUserDataSilent, fetchUserData, fetchUserDataSilent } from './auth.action';

const s3 = new S3({
  accessKeyId:process.env.REACT_APP_ACCESSKEYID,
  secretAccessKey:process.env.REACT_APP_SECRETACCESSKEY,
  region:process.env.REACT_APP_REGION,
});


export const fetchFarmerByPhone = (phone,navigate,setLoading) => async (dispatch) => {
  
  //dispatch(saveCurrentFarmersToDisplay([]));
  //dispatch(saveTotalPagesFarmers(0))



 axios.get(`${baseUrl}/api/farmers/byphone?phone=${phone}`)
   .then((results) => {

    console.log("results from ffetching farmer by phone--->",results)

     const pageFarmers = results.data
  
      console.log("results from ffetching farmer by phone DATA--->",pageFarmers)

   if (pageFarmers) {
     dispatch(isItLoading(false));
     console.log("Farmer with this number-->:", pageFarmers);
     dispatch(saveLoggedInFarmer(pageFarmers));

   
      notifySuccessFxn("Logged In😊");
      navigate('/dashboard/home', { replace: true });
    
     //dispatch(saveTotalPagesFarmers(pageFarmers.pages))
   } else {
       dispatch(isItLoading(false));
       dispatch(saveLoggedInFarmer(pageFarmers));
       //dispatch(saveTotalPagesFarmers(pageFarmers.pages))
       console.log("No farmers returned, by phone!");
       notifyErrorFxn("Please Check your number and try again!");
   }
 }).catch((error) => {
   console.log("Error getting document of farmer by phone:", error);
   dispatch(isItLoading(false));
 });



 


}


export const addNewFarmer = (farmerInfo,navigate) => async (dispatch) => {
  
  console.log("ADDING NEW FARMERS")
  axios.post(`${baseUrl}/api/farmers`,farmerInfo)
  .then(()=>{
    console.log("we have refetched all farmers")
   //dispatch(fetchAllFarmers())
   navigate('.login')
  }).then(()=>{
    notifySuccessFxn(' Successfully Registered!')
  })

}



export const fetchDepositsForFarmer = (farmerName) => async (dispatch) => {
  
  dispatch(saveCurrentDepositsToDisplay([]));
  //dispatch(saveTotalPagesFarmers(0))

 axios.get(`${baseUrl}/api/deposits?farmerName=${farmerName}`)
   .then((results) => {
     const pageDeposits = results.data
  
      console.log("results from  Deposits FOR THIS farmer ARE-->",pageDeposits)

   if (pageDeposits.deposits.length > 0) {
     dispatch(isItLoading(false));
     console.log("All Deposits Data:", pageDeposits);
     dispatch(saveCurrentDepositsToDisplay(pageDeposits.deposits))
      //setTimeout(()=>{navigate('/dashboard/farmer-profile')},1000)
     
    
   } else {
       dispatch(isItLoading(false));
       //dispatch(saveCurrentDepositsToDisplay(pageDeposits.deposits));
       dispatch(clearCurrentDepositsToDisplay(pageDeposits.deposits));
      // notifyErrorFxn('no depostits for this farmer!')
       console.log("No Deposits returned!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });


}




export const createMediaInUploads = (/*groupData, user,*/file, url,handleClose,userId) => async (dispatch) => {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date();
   
  console.log("THE FILE DEETS BEING PASSED INTO CREATE MEDIA IN UPLOADS-->: ", file);

  db.collection("uploads").add({
    ...file,
    mediaUrl: url,
    userId:userId,
    mediaUploaded: today.toLocaleDateString("en-US", options),
}).then((res)=>{
    console.log("RESPONSE SONG ID: ", res.id);
    dispatch(fetchAllSongsForOneUser(userId))
    dispatch(saveCurrentSong({}))
    handleClose()
    notifySuccessFxn("File Uploaded successfully")
    
    return db.collection('uploads').doc(res.id).update({
      songId: res.id,
    })

  }).catch((err) => {
    console.error("Error registering media: ", err);
    var errorMessage = err.message;
    notifyErrorFxn(errorMessage);
    
  })
}

export const updateFileName = (newName,fileId,userId) => async (dispatch) => {
try{
  console.log("updating file name while typing")
 db.collection('temporaryUploads').doc(fileId).update({
    name: newName,
  }).then(()=>{
    dispatch(fetchAllFilesForOneUser(userId))
  })

  dispatch(fetch)
}
catch(err){
  console.error("Error WHILE TRYING TO UPDATE FILE NAME DURING TYPING: ", err);
  var errorMessage = err.message;
}

}


export const createMediaInUploadsTemporary = (/*groupData, user,*/file,files, url,userId,setFileBeingProcessed) => async (dispatch) => {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date();
   
  db.collection("temporaryUploads").add({
    ...file,
    createdAt:firebase.firestore.Timestamp.now(),
    mediaTemporaryUrl: url,
    userId:userId
}).then((res)=>{
    console.log("RESPONSE SONG ID: ", res.id);
    
    setFileBeingProcessed([])
   // dispatch(saveNewlyUploadedFiles([...files.filter(obj => (obj.individualId !== file.individualId ))] ))
   // handleClose()
   // notifySuccessFxn("File Uploaded successfully")
     db.collection('temporaryUploads').doc(res.id).update({
      songId: res.id,
    })

   return res


  })
  .then(async(resp)=>{
   //mp3 usually enters firebase before the aiff does, 
   //so the logic below presupposes that the mp3 being 
   //search for has already entered the db

  if(file.name.includes(".aiff") ||file.name.includes(".wav")||file.type.includes(".aiff") ||file.type.includes(".wav")   ){ 

    function extractFilename(filename) {
      if (filename.endsWith(".wav")) {
        return filename.slice(0, -4);  // Remove ".wav"
      } else if (filename.endsWith(".aiff")) {
        return filename.slice(0, -5);  // Remove ".aiff"
      }
      return filename;  // No extension, return as is
    }
  
    const myVariable =  extractFilename(file.name)
  

    const uploadsRef = db.collection("temporaryUploads");
    const query = 
     uploadsRef
    .where("name", ">=", myVariable/* + "\uf8ff"*/)
    .where("type", "in", ["audio/mpeg", "audio/mp3"]); //i was considering song group id for this one
  
    const querySnapshot = await query.get();

    console.log("MY VARIABLE, I.E THE NAME SLICE",myVariable)

    if(!querySnapshot.empty){

     
      
     
      const allItemArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,         // Document ID
        ...doc.data(),      // Document data
      }));

      const firstItemId = allItemArray.filter((item)=>(item.name.includes(myVariable)))[0]   && allItemArray.filter((item)=>(item.name.includes(myVariable)))[0].songId;
      const firstItemData = allItemArray.filter((item)=>(item.name.includes(myVariable)))[0]  && allItemArray.filter((item)=>(item.name.includes(myVariable)))[0];
    
      console.log("I AM AN AIFF FILE AND I FOUND AN MP3 FILE BEARING MY NAME", firstItemData);
     if(firstItemData){ 
      if(firstItemData.otherMusicFiles){
        db.collection('temporaryUploads').doc(firstItemId).update({
          otherMusicFiles:[...firstItemData.otherMusicFiles,{...file,createdAt:firebase.firestore.Timestamp.now(),
            mediaTemporaryUrl: url,
            userId:userId}]
       
        })
      }else {

        db.collection('temporaryUploads').doc(firstItemId).update({
        
        otherMusicFiles: [{...file,
            createdAt:firebase.firestore.Timestamp.now(),
            mediaTemporaryUrl: url,
            userId:userId,
          songId: resp.id
        }]
        })
      }

    }

      console.log("I AM AN AIFF FILE AND I HAVE ADDED MYSELF TO THE MP3 FILE BEARING MY NAME")
    }


}


  })
  .catch((err) => {
    console.error("Error registering media: ", err);
    var errorMessage = err.message;
    notifyErrorFxn(errorMessage);
    
  })
}




export const replaceMediaInUploadsTemporary = (/*groupData, user,*/file,files, url,userId,setFileBeingProcessed,fileToBeReplaced) => async (dispatch) => {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date();
   
  db.collection("temporaryUploads").doc(fileToBeReplaced.songId).get() //i don't really need this get, it's just that i dont want to remove the main logic from the .then()
  .then((res)=>{
    console.log(" FILE TO BE REPLACED RESPONSE ID: ", res.id);
    
    setFileBeingProcessed([])
   // dispatch(saveNewlyUploadedFiles([...files.filter(obj => (obj.individualId !== file.individualId ))] ))
   // handleClose()
   // notifySuccessFxn("File Uploaded successfully")
  //   db.collection('temporaryUploads').doc(res.id).update({
  //    songId: res.id,
  //  })




    if(file.name.includes(".aiff") ||file.name.includes(".wav")||file.type.includes(".aiff") ||file.type.includes(".wav")   ){ 
  console.log("LOOK HERE NOW, FILE TO BE REPLACED IS --->",fileToBeReplaced)

  const freshFetchFileToBeReplaced = db.collection("temporaryUploads").doc(fileToBeReplaced.songId).get().then((doc)=>{
  //IF WE HAVE AIFF FILE Or WAV FILE, THEY ARE COMING FROM THE OTHERMUSIC FILE ARRAY,
  //AND THEY THEMSELVES DONT HAVE OTHER MUSIC FILE ARRAY,SO WE HAVE TO FETCH THE MAIN FILE, WHICH HAS OTHER MUSIC FILE ARRAY.

    const data = doc.data();


    const arrayItemToBeReplaced =data && data.otherMusicFiles &&  data.otherMusicFiles.findIndex((item) => (item.isRawFile === true))
   
    const copy = {...data}

   if(arrayItemToBeReplaced !== -1){
    //if we find the is Raw file property, then we can go ahead and replace that item in the array and then
    //update other music files in the database
    copy.otherMusicFiles[arrayItemToBeReplaced] = 
    {
      ...copy.otherMusicFiles[arrayItemToBeReplaced],
      name:file.name && file.name,
      mediaTemporaryUrl:url,
      size:file.size && file.size,
      size:file.type && file.type,
      updatedAtString:(new Date()).toLocaleDateString("en-US", options),
      updatedAt:firebase.firestore.Timestamp.now(),
    }

    db.collection('temporaryUploads').doc(fileToBeReplaced.songId).update({
      otherMusicFiles:copy.otherMusicFiles
     })
   }


  })

    }else{
      db.collection('temporaryUploads').doc(fileToBeReplaced.songId).update({
       mediaTemporaryUrl:url,
       name:file.name &&file.name,
       size:file.size && file.size,
       updatedAtString:(new Date()).toLocaleDateString("en-US", options),
       updatedAt:firebase.firestore.Timestamp.now(),
       // i do not expect to change the type because only mp3 files get stored at the top level
      })
    }


    dispatch(fetchAllFilesForOneUser(userId))

    notifySuccessFxn(`Media File ${fileToBeReplaced.name} Replaced Successfully!`)
   return res


  })
  
  .catch((err) => {
    console.error("Error registering media: ", err);
    var errorMessage = err.message;
    notifyErrorFxn(errorMessage);
    
  })
}

export const addNewTrend = (trendObject) => async (dispatch) => {

  const uploadToS3 = async (file) => {

    console.log("PABOUT TO SEND TO S3--->",file)


    const params = {
      Body: file, // Blob
      Bucket:process.env.REACT_APP_S3_BUCKET,
      Key: file.name, // Unique filename
      ContentType: 'image/png', // Ensure correct MIME type
    };



     
    
    const data = await s3.upload({
      Body: file, // Blob
      Bucket:process.env.REACT_APP_S3_BUCKET,
      Key: file.name, // Unique filename
      ContentType: 'image/png', // Ensure correct MIME type
    }).promise();
    return data.Location; // S3 file URL 
  };



  uploadToS3(trendObject && trendObject.image && trendObject.image.selectedFile)
  .then( async(res) => {
  db.collection("trends").add({
    id:trendObject.id ,
    trendName:trendObject.trendName?trendObject.trendName:"",
    trendSummary:trendObject.trendSummary?trendObject.trendSummary:"",
    trendDescription:trendObject.trendDescription?trendObject.trendDescription:"",
    detectedAt:trendObject.detectedAt?trendObject.detectedAt:"12/8/2025 2:34 PM",
    status:/*trendObject.status?trendObject.status:*/"Not Approved",
    platforms:trendObject.platforms?trendObject.platforms:"",
    impactLevel:trendObject.impactLevel?trendObject.impactLevel:"",
    imageUrl:res?res:"",
    image:res?res:"",
    trendImage:res?res:"",
    caseStudyExample:trendObject.caseStudyExample?trendObject.caseStudyExample:"",
    culturalSignificanceScore:trendObject.culturalSignificanceScore?trendObject.culturalSignificanceScore:"",
    thoughtStarters:trendObject. thoughtStarters?trendObject. thoughtStarters:"",
    brandsOnThisTrend:trendObject.brandsOnThisTrend?trendObject.brandsOnThisTrend:"",
    audienceProfile:trendObject.audienceProfile?trendObject.audienceProfile:"",
    geographicHotspots:trendObject.geographicHotspots?trendObject.geographicHotspots:"",
    brandSentimentImpact:trendObject.brandSentimentImpact?trendObject.brandSentimentImpact:"",
    
  })
  .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
     
      db.collection("trends").doc(docRef.id).update({
        id:docRef.id
      })
     
      
  })
  .then(()=>{
    dispatch(fetchAllTrends())

    notifySuccessFxn('Trend has been added.✔');
  })
  .catch((error) => {
      console.error("Error adding document to trends collection: ", error);
      //alert('Error adding job.❌')
  });


  })
  .catch((error) => {
    console.error("Error UPLOADING TO SLUG SIGNAL BUCKET: ", error);
    console.log('Error adding job.❌')
});


};




export const updateCurrentTrend = (trendObject,trendId) => async (dispatch) => {

  const uploadToS3 = async (file) => {

    console.log("PABOUT TO SEND TO S3--->",file)


    const params = {
      Body: file, // Blob
      Bucket:process.env.REACT_APP_S3_BUCKET,
      Key: file.name, // Unique filename
      ContentType: 'image/png', // Ensure correct MIME type
    };



     
    
    const data = await s3.upload({
      Body: file, // Blob
      Bucket:process.env.REACT_APP_S3_BUCKET,
      Key: file.name, // Unique filename
      ContentType: 'image/png', // Ensure correct MIME type
    }).promise();
    return data.Location; // S3 file URL 
  };


if(trendObject && trendObject.trendImage && trendObject.trendImage.selectedFile){ 
  uploadToS3(trendObject && trendObject.trendImage && trendObject.trendImage.selectedFile)
  .then( async(res) => {
  db.collection("trends").doc(trendObject.id).update({
    //id:trendObject.id ,
    trendName:trendObject.trendName?trendObject.trendName:"",
    trendSummary:trendObject.trendSummary?trendObject.trendSummary:"",
    detectedAt:trendObject.detectedAt?trendObject.detectedAt:"12/8/2025 2:34 PM",
    status:trendObject.status?trendObject.status:"",
    platforms:trendObject.platforms?trendObject.platforms:"",
    impactLevel:trendObject.impactLevel?trendObject.impactLevel:"",
    imageUrl:res?res:"",
    image:res?res:"",
    trendImage:res?res:"",
    caseStudyExample:trendObject.caseStudyExample?trendObject.caseStudyExample:"",
    culturalSignificanceScore:trendObject.culturalSignificanceScore?trendObject.culturalSignificanceScore:"",
    thoughtStarters:trendObject. thoughtStarters?trendObject. thoughtStarters:"",
    trendDescription:trendObject. trendDescription?trendObject. trendDescription:"",
    brandsOnThisTrend:trendObject.brandsOnThisTrend?trendObject.brandsOnThisTrend:"",
    audienceProfile:trendObject.audienceProfile?trendObject.audienceProfile:"",
    geographicHotspots:trendObject.geographicHotspots?trendObject.geographicHotspots:"",
    brandSentimentImpact:trendObject.brandSentimentImpact?trendObject.brandSentimentImpact:"",
    
  })
  .then((docRef) => {
     // console.log("Document written with ID: ", docRef.id);
      dispatch(fetchAllTrends())

      notifySuccessFxn('Trend has been added.✔');
      
  })
  .catch((error) => {
      console.error("Error adding document to trends collection: ", error);
      //alert('Error adding job.❌')
  });



 


  })
  .catch((error) => {
    console.error("Error UPLOADING TO SLUG SIGNAL BUCKET: ", error);
    console.log('Error adding job.❌')
});

}
else{


  db.collection("trends").doc(trendObject.id).update({
    //id:trendObject.id ,
    trendName:trendObject.trendName?trendObject.trendName:"",
    trendSummary:trendObject.trendSummary?trendObject.trendSummary:"",
    detectedAt:trendObject.detectedAt?trendObject.detectedAt:"",
    status:trendObject.status?trendObject.status:"",
    platforms:trendObject.platforms?trendObject.platforms:"",
    impactLevel:trendObject.impactLevel?trendObject.impactLevel:"",
    
    
    caseStudyExample:trendObject.caseStudyExample?trendObject.caseStudyExample:"",
    culturalSignificanceScore:trendObject.culturalSignificanceScore?trendObject.culturalSignificanceScore:"",
    thoughtStarters:trendObject. thoughtStarters?trendObject. thoughtStarters:"",
    brandsOnThisTrend:trendObject.brandsOnThisTrend?trendObject.brandsOnThisTrend:"",
    audienceProfile:trendObject.audienceProfile?trendObject.audienceProfile:"",
    geographicHotspots:trendObject.geographicHotspots?trendObject.geographicHotspots:"",
    brandSentimentImpact:trendObject.brandSentimentImpact?trendObject.brandSentimentImpact:"",
    
  })
  .then((docRef) => {
      //console.log("Document written with ID: ", docRef.id);
      dispatch(fetchAllTrends())

      notifySuccessFxn('Trend has been added.✔');
      
  })
  .catch((error) => {
      console.error("Error adding document to trends collection: ", error);
      //alert('Error adding job.❌')
  });



}

};



export const createOrUpdateSongInUploadsTemporary = (/*groupData, user,*/file, url,uploadId,songDetails/*we need some sort of id to use and find the song */) => async (dispatch) => {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date();


  console.log("VALID ID IS ---->",uploadId)

  const uploadsRef = db.collection("temporaryUploads");
  const query = uploadsRef.where("uploadId", "==", uploadId); //i was considering song group id for this one

  const querySnapshot = await query.get();

  if (querySnapshot.empty) {

  if(file.isMusicFile){
    //IF WE ARE FACING A MUSIC ONLY FILE  -STILL CANT DIFFERENTIATIATE BETWEEN INSTRUMENTAL AND ACTUAL SONG
   
    console.log("FILE RIGHT BEFORE ADDING INTO DB FOR FIRST TIME-->",file)
 
    if(file.name.toLowerCase().includes("instrumental")){
      //filename should include instrumental, that's how we can add it as an instumental file
      db.collection("temporaryUploads").add({
        instrumentalInformation:file,
        instrumentalTemporaryUrl:url
    }).then((res)=>{
        console.log("RESPONSE SONG ID: ", res.id);
       // notifySuccessFxn("File Uploaded successfully")
        return db.collection('temporaryUploads').doc(res.id).update({
          songId: res.id,
        })
    
      }).catch((err) => {
        console.error("Error registering media: ", err);
        var errorMessage = err.message;
        notifyErrorFxn(errorMessage);
        
      })

    }else{

   

      db.collection("temporaryUploads").add({
        ...file,
        mediaTemporaryUrl: url,
       
    }).then((res)=>{
        console.log("RESPONSE SONG ID: ", res.id);
       //notifySuccessFxn("File Uploaded successfully INTO TEMPORARY UPLOADS")
        return db.collection('temporaryUploads').doc(res.id).update({
          songId: res.id,
        })
    
      }).catch((err) => {
        console.error("Error registering media: ", err);
        var errorMessage = err.message;
        notifyErrorFxn(errorMessage);
        
      })

    }


 }
 else{
  let targetObject = (({ metadata,file, ...rest }) => rest)(songDetails);

   //IT'S NOT A MUSIC FILE, SO IT MUST BE COVER ART
  db.collection("temporaryUploads").add({
    ...targetObject, //we dont want to add the metadata of the cover art cuz, it's not good data
   coverArtUrl: url,
   
}).then((res)=>{
    console.log("RESPONSE SONG ID: ", res.id);
   // notifySuccessFxn("File Uploaded successfully")
    return db.collection('temporaryUploads').doc(res.id).update({
      songId: res.id,
    })

  }).catch((err) => {
    console.error("Error registering media: ", err);
    var errorMessage = err.message;
    notifyErrorFxn(errorMessage);
    
  })


 }


}
else{ /*THE SONG HAS BEEN ADDED BEFORE AND NOW WE WANNA ADD INSTRUMENTAL TO IT OR COVER ART */

  const document = querySnapshot.docs[0];
  console.log('VIEW THIS DOC HERE --->',document.data())
 // const songRef = doc.ref;
  var songRef = db.collection("temporaryUploads").doc(document.data().songId);


  let targetObject = (({ metadata, ...rest }) => rest)(songDetails);


  if(!file.isMusicFile/*it must be cover art since it's not a music file */ ){
     

    // Update the document with cover art
    await songRef.update({
     
     coverArtUrl:url
     }); 

  }
  else{
     // 3 conditions to account for:
    // 1st, if the file name has insrumental we update the instrumental URL and 
    //see how to manage the file2 being passed in 
if(file.name.includes("instrumental")){
    await songRef.update({
   
      instrumentalTemporaryUrl:url,
       instrumentalInformation:file

     }); 
    }
    //2nd if the file has mediaTemporaryUrl already, then we'll add it to the list of other files
   else if(document.data().mediaTemporaryUrl){

    const otherMusicArray = document.data().otherMusicFiles?document.data().otherMusicFiles:[]
   const exists = otherMusicArray.some(item => item.individualId === file.individualId);
   const nameFound = document.data().name === file.name?true:false;

    if(!exists && !nameFound ){
    await songRef.update({
     
       otherMusicFiles:[...otherMusicArray,{...file,mediaTemporaryUrl:url}]

     }); 
  }
}

    //3rd if the file doesnt have mediaTemporaryUrl(maybe it's instrumental that was added the first time round),
    // we will add it in and see how to manage the file2 being passed in 

else if(!document.data().mediaTemporaryUrl){
    await songRef.update({
      ...file,
      mediaTemporaryUrl:url,
 
     }); 
    }
  
  }

}

}






export const deletePlaylist = (playlistId,userId) => async (dispatch) => {
 
  try {
    await db.collection("playlists").doc(playlistId).delete()
    .then(()=>{
      notifySuccessFxn("Playlist deleted Successfully!")
      dispatch(fetchAllPlaylistsForOneUser(userId))
    });
    console.log(`Playlist with ID ${playlistId} deleted successfully!`);
  } catch (error) {
    console.error("Error deleting playlist: ", error);
    notifySuccessFxn("Error Deleting playlist, please try again.")
  }
}

export const deleteFileFromSong = (songId,individualId,fileToBeDeleted,musicFilesArray,songCreatorSongs) => async (dispatch) => {
 
  try {
    if(fileToBeDeleted === "mediaTemporaryUrl"){
    await db.collection("uploads").doc(songId).update({
      mediaTemporaryUrl:null,
      mediaUrl:null
    })
  }else if(fileToBeDeleted === "instrumentalTemporaryUrl"){
   
    await db.collection("uploads").doc(songId).update({
      instrumentalTemporaryUrl:null,
      instrumentalUrl:null,
      instrumentalInformation:{}
    })

  }else if(fileToBeDeleted === "coverArtUrl"){
    
    await db.collection("uploads").doc(songId).update({
      coverArtUrl:null,
      coverArtName:null
    })
  }else if(fileToBeDeleted === "otherMusicFiles"){
   
   const filteredOtherMusicFiles = musicFilesArray.filter((item)=>(item.individualId !== individualId))


    await db.collection("uploads").doc(songId).update({
      otherMusicFiles:filteredOtherMusicFiles
    })

  }
      
    
setTimeout(()=>{
  db.collection("uploads")
  .doc(songId)
   .get()
   .then((doc) => {
   
    
     if (doc.exists) {
      console.log("DOC DOES EXIST",doc.data())
      //dispatch(saveNewlyUploadedFullSong(doc.data()))
      //have to find a way to populate the updated song in songsCreatorSongs
      const updatedSongCreatorSongs = songCreatorSongs.map((item)=>(item.songId === songId ?doc.data():item))
      dispatch(saveSongCreatorSongs([
       ...updatedSongCreatorSongs
      ]))
    } else {
      console.log("Error getting document AFTER DELETING A FILE FROM IT:");
    }

 }).catch((error) => {
   console.log("Error getting document AFTER DELETING A FILE FROM IT:", error);
  
 })

  },1800) 


   
  } catch (error) {
    console.error("Error deleting file from song: ", error);
    //notifyErrorFxn("Error Deleting file, please try again.")
  }
}




export const deleteFileinTemporaryUploads = (uploadId,userId) => async (dispatch) => {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date();

  const uploadsRef = db.collection("temporaryUploads");
    const query = uploadsRef.where("uploadId", "==", uploadId);

    const querySnapshot = await query.get();

    if (querySnapshot.empty) {
      console.log("No matching documents found to delete.");
      return;
    }

    const batch = db.batch();

    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit()
    .then((res)=>{
    
   dispatch(fetchAllFilesForOneUser(userId))


  }).catch((err) => {
    console.error("Error deleting media/song: ", err);
    var errorMessage = err.message;
    notifyErrorFxn(errorMessage);
    
  })
}


export const deleteFileContentinTemporaryUploads = (uploadId,userId) => async (dispatch) => {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date();

  const uploadsRef = db.collection("temporaryUploads");
    const query = uploadsRef.where("uploadId", "==", uploadId);

    const querySnapshot = await query.get();

    if (querySnapshot.empty) {
      console.log("No matching documents found to delete.");
      return;
    }

    const batch = db.batch();

    querySnapshot.forEach((doc) => {
      batch.update(doc.ref,{

      });
    });

    await batch.commit()
    .then((res)=>{
    
  // dispatch(fetchAllFilesForOneUser(userId))


  }).catch((err) => {
    console.error("Error deleting media/song: ", err);
    var errorMessage = err.message;
    notifyErrorFxn(errorMessage);
    
  })
}



export const deleteMediaInUploads = (uploadId,handleClose) => async (dispatch) => {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date();

  const uploadsRef = db.collection("uploads");
    const query = uploadsRef.where("uploadId", "==", uploadId);

    const querySnapshot = await query.get();

    if (querySnapshot.empty) {
      console.log("No matching documents found to delete.");
      return;
    }

    const batch = db.batch();

    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit()
    .then((res)=>{
    
   // handleClose()
    notifySuccessFxn("Song Deleted successfully")
   
  

  }).catch((err) => {
    console.error("Error deleting media/song: ", err);
    var errorMessage = err.message;
    notifyErrorFxn(errorMessage);
    
  })
}






export const deleteCurrentSong = (setLoadingSubmit,songDetails, newlyUploadedFiles,newlyUploadedPlaylist,file,audioFile,files,handleClose,userId) => async (dispatch) => {
  
 
setLoadingSubmit(true)
   
  // Query the "uploads" collection to find the document with matching uploadId
  const uploadsRef = db.collection("uploads");
  const query = uploadsRef.where("uploadId", "==", songDetails.uploadId);

  try {
    const querySnapshot = await query.get();
   
    if (querySnapshot.empty) {
   //THIS CODE BLOCK MEANS WE HAVE AN ISSUE AS THE SONG DOES NOT EXIST IN THE DB
   console.error("No matching document found with uploadId, HENCE NOTHING TO DELETE in FIREBASE:", songDetails.uploadId);

    }

    else {

     
 if(songDetails &&  songDetails.coverArtUrl ) {

  
  //DELETING THE PICTURE IF THERE'S A FILE I.E USER UPLOADED A PICTURE

  const url = songDetails.coverArtUrl && songDetails.coverArtUrl;
  const fileKey = new URL(url).pathname.split('/').pop();
  console.log(fileKey); // Output: "new-farmer-onboarding-form-explanation.mp4"

  
  const s3 = new S3({
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
    region: process.env.REACT_APP_REGION,
  });
  
  
 const deleteFromS3 = async () => {
  /*NO ARGUMENT, I AM USING FILEKEY ABOVE */
  const params = {
   
    Bucket: process.env.REACT_APP_S3_BUCKET_2,
    Key: fileKey && fileKey,
    
   
  };
  try {
    const data = await s3.deleteObject(params).promise();
    console.log('COVER ART File deleted successfully:', data);
    return data; // Returns an empty object if the deletion is successful
  } catch (error) {
    console.error('Error deleting COVER ART file:', error);
    throw error; // Propagate the error for further handling
  }
}

  deleteFromS3()
  .then(async(url) => {
    console.log("WTH IS NEWLY UPLOADED PLAYLIST--->",newlyUploadedPlaylist)
    //UPDATE MEDIA HERE WITH NEW URL
 
    if(newlyUploadedPlaylist.length > 0){ 
    dispatch(
      saveNewlyUploadedPlaylist([
        ...newlyUploadedPlaylist.filter((obj) =>
          (obj.uploadId !== songDetails && songDetails.uploadId && songDetails.uploadId )
        )
      ])
      )
    }
   
    dispatch(
      saveNewlyUploadedFiles([
        ...newlyUploadedFiles.filter((obj) =>
          (obj.uploadId !== songDetails && songDetails.uploadId &&  songDetails.uploadId )
        )
      ])
    )


   
  

    // Query the "uploads" collection to find the document with matching uploadId
 
  
  dispatch(deleteMediaFile(songDetails,files,handleClose,newlyUploadedPlaylist,setLoadingSubmit,userId))
   
  }).catch((err)=>{
    notifyErrorFxn(`Error deleting file ${songDetails.name}, please try again`)
    console.log("error deleting  either S3 cover art or media file--->",err)
  });
  
  //END OF PICTURE LOGIC
}
  
  
 else { 

//NO COVER ART, JUST FIRST TIME DELETE
  dispatch(
   deleteMediaFile(songDetails,files,handleClose,newlyUploadedPlaylist,setLoadingSubmit,userId)
  );

 

  dispatch(
    saveNewlyUploadedFiles([
      ...newlyUploadedFiles.filter((obj) =>
        (obj.uploadId  !== songDetails.uploadId )
      )
    ])
  )

  if(newlyUploadedPlaylist.length > 0){ 
  dispatch(
  saveNewlyUploadedPlaylist([
    ...newlyUploadedPlaylist.filter((obj) =>
      (obj.uploadId  !== songDetails.uploadId )
    )
  ])
  )
  }

};
  

      return;
    }
    

   
  } catch (error) {
    console.error("Error reaching out to firebase to find song document: ", error);
   
  }



}




export const updateCurrentSong = (setLoadingSubmit,songDetails, newlyUploadedFiles,newlyUploadedPlaylist,file,audioFile,files,handleClose,userId) => async (dispatch) => {
 
  // Define required fields and their labels
  const requiredFields = {
    "Song BPM": songDetails?.metadata?.bpm,
    "Song Key": songDetails?.metadata?.key,
    "Artist Name": songDetails?.metadata?.artist,
    "Sounds Like": songDetails?.metadata?.similarSong,
    "Song Name": songDetails?.name,
    "Song Description": songDetails?.metadata?.description,
    "is the song unreleased?": songDetails?.metadata?.songUnreleased,
    "is song an instrumental?": songDetails?.metadata?.isInstrumental,
    "ISWC": songDetails?.metadata?.iswc,
    "Song Genre": songDetails?.metadata?.genre,
    "SongTempo": songDetails?.metadata?.tempo,
    "Song Instruments": songDetails?.metadata?.instruments,
    "Song Mood/Feel": songDetails?.metadata?.moodFeel,
    "Type of Track": songDetails?.metadata?.typeOfTrack
  };

  // Find missing fields
  const missingFields = Object.keys(requiredFields).filter(
    (key) => !requiredFields[key] || requiredFields[key] === ""
  );

  // If there are missing fields, notify the user
  if (missingFields.length > 0) {
    const errorMessage = `Please fill the following fields before submitting: \n ${missingFields.join("\n")}`;
    notifyErrorFxn(errorMessage);
    return; // Stop function execution
  }

  //AS OF JAN 14 2024 - UPDATE CURRENT SONG SERVES FOR BOTH INITIAL UPLOAD AND SUBSEQUENT UPDATES 
setLoadingSubmit(true)
console.log("NEWLY UPLOADED PLAYLIST LENGTH IS --->",newlyUploadedPlaylist)
  // Query the "uploads" collection to find the document with matching uploadId
  const uploadsRef = db.collection("uploads");
  const query = uploadsRef.where("uploadId", "==", songDetails.uploadId);

  try {
    const querySnapshot = await query.get();

  //THE IF STATEMENT ABOVE DOES NOT EVER GET HIT! TAKE NOTE

       //DELETING THE SONG FROM THE TEMPORARY S3 BUCKET

  const url = songDetails.mediaTemporaryUrl && songDetails.mediaTemporaryUrl;
  const fileKey = songDetails.mediaTemporaryUrl && new URL(url).pathname.split('/').pop();
 

  
  const s3 = new S3({
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
    region: process.env.REACT_APP_REGION,
  });
  
  
 const deleteFromS3 = async () => {
  /*NO ARGUMENT, I AM USING FILEKEY ABOVE */
  const params = {
    Bucket: process.env.REACT_APP_S3_BUCKET_3,
    Key: fileKey && fileKey,
    
  };
  try {
    const data = await s3.deleteObject(params).promise();
    console.log('COVER ART File deleted successfully:', data);
    return data; // Returns an empty object if the deletion is successful
  } catch (error) {
    console.error('Error deleting COVER ART file:', error);
    throw error; // Propagate the error for further handling
  }
}

  if(url){
    
    /*deleteFromS3().then(async()=>{*/ /*NO NEED TO DELETE FROM S3 AT THE START OF THE FUNCTION. I LEFT 
    THIS DELETE FROM FIREBASE AT THE START OF THE FUNCTION BECAUSE I THINK WE CAN GET AWAY WITH IT FOR NOW -DAGOGO FEB-12 2025 */


    console.log("MEDIA TEMPORARY URL ABOUT TO BE DELETED--->",songDetails.uploadId)
    /* DELETING THE ENTRIES FOR TEMPORARY FILES*/
  const uploadsRef2 = db.collection("temporaryUploads")
  const query2 = uploadsRef2.where("mediaTemporaryUrl", "==", songDetails.mediaTemporaryUrl);

  const querySnapshot2 = await query2.get();


  const batch2 = db.batch();

  querySnapshot2.forEach((doc) => {
    batch2.delete(doc.ref);
  });

  /*THIS NEEDS TO BE HERE AS IT DOESN'T ACTIVATE BELOW */
  dispatch(
    saveNewlyUploadedFiles([
      ...newlyUploadedFiles.filter((obj) =>
        (obj.individualId !== songDetails.individualId)
      )
    ])
  )
 // dispatch(fetchAllSongs())
/*THIS NEEDS TO BE HERE AS IT DOESN'T ACTIVATE BELOW -END */


  await batch2.commit()
  
  /* DELETING THE ENTRIES FOR TEMPORARY FILES --- END*/


 /* })*/

  }

  //THIS CODE BLOCK MEANS WE HAVE ACTUALLY UPLOADED THIS SONG BEFORE , AND NOW WE ARE STRICTLY UPDATING
  console.log("CURRENT PICTURE IS --->",file)

 if(file && file.file instanceof File) {

  
  //UPDATING THE PICTURE IF THERE'S A FILE I.E USER UPLOADED A PICTURE
  //NOTE THAT  WHEN WE UPDATE THE COVER ART URL, IN S3 WE NEVER ACTUALLY DELETE THE OLD COVER ART, WE JUST ADD A NEW ONE -- ATTEND TO THIS LATER
  
  const s3 = new S3({
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
    region: process.env.REACT_APP_REGION,
  });
  
  
 const uploadToS3 = async (file) => {
  const params = {
    Body:file && file.file,
    Bucket: process.env.REACT_APP_S3_BUCKET_2,
    Key: file && file.name,
    
   
  };
  const data = await s3.upload(params).promise();
  return data.Location; // Returns the file URL
}

  uploadToS3(file)
  .then(async(url) => {
    console.log('MEDIA URL IS NOW-->: ', url);
    //UPDATE MEDIA HERE WITH NEW URL 

      
  if(!songDetails.mediaUrl){
    //THIS CODE BLOCK MEANS WE ARE UPLOADING THIS SONG INTO PERMANENCE, FROM THE TEMPORARY STATUS, FOR THE FIRST TIME EVER
    console.error("No matching document found with uploadId, HENCE WE START FRESH UPLOAD:", songDetails.uploadId);
    

if(file && file.file instanceof File) {

console.log("CURRENT PICTURE IS LOOK HERE--->",file)
//UPDATING THE PICTURE IF THERE'S A FILE I.E USER UPLOADED A PICTURE

const s3 = new S3({
  accessKeyId: process.env.REACT_APP_ACCESSKEYID,
  secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
  region: process.env.REACT_APP_REGION,
});


const uploadToS3 = async (file) => {
const params = {
  Body:file && file.file,
  Bucket: process.env.REACT_APP_S3_BUCKET_2,
  Key: file && file.name,
  
 
};
const data = await s3.upload(params).promise();
return data.Location; // Returns the file URL
}

uploadToS3(file)
.then(async(url) => {

  console.log('MEDIA URL IS NOW-->: ', url);
  //UPDATE MEDIA HERE WITH NEW URL
 
  //WE REMOVE FROM NEWLY UPLOADED FILES SINCE WE ARE MOVING IT FROM TEMPORARY TO PERMANENCE, AS  NEWLY UPLOADED FILES IS TEMPORARY
  dispatch(
    saveNewlyUploadedFiles([
      ...newlyUploadedFiles.filter((obj) =>
        (obj.uploadId !== songDetails.uploadId)
      )
    ])
  )

// NO NEED TO UPDATE PLAYLIST IF UPLOADING TO PERMANENCE THE FIRST TIME
//  if(newlyUploadedPlaylist.length > 0){ 
//  dispatch(
//  saveNewlyUploadedPlaylist([
//    ...newlyUploadedPlaylist.map((obj) =>
//      obj.uploadId === songDetails.uploadId ? {...songDetails,coverArtUrl:url} : obj
//    ),
//  ])
//  )
// }

  // Query the "uploads" collection to find the document with matching uploadId
const uploadsRef = db.collection("uploads");
//const query = uploadsRef.where("uploadId", "==", songDetails.uploadId);
 console.log("RIGHT B4 WE UPLOAD MEDIA FILES I.E SONGS--->",songDetails)

dispatch(uploadMediaFile({...songDetails,coverArtUrl:url},files,handleClose,newlyUploadedPlaylist,setLoadingSubmit,userId))
 
}).catch((err)=>{
  notifyErrorFxn(`Error uploading file ${songDetails.name}, please try again`)
  console.log("error uploading to either S3 cover art or media file--->",err)
});

//END OF PICTURE LOGIC



}


else { 

//NO COVER ART, JUST FIRST TIME UPLOAD
dispatch(
 uploadMediaFile({...songDetails,coverArtUrl:url},files,handleClose,newlyUploadedPlaylist,setLoadingSubmit,userId)
);

};


    return;
//THIS CODE BLOCK MEANS WE ARE UPLOADING THIS SONG INTO PERMANENCE, FROM THE TEMPORARY STATUS, FOR THE FIRST TIME EVER - END
   }    

else{
     //THIS CODEBLOCK MEANS THERE IS A .MEDIAURL PROPERTY IN THE CODE AND  WE ARE JUST DOING A REGULAR UPDATE!
     dispatch(
       saveNewlyUploadedFiles([ //when doing an update not a fresh add, this "saveNewlyUploadedFiles has no real effect on the code, I am just leaving it here in case of the future -- Dagogo - feb 12 2025"
         ...newlyUploadedFiles.map((obj) =>
           obj.uploadId === songDetails.uploadId ? {...songDetails,coverArtUrl:url} : obj
         ),
       ])
     )
   
  //   if(newlyUploadedPlaylist.length > 0){ 
  //   dispatch(
  //     saveNewlyUploadedPlaylist([
  //       ...newlyUploadedPlaylist.map((obj) =>
  //         obj.uploadId === songDetails.uploadId ? {...songDetails,coverArtUrl:url} : obj
  //       ),
  //     ])
  //     )
  //   }
   
     //console.log("SONG DETAILS IS -->", songDetails.songId);
   
     // Query the "uploads" collection to find the document with matching uploadId
     const uploadsRef = db.collection("uploads");
     const query = uploadsRef.where("uploadId", "==", songDetails.uploadId);
   
     try {
       const querySnapshot = await query.get();
   
       if (querySnapshot.empty) {
         console.error("No matching document found with uploadId:", songDetails.uploadId);
         notifyErrorFxn("No matching song found.❌");
         return;
       }
   
       // Assuming there's only one document with the matching uploadId
       const document = querySnapshot.docs[0];
       console.log('VIEW THIS DOC HERE --->',document.data())
      // const songRef = doc.ref;
       var songRef = db.collection("uploads").doc(document.data().songId);
     
     
       let targetObject = (({ file, ...rest }) => rest)(songDetails);
   
       // Update the document
       await songRef.update({
         ...targetObject,
         coverArtUrl:url,
         songId:document.data().songId
       });
   
       
       dispatch(fetchAllSongsForOneUser(userId))
       setLoadingSubmit(false)
       handleClose()
       notifySuccessFxn("Song has been updated.✔");
       dispatch(saveCurrentSongUploadId(null))  
     } catch (error) {
       console.error("Error updating song document: ", error);
       notifyErrorFxn("Error updating song.❌, please try again!");
     }
  //THIS CODEBLOCK MEANS THERE IS A .MEDIAURL PROPERTY IN THE CODE AND  WE ARE JUST DOING A REGULAR UPDATE -- END!
}
   
       ////OLD UPDATING WHEN THERE'S A PICTURE - START
       //
       //    dispatch(
       //      saveNewlyUploadedFiles([
       //        ...newlyUploadedFiles.map((obj) =>
       //          obj.uploadId === songDetails.uploadId ? {...songDetails,coverArtUrl:url} : obj
       //        ),
       //      ])
       //    )
       //
       //    if(newlyUploadedPlaylist.length > 0){ 
       //    dispatch(
       //      saveNewlyUploadedPlaylist([
       //        ...newlyUploadedPlaylist.map((obj) =>
       //          obj.uploadId === songDetails.uploadId ? {...songDetails,coverArtUrl:url} : obj
       //        ),
       //      ])
       //      )
       //    }
       //
       //
       //    // Query the "uploads" collection to find the document with matching uploadId
       //  const uploadsRef = db.collection("uploads");
       //  const query = uploadsRef.where("uploadId", "==", songDetails.uploadId);
       //
       //  try {
       //    const querySnapshot = await query.get();
       //
       //    if (querySnapshot.empty) {
       //      console.error("No matching document found with uploadId:", songDetails.uploadId);
       //      notifyErrorFxn("No matching song found.❌");
       //      return;
       //    }
       //
       //    // Assuming there's only one document with the matching uploadId
       //    const document = querySnapshot.docs[0];
       //    console.log('VIEW THIS DOC HERE --->',document.data())
       //   // const songRef = doc.ref;
       //    var songRef = db.collection("uploads").doc(document.data().songId);
       //
       //
       //    let targetObject = (({ file, ...rest }) => rest)(songDetails);
       //    console.log("TRYING TO UPLOAD FULL META DATA, AND IT IS --->",targetObject)
       //
       //    // Update the document
       //    await songRef.update({
       //      ...targetObject,
       //      coverArtUrl:url,
       //      songId:document.data().songId
       //    });
       //    setLoadingSubmit(false)
       //    dispatch(fetchAllSongs())
       //    handleClose()
       //    notifySuccessFxn("Song has been updated.✔");
       //    
       //  } catch (error) {
       //    console.error("Error updating song document: ", error);
       //    notifyErrorFxn("Error updating song.❌, please try again!");
       //  }
       //
       //  //OLD UPDATING WHEN THERE'S A PICTURE --END

   
  }).catch((err)=>{
    notifyErrorFxn(`Error uploading file ${file.name}, please try again`)
    console.log("error uploading to S3--->",err)
  });
  
  //END OF PICTURE LOGIC
}
  
  
 else { 

  if(!songDetails.mediaUrl){
      //THIS CODE BLOCK MEANS WE ARE UPLOADING THIS SONG INTO PERMANENCE, FROM THE TEMPORARY STATUS, FOR THE FIRST TIME EVER
      console.error("No matching document found with uploadId, HENCE WE START FRESH UPLOAD:", songDetails.uploadId);
      

 if(file && file.file instanceof File) {

  console.log("CURRENT PICTURE IS LOOK HERE--->",file)
  //UPDATING THE PICTURE IF THERE'S A FILE I.E USER UPLOADED A PICTURE
  
  const s3 = new S3({
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
    region: process.env.REACT_APP_REGION,
  });
  
  
 const uploadToS3 = async (file) => {
  const params = {
    Body:file && file.file,
    Bucket: process.env.REACT_APP_S3_BUCKET_2,
    Key: file && file.name,
    
   
  };
  const data = await s3.upload(params).promise();
  return data.Location; // Returns the file URL
}

  uploadToS3(file)
  .then(async(url) => {

    console.log('MEDIA URL IS NOW-->: ', url);
    //UPDATE MEDIA HERE WITH NEW URL
   
    //WE REMOVE FROM NEWLY UPLOADED FILES SINCE WE ARE MOVING IT FROM TEMPORARY TO PERMANENCE, AS  NEWLY UPLOADED FILES IS TEMPORARY
    dispatch(
      saveNewlyUploadedFiles([
        ...newlyUploadedFiles.filter((obj) =>
          (obj.uploadId !== songDetails.uploadId)
        )
      ])
    )

  // NO NEED TO UPDATE PLAYLIST IF UPLOADING TO PERMANENCE THE FIRST TIME
  //  if(newlyUploadedPlaylist.length > 0){ 
  //  dispatch(
  //  saveNewlyUploadedPlaylist([
  //    ...newlyUploadedPlaylist.map((obj) =>
  //      obj.uploadId === songDetails.uploadId ? {...songDetails,coverArtUrl:url} : obj
  //    ),
  //  ])
  //  )
  // }

    // Query the "uploads" collection to find the document with matching uploadId
  const uploadsRef = db.collection("uploads");
  const query = uploadsRef.where("uploadId", "==", songDetails.uploadId);
   console.log("RIGHT B4 WE UPLOAD MEDIA FILES I.E SONGS--->",songDetails)
  
  dispatch(uploadMediaFile({...songDetails,coverArtUrl:url},files,handleClose,newlyUploadedPlaylist,setLoadingSubmit,userId))
   
  }).catch((err)=>{
    notifyErrorFxn(`Error uploading file ${songDetails.name}, please try again`)
    console.log("error uploading to either S3 cover art or media file--->",err)
  });
  
  //END OF PICTURE LOGIC



}
  
  
 else { 

//NO COVER ART, JUST FIRST TIME UPLOAD
  dispatch(
   uploadMediaFile(songDetails,files,handleClose,newlyUploadedPlaylist,setLoadingSubmit,userId)
  );

};
  

      return;
//THIS CODE BLOCK MEANS WE ARE UPLOADING THIS SONG INTO PERMANENCE, FROM THE TEMPORARY STATUS, FOR THE FIRST TIME EVER - END
     }    
  
 else{
       //THIS CODEBLOCK MEANS THERE IS A .MEDIAURL PROPERTY IN THE CODE AND  WE ARE JUST DOING A REGULAR UPDATE!
       dispatch(
         saveNewlyUploadedFiles([
           ...newlyUploadedFiles.map((obj) =>
             obj.uploadId === songDetails.uploadId ? songDetails : obj
           ),
         ])
       )
     
     //  if(newlyUploadedPlaylist.length > 0){ 
     //  dispatch(
     //    saveNewlyUploadedPlaylist([
     //      ...newlyUploadedPlaylist.map((obj) =>
     //        obj.uploadId === songDetails.uploadId ? songDetails : obj
     //      ),
     //    ])
     //    )
     //  }
     
       //console.log("SONG DETAILS IS -->", songDetails.songId);
     
       // Query the "uploads" collection to find the document with matching uploadId
       const uploadsRef = db.collection("uploads");
       const query = uploadsRef.where("uploadId", "==", songDetails.uploadId);
     
       try {
         const querySnapshot = await query.get();
     
         if (querySnapshot.empty) {
           console.error("No matching document found with uploadId:", songDetails.uploadId);
           notifyErrorFxn("No matching song found.❌");
           return;
         }
     
         // Assuming there's only one document with the matching uploadId
         const document = querySnapshot.docs[0];
         console.log('VIEW THIS DOC HERE --->',document.data())
        // const songRef = doc.ref;
         var songRef = db.collection("uploads").doc(document.data().songId);
       
       
         let targetObject = (({ file, ...rest }) => rest)(songDetails);
     
         // Update the document
         await songRef.update({
           ...targetObject,
           songId:document.data().songId
         });
     
         
         dispatch(fetchAllSongsForOneUser(userId))
         setLoadingSubmit(false)
         handleClose()
         notifySuccessFxn("Song has been updated.✔");
         dispatch(saveCurrentSongUploadId(null))  
       } catch (error) {
         console.error("Error updating song document: ", error);
         notifyErrorFxn("Error updating song.❌, please try again!");
       }
    //THIS CODEBLOCK MEANS THERE IS A .MEDIAURL PROPERTY IN THE CODE AND  WE ARE JUST DOING A REGULAR UPDATE -- END!
 }

};

 

    

   
  } catch (error) {
    console.error("Error reaching out to firebase to find song document: ", error);
   
  }

}





export const updateCurrentSongWithoutChecks = (setLoadingSubmit,songDetails, newlyUploadedFiles,newlyUploadedPlaylist,file,audioFile,files,handleClose,userId) => async (dispatch) => {
 



  //AS OF JAN 14 2024 - UPDATE CURRENT SONG SERVES FOR BOTH INITIAL UPLOAD AND SUBSEQUENT UPDATES 
setLoadingSubmit(true)
console.log("NEWLY UPLOADED PLAYLIST LENGTH IS --->",newlyUploadedPlaylist)
  // Query the "uploads" collection to find the document with matching uploadId
  const uploadsRef = db.collection("uploads");
  const query = uploadsRef.where("uploadId", "==", songDetails.uploadId);

  try {
    const querySnapshot = await query.get();

  //THE IF STATEMENT ABOVE DOES NOT EVER GET HIT! TAKE NOTE

       //DELETING THE SONG FROM THE TEMPORARY S3 BUCKET

  const url = songDetails.mediaTemporaryUrl && songDetails.mediaTemporaryUrl;
  const fileKey = songDetails.mediaTemporaryUrl && new URL(url).pathname.split('/').pop();
 

  
  const s3 = new S3({
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
    region: process.env.REACT_APP_REGION,
  });
  
  
 const deleteFromS3 = async () => {
  /*NO ARGUMENT, I AM USING FILEKEY ABOVE */
  const params = {
    Bucket: process.env.REACT_APP_S3_BUCKET_3,
    Key: fileKey && fileKey,
    
  };
  try {
    const data = await s3.deleteObject(params).promise();
    console.log('COVER ART File deleted successfully:', data);
    return data; // Returns an empty object if the deletion is successful
  } catch (error) {
    console.error('Error deleting COVER ART file:', error);
    throw error; // Propagate the error for further handling
  }
}

  if(url){
    
    /*deleteFromS3().then(async()=>{*/ /*NO NEED TO DELETE FROM S3 AT THE START OF THE FUNCTION. I LEFT 
    THIS DELETE FROM FIREBASE AT THE START OF THE FUNCTION BECAUSE I THINK WE CAN GET AWAY WITH IT FOR NOW -DAGOGO FEB-12 2025 */


    console.log("MEDIA TEMPORARY URL ABOUT TO BE DELETED--->",songDetails.uploadId)
    /* DELETING THE ENTRIES FOR TEMPORARY FILES*/
  const uploadsRef2 = db.collection("temporaryUploads")
  const query2 = uploadsRef2.where("mediaTemporaryUrl", "==", songDetails.mediaTemporaryUrl);

  const querySnapshot2 = await query2.get();


  const batch2 = db.batch();

  querySnapshot2.forEach((doc) => {
    batch2.delete(doc.ref);
  });

  /*THIS NEEDS TO BE HERE AS IT DOESN'T ACTIVATE BELOW */
  dispatch(
    saveNewlyUploadedFiles([
      ...newlyUploadedFiles.filter((obj) =>
        (obj.individualId !== songDetails.individualId)
      )
    ])
  )
 // dispatch(fetchAllSongs())
/*THIS NEEDS TO BE HERE AS IT DOESN'T ACTIVATE BELOW -END */


  await batch2.commit()
  
  /* DELETING THE ENTRIES FOR TEMPORARY FILES --- END*/


 /* })*/

  }

  //THIS CODE BLOCK MEANS WE HAVE ACTUALLY UPLOADED THIS SONG BEFORE , AND NOW WE ARE STRICTLY UPDATING
  console.log("CURRENT PICTURE IS --->",file)

 if(file && file.file instanceof File) {

  
  //UPDATING THE PICTURE IF THERE'S A FILE I.E USER UPLOADED A PICTURE
  //NOTE THAT  WHEN WE UPDATE THE COVER ART URL, IN S3 WE NEVER ACTUALLY DELETE THE OLD COVER ART, WE JUST ADD A NEW ONE -- ATTEND TO THIS LATER
  
  const s3 = new S3({
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
    region: process.env.REACT_APP_REGION,
  });
  
  
 const uploadToS3 = async (file) => {
  const params = {
    Body:file && file.file,
    Bucket: process.env.REACT_APP_S3_BUCKET_2,
    Key: file && file.name,
    
   
  };
  const data = await s3.upload(params).promise();
  return data.Location; // Returns the file URL
}

  uploadToS3(file)
  .then(async(url) => {
    console.log('MEDIA URL IS NOW-->: ', url);
    //UPDATE MEDIA HERE WITH NEW URL 

      
  if(!songDetails.mediaUrl){
    //THIS CODE BLOCK MEANS WE ARE UPLOADING THIS SONG INTO PERMANENCE, FROM THE TEMPORARY STATUS, FOR THE FIRST TIME EVER
    console.error("No matching document found with uploadId, HENCE WE START FRESH UPLOAD:", songDetails.uploadId);
    

if(file && file.file instanceof File) {

console.log("CURRENT PICTURE IS LOOK HERE--->",file)
//UPDATING THE PICTURE IF THERE'S A FILE I.E USER UPLOADED A PICTURE

const s3 = new S3({
  accessKeyId: process.env.REACT_APP_ACCESSKEYID,
  secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
  region: process.env.REACT_APP_REGION,
});


const uploadToS3 = async (file) => {
const params = {
  Body:file && file.file,
  Bucket: process.env.REACT_APP_S3_BUCKET_2,
  Key: file && file.name,
  
 
};
const data = await s3.upload(params).promise();
return data.Location; // Returns the file URL
}

uploadToS3(file)
.then(async(url) => {

  console.log('MEDIA URL IS NOW-->: ', url);
  //UPDATE MEDIA HERE WITH NEW URL
 
  //WE REMOVE FROM NEWLY UPLOADED FILES SINCE WE ARE MOVING IT FROM TEMPORARY TO PERMANENCE, AS  NEWLY UPLOADED FILES IS TEMPORARY
  dispatch(
    saveNewlyUploadedFiles([
      ...newlyUploadedFiles.filter((obj) =>
        (obj.uploadId !== songDetails.uploadId)
      )
    ])
  )

// NO NEED TO UPDATE PLAYLIST IF UPLOADING TO PERMANENCE THE FIRST TIME
//  if(newlyUploadedPlaylist.length > 0){ 
//  dispatch(
//  saveNewlyUploadedPlaylist([
//    ...newlyUploadedPlaylist.map((obj) =>
//      obj.uploadId === songDetails.uploadId ? {...songDetails,coverArtUrl:url} : obj
//    ),
//  ])
//  )
// }

  // Query the "uploads" collection to find the document with matching uploadId
const uploadsRef = db.collection("uploads");
//const query = uploadsRef.where("uploadId", "==", songDetails.uploadId);
 console.log("RIGHT B4 WE UPLOAD MEDIA FILES I.E SONGS--->",songDetails)

dispatch(uploadMediaFile({...songDetails,coverArtUrl:url},files,handleClose,newlyUploadedPlaylist,setLoadingSubmit,userId))
 
}).catch((err)=>{
  notifyErrorFxn(`Error uploading file ${songDetails.name}, please try again`)
  console.log("error uploading to either S3 cover art or media file--->",err)
});

//END OF PICTURE LOGIC



}


else { 

//NO COVER ART, JUST FIRST TIME UPLOAD
dispatch(
 uploadMediaFile({...songDetails,coverArtUrl:url},files,handleClose,newlyUploadedPlaylist,setLoadingSubmit,userId)
);

};


    return;
//THIS CODE BLOCK MEANS WE ARE UPLOADING THIS SONG INTO PERMANENCE, FROM THE TEMPORARY STATUS, FOR THE FIRST TIME EVER - END
   }    

else{
     //THIS CODEBLOCK MEANS THERE IS A .MEDIAURL PROPERTY IN THE CODE AND  WE ARE JUST DOING A REGULAR UPDATE!
     dispatch(
       saveNewlyUploadedFiles([ //when doing an update not a fresh add, this "saveNewlyUploadedFiles has no real effect on the code, I am just leaving it here in case of the future -- Dagogo - feb 12 2025"
         ...newlyUploadedFiles.map((obj) =>
           obj.uploadId === songDetails.uploadId ? {...songDetails,coverArtUrl:url} : obj
         ),
       ])
     )
   
   //  if(newlyUploadedPlaylist.length > 0){ 
   //  dispatch(
   //    saveNewlyUploadedPlaylist([
   //      ...newlyUploadedPlaylist.map((obj) =>
   //        obj.uploadId === songDetails.uploadId ? {...songDetails,coverArtUrl:url} : obj
   //      ),
   //    ])
   //    )
   //  }
   
     //console.log("SONG DETAILS IS -->", songDetails.songId);
   
     // Query the "uploads" collection to find the document with matching uploadId
     const uploadsRef = db.collection("uploads");
     const query = uploadsRef.where("uploadId", "==", songDetails.uploadId);
   
     try {
       const querySnapshot = await query.get();
   
       if (querySnapshot.empty) {
         console.error("No matching document found with uploadId:", songDetails.uploadId);
         notifyErrorFxn("No matching song found.❌");
         return;
       }
   
       // Assuming there's only one document with the matching uploadId
       const document = querySnapshot.docs[0];
       console.log('VIEW THIS DOC HERE --->',document.data())
      // const songRef = doc.ref;
       var songRef = db.collection("uploads").doc(document.data().songId);
     
     
       let targetObject = (({ file, ...rest }) => rest)(songDetails);
   
       // Update the document
       await songRef.update({
         ...targetObject,
         coverArtUrl:url,
         songId:document.data().songId
       });
   
       
       dispatch(fetchAllSongsForOneUser(userId))
       setLoadingSubmit(false)
       handleClose()
       notifySuccessFxn("Song has been updated.✔");
       dispatch(saveCurrentSongUploadId(null))  
     } catch (error) {
       console.error("Error updating song document: ", error);
       notifyErrorFxn("Error updating song.❌, please try again!");
     }
  //THIS CODEBLOCK MEANS THERE IS A .MEDIAURL PROPERTY IN THE CODE AND  WE ARE JUST DOING A REGULAR UPDATE -- END!
}
   
       ////OLD UPDATING WHEN THERE'S A PICTURE - START
       //
       //    dispatch(
       //      saveNewlyUploadedFiles([
       //        ...newlyUploadedFiles.map((obj) =>
       //          obj.uploadId === songDetails.uploadId ? {...songDetails,coverArtUrl:url} : obj
       //        ),
       //      ])
       //    )
       //
       //    if(newlyUploadedPlaylist.length > 0){ 
       //    dispatch(
       //      saveNewlyUploadedPlaylist([
       //        ...newlyUploadedPlaylist.map((obj) =>
       //          obj.uploadId === songDetails.uploadId ? {...songDetails,coverArtUrl:url} : obj
       //        ),
       //      ])
       //      )
       //    }
       //
       //
       //    // Query the "uploads" collection to find the document with matching uploadId
       //  const uploadsRef = db.collection("uploads");
       //  const query = uploadsRef.where("uploadId", "==", songDetails.uploadId);
       //
       //  try {
       //    const querySnapshot = await query.get();
       //
       //    if (querySnapshot.empty) {
       //      console.error("No matching document found with uploadId:", songDetails.uploadId);
       //      notifyErrorFxn("No matching song found.❌");
       //      return;
       //    }
       //
       //    // Assuming there's only one document with the matching uploadId
       //    const document = querySnapshot.docs[0];
       //    console.log('VIEW THIS DOC HERE --->',document.data())
       //   // const songRef = doc.ref;
       //    var songRef = db.collection("uploads").doc(document.data().songId);
       //
       //
       //    let targetObject = (({ file, ...rest }) => rest)(songDetails);
       //    console.log("TRYING TO UPLOAD FULL META DATA, AND IT IS --->",targetObject)
       //
       //    // Update the document
       //    await songRef.update({
       //      ...targetObject,
       //      coverArtUrl:url,
       //      songId:document.data().songId
       //    });
       //    setLoadingSubmit(false)
       //    dispatch(fetchAllSongs())
       //    handleClose()
       //    notifySuccessFxn("Song has been updated.✔");
       //    
       //  } catch (error) {
       //    console.error("Error updating song document: ", error);
       //    notifyErrorFxn("Error updating song.❌, please try again!");
       //  }
       //
       //  //OLD UPDATING WHEN THERE'S A PICTURE --END

   
  }).catch((err)=>{
    notifyErrorFxn(`Error uploading file ${file.name}, please try again`)
    console.log("error uploading to S3--->",err)
  });
  
  //END OF PICTURE LOGIC
}
  
  
 else { 

  if(!songDetails.mediaUrl){
      //THIS CODE BLOCK MEANS WE ARE UPLOADING THIS SONG INTO PERMANENCE, FROM THE TEMPORARY STATUS, FOR THE FIRST TIME EVER
      console.error("No matching document found with uploadId, HENCE WE START FRESH UPLOAD:", songDetails.uploadId);
      

 if(file && file.file instanceof File) {

  console.log("CURRENT PICTURE IS LOOK HERE--->",file)
  //UPDATING THE PICTURE IF THERE'S A FILE I.E USER UPLOADED A PICTURE
  
  const s3 = new S3({
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
    region: process.env.REACT_APP_REGION,
  });
  
  
 const uploadToS3 = async (file) => {
  const params = {
    Body:file && file.file,
    Bucket: process.env.REACT_APP_S3_BUCKET_2,
    Key: file && file.name,
    
   
  };
  const data = await s3.upload(params).promise();
  return data.Location; // Returns the file URL
}

  uploadToS3(file)
  .then(async(url) => {

    console.log('MEDIA URL IS NOW-->: ', url);
    //UPDATE MEDIA HERE WITH NEW URL
   
    //WE REMOVE FROM NEWLY UPLOADED FILES SINCE WE ARE MOVING IT FROM TEMPORARY TO PERMANENCE, AS  NEWLY UPLOADED FILES IS TEMPORARY
    dispatch(
      saveNewlyUploadedFiles([
        ...newlyUploadedFiles.filter((obj) =>
          (obj.uploadId !== songDetails.uploadId)
        )
      ])
    )

  // NO NEED TO UPDATE PLAYLIST IF UPLOADING TO PERMANENCE THE FIRST TIME
  //  if(newlyUploadedPlaylist.length > 0){ 
  //  dispatch(
  //  saveNewlyUploadedPlaylist([
  //    ...newlyUploadedPlaylist.map((obj) =>
  //      obj.uploadId === songDetails.uploadId ? {...songDetails,coverArtUrl:url} : obj
  //    ),
  //  ])
  //  )
  // }

    // Query the "uploads" collection to find the document with matching uploadId
  const uploadsRef = db.collection("uploads");
  const query = uploadsRef.where("uploadId", "==", songDetails.uploadId);
   console.log("RIGHT B4 WE UPLOAD MEDIA FILES I.E SONGS--->",songDetails)
  
  dispatch(uploadMediaFile({...songDetails,coverArtUrl:url},files,handleClose,newlyUploadedPlaylist,setLoadingSubmit,userId))
   
  }).catch((err)=>{
    notifyErrorFxn(`Error uploading file ${songDetails.name}, please try again`)
    console.log("error uploading to either S3 cover art or media file--->",err)
  });
  
  //END OF PICTURE LOGIC



}
  
  
 else { 

//NO COVER ART, JUST FIRST TIME UPLOAD
  dispatch(
   uploadMediaFile(songDetails,files,handleClose,newlyUploadedPlaylist,setLoadingSubmit,userId)
  );

};
  

      return;
//THIS CODE BLOCK MEANS WE ARE UPLOADING THIS SONG INTO PERMANENCE, FROM THE TEMPORARY STATUS, FOR THE FIRST TIME EVER - END
     }    
  
 else{
       //THIS CODEBLOCK MEANS THERE IS A .MEDIAURL PROPERTY IN THE CODE AND  WE ARE JUST DOING A REGULAR UPDATE!
       dispatch(
         saveNewlyUploadedFiles([
           ...newlyUploadedFiles.map((obj) =>
             obj.uploadId === songDetails.uploadId ? songDetails : obj
           ),
         ])
       )
     
    //   if(newlyUploadedPlaylist.length > 0){ 
    //   dispatch(
    //     saveNewlyUploadedPlaylist([
    //       ...newlyUploadedPlaylist.map((obj) =>
    //         obj.uploadId === songDetails.uploadId ? songDetails : obj
    //       ),
    //     ])
    //     )
    //   }
     
       //console.log("SONG DETAILS IS -->", songDetails.songId);
     
       // Query the "uploads" collection to find the document with matching uploadId
       const uploadsRef = db.collection("uploads");
       const query = uploadsRef.where("uploadId", "==", songDetails.uploadId);
     
       try {
         const querySnapshot = await query.get();
     
         if (querySnapshot.empty) {
           console.error("No matching document found with uploadId:", songDetails.uploadId);
           notifyErrorFxn("No matching song found.❌");
           return;
         }
     
         // Assuming there's only one document with the matching uploadId
         const document = querySnapshot.docs[0];
         console.log('VIEW THIS DOC HERE --->',document.data())
        // const songRef = doc.ref;
         var songRef = db.collection("uploads").doc(document.data().songId);
       
       
         let targetObject = (({ file, ...rest }) => rest)(songDetails);
     
         // Update the document
         await songRef.update({
           ...targetObject,
           songId:document.data().songId
         });
     
         
         dispatch(fetchAllSongsForOneUser(userId))
         setLoadingSubmit(false)
         handleClose()
         notifySuccessFxn("Song has been updated.✔");
         dispatch(saveCurrentSongUploadId(null))  
       } catch (error) {
         console.error("Error updating song document: ", error);
         notifyErrorFxn("Error updating song.❌, please try again!");
       }
    //THIS CODEBLOCK MEANS THERE IS A .MEDIAURL PROPERTY IN THE CODE AND  WE ARE JUST DOING A REGULAR UPDATE -- END!
 }

};

 

    

   
  } catch (error) {
    console.error("Error reaching out to firebase to find song document: ", error);
   
  }

}






export const updateCurrentCollaboratorWithoutChecks = (setLoadingSubmit,currentCollaborator,file,handleClose) => async (dispatch) => {
 

console.log("FILE in updateCurrentCollaboratorWithoutChecks is --->",file)

  //AS OF MAY 21 2025 - UPDATE CURRENT SONG SERVES FOR BOTH INITIAL UPLOAD AND SUBSEQUENT UPDATES 
setLoadingSubmit(true)


  try {
   

 


  
  const s3 = new S3({
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
    region: process.env.REACT_APP_REGION,
  });



  //THIS CODE BLOCK MEANS WE HAVE ACTUALLY UPLOADED THIS SONG BEFORE , AND NOW WE ARE STRICTLY UPDATING
  console.log("CURRENT PICTURE IS --->",file)

 if(file && file.file instanceof File) {

  
  //UPDATING THE PICTURE IF THERE'S A FILE I.E USER UPLOADED A PICTURE
  //NOTE THAT  WHEN WE UPDATE THE COVER ART URL, IN S3 WE NEVER ACTUALLY DELETE THE OLD COVER ART, WE JUST ADD A NEW ONE -- ATTEND TO THIS LATER
  
  const s3 = new S3({
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
    region: process.env.REACT_APP_REGION,
  });
  
  
 const uploadToS3 = async (file) => {
  const params = {
    Body:file && file.file,
    Bucket: process.env.REACT_APP_S3_BUCKET_2,
    Key: file && file.name,
    
   
  };
  const data = await s3.upload(params).promise();
  return data.Location; // Returns the file URL
}

  uploadToS3(file)
  .then(async(url) => {
    console.log('MEDIA URL IS NOW-->: ', url);
    //UPDATE MEDIA HERE WITH NEW URL 

    //THIS CODE BLOCK MEANS WE ARE UPLOADING THIS SONG INTO PERMANENCE, FROM THE TEMPORARY STATUS, FOR THE FIRST TIME EVER
    console.error("No collaborator profile pic sent, HENCE WE START FRESH UPLOAD:");
    

if(file && file.file instanceof File) {

console.log("CURRENT PICTURE IS LOOK HERE--->",file)
//UPDATING THE PICTURE IF THERE'S A FILE I.E USER UPLOADED A PICTURE

const s3 = new S3({
  accessKeyId: process.env.REACT_APP_ACCESSKEYID,
  secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
  region: process.env.REACT_APP_REGION,
});


const uploadToS3 = async (file) => {
const params = {
  Body:file && file.file,
  Bucket: process.env.REACT_APP_S3_BUCKET_2,
  Key: file && file.name,
  
 
};
const data = await s3.upload(params).promise();
return data.Location; // Returns the file URL
}

uploadToS3(file)
.then(async(url) => {

  console.log('PROFILE IMAGE URL IS NOW-->: ', url);

  //NOW WE CHECK IF USER EXISTED BEFORE OR NOT AND HAVE TWO CONDITIONS FOR HIM/HER


  if(!currentCollaborator.id){ //user  did not exist before

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
    db.collection('users').add({
    ...currentCollaborator,
      profileImg:url,
      userType:"collaborator",
      createdAt:(new Date()).toLocaleDateString("en-US", options)
    
    })   
    .then(async(res)=>{
     let userId = res.id
      db.collection('users').doc(res.id).update({
        id: res.id,
      })
      
    }).then(()=>{
      notifySuccessFxn("Collaborator Added Successfully!")
      handleClose()
    })


  }
  else{ //user existed before
  
    let collaboratorId = currentCollaborator && currentCollaborator.id
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    if(collaboratorId){
    db.collection('users').doc(collaboratorId).update({
      ...currentCollaborator,
        profileImg:url,
        userType:"collaborator",
        updatedAt:(new Date()).toLocaleDateString("en-US", options)
      
      }).then(()=>{
        notifySuccessFxn("Collaborator Updated Successfully!")
        handleClose()
      }) 
     
    }
    else{
      notifyErrorFxn('collaborator is not updating, look into ti')
    }


  }

 
}).catch((err)=>{
  notifyErrorFxn(`Error uploading file ${currentCollaborator.name}, please try again`)
  console.log("error uploading to either S3 cover art or media file--->",err)
});

//END OF PICTURE LOGIC



}


else { //dont really see why we need this else statement but we leave it for now, it's not hurting anything

notifyErrorFxn("there's a weird problem,it is reported to hae no profile picture file, after the first profile picture file passed,  please check it")
};


  }).catch((err)=>{
    notifyErrorFxn(`Error uploading profile image ${file.name}, please try again`)
    console.log("error uploading to S3--->",err)
  });
  
  //END OF PICTURE LOGIC
}
  
  
 else { 
  //THIS CODE BLOCK MEANS NO NEW PROFILE IMAGE,EITHER IT'S AN UPDATE OR A FIRST TIME UPLOAD OF A NEW COLLABORATOR
  //SO WE NEED TO FIND THE USER EXISTS, IF NOT WE CREATE THEM

  if(!currentCollaborator.id){ //user  did not exist before -first time upload
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
    db.collection('users').add({
    ...currentCollaborator,
      //profileImg:url,
      userType:"collaborator",
      createdAt:(new Date()).toLocaleDateString("en-US", options)
    
    })   
    .then(async(res)=>{
     let userId = res.id
      db.collection('users').doc(res.id).update({
        id: res.id,
      })
      
    }).then(()=>{
      notifySuccessFxn("Collaborator Added Successfully!")
      handleClose()
    })


  }
  else{ //user existed before
  
    let collaboratorId = currentCollaborator && currentCollaborator.id
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    if(collaboratorId){
    db.collection('users').doc(collaboratorId).update({
      ...currentCollaborator,
        //profileImg:url,
        userType:"collaborator",
        updatedAt:(new Date()).toLocaleDateString("en-US", options)
      
      }).then(()=>{
        notifySuccessFxn("Collaborator Updated Successfully!")
        handleClose()
      })   
     
    }
    else{
      notifyErrorFxn('collaborator is not updating, as there is no collaborator id, look into it')
    }


  }
  
 

};

 

    

   
  } catch (error) {
    console.error("Error reaching out to firebase to find song document: ", error);
   
  }

}


export const saveSongsAndPlaylist = (songs,playlistName,playlist,userId,playlistBeingCreated) => async (dispatch) => {
  
  console.log("songs ENTERING FOR PLAYLIST is -->", songs)
  if(!songs.length || songs.length === 0){
   notifyErrorFxn("Playlist is currently Empty!")
    return
  }

 let playlistId;
 var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

 db.collection('playlists').add({
  userId:userId,
  playlistName:playlistName,
  author:"TBD",
  createdAt:(new Date()).toLocaleDateString("en-US", options)

})   
.then(async(res)=>{
  playlistId = res.id
  db.collection('playlists').doc(res.id).update({
    playlistId: res.id,
  })
  dispatch(fetchAllPlaylistsForOneUser(userId))
  dispatch(saveNewPlaylistBeingCreated(false))
  return res
})
.then(async(resp)=>{ 


songs.filter((item)=>(item && item.metadata)).forEach(async(song)=>{  

   // Query the "uploads" collection to find the document with matching uploadId
   const uploadsRef = db.collection("uploads");
   const query = uploadsRef.where("uploadId", "==", song.uploadId);

  try {
    const querySnapshot = await query.get();

    if (querySnapshot.empty) {
      console.error("WHILE ADDING SONG TO PLAYLIST, No matching document found with uploadId:", song.uploadId);
      //notifyErrorFxn("No matching song found.❌");
      return;
    }

   
    const document = querySnapshot.docs[0];
    console.log('VIEW THIS DOC HERE --->',document.data())
   
    var songRef = db.collection("uploads").doc(document.data().songId);

    
    await songRef.update({
      ...song,
      userId:userId,
      songId:document.data().songId,
      //playlistId:resp.id||playlistId
      playlistIdsArray:[...document.data().playlistIdsArray,resp.id||playlistId]
    })

   
  } catch (error) {
    console.error("Error updating song document: ", error);
    //notifyErrorFxn("Error updating song.❌, please try again!");
  }


})

}).then(()=>{
 //dispatch(saveNewlyUploadedPlaylist([])) newly uploaded playlist has all songs belonging to playlists being created, it cannot be reset just because one playlist was submitted
 dispatch(saveNewPlaylistBeingCreated(playlistBeingCreated.filter((item)=>(
                             item.playlistId !== playlist.playlistId))  
                             ))
 //dispatch(savePlaylistName('Untitled Playlist'))
   notifySuccessFxn("Playlist Successfully Added!");
})


}


export const updateSongsAndPlaylist = (songs,playlistName,userId,playlistInQuestionId,playlistCreatorPlaylists) => async (dispatch) => {
  
  console.log("songs ENTERING FOR PLAYLIST is -->", songs)
  if(!songs.length || songs.length === 0){
   notifyErrorFxn("Playlist is currently Empty!")
    return
  }


  //EDIT FROM HERE -START
 let playlistId;
 var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
 //var options = { year: 'numeric', month: 'short', day: 'numeric' };

 db.collection('playlists').doc(playlistInQuestionId).update({
  userId:userId,
  playlistName:playlistName,
  author:"TBD",
 updatedAt:(new Date()).toLocaleDateString("en-US", options)
  //updatedAt:firebase.firestore.Timestamp.now()
})   
//.then(async(res)=>{
//  playlistId = res.id
//  db.collection('playlists').doc(res.id).update({
//    playlistId: res.id,
//  })
//  dispatch(fetchAllPlaylistsForOneUser(userId))
//  return res
//})

//EDIT FROM HERE -END
.then(async(resp)=>{ 


songs.filter((item)=>(item && item.metadata && item.mediaUrl)).forEach(async(song)=>{  

   // Query the "uploads" collection to find the document with matching uploadId
   const uploadsRef = db.collection("uploads");
   const query = uploadsRef.where("uploadId", "==", song.uploadId);

  try {
    const querySnapshot = await query.get();

    if (querySnapshot.empty) {
      console.error("WHILE ADDING SONG TO PLAYLIST, No matching document found with uploadId:", song.uploadId);
      //notifyErrorFxn("No matching song found.❌");
      return;
    }

   
    const document = querySnapshot.docs[0];
    console.log('VIEW THIS DOC HERE --->',document.data())
   
    var songRef = db.collection("uploads").doc(document.data().songId);

    
    await songRef.update({
      ...song,
      userId:userId,
      songId:document.data().songId,
      //playlistId:resp.id||playlistId
      playlistIdsArray:[...document.data().playlistIdsArray,resp.id||playlistId]
    })

   
  } catch (error) {
    console.error("Error updating song document: ", error);
    //notifyErrorFxn("Error updating song.❌, please try again!");
  }


})

}).then(()=>{
 //dispatch(saveAllSongsFromCurrentPlaylistToEdit([]))
 //dispatch(saveCurrentlyEditingPlaylistName(null))
 //dispatch(saveNewPlaylistBeingCreated(false))
  
  dispatch(savePlaylistCreatorPlaylists(playlistCreatorPlaylists.filter((item)=>(
                             item.playlistId !== playlistInQuestionId))  
                             ))

   notifySuccessFxn("Playlist Successfully Updated!");
})


}



export const createGroup = (groupData, user, file, navigate, setLoading, url) => async (dispatch) => {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date();
   
  db.collection("groups").add({
    groupName: groupData.groupName,
    noOfSavers: groupData.noOfSavers,
    pin: groupData.pin,
    startDate: groupData.startDate,
    amount: groupData.amount,
    status: groupData.status.toLowerCase(),
    imageUrl: url,
    admins: [user.id],
    members: [user.id],
    accountCreated: today.toLocaleDateString("en-US", options),
}).then((res)=>{
    console.log("RESPONSE ID: ", res.id);
    return db.collection('groups').doc(res.id).update({
      groupId: res.id,
    }).then(() => {
        db.collection('groups').doc(res.id).collection('membersCollection').add({
            memberName: user.name,
            memberEmail: user.email,
            memberImageUrl: user.profileImg,
            invitedBy: user.id,
            invite: 0,
            paid: 0,
            users: [user.id, user.id],
            sentAt: today.toLocaleDateString("en-US", options),
          }).then((resp) => {
            console.log("membersCollection RESPONSE: ", resp);
            setLoading(false);
            db.collection('groups').doc(res.id).collection('membersCollection').doc(resp.id).update({
              id: resp.id,
            })
          }).then(() => {
            notifySuccessFxn("Group Created")
            setLoading(false);
            navigate('/dashboard/home', { replace: true });
          }).catch((err) => {
            console.error("Error creating group: ", err);
            var errorMessage = err.message;
            notifyErrorFxn(errorMessage);
            setLoading(false);
          })
    })
  })
}


export const uploadMediaFile = ( file, files,handleClose,newlyUploadedPlaylist,setLoadingSubmit,userId) => async (dispatch) => {
 //UPLOAD MEDIA FILE USED TO UPLOAD A RAW FILE, BUT THE RAW FILE HAS BEEN UPLOADED IN THE TEMPORARY PART, SO WE JUST NEED THE URL 
 // uploadMediaFile temporary is the temporary part being referred to
  console.log("NEWLY UPLOADED PLAYLIST LENGTH IS --->",newlyUploadedPlaylist)
  console.log('File Name EXPERIMENTAL ---->:', file);
  let file2 ;
  let file3 ;

  //const metadata = await parseBlob(file.file);

  file2 = {
    name:file && file.name,
    lastModified:file && file.lastModified,
    size:file && file.size,
    type:file && file.type?file.type:"audio/mp3",
   // metadata:{...metadata},
    metadata:{},
    isUploaded:true,
    uploadId:file.uploadId,
    individualId:file && file.individualId?file.individualId:file.uploadId,
    coverArtUrl:file && file.coverArtUrl?file.coverArtUrl:null,
    otherMusicFiles:file && file.otherMusicFiles?file.otherMusicFiles:[]
   }


   file3 = {
    file:file && file.file,
    name:file && file.name,
    lastModified:file && file.lastModified,
    size:file && file.size,
    type:file && file.type?file.type:"audio/mp3",
   // metadata:{...metadata},
    metadata:{name:file && file.name },
    isUploaded:true,
    uploadId:file && file.uploadId,
    individualId:file && file.individualId?file.individualId:file.uploadId,
    coverArtUrl:file && file.coverArtUrl?file.coverArtUrl:null,
    otherMusicFiles:file && file.otherMusicFiles?file.otherMusicFiles:[]
   }

  //(async () => {
  // 
  //  try {
  //    //const metadata = await parseBlob(file.file); COME BACK AND WORK ON METADATA LATER
  //    //const savedUploadId = uuidv4()
  //    
  //     file2 = {
  //      name:file && file.name,
  //      lastModified:file && file.lastModified,
  //      size:file && file.size,
  //      type:file && file.type?file.type:"audio/mp3",
  //      //metadata:{...metadata},
  //      metadata:{},
  //      isUploaded:true,
  //      uploadId:file.uploadId,
  //      individualId:file && file.individualId?file.individualId:file.uploadId,
  //      coverArtUrl:file && file.coverArtUrl?file.coverArtUrl:null,
  //      otherMusicFiles:file && file.otherMusicFiles?file.otherMusicFiles:[]
  //     }
//
//
  //     file3 = {
  //      file:file && file.file,
  //      name:file && file.name,
  //      lastModified:file && file.lastModified,
  //      size:file && file.size,
  //      type:file && file.type?file.type:"audio/mp3",
  //      //metadata:{...metadata},
  //      metadata:{},
  //      isUploaded:true,
  //      uploadId:file && file.uploadId,
  //      individualId:file && file.individualId?file.individualId:file.uploadId,
  //      coverArtUrl:file && file.coverArtUrl?file.coverArtUrl:null,
  //      otherMusicFiles:file && file.otherMusicFiles?file.otherMusicFiles:[]
  //     }
//
//
  //     console.log("FILE 2 IS ---->",file2);
  //  } catch (error) {
  //    console.error('Error parsing metadata:', error.message);
  //  }
  //})();

  console.log("FILE 3 IS ---->",file3);

  const s3 = new S3({
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
    region: process.env.REACT_APP_REGION,
  });
  

  const moveToNewBucket = async (fileKey, sourceBucket, destinationBucket) => {
    try {
      // Step 1: Copy the file to the new bucket
      const copyParams = {
        CopySource: `${sourceBucket}/${fileKey}`, // Source bucket and key
        Bucket: destinationBucket,              // Destination bucket
        Key: fileKey,                           // Destination key (same as source key here)
      };
  
      console.log("Copying file to new bucket...");
      await s3.copyObject(copyParams).promise();
      console.log("File copied successfully!");
  
      // Step 2: Delete the file from the source bucket
      const deleteParams = {
        Bucket: sourceBucket,
        Key: fileKey,
      };
  
      console.log("Deleting file from source bucket...");
      await s3.deleteObject(deleteParams).promise();
      console.log("File deleted from source bucket!");
  
      const fileUrl = `https://${destinationBucket}.s3.amazonaws.com/${fileKey}`;
    console.log("File is available at:", fileUrl);

    return fileUrl; // Return the URL of the moved file

    } catch (error) {
      console.error("Error moving file:", error);
      throw error; // Re-throw the error for caller to handle
    }
  };



 const uploadToS3 = async (file) => {
  const params = {
    Body:file && file,
    Bucket: process.env.REACT_APP_S3_BUCKET,
    Key: file && file.name,
    
   
  };
  const data = await s3.upload(params).promise();
  return data.Location; // Returns the file URL
}


const url = file.mediaUrl ?file.mediaUrl:file.mediaTemporaryUrl ?file.mediaTemporaryUrl:file.instrumentalTemporaryUrl ?file.instrumentalTemporaryUrl:file.coverArtUrl && file.coverArtUrl ;
const permanentFileKey = new URL(url).pathname.split('/').pop();



  moveToNewBucket(permanentFileKey,process.env.REACT_APP_S3_BUCKET_3,process.env.REACT_APP_S3_BUCKET)
  .then((url) => {
    console.log('B4 CREATE MEDIA IN UPLOADS, FILE 2 IS NOW -->: ', file2);
    dispatch(createMediaInUploads(file2, url,handleClose,userId))
    .then(async()=>{
      setTimeout(()=>{ 
        console.log("WE ARE DELAYING FETCHING SINGLE SONG BY UPLOAD ID")
     dispatch(fetchSingleSongByUploadId(file && file.file,files,file2 && file2.uploadId,file3,newlyUploadedPlaylist,userId))
     dispatch(fetchAllSongsForOneUser(userId))
     setLoadingSubmit(false)
    },2000)
   //  .then(async(res)=>{
   //
   //
    })
   
  }).catch((err)=>{
    notifyErrorFxn(`Error uploading file ${file.name}, please try again`)
    console.log("error uploading to S3--->",err)
  });
}


export const uploadMediaFileForCollaborators = ( file, files,setFileBeingProcessed,setLoadingSubmit,userId) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();

     /**QUITE RISKY TO DELETE THE FILE IMMEDIATELY THE FUNCTION STARTS, BUT LETS TRY - DAGOGO - FEB 21 2025 */
   // dispatch(saveNewlyUploadedFiles([...files.filter(obj => (obj.individualId !== file.individualId ))] ))


  console.log("NEWLY UPLOADED FILES TEMPORARY IS --->")
  console.log('File Name EXPERIMENTAL TEMPORARY IS ---->:', file);
  let file2 ;
  let file3 ;


   // const fileInput = document.querySelector('input[type="file"]');
   // const file = fileInput.files[0];
        
    try {
      //const metadata = await parseBlob(file.file);
      //const savedUploadId = uuidv4()
      
       file2 = {
        //no file in file 2, as file2 gets saved to firebase
        name:file.name,
        lastModified:file.lastModified,
        size:file.size,
        type:file.type,
        metadata:/*{...metadata}*/true,
        isUploaded:true,
        uploadId:file.uploadId,
        individualId:file && file.individualId?file.individualId:file.uploadId,
        
       }


       file3 = {
        file:file.file,
        name:file.name,
        lastModified:file.lastModified,
        size:file.size,
        type:file.type,
        metadata:/*{...metadata}*/true,
        isUploaded:true,
        uploadId:file.uploadId,
        individualId:file && file.individualId?file.individualId:file.uploadId,
        
       }




       console.log("FILE 2 IS ---->",file2);
    } catch (error) {
      console.error('Error parsing metadata:', error.message);
    }


  

  const s3 = new S3({
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
    region: process.env.REACT_APP_REGION,
  });
  

 const uploadToS3 = async (file) => {
  console.log("WONKY MP3 FILE WHEN UPLOADING TO S3--->",file)
  const params = {
    Body:file &&  new Blob([file], { type:`${file.type}` }),
    Bucket: process.env.REACT_APP_S3_BUCKET_3,
    Key: file && file.name,
    
   
  };
  const data = await s3.upload(params).promise();
  return data.Location; // Returns the file URL
}


 

  uploadToS3(file.file)
  .then((url) => {
  
    console.log('MEDIA URL IS NOW-->: ', url);
    dispatch(createMediaInUploadsTemporary(file2,files, url,userId,setFileBeingProcessed))
    .then(async()=>{
      
     setLoadingSubmit(false)
  })
   
  }).catch((err)=>{
    //notifyErrorFxn(`Error uploading file ${file.name}, please try again`)
    console.log("error uploading to S3 TEMPORARY--->",err)
  });
}


export const uploadMediaFileTemporary = ( file, files,setFileBeingProcessed,setLoadingSubmit,userId) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();

     /**QUITE RISKY TO DELETE THE FILE IMMEDIATELY THE FUNCTION STARTS, BUT LETS TRY - DAGOGO - FEB 21 2025 */
   // dispatch(saveNewlyUploadedFiles([...files.filter(obj => (obj.individualId !== file.individualId ))] ))


  console.log("NEWLY UPLOADED FILES TEMPORARY IS --->")
  console.log('File Name EXPERIMENTAL TEMPORARY IS ---->:', file);
  let file2 ;
  let file3 ;


   // const fileInput = document.querySelector('input[type="file"]');
   // const file = fileInput.files[0];
        
    try {
      //const metadata = await parseBlob(file.file);
      //const savedUploadId = uuidv4()
      
       file2 = {
        //no file in file 2, as file2 gets saved to firebase
        name:file.name,
        lastModified:file.lastModified,
        size:file.size,
        type:file.type,
        metadata:/*{...metadata}*/true,
        isUploaded:true,
        uploadId:file.uploadId,
        individualId:file && file.individualId?file.individualId:file.uploadId,
        
       }


       file3 = {
        file:file.file,
        name:file.name,
        lastModified:file.lastModified,
        size:file.size,
        type:file.type,
        metadata:/*{...metadata}*/true,
        isUploaded:true,
        uploadId:file.uploadId,
        individualId:file && file.individualId?file.individualId:file.uploadId,
        
       }




       console.log("FILE 2 IS ---->",file2);
    } catch (error) {
      console.error('Error parsing metadata:', error.message);
    }


  

  const s3 = new S3({
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
    region: process.env.REACT_APP_REGION,
  });
  

 const uploadToS3 = async (file) => {
  console.log("WONKY MP3 FILE WHEN UPLOADING TO S3--->",file)
  const params = {
    Body:file &&  new Blob([file], { type:`${file.type}` }),
    Bucket: process.env.REACT_APP_S3_BUCKET_3,
    Key: file && file.name,
    
   
  };
  const data = await s3.upload(params).promise();
  return data.Location; // Returns the file URL
}


 

  uploadToS3(file.file)
  .then((url) => {
  
    console.log('MEDIA URL IS NOW-->: ', url);
    dispatch(createMediaInUploadsTemporary(file2,files, url,userId,setFileBeingProcessed))
    .then(async()=>{
       //WE SIMPLY NEED TO FETCH ALL FILES FOR ONE USER NOW. NOT FETCH THE LATEST FILE THAT WAS ADDED AND ADD IT TO THE FILES ARRAY, HENCE I COMMENTED OUT FETCH SINGLE SONG
       dispatch(fetchAllFilesForOneUser(userId))
     //dispatch(fetchSingleSongByUploadIdTemporary(file && file.file,files,file2 && file2.uploadId,file3,setFiles))
    
     setLoadingSubmit(false)
   //  .then(async(res)=>{
   //
   //
    })
   
  }).catch((err)=>{
    //notifyErrorFxn(`Error uploading file ${file.name}, please try again`)
    console.log("error uploading to S3 TEMPORARY--->",err)
  });
}





export const replaceMediaFileTemporary = ( file, files,setFileBeingProcessed,fileToBeReplaced,setLoadingSubmit,userId) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  setLoadingSubmit(true)
  //FIRST DELETE THE CURRENT S3 MEDIA , THEN PROCEED
     dispatch(deleteMediaFileWhileReplacing(fileToBeReplaced,setLoadingSubmit,userId))


  let file2 ;
  let file3 ;


   // const fileInput = document.querySelector('input[type="file"]');
   // const file = fileInput.files[0];
        
    try {
      //const metadata = await parseBlob(file.file);
      //const savedUploadId = uuidv4()
      
       file2 = {
        //no file in file 2, as file2 gets saved to firebase
        name:file.name,
        lastModified:file.lastModified,
        size:file.size,
        type:file.type,
        metadata:/*{...metadata}*/true,
        isUploaded:true,
        uploadId:file.uploadId,
        individualId:file && file.individualId?file.individualId:file.uploadId,
        
       }


       file3 = {
        file:file.file,
        name:file.name,
        lastModified:file.lastModified,
        size:file.size,
        type:file.type,
        metadata:/*{...metadata}*/true,
        isUploaded:true,
        uploadId:file.uploadId,
        individualId:file && file.individualId?file.individualId:file.uploadId,
        
       }




       console.log("FILE 2 IS ---->",file2);
    } catch (error) {
      console.error('Error parsing metadata:', error.message);
    }


  

  const s3 = new S3({
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
    region: process.env.REACT_APP_REGION,
  });
  

 const uploadToS3 = async (file) => {
  console.log("WONKY MP3 FILE WHEN UPLOADING TO S3--->",file)
  const params = {
    Body:file &&  new Blob([file], { type:`${file.type}` }),
    Bucket: process.env.REACT_APP_S3_BUCKET_3,
    Key: file && file.name,
    
   
  };
  const data = await s3.upload(params).promise();
  return data.Location; // Returns the file URL
}


 

  uploadToS3(file.file)
  .then((url) => {
  
    console.log('MEDIA URL IS NOW-->: ', url);
    //dispatch(createMediaInUploadsTemporary(file2,files, url,userId,setFileBeingProcessed))
    dispatch(replaceMediaInUploadsTemporary(file2,files, url,userId,setFileBeingProcessed,fileToBeReplaced))

    .then(async()=>{
       //WE SIMPLY NEED TO FETCH ALL FILES FOR ONE USER NOW. NOT FETCH THE LATEST FILE THAT WAS ADDED AND ADD IT TO THE FILES ARRAY, HENCE I COMMENTED OUT FETCH SINGLE SONG
       dispatch(fetchAllFilesForOneUser(userId))
     //dispatch(fetchSingleSongByUploadIdTemporary(file && file.file,files,file2 && file2.uploadId,file3,setFiles))
    
     setLoadingSubmit(false)
   //  .then(async(res)=>{
   //
   //
    })
   
  }).catch((err)=>{
    //notifyErrorFxn(`Error uploading file ${file.name}, please try again`)
    console.log("error uploading to S3 TEMPORARY--->",err)
  });
}



export const uploadAllMediaFilesTemporaryForOneSong = ( file,  files,setFiles,setLoadingSubmit) => async (dispatch) => {

  const songGroupIdentifier = uuidv4()
  
 
  let file2 ;
  let file3 ;

  (async () => {
   // const fileInput = document.querySelector('input[type="file"]');
   // const file = fileInput.files[0];
    
    try {


      const allowedMusicTypes = [
        "audio/mpeg", // mp3
        "audio/mp3",  // mp3
        "audio/mp4",  // mp4
        "audio/ogg",  // ogg
        "audio/ape",  // ape
        "audio/amr",  // amr
        "audio/wav",  // wav
        "audio/x-flac", // flac
        "audio/aac",  // aac
        "audio/aif",  // aif
        "audio/aiff",  // aiff
        "audio/x-aiff", //x-aiff
        "video/mp4",  // mp4
        "video/ogg",  // ogg
        "video/webm", // webm
       
      ];


      const allowedImageTypes = [
        "image/png",  // png
        "image/jpeg", // jpeg
        "image/jpg",  // jpg
        "image/webp", // webp
        "image/gif",  // gif
        "image/bmp",  // bmp
        "image/tiff", // tiff
      ];
      


     // const metadata = await parseBlob(file.file)
     //i have to put dummy metadata in case an image comes in and I cant get metadata on it
     //because of the shift from changing the upload style, to include other assets than songs
      const metadata =allowedMusicTypes.includes(file.type)?await parseBlob(file.file):{coverArtName:file.name};
      //const savedUploadId = uuidv4()
   console.log("METADATA JUST BEFORE FILE 2--->",metadata)
   
       file2 = {
        //no file in file 2, as file2 gets saved to firebase
        name:file.name,
        lastModified:file.lastModified,
        size:file.size,
        type:file.type,
        //metadata:JSON.stringify({...metadata}),
        metadata:{name:file && file.name},
        isUploaded:true,
        uploadId:file.uploadId,
        individualId:file.individualId,
        isTemporary:true,
        songGroupId:songGroupIdentifier,
        isMusicFile:allowedMusicTypes.includes(file.type)?true:false
       }


       file3 = {
        
        file:file.file,
        name:file.name,
        lastModified:file.lastModified,
        size:file.size,
        type:file.type,
        //metadata:JSON.stringify({...metadata}),
        metadata:{name:file && file.name},
        isUploaded:true,
        uploadId:file.uploadId,
        individualId:file.individualId,
        isTemporary:true,
        songGroupId:songGroupIdentifier,
        isMusicFile:allowedMusicTypes.includes(file.type)?true:false
       }


       console.log("FILE 2 IS ---->",file2);
    } catch (error) {
      console.error('Error parsing metadata:', error.message);
    }
  })();

  const s3 = new S3({
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
    region: process.env.REACT_APP_REGION,
  });
  

 const uploadToS3 = async (file) => {
  const params = {
    Body:file && file,
    Bucket: process.env.REACT_APP_S3_BUCKET_3,
    Key: file && file.name,
    
   
  };
  const data = await s3.upload(params).promise();
  return data.Location; // Returns the file URL
}

  uploadToS3(file.file)
  .then((url) => {
    console.log('MEDIA URL IS NOW-->: ', url);
    dispatch(createOrUpdateSongInUploadsTemporary(file2, url,file2 && file2.uploadId,file2))
    .then(async()=>{
     
     dispatch(fetchSingleSongByUploadIdTemporaryNewFormat(file && file.file,files,file2.uploadId && file2.uploadId,file2.individualId && file2.individualId,file2/*file3*/,setFiles))
  
     setLoadingSubmit(false)

  
    })
   
  }).catch((err)=>{
    //notifyErrorFxn(`Error uploading file ${file.name}, please try again`)
    console.log("error uploading to S3 TEMPORARY--->",err)
  });
}



export const deleteMediaFile = ( file,setLoadingSubmit,userId) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  console.log('File Name EXPERIMENTAL ---->:', file);
  let file2 ;
  let file3 ;


  const url = file.mediaUrl ?file.mediaUrl:file.mediaTemporaryUrl ?file.mediaTemporaryUrl:file.instrumentalTemporaryUrl ?file.instrumentalTemporaryUrl:file.coverArtUrl && file.coverArtUrl ;
  const fileKey = new URL(url).pathname.split('/').pop();
  console.log(fileKey); // Output: "new-farmer-onboarding-form-explanation.mp4"
  
    
    const s3 = new S3({
      accessKeyId: process.env.REACT_APP_ACCESSKEYID,
      secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
      region: process.env.REACT_APP_REGION,
    });
    
    
   const deleteFromS3 = async () => {
    /*NO ARGUMENT, I AM USING FILEKEY ABOVE */
    const params = {
     
      Bucket: process.env.REACT_APP_S3_BUCKET_3,
      Key: fileKey && fileKey,
      
     
    };
    try {
      const data = await s3.deleteObject(params).promise();
      console.log('MEDIA File deleted successfully:', data);
      return data; // Returns an empty object if the deletion is successful
    } catch (error) {
      console.error('Error deleting MEDIA file:', error);
      throw error; // Propagate the error for further handling
    }
  }

  deleteFromS3()
  .then((url) => {
    console.log('MEDIA URL IS NOW-->: ', url);
    //dispatch(deleteMediaInUploads(file.uploadId,handleClose))
    dispatch(deleteFileinTemporaryUploads(file.uploadId,userId))
    .then(async()=>{
    
     dispatch(fetchAllSongsForOneUser(userId))
     setLoadingSubmit(false)
   //  .then(async(res)=>{
   //
   //
    })
   
  }).catch((err)=>{
    notifyErrorFxn(`Error deleting MEDIA file/ SONG ${file.name}, please try again`)
    console.log("error deleting song from S3--->",err)
  });
}


export const deleteMediaFileWhileReplacing = ( file,setLoadingSubmit,userId) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  console.log('File Name EXPERIMENTAL ---->:', file);
  let file2 ;
  let file3 ;


  const url = file.mediaUrl ?file.mediaUrl:file.mediaTemporaryUrl ?file.mediaTemporaryUrl:file.instrumentalTemporaryUrl ?file.instrumentalTemporaryUrl:file.coverArtUrl && file.coverArtUrl ;
  const fileKey = new URL(url).pathname.split('/').pop();
  console.log(fileKey); // Output: "new-farmer-onboarding-form-explanation.mp4"
  
    
    const s3 = new S3({
      accessKeyId: process.env.REACT_APP_ACCESSKEYID,
      secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
      region: process.env.REACT_APP_REGION,
    });
    
    
   const deleteFromS3 = async () => {
    /*NO ARGUMENT, I AM USING FILEKEY ABOVE */
    const params = {
     
      Bucket: process.env.REACT_APP_S3_BUCKET_3,
      Key: fileKey && fileKey,
      
     
    };
    try {
      const data = await s3.deleteObject(params).promise();
      console.log('MEDIA File deleted successfully:', data);
      return data; // Returns an empty object if the deletion is successful
    } catch (error) {
      console.error('Error deleting MEDIA file:', error);
      throw error; // Propagate the error for further handling
    }
  }

  deleteFromS3()
  .then((url) => {
    console.log('MEDIA URL IS NOW-->: ', url);
    //dispatch(deleteMediaInUploads(file.uploadId,handleClose))
   // dispatch(deleteFileinTemporaryUploads(file.uploadId,userId))
   // setLoadingSubmit(false)
   
  }).catch((err)=>{
    notifyErrorFxn(`Error deleting MEDIA file/ SONG ${file.name}, please try again`)
    console.log("error deleting song from S3--->",err)
  });
}



export const uploadGroupImage = (groupData, file, user, navigate, setLoading) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  console.log('File Name: ', imageName);
  const uploadTask = storage.ref(`group_images/${imageName}`).put(file);
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // setProgress(progress);
    },
    error => {
      console.log(error);
    },
    () => {
      storage
        .ref("group_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
          console.log('Image URL: ', url);
          dispatch(createGroup(groupData, user, file, navigate, setLoading, url));
        });
    }
  );
}

export const fetchMyGroups = (coolers) => async (dispatch) => {
  console.log("Clicked...");
  dispatch(isItLoading(true));
  if (coolers.length) {
    const chunkSize = 10;
    const chunks = coolers.reduce((acc, _, i) => (i % chunkSize ? acc : [...acc, coolers.slice(i, i + chunkSize)]), []);
    const promises = chunks.map((chunk) => {
      return db
        .collection("groups")
        .where("groupId", "in", chunk)
        .get()
        .then((snapshot) => snapshot.docs.map((doc) => ({ ...doc.data() })));
    });
    Promise.all(promises)
      .then((results) => {
        const myGroups = results.flat();
        console.log("My Groups Data:", myGroups);
        dispatch(saveMyGroup(myGroups));
        dispatch(isItLoading(false));
      })
      .catch((error) => {
        console.log("Error getting document:", error);
        dispatch(isItLoading(false));
      });
  } else {
    dispatch(saveMyGroup(coolers));
    dispatch(isItLoading(false));
  }
};


// export const fetchMyGroups = (coolers) => async (dispatch) => {
//   console.log("Cilcked...")
//   dispatch(isItLoading(true));
//     if(coolers.length){
//       db.collection("groups")
//       . where('groupId', 'in', coolers)
//        .get()
//        .then((snapshot) => {
//         const myGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
//         console.log("DATA::: ", myGroups);
//         // return
//       if (myGroups.length) {
//         dispatch(isItLoading(false));
//         console.log("My Groups Data:", myGroups);
//         dispatch(saveMyGroup(myGroups));
//       } else {
//           dispatch(isItLoading(false));
//       }
//      }).catch((error) => {
//        console.log("Error getting document:", error);
//        dispatch(isItLoading(false));
//      });
//     }else{
//       dispatch(saveMyGroup(coolers));
//       dispatch(isItLoading(false));
//     }
//  };


export const fetchGroups = (adminID) => async (dispatch) => {
  dispatch(isItLoading(true));
  db.collection("groups")
  .where('admin', '==', adminID)
   .get()
   .then((snapshot) => {
     const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
   if (allGroups.length > 0) {
     dispatch(isItLoading(false));
     console.log("All Groups Data:", allGroups);
     dispatch(saveAllGroup(allGroups));
   } else {
       dispatch(isItLoading(false));
       dispatch(saveAllGroup(allGroups));
       console.log("No groups!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });
 };

 export const fetchAllSongs = () => async (dispatch) => {
   
  dispatch(isItLoading(true));
  db.collection("uploads")
   .get()
   .then((snapshot) => {
    const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (allGroups.length > 0) {
  
    console.log("ALL SONGS HAVE BEEN FETCHED--->:", allGroups);
  //setFiles([...files.map(obj => (obj.uploadId === uploadId ? {...file3/*,songId:allGroups[0].songId*/} : obj))]) 
    dispatch(saveAllSongs([...allGroups ]))

    
    
  } else {
      
    dispatch(saveAllSongs([ ]))

      console.log("Cannot fetch all songs RIGHT NOW");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
  dispatch(isItLoading(false));
});

 }



 export const fetchAllSongsForOneUser = (userId) => async (dispatch) => {
   
  dispatch(isItLoading(true));
  db.collection("uploads")
  .where('userId', '==',  userId)
   .get()
   .then((snapshot) => {
    const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (allGroups.length > 0) {
  
    console.log("ALL SONGS FOR ONE USER HAVE BEEN FETCHED--->:", allGroups);
  //setFiles([...files.map(obj => (obj.uploadId === uploadId ? {...file3/*,songId:allGroups[0].songId*/} : obj))]) 
    dispatch(saveAllSongs([...allGroups ]))

    
    
  } else {
      
    dispatch(saveAllSongs([ ]))

      console.log("Cannot fetch all songs RIGHT NOW");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
  dispatch(isItLoading(false));
});

 }



 export const fetchAllApprovedTrends = () => async (dispatch) => {
   
 
  db.collection("trends")
   .get()
   .then((snapshot) => {
    let allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (allGroups.length > 0) {
    allGroups = allGroups.filter((item)=>(item.status === "Approved"))
    console.log("ALL TRENDS HAVE BEEN FETCHED--->:", allGroups);
  //setFiles([...files.map(obj => (obj.uploadId === uploadId ? {...file3/*,songId:allGroups[0].songId*/} : obj))]) 
    dispatch(saveAllTrends([...allGroups ]))
    dispatch(saveFilteredTrends([...allGroups ]))
    
    
  } else {
      
    dispatch(saveAllTrends([ ]))
    dispatch(saveFilteredTrends([ ]))

      console.log("Cannot fetch all TRENDs RIGHT NOW");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
  dispatch(isItLoading(false));
});


 }


 export const fetchAllTrends = () => async (dispatch) => {
   
 
  db.collection("trends")
   .get()
   .then((snapshot) => {
    let allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (allGroups.length > 0) {
    
    console.log("ALL TRENDS HAVE BEEN FETCHED--->:", allGroups);
  //setFiles([...files.map(obj => (obj.uploadId === uploadId ? {...file3/*,songId:allGroups[0].songId*/} : obj))]) 
    dispatch(saveAllTrends([...allGroups ]))
    dispatch(saveFilteredTrends([...allGroups ]))
    
    
  } else {
      
    dispatch(saveAllTrends([ ]))
    dispatch(saveFilteredTrends([ ]))

      console.log("Cannot fetch all TRENDs RIGHT NOW");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
  dispatch(isItLoading(false));
});

 }





 export const fetchSongsForOnePlaylist = (playlistId) => async (dispatch) => {
  dispatch(saveAllSongsFromAPlaylist([ ]))
  dispatch(isPlaylistSongsLoading(true));
  db.collection("uploads")
  //.where('playlistId', '==',  playlistId)
  .where('playlistIdsArray', 'array-contains', playlistId)
   .get()
   .then((snapshot) => {
    const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (allGroups.length > 0) {
  
    console.log("ALL SONGS FOR THIS PLAYLIST HAVE BEEN FETCHED--->:", allGroups);
  //setFiles([...files.map(obj => (obj.uploadId === uploadId ? {...file3/*,songId:allGroups[0].songId*/} : obj))]) 
    dispatch(saveAllSongsFromAPlaylist([...allGroups ]))
    dispatch(isPlaylistSongsLoading(false));
    
    
  } else {
      
    dispatch(saveAllSongsFromAPlaylist([ ]))
    dispatch(isPlaylistSongsLoading(false));
      console.log("TRIED FETCHING ALL SONGS FOR A PLAYLIST BUT FOUND NONE");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
  dispatch(isPlaylistSongsLoading(false));
});

 }


 export const fetchCurrentlyEditingPlaylistName = (playlistId) => async (dispatch) => {

  db.collection("playlists")
  .where('playlistId', '==',  playlistId)
   .get()
   .then((snapshot) => {
    const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (allGroups.length > 0) {
  
    console.log("PLAYLIST FOR US TO EXTRACT NAME HAS BEEN FETCHED--->:", allGroups);
  //setFiles([...files.map(obj => (obj.uploadId === uploadId ? {...file3/*,songId:allGroups[0].songId*/} : obj))]) 
    dispatch(saveCurrentlyEditingPlaylistName(allGroups[0].playlistName))
    dispatch(saveCurrentlyEditingPlaylistId(allGroups[0].playlistId))
   
    //dispatch(isPlaylistSongsLoading(false));
    
    
  } else {
      
    dispatch(saveCurrentlyEditingPlaylistName(''))
   // dispatch(isPlaylistSongsLoading(false));
      console.log("TRIED FETCHING CURRENT  PLAYLIST TO EDIT BUT DIDNT FIND IT");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
 // dispatch(isPlaylistSongsLoading(false));
});

 }

 export const updateCurrentlyEditingPlaylistName = (playlistId,updatedName) => async (dispatch) => {

  
  var playlist = db.collection("playlists").doc(playlistId);
  playlist.get().then((doc) => {
  if (doc.exists) {
    return db.collection('playlists').doc(playlistId).update({
      playlistName: updatedName,
    })
  } else {
      console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
 }



 export const fetchSongsForCurrentPlaylistToEdit = (playlistId) => async (dispatch) => {
  dispatch(saveAllSongsFromCurrentPlaylistToEdit([ ]))
  //dispatch(isPlaylistSongsLoading(true));


  

  db.collection("uploads")
  .where('playlistId', '==',  playlistId)
   .get()
   .then((snapshot) => {
    const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (allGroups.length > 0) {
  
    console.log("ALL SONGS FOR THIS PLAYLIST HAVE BEEN FETCHED--->:", allGroups);
  //setFiles([...files.map(obj => (obj.uploadId === uploadId ? {...file3/*,songId:allGroups[0].songId*/} : obj))]) 
    dispatch(saveAllSongsFromCurrentPlaylistToEdit([...allGroups ]))
    //dispatch(isPlaylistSongsLoading(false));
    
    
  } else {
      
    dispatch(saveAllSongsFromCurrentPlaylistToEdit([ ]))
   // dispatch(isPlaylistSongsLoading(false));
      console.log("TRIED FETCHING CURRENT SONGS FROM A PLAYLIST TO EDIT BUT FOUND NONE");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
 // dispatch(isPlaylistSongsLoading(false));
});

 }



 export const fetchAndAddSongsForAllPlaylistsToEdit = (playlistId,allSongsFromAllPlaylistsToEdit) => async (dispatch) => {



  

  db.collection("uploads")
  .where('playlistId', '==',  playlistId)
   .get()
   .then((snapshot) => {
    const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (allGroups.length > 0) {
  
    console.log("ALL SONGS FOR THIS PLAYLIST HAVE BEEN FETCHED--->:", allGroups);
  //setFiles([...files.map(obj => (obj.uploadId === uploadId ? {...file3/*,songId:allGroups[0].songId*/} : obj))]) 
      let uniqueNewSongs = []
      const arrayOfPlaylistArrays = allSongsFromAllPlaylistsToEdit? allSongsFromAllPlaylistsToEdit.map((song)=>(song.playlistIdsArray)):[]

      function stringExistsInSubArrays(arrayOfPlaylistArrays, searchString) {
        return arrayOfPlaylistArrays.some(subArray => subArray.includes(searchString));
    }

  allGroups.forEach((item)=>{  
    if(!stringExistsInSubArrays(arrayOfPlaylistArrays,item.playlistId) ){
    uniqueNewSongs.push(item)
    }
})

dispatch(saveAllSongsFromAllPlaylistsToEdit([...allSongsFromAllPlaylistsToEdit,...uniqueNewSongs ]))
    //dispatch(isPlaylistSongsLoading(false));
    
    
  } else {
      
    //dispatch(saveAllSongsFromCurrentPlaylistToEdit([ ]))
   // dispatch(isPlaylistSongsLoading(false));
      console.log("TRIED FETCHING CURRENT SONGS FROM A PLAYLIST TO ADD TO EDIT BOARD BUT FOUND NONE");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
 // dispatch(isPlaylistSongsLoading(false));
});

 }



 export const removeSongFromCurrentPlaylistToEdit = (playlistId,songId) => async (dispatch) => {
 
let savedPlaylistId = playlistId

  

  db.collection("uploads")
  .doc(songId)
  .update({
   playlistId:null
  }).then((res) => {
   dispatch(fetchSongsForCurrentPlaylistToEdit(savedPlaylistId))
  })
  .catch((error) => {
  console.log("Error REMOVING SONG FROM PLAYLIST:", error);
 // dispatch(isPlaylistSongsLoading(false));
});

 }


 


 export const fetchAllPlaylists = () => async (dispatch) => {
   
  dispatch(isItLoading(true));
  db.collection("playlists")
   .get()
   .then((snapshot) => {
    const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (allGroups.length > 0) {
  
    console.log("ALL playlists HAVE BEEN FETCHED--->:", allGroups);
  //setFiles([...files.map(obj => (obj.uploadId === uploadId ? {...file3/*,songId:allGroups[0].songId*/} : obj))]) 
    dispatch(saveAllPlaylists([...allGroups ]))

    
    
  } else {
      
    dispatch(saveAllPlaylists([ ]))

      console.log("Cannot fetch all PLAYLISTS RIGHT NOW");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
  dispatch(isItLoading(false));
});

 }



 export const fetchAllCollaborators = () => async (dispatch) => {
   
  dispatch(isItLoading(true));
  db.collection("users")
  .where("userType", "==","collaborator")
   .get()
   .then((snapshot) => {
    const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (allGroups.length > 0) {
  
    console.log("ALL COLLABOS HAVE BEEN FETCHED--->:", allGroups);
  //setFiles([...files.map(obj => (obj.uploadId === uploadId ? {...file3/*,songId:allGroups[0].songId*/} : obj))]) 
    dispatch(saveAllCollaborators([...allGroups ]))

    
    
  } else {
      
    dispatch(saveAllCollaborators([ ]))

      console.log("Cannot fetch all COLLABOS RIGHT NOW");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
  dispatch(isItLoading(false));
});

 }


 export const fetchAllPlaylistsForOneUser = (userId) => async (dispatch) => {
   
  dispatch(isItLoading(true));
  db.collection("playlists")
  .where('userId', '==',  userId)
   .get()
   .then((snapshot) => {
    const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (allGroups.length > 0) {
  
    console.log("ALL playlists HAVE BEEN FETCHED--->:", allGroups);
  //setFiles([...files.map(obj => (obj.uploadId === uploadId ? {...file3/*,songId:allGroups[0].songId*/} : obj))]) 
    dispatch(saveAllPlaylists([...allGroups ]))

    
    
  } else {
      
    dispatch(saveAllPlaylists([ ]))

      console.log("Cannot fetch all PLAYLISTS RIGHT NOW");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
  dispatch(isItLoading(false));
});

 }


 export const fetchAllFilesForOneUser = (userId) => async (dispatch) => {
   
  dispatch(isItLoading(true));
  db.collection("temporaryUploads")
  .where('userId', '==',  userId)
   .get()
   .then((snapshot) => {
    const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (allGroups.length > 0) {
  
    console.log("ALL FILES HAVE BEEN FETCHED FROM TEMPORARY UPLOADS ARRAY--->:", allGroups);


     // Sort by createdAt in descending order (newest first)
     allGroups.sort((a, b) => (b.createdAt && b.createdAt.seconds) - (a.createdAt && a.createdAt.seconds));


  //setFiles([...files.map(obj => (obj.uploadId === uploadId ? {...file3/*,songId:allGroups[0].songId*/} : obj))]) 
    dispatch(saveAllFiles([...allGroups ]))

    
    
  } else {
      
    dispatch(saveAllFiles([ ]))

      console.log("Cannot fetch all FILES RIGHT NOW");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
  dispatch(isItLoading(false));
});

 }


 export const fetchSingleSongByUploadId = (file,files,uploadId,file3,newlyUploadedPlaylist,userId) => async (dispatch) => {
  console.log("NEWLY UPLOADED PLAYLIST LENGTH IS --->",newlyUploadedPlaylist)
  dispatch(isItLoading(true));
  dispatch(fetchAllSongsForOneUser(userId))
  db.collection("uploads")
  .where('uploadId', '==', uploadId)
   .get()
   .then((snapshot) => {
     const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
   if (allGroups.length > 0) {
    // dispatch(isItLoading(false));
     console.log("Single song Data--->:", allGroups[0]);
    
   //setFiles([...files.map(obj => (obj.uploadId === uploadId ? {...file3/*,songId:allGroups[0].songId*/} : obj))]) 
     dispatch(saveNewlyUploadedFiles([...files.map(obj => (obj.uploadId === uploadId ? {...file3/*,songId:allGroups[0].songId*/} : obj))]))
     //dispatch(saveNewlyUploadedFiles([...files.filter(obj => (obj.uploadId !== uploadId ))] ))

   if(newlyUploadedPlaylist.length > 0){ /*dispatch(saveNewlyUploadedPlaylist([...newlyUploadedPlaylist.map(obj => (obj.uploadId === uploadId ? {...file3} : obj))]))*/ }
     // dispatch(saveAllGroup(allGroups));
   } else {
       //dispatch(isItLoading(false));
       //dispatch(saveAllGroup(allGroups));
       console.log("No Single Song matching the upload ID");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });
 };


 export const fetchSingleSongByUploadIdTemporary = (file,files,uploadId,file3,setFiles) => async (dispatch) => {
  
  dispatch(isItLoading(true));
  db.collection("temporaryUploads")
  .where('uploadId', '==', uploadId)
   .get()
   .then((snapshot) => {
     const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
   
     if (allGroups.length > 0) {
    
     console.log("Single song Data FOR TEMPORARY--->:", allGroups[0]);
   //setFiles([...files.map(obj => (obj.uploadId === uploadId ? {...file3/*,songId:allGroups[0].songId*/} : obj))]) 
     dispatch(saveNewlyUploadedFiles([...files.map(obj => (obj.uploadId === uploadId ? {...file3,mediaTemporaryUrl:allGroups[0].mediaTemporaryUrl} : obj))]))

   } else {
       //dispatch(isItLoading(false));
       //dispatch(saveAllGroup(allGroups));
       console.log("No Single Song matching the upload ID FOR TEMPORARY");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });
 };

 export const fetchSingleSongByUploadIdTemporaryNewFormat = (file,files,uploadId,individualId,file2/*file3*/,setFiles) => async (dispatch) => {
  
  dispatch(isItLoading(true));
  db.collection("temporaryUploads")
  .where('uploadId', '==', uploadId)
   .get()
   .then((snapshot) => {
     const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
   
     if (allGroups.length > 0) {
    
     console.log("Single song Data FOR TEMPORARY--->:", allGroups[0]);
   //setFiles([...files.map(obj => (obj.uploadId === uploadId ? {...file3/*,songId:allGroups[0].songId*/} : obj))]) 
     //dispatch(saveNewlyUploadedFiles([...files.map(obj => (obj.uploadId === uploadId ? {...file2/*file3*/,mediaTemporaryUrl:allGroups[0].mediaTemporaryUrl} : obj))]))
    

     dispatch(saveNewlyUploadedFullSong(
      {
     ... allGroups[0],
      metadata:typeof(allGroups[0].metadata) === "string"?/*JSON.parse*/(allGroups[0].metadata):allGroups[0].metadata 
    }))

   } else {
       //dispatch(isItLoading(false));
       //dispatch(saveAllGroup(allGroups));
       console.log("No Single Song matching the upload ID FOR TEMPORARY");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });
 };



// OLD ONE! export const fetchContactsToChat = (id, type, navigate, setLoading) => async (dispatch) => {
//  var users = db.collection("users"); //later we will specify WHICH USERS WE WANT
//  users.get().then((doc) => {
//  if (doc.exists) {
//     console.log("User Data:", doc.data());
//    dispatch(saveContactsToChat(doc.data()));
//   
//  } else {
//      setLoading(false);
//     
//      console.log("CONTACTS TO CHAT HAS A PROBLEM, No USERS BEING RETURNED");
//  }
//}).catch((error) => {
//  console.log("CONTACTS TO CHAT HAS A PROBLEM, No USERS BEING RETURNED:", error);
//});
////return users;
//};


export const fetchContactsToChat = (/*id, type, navigate, setLoading*/) => async (dispatch) => {
  try {
    const snapshot = await db.collection("users").get();
    
    if (!snapshot.empty) {
      const allUsers = snapshot.docs.map(doc => ({
        id: doc.id,
        profileImg:doc.data().profileImg && doc.data().profileImg,
        username: doc.data().username && doc.data().username,
        firstName:doc.data().firstName && doc.data().firstName,
        lastName:doc.data().lastName && doc.data().lastName,
        //...doc.data()
      }));
      console.log("CONTACTS TO CHAT ALL USERS",allUsers);
      dispatch(saveContactsToChat(allUsers));
    } else {
      console.log("CONTACTS TO CHAT HAS A PROBLEM, No USERS BEING RETURNED");
    }
  } catch (error) {
    console.log("CONTACTS TO CHAT HAS A PROBLEM, No USERS BEING RETURNED:", error);
  } finally {
    /*setLoading(false);*/
    console.log("FETCH CONTACTS TO CHAT FINALLY BLOCK:");
  }
};


export const addNewMessage = (messageText,sentFromUser,sentToUser,time,loggedInUser) =>  async (dispatch) => {

 // I WILL USE THIS WHEN I MAKE A MORE EFFICIENT MESSAGE SYSTEM    
//  db.collection("messages").add({
//    ...messageObject
//}).then((res)=>{
//    console.log("RESPONSE MESSAGE ID: ", res.id);
//    
//     db.collection('messages').doc(res.id).update({
//      messageId: res.id,
//    })
//
//})




       dispatch(QuickUpdateUserDataSilent(loggedInUser,  {
               
        messageText,
        user2: sentToUser,
        user1: sentFromUser,
        sentBy:'user1',
        time:time
          }))



            db.collection('users').doc(sentToUser).get().then((doc)=>{

              const newMessages = [...doc.data().messages,
                {
               
              messageText,
              user2: sentFromUser,
              user1: sentToUser,
              sentBy:'user2',
              time:time
                }
            ]
           
               console.log("New Messages-->",newMessages)
           
               db.collection('users').doc(sentToUser)
               .update({
            
             messages:newMessages
           
           })
            })


            db.collection('users').doc(sentFromUser).get().then((doc)=>{

              const newMessages = [...doc.data().messages,
                {
               
              messageText,
              user2: sentToUser,
              user1: sentFromUser,
              sentBy:'user1',
              time:time
                }
            ]
           
               console.log("New Messages-->",newMessages)
           
               db.collection('users').doc(sentFromUser)
               .update({
            
             messages:newMessages
           
           })
            })
               .then((snapshot) => {

                dispatch(fetchUserDataSilent(sentFromUser))
                 
                  //I might need this later - dag -2020
                 //  db.collection('users').doc(sentFromUser).get().then((doc)=>{
                 //      dispatch(getParentChat(doc.data()))

                 //    }
                 //  ).catch((error) => {
                 //      var errorMessage = error.message;
                 //      console.log('Error fetching parent chat update', errorMessage);
                 //  })
           
                   
                   console.log('Sent Chat: ', snapshot);
           }).catch((error) => {
                   var errorMessage = error.message;
                   console.log('Error updating parent chat', errorMessage);
           });



}

//we'll need this for more efficient chat saving,but not using it yet
export const getRealtimeChat = (users) => async (dispatch) => {
  db.collection('chats')
  //.where('user1', 'in', [users.user1, users.user2])
  .where('user1', 'in', ["x4fd6x7kzrNgGy3ih271J8FlNWz1", "Kvg6ZASrogPptgnUBuiXkxzhaY42"])
  .orderBy('time', 'asc')
  .onSnapshot((querySnapshot) => {
      const chats = [];
      querySnapshot.forEach(doc => {
          if(
              (doc.data().user1 == users.user1 && doc.data().user2 == users.user2)
              || 
              (doc.data().user1 == users.user2 && doc.data().user2 == users.user1)
          ){
              chats.push(doc.data())
          }
      });

     // dispatch(fetchChatsSuccess(chats));
      console.log('Realtime Fetched Chats: ', chats);
      console.log('Realtime Chat Length: ', chats.length);
  })
};




 export const fetchSingleSongPartBySongGroupIdTemporary = (file,files,songGroupId,file3,setFiles) => async (dispatch) => {
  
  dispatch(isItLoading(true));
  db.collection("temporaryUploads")
  .where('songGroupId', '==', songGroupId)
   .get()
   .then((snapshot) => {
     const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
   
     if (allGroups.length > 0) {
    
     console.log("Single song Data FOR TEMPORARY--->:", allGroups[0]);
   //setFiles([...files.map(obj => (obj.songGroupId === songGroupId ? {...file3/*,songId:allGroups[0].songId*/} : obj))]) 
     dispatch(saveNewlyUploadedFiles([...files.map(obj => (obj.songGroupId === songGroupId ? {...file3,mediaTemporaryUrl:allGroups[0].mediaTemporaryUrl} : obj))]))

   } else {
       //dispatch(isItLoading(false));
       //dispatch(saveAllGroup(allGroups));
       console.log("No Single Song Part matching the upload GROUP ID FOR TEMPORARY");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });
 };





 export const fetchSinglePlaylistByPlaylistId = (playlistId) => async (dispatch) => {
 
  dispatch(isItLoading(true));
  db.collection("playlists")
  .where('playlistId', '==', playlistId)
   .get()
   .then((snapshot) => {
     const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
   if (allGroups.length > 0) {
     dispatch(isItLoading(false));
     dispatch(saveCurrentPlaylist(allGroups[0]))
    ;
   } else {
       //dispatch(isItLoading(false));
       //dispatch(saveAllGroup(allGroups));
       dispatch(saveCurrentPlaylist({}))
       console.log("No Single Song matching the upload ID");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
   dispatch(saveCurrentPlaylist({}))
 });
 };


export const fetchPublicGroup = () => async (dispatch) => {
 dispatch(isItLoading(true));
 db.collection("groups")
  .where("status", "==", "public")
  .get()
  .then((snapshot) => {
    const publicGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (publicGroups.length) {
    dispatch(isItLoading(false));
    console.log("Public Groups Data:", publicGroups);
    dispatch(savePublicGroup(publicGroups));
  } else {
      dispatch(isItLoading(false));
      console.log("No public groups!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
  dispatch(isItLoading(false));
});
};

export const fetchPrivateGroup = () => async (dispatch) => {
    dispatch(isItLoading(true));
    db.collection("groups")
     .where("status", "==", "private")
     .get()
     .then((snapshot) => {
       const privateGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
     if (privateGroups.length) {
       dispatch(isItLoading(false));
       console.log("Private Groups Data:", privateGroups);
       dispatch(savePrivateGroup(privateGroups));
     } else {
         dispatch(isItLoading(false));
         console.log("No private groups!");
     }
   }).catch((error) => {
     console.log("Error getting document:", error);
     dispatch(isItLoading(false));
   });
   };


   /*========== SAVING THE SELECTED AUDIO SO THAT ONLY ONE AUDIO CAN PLAY AT A TIME -AUDIOVYBEZ===========*/
 export const setSelectedAudioId = (uid) => async (dispatch) => {

  dispatch(saveSelectedAudioId(uid))

 }


 export const setSelectedAudio = (urlLink) => async (dispatch) => {

  dispatch(saveSelectedAudio(urlLink))
  dispatch(saveSelectedAudioState(true))

 }


 export const setSelectedAudioState = (state) => async (dispatch) => {

  dispatch(saveSelectedAudioState(state))

 }

 /*========== SAVING THE SELECTED AUDIO SO THAT ONLY ONE AUDIO CAN PLAY AT A TIME -AUDIOVYBEZ -- END===========*/


   export const joinGroup = (groupID, user, today, navigate, userWalletBal, groupFee, groupBal, groupName, accruedBalance) => async (dispatch) => {
    let todaysDate = new Date().toISOString().slice(0, 10) //2018-08-03
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
    const date = today.toISOString();  

   
    let newUserBal = userWalletBal - groupFee;
    let newGroupBal = groupBal + groupFee;
    let newAccruedBal = accruedBalance + groupFee;
      // console.log("New Group Bal: ", newGroupBal);
    dispatch(isItLoading(true));
    let newMembers;
    var docRef = db.collection("groups").doc(groupID);
    docRef.get().then((doc) => {
    const data = doc.data();
    const members = data.members;
    newMembers = [...members, user.id];
}).then(() => {
  db.collection('groups')
  var userRef = db.collection("groups").doc(groupID);
  userRef.update({
    accountBalance: newGroupBal,
    members: [...newMembers],
  }).then((res) => {
    db.collection('employees')
    .doc(user.id)
    .update({
      walletBalance: newUserBal,
      accruedBalance: newAccruedBal,
      coolers: [...user?.coolers, groupID],
    })
   .then(() => {
    db.collection('groups').doc(groupID).collection('membersCollection').add({
      memberName: user.firstName + " " + user.lastName,
      memberEmail: user.email,
      memberImageUrl: "",
      invitedBy: user.id,
      invite: 0,
      paid: 1,
      users: user.id,
      sentAt: today,
    }).then((resp) => {
      console.log("membersCollection RESPONSE: ", resp);
      db.collection('groups').doc(groupID).collection('membersCollection').doc(resp.id).update({
        id: resp.id,
      }).then(() => {
        return db.collection('inbox')
          .add({
              id: user.id,
              msg: `You have joined ${groupName}`,
              coolerName: groupName,
              amount: groupFee,
              isViewed: false,
              unread: 0,
              time: date,
          })
      }).then(() => {
        return db.collection('transactions')
          .add({
              userID: user.id,
              coolerID: groupID,
              type: 'Payment',
              amount: groupFee,
              date: todaysDate,
              createdAt: today.toLocaleDateString("en-US", options),
          })
      })
  }).then(() => {
    dispatch(isItLoading(false));
    notifySuccessFxn("Joined Group")
    // window.location = '/dashboard/home';
    navigate('/dashboard/home', { replace: true });
    }).catch((error) => {
    console.log("Error joining group:", error);
    var errorMessage = error.message;
    notifyErrorFxn(errorMessage)
    dispatch(isItLoading(false));
  });
   }) 
   })
})
 };
//    export const joinGroup = (groupID, user, today, navigate, userBal, groupFee) => async (dispatch) => {
//     dispatch(isItLoading(true));
//     let newMembers;
//     var docRef = db.collection("groups").doc(groupID);
//     docRef.get().then((doc) => {
//     const data = doc.data();
//     const members = data.members;
//     newMembers = [...members, user.id];
// }).then(() => {
//   db.collection('groups')
//   var userRef = db.collection("groups").doc(groupID);
//   userRef.update({
//     members: [...newMembers],
//   }).then((res) => {
//     db.collection('employees')
//     .doc(user.id)
//     .update({
//       coolers: [...user?.coolers, groupID],
//     })
//    .then(() => {
//     db.collection('groups').doc(groupID).collection('membersCollection').add({
//       memberName: user.firstName + " " + user.lastName,
//       memberEmail: user.email,
//       memberImageUrl: "",
//       invitedBy: user.id,
//       invite: 0,
//       paid: 1,
//       users: user.id,
//       sentAt: today,
//     }).then((resp) => {
//       console.log("membersCollection RESPONSE: ", resp);
//       db.collection('groups').doc(groupID).collection('membersCollection').doc(resp.id).update({
//         id: resp.id,
//       })
//   }).then(() => {
//     dispatch(isItLoading(false));
//     notifySuccessFxn("Joined Group")
//     navigate('/dashboard/home', { replace: true });
//     }).catch((error) => {
//     console.log("Error joining group:", error);
//     var errorMessage = error.message;
//     notifyErrorFxn(errorMessage)
//     dispatch(isItLoading(false));
//   });
//    })
      
//    })
// })
//  };


export const joinPublicGroup = (groupID, user, today, navigate) => async (dispatch) => {
    dispatch(isItLoading(true));
    let newMembers;
    var docRef = db.collection("groups").doc(groupID);
    docRef.get().then((doc) => {
    const data = doc.data();
    const members = data.members;
    newMembers = [...members, user.id];
}).then(() => {
  db.collection('groups')
  var userRef = db.collection("groups").doc(groupID);
  userRef.update({
    members: [...newMembers],
  }).then((res) => {
    db.collection('groups').doc(groupID).collection('membersCollection').add({
      memberName: user.firstName + " " + user.lastName,
      memberEmail: user.email,
      memberImageUrl: user.imageUrl,
      invitedBy: user.id,
      invite: 0,
      paid: 1,
      users: [user.id, user.id],
      sentAt: today,
    }).then((resp) => {
      console.log("membersCollection RESPONSE: ", resp);
      db.collection('groups').doc(groupID).collection('membersCollection').doc(resp.id).update({
        id: resp.id,
      })
  }).then(() => {
    dispatch(isItLoading(false));
    notifySuccessFxn("Joined Group")
    navigate('/dashboard/home', { replace: true });
    }).catch((error) => {
    console.log("Error joining group:", error);
    var errorMessage = error.message;
    notifyErrorFxn(errorMessage)
    dispatch(isItLoading(false));
  });
   })
})
 };

 
export const joinPrivateGroup = (groupID, user, today, navigate) => async (dispatch) => {
  dispatch(isItLoading(true));
  let newMembers;
  var docRef = db.collection("groups").doc(groupID);
  docRef.get().then((doc) => {
  const data = doc.data();
  const members = data.members;
  newMembers = [...members, user.id];
}).then(() => {
db.collection('groups')
var userRef = db.collection("groups").doc(groupID);
userRef.update({
  members: [...newMembers],
}).then((res) => {
  db.collection('groups').doc(groupID).collection('membersCollection').add({
    memberName: user.firstName + " " + user.lastName,
    memberEmail: user.email,
    memberImageUrl: user.imageUrl,
    invitedBy: user.id,
    invite: 0,
    paid: 1,
    users: [user.id, user.id],
    sentAt: today,
  }).then((resp) => {
    console.log("membersCollection RESPONSE: ", resp);
    db.collection('groups').doc(groupID).collection('membersCollection').doc(resp.id).update({
      id: resp.id,
    })
}).then(() => {
  dispatch(isItLoading(false));
  notifySuccessFxn("Joined Group")
  navigate('/dashboard/home', { replace: true });
  }).catch((error) => {
  console.log("Error joining group:", error);
  var errorMessage = error.message;
  notifyErrorFxn(errorMessage)
  dispatch(isItLoading(false));
});
 })
})
};


export const fetchGroupMembers = (groupMembers) => async (dispatch) => {
  dispatch(isItLoading(true));
  db.collection('employees')
    .where('id', 'in', groupMembers)
    .get()
    .then((snapshot) => {
      const groupMembers = snapshot.docs.map((doc) => ({ ...doc.data() }));
      if (groupMembers.length) {
        dispatch(isItLoading(false));
        console.log('groupMembers Data:', groupMembers);
        dispatch(saveGroupMembers(groupMembers));
      } else {
        dispatch(isItLoading(false));
        console.log('No group members!');
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
      dispatch(isItLoading(false));
    });
};

export const fetchEmployeer = (id) => async (dispatch) => {
  var user = db.collection("employers").doc(id);
  user.get().then((doc) => {
  if (doc.exists) {
    dispatch(saveEmployeer(doc.data()));
  } else {
      console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
return user;
};