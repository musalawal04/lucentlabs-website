import React from 'react'
import Hero from './custom-components/sections/Hero'
import Services from './custom-components/sections/Services'
// import Testimonial from './custom-components/sections/Testimonial'
import Footer from './custom-components/sections/Footer'
import Latest from './custom-components/sections/Latest'
import TeamDisplay from './custom-components/sections/Team'
import Contact from './custom-components/sections/Contact'

const HomePage = () => {
  return (
    <div className='w-full overflow-x-hidden'>
      <Hero />
      <Services />
      <Latest />
      <TeamDisplay />
      <Contact />
      {/* <Testimonial /> */}
      <Footer />
    </div>
  )
}

export default HomePage
