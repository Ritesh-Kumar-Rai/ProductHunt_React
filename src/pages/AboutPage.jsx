import { Link } from "react-router-dom";

function AboutPage() {
    return (
        <section className=" min-h-screen py-12 px-6 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        About Our Store
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Welcome to our e-commerce demo app — built with modern frontend
                        engineering and resilient design. We focus on fast performance,
                        smooth user experience, and ethical engineering practices.
                    </p>
                </div>

                {/* Mission / Values */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center transition-colors">
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-2">
                            🚀 Fast
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Optimized frontend architecture ensures lightning‑fast browsing and
                            checkout.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center transition-colors">
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-2">
                            🛡️ Reliable
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Resilient UI with fallback strategies keeps the store running even
                            during API outages.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center transition-colors">
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-2">
                            🌱 Sustainable
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Efficient CI/CD pipelines reduce unnecessary builds and save
                            resources.
                        </p>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 mb-16 transition-colors">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                        Our Tech Stack
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        This project is built with React, Tailwind CSS, Radix UI, and
                        deployed on Vercel. It demonstrates modern frontend practices,
                        fallback handling, and recruiter‑ready documentation.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full">
                            React
                        </span>
                        <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-full">
                            Tailwind CSS
                        </span>
                        <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 rounded-full">
                            Radix UI
                        </span>
                        <span className="px-4 py-2 bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-200 rounded-full">
                            Context API + Reducer
                        </span>
                        <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full">
                            Vercel
                        </span>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                        Want to know more?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Explore our products or reach out through the contact page. This
                        demo app is designed to showcase engineering excellence and smooth
                        UX.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 dark:hover:bg-blue-500 transition"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default AboutPage;
