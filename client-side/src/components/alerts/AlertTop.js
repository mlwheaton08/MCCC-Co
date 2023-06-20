export const AlertTop = ({ color, text }) => {

    return (
        <div className={`fixed top-nav-height left-1/2 -translate-x-1/2 px-6 py-1 text-bg-primary-color text-2xl font-semibold bg-${color}-300 border-t-8 border-${color}-500`}>
            {text}
        </div>
    )
}

export const alertTopYellow = (text) => {
    return (
        <div className={`fixed top-nav-height left-1/2 -translate-x-1/2 px-6 py-1 text-bg-primary-color text-2xl font-semibold bg-yellow-300 border-t-8 border-yellow-500`}>
            {text}
        </div>
    )
}

export const alertTopRed = (text) => {
    return (
        <div className={`fixed top-nav-height left-1/2 -translate-x-1/2 px-6 py-1 text-bg-primary-color text-2xl font-semibold bg-red-500 border-t-8 border-red-600`}>
            {text}
        </div>
    )
}