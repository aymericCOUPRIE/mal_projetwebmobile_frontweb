import React from 'react';
import {Input, CustomInput} from 'reactstrap';

export const Filter = ({column}) => {
    return (
        <div style={{marginTop: 5}}>
            {column.canFilter && column.render('Filter')}
        </div>
    );
};

/**
 * Default filter --> Search menu
 *
 * @param filterValue
 * @param setFilter
 * @param length
 * @returns {JSX.Element}
 * @constructor
 */
export const DefaultColumnFilter = (
    {
        column: {
            filterValue,
            setFilter,
            preFilteredRows: {length},
        },
    }) => {
    return (
        <Input
            value={filterValue || ''}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
            placeholder={`Rechercher...`}
            style={{width: 'auto'}}
        />
    );
};

/**
 * Type selector filter
 *        --> Selection between different types in column
 *
 * @param filterValue
 * @param setFilter
 * @param preFilteredRows
 * @param id
 * @returns {JSX.Element}
 * @constructor
 */
export const SelectColumnFilter = (
    {
        column: {filterValue, setFilter, preFilteredRows, id},
    }) => {
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    return (
        <CustomInput
            id='custom-select'
            type='select'
            value={filterValue}
            style={{width: 'auto'}}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
        >
            <option value=''>Tous</option>
            {options.map((option) => (
                <option key={option} value={option}> {option} </option>
            ))}
        </CustomInput>
    );
};
