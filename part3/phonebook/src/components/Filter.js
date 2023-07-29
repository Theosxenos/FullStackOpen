const Filter = ({handleFilter, filter}) => {
    return <>
        filter shown with 
        <input 
            value={filter} 
            onChange={(e) => handleFilter(e.target.value)}/>
    </>
}

export default Filter;