import { db } from "../../config/firebase";
// import { fetchJobs, fetchSingleJob } from "../reducers/job.slice";
import { fetchCampaigns } from "../reducers/campaign.slice";

export const getCampaigns = () => async (dispatch) => {
    db.collection('Campaigns').get().then((snapshot) => {
        const campaigns = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }));
        // console.log('Campaigns: ', campaigns);
        dispatch(fetchCampaigns(campaigns));
    }).catch((error) => {
        var errorMessage = error.message;
        console.log('Error fetching campaigns', errorMessage);
    });
};
export const getSingleCampagin = (id) => async (dispatch) => {
    var campagin = db.collection("Campaigns").doc(id);

    campagin.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        dispatch(fetchCampaigns(doc.data()));
    } else {
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});
}   

export const addCampagin = (campagin, setLoading, clearState) => async (dispatch) => {
    db.collection("Campaigns").add({
        title: campagin.title,
        description: campagin.description,
        startDate: campagin.startDate,
        endDate: campagin.endDate,
        // targetAmount: campagin.targetAmount,
        // currentAmount: campagin.currentAmount,
        // status: campagin.status
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        clearState();
        setLoading(false);
        alert('Campaign has been added.');
        
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        alert('Error adding campaign.')
    });

};


// export const getCampagin = (uid) => async (dispatch) => {
//     db.collection('Jobs').get().then((snapshot) => {
//         const jobs = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }));
//         // console.log('Jobs: ', jobs);
//         dispatch(fetchJobs(jobs));
// }).catch((error) => {
//         var errorMessage = error.message;
//         console.log('Error fetching jobs', errorMessage);
// });
// };
