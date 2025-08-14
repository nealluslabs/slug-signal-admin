import { db, fb, auth, storage } from '../../config/firebase';
import { clearUser, loginFailed, loginSuccess, logoutFxn, signupFailed, storeUserData } from '../reducers/auth.slice';
import { v4 as uuidv4 } from 'uuid';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { clearGroup, saveMySignals } from '../reducers/group.slice';
import { clearPitch } from '../reducers/pitch.slice';
import { fetchAllSongs,fetchAllSongsForOneUser, fetchAllTrends, fetchContactsToChat } from './group.action';


export const signin = (user, navigate, setLoading) => async (dispatch) => {
   //dispatch(clearPitch()) DONT CLEAR DATA JUST YET - JAN 28 2025

  fb.auth().signInWithEmailAndPassword(user.email, user.password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log('Signed In user is: ', user.email);
    console.log('Signed In user ID is: ', user);
  
   // dispatch(fetchContactsToChat())
     dispatch(fetchUserData(user.uid, "sigin", navigate, setLoading));
   
  })
  .catch((error) => {
    setLoading(false);
    var errorCode = error.code;
    var errorMessage = error.message;

    const isValidJSON = (str) => {
      try {
        JSON.parse(str);
        return true;
      } catch (error) {
        return false;
      }
    };


  
    notifyErrorFxn(isValidJSON(errorMessage) ?"Invalid Login Credentials":errorMessage);
    console.log(/*'Error Code is: ', errorCode, + */' Msg is-->: ', errorMessage);
   // console.log("TYPE OF ERROR MESSAGE IS --->",typeof(JSON.parse(errorMessage)) )
    dispatch(loginFailed(errorMessage && errorMessage.error &&  errorMessage.error && errorMessage.error ?errorMessage.error.message:errorMessage));
  });

};

export const signinAthlete = (user, navigate, setLoading) => async (dispatch) => {
   
  dispatch(clearPitch())

  fb.auth().signInWithEmailAndPassword(user.email, user.password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log('Signed In user is: ', user.email);
    //I AM COMMENTING OUT USER DATA FOR NOW, FOR UfarmX ATHLETES, LATER THERE WILL BE A COLLECTION THAT I CALL FROM - MAY 28TH 2024
     dispatch(fetchUserDataAthlete(user.uid, "sigin", navigate, setLoading));
  })
  .catch((error) => {
    setLoading(false);
    var errorCode = error.code;
    var errorMessage = error.message;
    notifyErrorFxn(errorMessage);
    console.log('Error Code is: ', errorCode, + ' Msg is: ', errorMessage);
    dispatch(loginFailed(errorMessage));
  });

};


export const signup = (user, navigate, setLoading) => async (dispatch) => {
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var today  = new Date();

    dispatch(clearPitch())

  fb.auth().createUserWithEmailAndPassword(
    user.email,
    user.password
).then((res)=>{
  console.log("Good to go...");
  return db.collection('users').doc(res.user.uid).set({
    id: res.user.uid,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    companyName: user.companyName,
    mySignals:[],
    password: user.password,
    
    accountCreated: today.toLocaleDateString("en-US", options),
  })
}).then(() => {
  notifySuccessFxn('Registered Successfully✔');
  navigate('/login', { replace: true });
}).catch((err) => {
  console.error("Error signing up: ", err);
  var errorMessage = err.message;
  notifyErrorFxn(errorMessage);
  dispatch(signupFailed({ errorMessage }));
  setLoading(false);
})
}


export const uploadImage = (user, file, navigate, setLoading) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  console.log('File Name: ', imageName);
  const uploadTask = storage.ref(`profile_images/${imageName}`).put(file);
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
        .ref("profile_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
          console.log('Image URL: ', url);
          dispatch(signup(user, file, navigate, setLoading, url));
        });
    }
  );
}


