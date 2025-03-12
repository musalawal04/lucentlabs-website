import React from 'react'
import Hero from './custom-components/sections/Hero'
import Services from './custom-components/sections/Services'
import Stats from './custom-components/sections/Stat'
import Testimonial from './custom-components/sections/Testimonial'
import Footer from './custom-components/sections/Footer'

const HomePage = () => {
  return (
    <div className='w-full overflow-x-hidden'>
      <Hero />
      <Services />
      <Stats />
      <Testimonial />
      <Footer />
    </div>
  )
}

export default HomePage
