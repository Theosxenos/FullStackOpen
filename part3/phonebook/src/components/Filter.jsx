import React from 'react';

function Filter(prop) {
    const { handleFilter, filter } = prop;

    return (
        <>
            filter shown with
            <input
                value={filter}
                onChange={(e) => handleFilter(e.target.value)}
            />
        </>
    );
}

export default Filter;
