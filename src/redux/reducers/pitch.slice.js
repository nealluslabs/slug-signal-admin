import { createSlice } from '@reduxjs/toolkit';

const initialState = {
     
       dob:'',
       gender:'',
       sport:'',
       position:'',
       team:'',
       twitter:'',
       tiktok:'',
       instagram:'',
       highlights:'',
       pitchRate:'',
       profilePicture:'',
       profilePictureName:'',
       profilePictureBlob:'',
       previousPartnerships:'',
       preferredBrands:'',
       usp:'',
       brandAlignment:'',
       careerGoals:'',
      isLoading: false,
};

const pitchSlice = createSlice({
  name: 'pitch',
  initialState,
  reducers: {

    isItLoading: (state, action) => {
      state.isLoading = action.payload;
  },

  saveDob: (state, action) => {
    state.dob = action.payload;
},

saveGender: (state, action) => {
  state.gender = action.payload;
},
saveSport: (state, action) => {
  state.sport = action.payload;
},

savePosition: (state, action) => {
  state.position = action.payload;
},

saveTeam: (state, action) => {
  state.team = action.payload;
},

saveTwitter: (state, action) => {
  state.twitter = action.payload;
},
saveTiktok: (state, action) => {
  state.tiktok = action.payload;
},
saveInstagram: (state, action) => {
  state.instagram = action.payload;
},
saveHighlights: (state, action) => {
  state.highlights = action.payload;
},
savePitchRate: (state, action) => {
  state.pitchRate = action.payload;
},
saveProfilePicture: (state, action) => {
  state.profilePicture = action.payload;
},
 saveProfilePictureName: (state, action) => {
  state.profilePictureName = action.payload;
},
saveProfilePictureBlob: (state, action) => {
  state.profilePictureBlob = action.payload;
},

savePreviousPartnerships: (state, action) => {
  state.previousPartnerships = action.payload;
},
savePreferredBrands: (state, action) => {
  state.preferredBrands = action.payload;
},
saveUsp: (state, action) => {
  state.usp = action.payload;
},
saveBrandAlignment: (state, action) => {
  state.brandAlignment = action.payload;
},
saveCareerGoals: (state, action) => {
  state.careerGoals = action.payload;
},

    clearPitch: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = pitchSlice;

export const {
  saveDob,
saveGender,
saveSport,
savePosition,
saveTeam,
saveTwitter,
saveTiktok,
saveInstagram,
saveHighlights,
savePitchRate,
saveProfilePicture,
saveProfilePictureName,
saveProfilePictureBlob,

savePreviousPartnerships,
savePreferredBrands,
saveUsp,
saveBrandAlignment,
saveCareerGoals,

 isItLoading,

 clearPitch
} = actions;

export default reducer;


