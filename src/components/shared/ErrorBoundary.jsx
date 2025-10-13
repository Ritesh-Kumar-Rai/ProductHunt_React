import React from 'react';
import svgIcon from '../../assets/warning-error-svgrepo-com.svg';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    // Lifecycle method to catch errors in children
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    // Optional: log error to external service
    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        // You can send errorInfo to a logging service here
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="text-center p-4 h-screen w-full flex items-center flex-col justify-center text-2xl gap-2 relative">
                    <h1 className='z-0 uppercase absolute text-8xl top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-bold lg:text-[20rem] text-gray-200 dark:text-gray-800'>Error</h1>
                    <img className='z-[1] opacity-70' src={svgIcon} width={100} alt="unexpected error while rendering page icon" />
                    <h2 className="z-[1] text-red-600 font-bold">Something went wrong.</h2>
                    <p className='z-[1]'>{this.state.error?.message}</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