export const fetchUserData = (id, type, navigate, setLoading) => async (dispatch) => {
  var user = db.collection("users").doc(id);
  user.get().then((doc) => {
  if (doc.exists) {
     console.log("User Data:", doc.data());
    dispatch(storeUserData(doc.data()));

    dispatch(saveMySignals(doc.data().mySignals))

    if(type === "sigin"){
      notifySuccessFxn("Logged In😊");
      navigate('/home', { replace: true });
    }
  } else {
      setLoading(false);
      notifyErrorFxn("Unauthorized❌")
      console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
return user;
};


export const updateUserSignals = (id,signal) => async (dispatch) => {
 
  console.log("ID ENETERING IS--->",id);
 
  var user = db.collection("users").doc(id);
  user.get().then((doc) => {
    

    if (doc.exists) {
        const data = doc.data();
        const existingSignals = data.mySignals || [];

        // Add the new signal
        //const updatedSignals = [...existingSignals, signal]:[...existingSignals];
            const updatedSignals = existingSignals.some(s => s === signal.id)
           ? [...existingSignals]
           : [...existingSignals, signal.id]; //only the signal id is to be added here, not the whole signal
       
        // Update Firestore document
        user.update({ mySignals: updatedSignals })
          .then(() => {
            console.log("User signals updated successfully.");
            // You can dispatch an action here if needed
             notifySuccessFxn("Signal has been added to Your Signals!")
            dispatch(fetchUserDataSilent(id))
          })
          .catch((error) => {
            console.error("Error updating document:", error);
          });

      } else {
        console.log("No such user document!");
      }
   

}).catch((error) => {
  console.log("Error updating document:", error);
});

}


export const approveSignals = (id) => async (dispatch) => {
 
  console.log("ID ENETERING IS--->",id);
 
  var user = db.collection("trends").doc(id);
  user.update({
    status:"Approved"
  })

  dispatch(fetchAllTrends())

   notifySuccessFxn("Signal Approved for display!")

}


export const disapproveSignals = (id) => async (dispatch) => {
 
  console.log("ID ENETERING IS--->",id);
 
  var user = db.collection("trends").doc(id);
  user.update({
    status:"Not Approved"
  })

  dispatch(fetchAllTrends())

   notifySuccessFxn("Signal Marked as Not Approved")

}






export const fetchUserDataSilent = (id) => async (dispatch) => {
  var user = db.collection("users").doc(id);
  user.get().then((doc) => {
  if (doc.exists) {
     console.log("User Data:", doc.data());
    dispatch(storeUserData(doc.data()));

    dispatch(saveMySignals(doc.data().mySignals))
   
  } else {
     // setLoading(false);
      //notifyErrorFxn("Unauthorized❌")
      console.log("No such document, to update chats!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
return user;
}


export const QuickUpdateUserDataSilent = (userWeHave,newMessage) => async (dispatch) => {
   
  const user = {...userWeHave,messages:[...userWeHave.messages,{...newMessage}]}

 
     console.log("USER IS NOW:",user)
    dispatch(storeUserData(user));

}


export const fetchUserDataAthlete = (id, type, navigate, setLoading) => async (dispatch) => {
  var user = db.collection("users").doc(id);
  user.get().then((doc) => {
  if (doc.exists) {
    // console.log("User Data:", doc.data());
    dispatch(storeUserData(doc.data()));
    if(type === "sigin"){
      notifySuccessFxn("Logged In😊");
      navigate('/dashboard/home-athlete', { replace: true });
    }
  } else {
      setLoading(false);
      notifyErrorFxn("Unauthorized❌")
      console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
return user;
};


export const uploadProfileImage = (profileData, file, userID, navigate, setLoading) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  console.log('File Name: ', imageName);
  const uploadTask = storage.ref(`profile_images/${imageName}`).put(file);
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
        .ref("profile_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
          console.log('Image URL: ', url);
          dispatch(updateProfile(profileData, userID, file, navigate, setLoading, url));
        });
    }
  );
}


export const updateProfile = (profileData, userID/*, file, navigate, setLoading, url*/) => async (dispatch) => {
  // return  
  //db.collection('users').doc(userID).update({
  //  paymentLink: profileData.paymentLink,
  //  imageUrl: url,
  //}).then((res)=>{
       if(profileData?.password){
        //update password start
        const user = auth.currentUser;
        user.updatePassword(profileData.password)
          .then(()=>{
     db.collection("users").doc(userID).update({
      password:profileData?.password
     }).catch((error) => {
      // An error happened.
      console.log('COULDNT UPDATE USER PASSWORD IN THEIR RECORDS-->: ', error.message);
    })

          }).then(() => {
            //setLoading(false);
            console.log("Password updated successfully");
            notifySuccessFxn("Updated successfully");
            //navigate('/dashboard/home', { replace: true });
          })
          .catch((error) => {
            //setLoading(false);
            console.error("Error updating password: ", error);
            notifyErrorFxn(error.message);
          });
       //update password end
       }else{
        //setLoading(false);
        console.error("No Password to update");
        notifySuccessFxn("Updated successfully");
        //navigate('/dashboard/home', { replace: true });
       }
     
  //}).catch((err) => {
  // // setLoading(false);
  //  console.log("ERR-: ", err);
  //})
}


export const logout = (navigate) => async (dispatch) => {
  fb.auth().signOut().then(() => {
    dispatch(logoutFxn());
    dispatch(clearUser());
    dispatch(clearGroup());
    navigate('/', { replace: true });
    notifySuccessFxn("Logged out!")
    console.log('logout successful!');
  }).catch((error) => {
    // An error happened.
    console.log('logout failed response: ', error.message);
  });
  
}