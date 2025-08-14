
// Components
import SongInfoComponent from "./song-info-form.component";
import SongFileFormComponent from "./song-file.form.component";
import RecordingComponent from "./recording-form.component";
import SmartContractComponent from "./smart-contract.component";
import CompositionFormComponent from "./composition-form.component";
import TrackTagsFormComponent from "./track-tags-form.component";
import LyricsFormComponent from "./lyrics-form.component";
import OwnershipFormComponent from "./ownership-form.component";

const FormSelectorComponent = ({ form }) => {

    let template;

    switch(form) {
        case "song-info": 

            template = 
            <div style={{height:"69.7vh"}}>
            <SongInfoComponent />
            </div>
            break;
        case "song-files": 
            template = 
            <div style={{height:"69.7vh"}}>
            <SongFileFormComponent />
            </div>
            break;
        case "recording":
            template = 
            <div style={{height:"69.7vh"}}>
            <RecordingComponent />
            </div>
            break;
        case "smart-contracts": 
            template =
            <div style={{height:"69.7vh"}}>
            <SmartContractComponent />
            </div>
            break;
        case "composition": 
            template = 
            <div style={{height:"69.7vh"}}>
            <CompositionFormComponent />
            </div>
            break;
        case "track-tags": 

            template = 
           
            <div style={{height:"69.7vh"}}>
              <TrackTagsFormComponent />
            </div>
            break;
        case "lyrics":
            template = 
            <div style={{height:"69.7vh"}}>
            <LyricsFormComponent />
            </div>

            break;
        case "ownership": 
            template = 
            <div style={{height:"69.7vh"}}>
            <OwnershipFormComponent />
            </div>

            break;
        default:
            template = "";
            break;
    }

    return template;
}

export default FormSelectorComponent;
