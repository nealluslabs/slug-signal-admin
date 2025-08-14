import { createSlice } from '@reduxjs/toolkit';

const initialState = {
       myGroups: [], 
       mySignals:  [{
        id:"1",
        title:"Digital Detox",
        subtitle:"Rise in #DigitalDetox movements among Gen Z users.",
        trendName:"Digital Detox",
        trendSummary:"Rise in #DigitalDetox movements among Gen Z users.",
        link:"/home/details/digitalDetox",
        image:"https://res.cloudinary.com/glide/image/fetch/f_auto,w_500,c_limit/https%3A%2F%2Fc8.alamy.com%2Fcomp%2F2C3WE55%2Fwoman-sitting-lotus-pose-and-meditating-digital-detox-offline-activities-concept-girl-spending-time-without-gadgets-abandoning-internet-social-networks-full-length-vertical-vector-illustration-2C3WE55.jpg"
        },{
          id:"2",
          title:"Afrofuturism",
          subtitle:"A surge in Afrofuturist aesthetics in fashion and film.",
          trendName:"Afrofuturism",
          trendSummary:"A surge in Afrofuturist aesthetics in fashion and film.",
          link:"/home/details/afrofuturism",
          image:"https://res.cloudinary.com/glide/image/fetch/f_auto,w_500,c_limit/https%3A%2F%2Fimages.squarespace-cdn.com%2Fcontent%2Fv1%2F52fd6682e4b0209674952cb5%2F904b3a82-e3a2-44d1-9fbd-32b6b7a2824d%2FAfricanFuturism%2BNew.jpg",
        
        },{
          id:"3",
          title:"Retro Tech",
          subtitle:"Renewed interest in 90s gaming consoles and retro tech.",
          trendName:"Retro Tech",
          trendSummary:"Renewed interest in 90s gaming consoles and retro tech.",
          link:"/home/details/retroTech",
          image:"https://static.vecteezy.com/system/resources/thumbnails/037/494/086/large/vertical-retro-futuristic-1980s-technology-background-animation-with-multicolored-blinking-led-data-display-lights-this-tech-motion-background-is-full-hd-and-a-seamless-loop-free-video.jpg"
        }],
      
        allTrends: [], 
        filteredTrends: [], 
        trendInFocus:{},
       allGroups: [], 
       publicGroups: [], 
       privateGroups: [],
       groupMembers: [], 
       
       employeer: {}, 
       currentDepositsToDisplay:{},
       message: '',
       loggedInFarmer:{},
      isLoading: false,
      isPlaylistLoading: false,
      
      playlistName:'',
      allPlaylists:[],
      allCollaborators:[],
      allFiles:[],
      
      allSongs:[],
      arrayStartingIndex:0,
      arrayEndingIndex:4,
      currentSong:{},
      currentCollaborator:{},
      currentFileToEdit:{},
      songCreatorSongs:[],
      playlistCreatorPlaylists:[],
      songCreatorActiveSong:{},
      playlistCreatorActivePlaylist:null,
      lastDraggedFileType:null,
      songSearchTerm:null,
      fileSearchTerm:null,
      playlistSearchTerm:null,
      
      songSearchInFocus:false,
      fileSearchInFocus:true,
      playlistSearchInFocus:false,
      newPlaylistBeingCreated:[],
      songCreatorActiveHeaderId:null,
      songCreatorActiveSongId:null,
      listOfNewSongsBeingCreated:[],
      listOfNewSongsBeingComposed:[],

      songInterimHolder:{},
      fileToDisplay:[],
      otherMusicFileIdsToDisplay:[],
      songCreatorActive:false,
      fileUploaderActive:true,
      songEditorActive:false,
      currentPlaylist:{},
      currentSongUploadId:null,
      currentlyEditingPlaylistName:'',
      currentlyEditingPlaylistId:'',
      currentCoverArt:{},
      currentCollaboratorImage:{},
      newlyUploadedFiles:[],
      newlyUploadedFullSong:null,
      newlyUploadedPlaylist:[],
      allSongsFromCurrentPlaylistToEdit:[],
      allSongsFromAllPlaylistsToEdit:[],
      progressOnSelectedAudio:0,
      selectedAudioId:null,
      selectedAudio:null,
      selectedAudioState:false,
      fileManagerActive:true,
      selectedUserToChat:{},
      contactsToChat:{},
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    saveMyGroup: (state, action) => {
        state.myGroups = action.payload;
    },
    saveMySignals: (state, action) => {
      state.mySignals = action.payload;
  },
    saveAllGroup: (state, action) => {
        state.allGroups = action.payload;
    },

    saveAllTrends: (state, action) => {
      state.allTrends = action.payload;
  },
  saveFilteredTrends: (state, action) => {
    state.filteredTrends = action.payload;
},
    savePublicGroup: (state, action) => {
        state.publicGroups = action.payload;
    },
    saveLoggedInFarmer: (state, action) => {
      state.loggedInFarmer = action.payload;
  },
  saveCurrentDepositsToDisplay: (state, action) => {
    state.currentDepositsToDisplay = action.payload;
},
  clearCurrentDepositsToDisplay: (state, action) => {
    state.currentDepositsToDisplay = [];
  },
    savePrivateGroup: (state, action) => {
        state.privateGroups = action.payload;
    },
    saveGroupMembers: (state, action) => {
      state.groupMembers = action.payload;
  },
    saveEmployeer: (state, action) => {
      state.employeer = action.payload;
  },
    isItLoading: (state, action) => {
      state.isLoading = action.payload;
  },


/**AUDIO VYBEZ STATE  BELOW */

  isPlaylistSongsLoading: (state, action) => {
    state.isPlaylistLoading = action.payload;
},
  
  saveAllSongs: (state, action) => {
    state.allSongs = action.payload;
 },
 saveAllPlaylists: (state, action) => {
  state.allPlaylists = action.payload;
},
saveAllCollaborators: (state, action) => {
  state.allCollaborators = action.payload;
},
saveAllFiles: (state, action) => {
  state.allFiles = action.payload;
},
saveFileManagerActive: (state, action) => {
  state.fileManagerActive = action.payload;
},
saveNewPlaylistBeingCreated: (state, action) => {
  state.newPlaylistBeingCreated = action.payload;
},
saveSongCreatorActiveHeaderId: (state, action) => {
  state.songCreatorActiveHeaderId = action.payload;
},
saveSongCreatorActiveSongId: (state, action) => {
  state.songCreatorActiveSongId = action.payload;
},


saveListOfNewSongsBeingCreated: (state, action) => {
  state.listOfNewSongsBeingCreated = action.payload;
},

saveListOfNewSongsBeingComposed: (state, action) => {
  state.listOfNewSongsBeingComposed = action.payload;
},

saveSongCreatorActive: (state, action) => {
  state.songCreatorActive = action.payload;
},
saveFileUploaderActive: (state, action) => {
  state.fileUploaderActive = action.payload;
},
saveSongEditorActive: (state, action) => {
  state.songEditorActive = action.payload;
},
saveSongSearchInFocus: (state, action) => {
  state.songSearchInFocus = action.payload;
},
saveFileSearchInFocus: (state, action) => {
  state.fileSearchInFocus = action.payload;
},
savePlaylistSearchInFocus: (state, action) => {
  state.playlistSearchInFocus = action.payload;
},
saveSongSearchTerm: (state, action) => {
  state.songSearchTerm = action.payload;
},
saveFileSearchTerm: (state, action) => {
  state.fileSearchTerm = action.payload;
},
savePlaylistSearchTerm: (state, action) => {
  state.playlistSearchTerm = action.payload;
},
saveAllSongsFromAPlaylist: (state, action) => {
  state.allSongsFromAPlaylist = action.payload;
},

saveAllSongsFromCurrentPlaylistToEdit: (state, action) => {
  state.allSongsFromCurrentPlaylistToEdit = action.payload;
},


saveAllSongsFromAllPlaylistsToEdit: (state, action) => {
  state.allSongsFromAllPlaylistsToEdit = action.payload;
},

  saveCurrentSong: (state, action) => {
    state.currentSong = action.payload;
 },
 saveCurrentCollaborator: (state, action) => {
  state.currentCollaborator = action.payload;
},
 saveCurrentFileToEdit: (state, action) => {
  state.currentFileToEdit = action.payload;
},
 saveSongCreatorSongs: (state, action) => {
  state.songCreatorSongs = action.payload;
},
savePlaylistCreatorPlaylists: (state, action) => {
  state.playlistCreatorPlaylists = action.payload;
},
saveSongCreatorActiveSong: (state, action) => {
  state.songCreatorActiveSong = action.payload;
},
savePlaylistCreatorActivePlaylist: (state, action) => {
  state.playlistCreatorActivePlaylist = action.payload;
},
 saveLastDraggedFileType: (state, action) => {
  state.lastDraggedFileType = action.payload;
},

 saveSongInterimHolder: (state, action) => {
  state.songInterimHolder = action.payload;
},
saveTrendInFocus: (state, action) => {
  state.trendInFocus = action.payload;
},
saveFileToDisplay: (state, action) => {
  state.fileToDisplay = action.payload;
},
saveOtherMusicFileIdsToDisplay: (state, action) => {
  state.otherMusicFileIdsToDisplay = action.payload;
},
 saveCurrentPlaylist: (state, action) => {
  state.currentPlaylist = action.payload;
},
 saveCurrentCoverArt: (state, action) => {
  state.currentCoverArt = action.payload;
},

saveCurrentCollaboratorImg: (state, action) => {
  state.currentCollaboratorImg = action.payload;
},

saveSelectedAudioId: (state, action) => {
  state.selectedAudioId = action.payload;
},
saveSelectedAudio: (state, action) => {
state.selectedAudio = action.payload;
state.selectedAudioState = true 
},
saveProgressOnSelectedAudio: (state, action) => {
  state.progressOnSelectedAudio = action.payload;
 
  },
  
saveSelectedAudioState: (state, action) => {
state.selectedAudioState = action.payload;

},

 saveNewlyUploadedFiles: (state, action) => {
  state.newlyUploadedFiles = action.payload;
},

saveNewlyUploadedFullSong: (state, action) => {
  state.newlyUploadedFullSong = action.payload;
},

savePlaylistName: (state, action) => {
  state.playlistName = action.payload;
},
saveCurrentSongUploadId: (state, action) => {
  state.currentSongUploadId = action.payload;
},
saveCurrentlyEditingPlaylistName: (state, action) => {
  state.currentlyEditingPlaylistName = action.payload;
},
saveCurrentlyEditingPlaylistId: (state, action) => {
  state.currentlyEditingPlaylistId = action.payload;
},


saveArrayStartingIndex: (state, action) => {
  state.arrayStartingIndex = action.payload;
},
saveArrayEndingIndex: (state, action) => {
  state.arrayEndingIndex = action.payload;
},


saveNewlyUploadedPlaylist: (state, action) => {
  state.newlyUploadedPlaylist = action.payload;
},
saveSelectedUserToChat: (state, action) => {
  state.selectedUserToChat = action.payload;
},
saveContactsToChat: (state, action) => {
  state.contactsToChat = action.payload;
},



    clearGroup: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = groupSlice;

export const {
 saveMyGroup,
 saveMySignals,
 saveAllGroup,
 saveAllTrends,
 saveFilteredTrends,
 savePublicGroup,
 savePrivateGroup,
 saveLoggedInFarmer,
 saveCurrentDepositsToDisplay,
 clearCurrentDepositsToDisplay,
 saveGroupMembers,
 saveEmployeer,
 isItLoading,
 
 saveFileSearchTerm,
 saveSongSearchTerm,
 savePlaylistSearchTerm,
 saveSongSearchInFocus,
 saveFileSearchInFocus,
 savePlaylistSearchInFocus,

 saveFileManagerActive,
 saveNewPlaylistBeingCreated,
 saveSongCreatorActiveHeaderId,
 saveSongCreatorActiveSongId,
 saveListOfNewSongsBeingCreated,
 saveListOfNewSongsBeingComposed,
 saveSelectedAudioId,
 saveSelectedAudio,
 saveProgressOnSelectedAudio,
 saveSelectedAudioState,
 isPlaylistSongsLoading,
 saveArrayStartingIndex,
 saveArrayEndingIndex,
 saveSongCreatorActive,
 saveSongEditorActive,
 saveFileUploaderActive,
 saveAllSongs,
 saveAllPlaylists,
 saveAllCollaborators,
 saveAllFiles,
 saveAllSongsFromAPlaylist,
 saveAllSongsFromCurrentPlaylistToEdit,
 saveAllSongsFromAllPlaylistsToEdit,
 saveSongInterimHolder,
 saveTrendInFocus,
 saveFileToDisplay,
 saveOtherMusicFileIdsToDisplay,
 saveCurrentSong,
 saveCurrentCollaborator,
 saveCurrentFileToEdit,
 saveSongCreatorActiveSong,
 savePlaylistCreatorActivePlaylist,
 saveSongCreatorSongs,
 savePlaylistCreatorPlaylists,
 saveLastDraggedFileType,
 saveCurrentPlaylist,
 saveCurrentSongUploadId,
 saveCurrentlyEditingPlaylistName,
 saveCurrentlyEditingPlaylistId,
 saveCurrentCoverArt,
 saveCurrentCollaboratorImg,
 savePlaylistName,
 saveNewlyUploadedFiles,
 saveNewlyUploadedFullSong,
 saveNewlyUploadedPlaylist,
 saveSelectedUserToChat,
 saveContactsToChat,
 clearGroup
} = actions;

export default reducer;


