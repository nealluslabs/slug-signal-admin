import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@mui/icons-material/Lock';
import { Divider, Chip, Grid, Paper, Typography, Box, Avatar, Button, ButtonBase, Stack, 
  ToggleButton, ToggleButtonGroup, Hidden  } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
//import {fetchSubjectChapters, updateVideoAndUserWatchlists,fetchSubjectInfo} from 'src/redux/actions/group.action'

import { useNavigate } from 'react-router-dom';
import redboy from 'src/assets/images/redboy.jpeg';

//import { setRequestedSection,savePresentOpenChapter } from 'src/redux/reducers/group.slice';



//import {SlideDown} from 'react-slidedown'
//import 'react-slidedown/lib/slidedown.css'

//import ChapterCard from   'src/components/chapters/chapter-card';
//import ExamCard from   'src/components/chapters/exam-card';
//import { populate } from 'react-redux-firebase';
//import QuizCard from '../chapters/quiz-card';
//import PastExamCard from '../chapters/pastExam-card';



const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap:'1.5rem',
    backgroundColor:'#F9F9F9',
    //border:'1px solid lightgrey',
    borderRadius:'1rem',
    width: '100%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  text: {
   // width: '80%',
    color: 'grey',
  },
  buttonSpacer: {
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center',
    gap:'20px'
  },
  button: {
    width: '20%',
    marginLeft: 'auto',
  },
}));


const DealCard = ({data,name,uni,pic,collection,type="one"}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

//  const { allSectionVideos,requestedSection } = useSelector((state) => state.group);
//    const { categoryChapters,presentOpenChapter,subjectPastExams} = useSelector((state) => state.group);
   // const { user} = useSelector((state) => state.auth);


  const dummyData = [
    {uid: 1, title: "General (16 mins)", desc: "Lorem ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
    {uid: 2, title: "Public (11 mins)", desc: "Tetsla ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
    {uid: 3, title: "Future (39 mins)", desc: "Lorem ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
];

  
  const [loading,setLoading] =useState(false)
  const [wait,setWait] =useState(false)
  const [dropDown, setDropDown] = useState(false);
  const [categoryData,setCategoryData] = useState(/*categoryChapters?categoryChapters:dummyData*/) 

  //console.log("THE VIDEO ID IS",dummyData[0].uid)
  console.log(" SUBJECT CARD  CHECK !!!!- - -",data)
  

  useEffect(()=>{ 
    //this code is responsible for the right section appearing in the dropdown
  //  if(presentOpenChapter !== data.uid){setTimeout(()=>{setDropDown(false)},300)}
  // 
  //     setTimeout(()=>{setCategoryData(categoryChapters)},600)

    },[/*categoryChapters,presentOpenChapter*/])


    const fetchChaptersAndDropDown  = (id)=> {
      console.log("ID BEING PASSED IN IS",id)
 if(!dropDown){
      setLoading(true)
   //   dispatch(fetchSubjectChapters(id))
   //   dispatch(savePresentOpenChapter(id))
      console.log("I WANNA SEE CATEGORY CAHPTERS", categoryData)
     setTimeout(()=>{setLoading(false);setDropDown(true)},600)
     }
     else{
       setDropDown(false)
     }


    }

    const populateEditSubject = (identity)=>{

      setWait(true)
    //  dispatch(fetchSubjectInfo(identity))

     //setTimeout(()=> {navigate('/dashboard/edit-subject',{state:{uid:identity}})}, 1500)
    }



  return (
    <>
    <div className={classes.row}>
      <div className={classes.text}>
        <div style={{ color: 'black',display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center" }}>
          {/*<b>{ `${index + 1}.) `} {data && data.title} </b>*/}
          <img src={pic} style={{marginLeft:"2rem",marginBottom:"1rem",height:"10rem",borderRadius:"1.5rem"}} alt="athlete image"/>
        </div>

      

      </div>


      <div style={{ display:"flex",flexDirection:"column",justifyContent:"flex-start",gap:"1px" ,width:"75%",paddingLeft:"8rem"}}>
          
          <div style={{fontWeight:"500",fontSize:"1.5rem"}}>{name} </div>
          <div  style={{fontWeight:"500",fontSize:"3.5rem"}}> {collection} </div>
          <div  style={{fontWeight:"500",fontSize:"1.5rem"}}>{uni}  </div>


        </div>

    {type !== "two" &&
    
    <div className={classes.buttonSpacer}>

      <Button variant="contained" style={{minHeight: '55px', minWidth: '145px', backgroundColor: '#000000', borderRadius:"1.5rem"}}
              onClick={() => {
               
            
                //fetchChaptersAndDropDown(data.uid)
              }}>
                {loading?"Loading...":"Edit"}
            </Button>


      <Button variant="contained" style={{minHeight: '55px', minWidth: '145px', backgroundColor: '#C32914', borderRadius:"1.5rem"}}
              onClick={() => {
               
              //navigate('/dashboard/agreements')
                //fetchChaptersAndDropDown(data.uid)
              }}>
                {loading?"Loading...":"View"}
            </Button>


       </div> }
           
    </div>



     </>
  );
};

export default DealCard;
