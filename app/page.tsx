import React from 'react'
import Hero from './custom-components/sections/Hero'
import Services from './custom-components/sections/Services'
import Footer from './custom-components/sections/Footer'
import Latest from './custom-components/sections/Latest'
// import TeamDisplay from './custom-components/sections/Team'
import Contact from './custom-components/sections/Contact'
import TeamMembers from './custom-components/sections/Testimonial'

const HomePage = () => {
  return (
    <div className='w-full overflow-x-hidden'>
      <Hero />
      <Services />
      <Latest />
      <TeamMembers />
      <Contact />
      <Footer />
    </div>
  )
}

export default HomePage
