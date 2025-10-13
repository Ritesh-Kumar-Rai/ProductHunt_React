import React from 'react'
import SEOHelmetInjector from '../components/shared/SEOHelmetInjector';

const ContactPage = () => {
  return (
    <>
      <SEOHelmetInjector title='Contact Us | ProductHunt' description='Reach out to ProductHunt for support, feedback, or business inquiries.' />

      <section className='h-screen w-full p-5 flex items-center justify-center'>
        <h1 className='text-4xl font-bold text-center'>RITESH KUMAR RAI</h1>
      </section>
    </>
  )
}

export default ContactPage;