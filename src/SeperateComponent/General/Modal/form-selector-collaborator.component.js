
// Components
import SongInfoComponent from "./song-info-form.component";
import SongFileFormComponent from "./song-file.form.component";
import RecordingComponent from "./recording-form.component";
import SmartContractComponent from "./smart-contract.component";
import CompositionFormComponent from "./composition-form.component";
import TrackTagsFormComponent from "./track-tags-form.component";
import LyricsFormComponent from "./lyrics-form.component";
import OwnershipFormComponent from "./ownership-form.component";
import ContactInfoComponent from "./contact-info-form.component";
import CompositionFormCollaboratorComponent from "./composition-form-collaborator.component";
import PublishingFormComponent from "./publishing-form.component";
import ExtrasFormComponent from "./extras-form.component";
import MastersFormComponent from "./masters-form.component";

const FormSelectorCollaboratorComponent = ({ form }) => {

    let template;

    switch(form) {
        case "contact-info": 

            template = 
            <div style={{height:"22.7vh"}}>
            <ContactInfoComponent />
            </div>
            break;
        case "composition": 
            template = 
            <div style={{height:"22.7vh"}}>
            <CompositionFormCollaboratorComponent />
            </div>
            break;
        case "publishing":
            template = 
            <div style={{height:"22.7vh"}}>
            <PublishingFormComponent />
            </div>
            break;
        case "masters": 
            template =
            <div style={{height:"22.7vh"}}>
            <MastersFormComponent />
            </div>
            break;
        case "extras": 
            template = 
            <div style={{height:"22.7vh"}}>
            <ExtrasFormComponent />
            </div>
            break;
        
        default:
            template = "";
            break;
    }

    return template;
}

export default FormSelectorCollaboratorComponent;
