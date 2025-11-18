/*
const ContactPage = () => {
  return (
    <>
      <section className='h-screen w-full p-5'>
        <h1 className='text-4xl font-bold'>Contact Me</h1>
        <div className='mt-8 flex max-md:gap-10 items-center bg-red-400s flex-wrap p-2'>
          <div className='md:w-[50%] rounded-lg overflow-hidden shadow-lg'>
            <img src="https://images.unsplash.com/photo-1559030623-0226b1241edd?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" loading='lazy' className='object-cover w-full ' alt="contact me banner image" title='contact me banner image' />
          </div>
          <div className='md:w-[50%] flex flex-col justify-center items-center'>
            <h2 className='text-3xl font-bold'>RITESH KUMAR RAI</h2>
            <div className='mt-14 flex justify-center gap-4 flex-wrap'>
              <a role='link' title="My Email ID" aria-label='My Email ID' href="mailto:riteshkumarrai.dev@outlook.com" className='w-32 bg-blue-400/20 hover:bg-blue-400/60 active:bg-blue-400/60 p-2 rounded-md flex items-center gap-2 font-semibold'><img width={30} src='https://img.icons8.com/?size=100&id=gfladD7prcwv&format=png&color=000000' loading='lazy' /> Email</a>
              <a role='link' title='My Github Account' aria-label='My Github Account' href="https://github.com/Ritesh-Kumar-Rai/" target="_blank" className='w-32 bg-black/80 dark:bg-slate-900 hover:bg-black dark:hover:bg-slate-950 active:bg-black dark:active:bg-slate-950 text-white p-2 rounded-md flex items-center gap-2 font-semibold'><img width={30} src='https://img.icons8.com/?size=100&id=vjqZo0sZlesU&format=png&color=000000' loading='lazy' /> Github</a>
              <a role='link' title='My LinkedIn Profile' aria-label='My LinkedIn Profile' href="https://www.linkedin.com/in/ritesh-kumar-rai-bb6901296" target="_blank" className='w-32 bg-sky-600/20 hover:bg-sky-400/60 dark:hover:bg-sky-600/30 active:bg-sky-600/60 dark:active:bg-sky-600/30 p-2 rounded-md flex items-center gap-2 font-semibold'><img width={30} src='https://img.icons8.com/?size=100&id=xuvGCOXi8Wyg&format=png&color=000000' loading='lazy' /> LinkedIn</a>
              <a role='link' title='Meet me on Discord' aria-label='My Meet me on Discord' href="https://discord.gg/hAfqGWGN" target="_blank" className='w-32 bg-slate-100 dark:bg-slate-900 hover:bg-slate-300 dark:hover:bg-slate-800 active:bg-slate-300 dark:active:bg-slate-800 p-2 rounded-md flex items-center gap-2 font-semibold'><img width={30} src='https://img.icons8.com/?size=100&id=n35VW8czPq4Q&format=png&color=000000' loading='lazy' /> Discord</a>
            </div>

            <p className="mt-10 text-gray-600 max-w-lg">
              I usually respond within 24–48 hours. Thanks for reaching out —
              looking forward to connecting!
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
*/

const ContactPage = () => {
  return (
    <section className="min-h-screen w-full py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Banner Image */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1559030623-0226b1241edd?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.1.0"
            loading="lazy"
            alt="Contact banner"
            title="Contact banner"
            className="object-cover w-full h-full transform hover:scale-105 transition duration-500"
          />
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center text-center md:text-left md:items-start">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-400 mb-4">
            Get in Touch
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-600 mb-8">
            RITESH KUMAR RAI
          </h2>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {/* Email */}
            <a
              href="mailto:riteshkumarrai.dev@outlook.com"
              title="My Email Address"
              aria-label="My Email Address"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-400/20 hover:bg-blue-400/60 active:bg-blue-400/60 transition font-medium shadow-sm"
            >
              <img
                width={28}
                src="https://img.icons8.com/?size=100&id=gfladD7prcwv&format=png&color=000000"
                alt="Email icon"
                loading='lazy'
              />
              Email
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Ritesh-Kumar-Rai/"
              target="_blank"
              title="My GitHub Account"
              aria-label="My GitHub Account"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 dark:bg-slate-900 dark:hover:bg-slate-950 transition font-medium shadow-sm"
            >
              <img
                width={28}
                src="https://img.icons8.com/?size=100&id=vjqZo0sZlesU&format=png&color=000000"
                alt="GitHub icon"
                loading='lazy'
              />
              GitHub
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/ritesh-kumar-rai-bb6901296"
              target="_blank"
              title="My LinkedIn Profile"
              aria-label="My LinkedIn Profile"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-600/20 hover:bg-sky-400/60 dark:hover:bg-sky-600/30 transition font-medium shadow-sm"
            >
              <img
                width={28}
                src="https://img.icons8.com/?size=100&id=xuvGCOXi8Wyg&format=png&color=000000"
                alt="LinkedIn icon"
                loading='lazy'
              />
              LinkedIn
            </a>

            {/* Discord */}
            <a
              href="https://discord.gg/hAfqGWGN"
              target="_blank"
              title="Meet me on Discord"
              aria-label="Meet me on Discord"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-300 dark:hover:bg-slate-800 transition font-medium shadow-sm"
            >
              <img
                width={28}
                src="https://img.icons8.com/?size=100&id=n35VW8czPq4Q&format=png&color=000000"
                alt="Discord icon"
                loading='lazy'
              />
              Discord
            </a>
          </div>

          {/* Closing Note */}
          <p className="mt-10 text-gray-600 max-w-lg">
            I usually respond within 24–48 hours. Thanks for reaching out —
            looking forward to connecting!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;