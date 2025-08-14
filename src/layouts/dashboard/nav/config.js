// component
import SvgColor from '../../../components/svg-color';


// const icon = (name) => <SvgColor src={`/assets/icons/${name}.png`} sx={{ width: 1, height: 1 }} />;
const icon = (name) => <img src={`/assets/icons2/${name}.png`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/home',
    icon: icon('dashboard'),
  },
  {
    title: 'Products',
    //path: '/dashboard/products',
    path: '/dashboard/products',
    icon: icon('teacher'),
  },
  {
    title: 'Deposits',
    path: '/dashboard/deposits',
    icon: icon('student'),
  },
 

  
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

export default navConfig;
