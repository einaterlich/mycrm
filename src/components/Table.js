import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import React from 'react';
import { Button } from './Button'; // Ensure this is correctly imported
import { useNavigate } from 'react-router-dom';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

function Table({ data, onDelete }) {
    const navigate = useNavigate();
    // Define columns, including the "Delete" button column
    const colDefs = [
        ...Object.keys(data[0] || {}).map(key => ({
            headerName: key.replace('_', ' ').toUpperCase(),
            field: key
        })),
        {
            headerName: 'Delete',
            field: 'delete',
            cellRenderer: (params) => {
                return React.createElement(Button, {
                    buttonStyle: 'btn--outlineRed',
                    onClick: () => onDelete(params.data.id)
                }, 'Delete');
            }
        },
        {
            headerName: 'Edit',
            field: 'edit',
            cellRenderer: (params) => {
                return React.createElement(Button, {
                    buttonStyle: 'btn--outline',
                    onClick: () => navigate(`/user/${params.data.id}/Edit`)
                }, 'Edit');
        }}
    ];

    const defaultColDef = {
        flex: 1,
    };

    return (
        <div
            className="ag-theme-quartz-dark"
            style={{ width: '100%', height: '80%' }}
        >
            <AgGridReact
                rowData={data}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
            />
        </div>
    );
}

export default Table;
