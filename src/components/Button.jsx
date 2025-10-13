const Button = ({ label, icon, placeright = false, onClickHandler }) => {
    return (<button type="button" className={`text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-xs px-5 py-1 text-center inline-flex items-center gap-1 dark:focus:ring-gray-500 me-2 mb-2 ${placeright ? 'flex-row-reverse' : ''}`} onClick={onClickHandler}>
        {icon}
        {label}
    </button>);
};

export default Button;