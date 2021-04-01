import React, {Fragment} from 'react';
import './TableContainer.css'
import {
    useTable,
    useSortBy,
    useFilters,
    useExpanded,
    usePagination,
} from 'react-table';
import {Table, Row, Col, Button, Input, CustomInput} from 'reactstrap';
import {Filter, DefaultColumnFilter} from './Filters';

const TableContainer = ({columns, data, renderRowSubComponent}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        visibleColumns,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize},
    } = useTable(
        {
            columns,
            data,
            defaultColumn: {Filter: DefaultColumnFilter},
            initialState: {pageIndex: 0, pageSize: 10},
        },
        useFilters,
        useSortBy,
        useExpanded,
        usePagination
    );

    const generateSortingIndicator = (column) => {
        return column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '';
    };

    const onChangeInSelect = (event) => {
        setPageSize(Number(event.target.value));
    };

    const onChangeInInput = (event) => {
        const page = event.target.value ? Number(event.target.value) - 1 : 0;
        gotoPage(page);
    };

    return (
        <Fragment>
            <Table bordered hover {...getTableProps()} responsive>

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
                            <tr >
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


            {/* Bas du tableau (changement de pages)*/}
            <Row style={{maxWidth: 1000, margin: '0 auto', textAlign: 'center'}}>
                {/* Most Left button --> Go back to page 0*/}

                {/* go back buttons*/}
                <Col md={3}>
                    <Button
                        id="pagination"
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                    >
                        {'<<'}
                    </Button>

                    {/* Left button --> Go to previous page*/}
                    <Button
                        id="pagination"
                        onClick={previousPage}
                        disabled={!canPreviousPage}
                    >
                        {'<'}
                    </Button>
                </Col>


                {/* Display the current page number*/}
                <Col md={2} style={{marginTop: 7}}>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} sur {pageOptions.length}
                    </strong>
                </Col>

                {/* TextField for selecting the page number*/}
                <Col md={2}>
                    <Input
                        type='number'
                        min={1}
                        style={{width: 70}}
                        max={pageOptions.length}
                        defaultValue={pageIndex + 1}
                        onChange={onChangeInInput}
                    />
                </Col>

                {/* Slector for changing the number of items displayed per page */}
                <Col md={2}>
                    <CustomInput
                        type='select'
                        value={pageSize}
                        id={"selectionPage"}
                        onChange={onChangeInSelect}
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Afficher {pageSize}
                            </option>
                        ))}
                    </CustomInput>
                </Col>


                {/*Go forward buttons*/}
                <Col md={3}>
                    {/* Right button --> Go to next page*/}
                    <Button id="pagination" onClick={nextPage} disabled={!canNextPage}>
                        {'>'}
                    </Button>

                    {/* Go to last page*/}
                    <Button
                        id="pagination"
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                    >
                        {'>>'}
                    </Button>
                </Col>
            </Row>
        </Fragment>
    );
};

export default TableContainer;
