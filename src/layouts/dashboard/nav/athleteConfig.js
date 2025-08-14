// component
import SvgColor from '../../../components/svg-color';


// const icon = (name) => <SvgColor src={`/assets/icons/${name}.png`} sx={{ width: 1, height: 1 }} />;
const icon = (name) => <img src={`/assets/icons2/${name}.png`} sx={{ width: 1, height: 1 }} />;

const athleteConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/home-athlete',
    icon: icon('dashboard'),
  },
  {
    title: 'Deals',
    path: '/dashboard/agreements',
    //path: '#',
    icon: icon('student'),
  },
  {
    title: 'Pitch',
    path: '/dashboard/create-pitch-general-info-page', 
    //path: '#',
    icon: icon('report'),
  },
 /* {
    title: 'Pitches',
    //path: '/dashboard/products',
    path: '#',
    icon: icon('teacher'),
  },*/

  
  {
    title: 'Settings',
     path: '/dashboard/settings',
    //path: '#',
    icon: icon('settings'),
  },

  {
    title: 'Logout',
   path: '/logout',
   
    icon: icon('logout'),
  },
];

export default athleteConfig;
