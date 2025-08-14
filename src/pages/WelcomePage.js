
import Header from '../componentsWelcome/header/Header'
import Nav from '../componentsWelcome/nav/Nav'

import Experience from '../componentsWelcome/experience/Experience'
import Footer from '../componentsWelcome/footer/Footer'

import About from '../componentsWelcome/about/About'
import Explore from 'src/componentsWelcome/explore/Explore'
import Letter from 'src/componentsWelcome/letter/Letter'
/*import RangeTable from '../componentsWelcome/rangeTable/RangeTable'*/
/*import Choice from '../componentsWelcome/choice/Choice'
import Solutions from '../componentsWelcome/solutions/Solutions'*/
//import Testimonials from '../componentsWelcome/testimonials/Testimonials'

/*import Features from '../componentsWelcome/features/Features'*/
//import Projects from '../componentsWelcome/projects/Projects'
/*import Faq from '../componentsWelcome/Faq/Faq'*/


const WelcomePage = () => {
 
    return (
        <div className="welcomePage">
        {<Nav/>}
        {<Header />}
        <Explore />
        <About />
        <Letter/>
        {/*<Experience />*/}

        
        {/*<RangeTable/>*/}
        {/*<Features/>*/}
        {/*<Choice/>*/}
        {/*<Solutions/>*/}
        {/*<Testimonials/>*/}
        {/*<Projects/>*/}
        <Footer/>
        </div>
      )
}

export default WelcomePage