import React, {Fragment} from 'react';
import {
    useTable,
    useSortBy,
    useExpanded,
    usePagination,
} from 'react-table';
import {Table, Row, Col, Button, Input, CustomInput} from 'reactstrap';
import {Filter} from './Filters';

const SimpleTableContainer = ({columns, data, renderRowSubComponent}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        visibleColumns,
        state: {pageIndex}
    } = useTable(
        {
            columns,
            data,
            initialState: {pageIndex: 0},
        },
        useSortBy,
        useExpanded,
        usePagination
    );

    const generateSortingIndicator = (column) => {
        return column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '';
    };

    return (
        <Fragment>
            <Table bordered hover {...getTableProps()} style={{width: '100%'}}>

                {/* En-tete du tableau (avec les menu de recherches/tris)*/}
                <thead>
                {headerGroups.map((headerGroup) => (
                    <tr  {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                                <div {...column.getSortByToggleProps()}>
                                    {column.render('Header')}
                                    {generateSortingIndicator(column)}
                                </div>
                                <Filter column={column}/>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>


                {/* Affichage des données*/}
                <tbody {...getTableBodyProps()} style={{width: 'auto'}}>
                {page.map((row) => {

                    prepareRow(row);
                    return (
                        <Fragment key={row.getRowProps().key}>

                            {/* Contenu pour chaque ligne*/}
                            <tr>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    );
                                })}
                            </tr>

                            {/* Affichage du contenu supplémentaire (details) */}
                            {row.isExpanded && (
                                <tr>
                                    <td colSpan={visibleColumns.length}>
                                        {renderRowSubComponent(row)}
                                    </td>
                                </tr>
                            )}

                        </Fragment>
                    );
                })}
                </tbody>
            </Table>
        </Fragment>
    );
};

export default SimpleTableContainer;