function SearchInput({text, children}) {

    return (
        <>
            <div className="inputs">
                {text}
                {children}
            </div>
            <div className="vl"></div>
        </>
    );
}

export default SearchInput;