'use strict';

import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import history from "../history";
import { Button } from 'react-bootstrap';


import BtnCellRenderer from './BtnCellRenderer'
import PDF from './Pdf'
import { MDBTypography } from 'mdbreact'


class ProductTable extends Component {


  constructor(props) {
    super(props);
    this.state = {


      columnDefs: [{
        headerName: "ID", field: "id", sortable: true, filter: true, checkboxSelection: true,
      },
      {
        headerName: "Manufacture", field: "manufacture", sortable: false, filter: true
      }, {
        headerName: "Model", field: "model", sortable: true, filter: true
      }, {
        headerName: "Model Year", field: "modelyear", sortable: true, filter: true
      }, {
        headerName: "Color", field: "color", sortable: true, filter: true
      }, {
        cellEditor: 'numericCellEditor', headerName: "Price", field: "price", sortable: true, filter: true
      }, {
        headerName: "Status", field: "status", sortable: true, filter: true
      }, {
        headerName: "Condition", field: "condition", sortable: true, filter: true
      }, {
        headerName: "Actions", field: "actions", cellRenderer: 'btnCellRenderer',

      },
      ],

      frameworkComponents: {
        btnCellRenderer: BtnCellRenderer,
      },
      domLayout: 'autoHeight',

      defaultColDef: {
        flex: 1,
        minWidth: 150,
        resizable: true,
        headerCheckboxSelection: this.isFirstColumn,
        checkboxSelection: this.isFirstColumn,
        //editable: true,

      },

      // editType: 'fullRow',
      paginationPageSize: 10,
      paginationNumberFormatter: function (params) {
        return params.value.toLocaleString();
      },

      rowSelection: 'multiple',


      localeText: {
        page: 'Sayfa',
        of: '/',
        to: 'ila',
        filter: 'Filtre...',
        equals: 'Eşittir',
        notEqual: 'Eşit değildir',
        inRangeStart: 've',
        contains: 'İçerir',
        notContains: 'İçermez',
        startsWith: 'İle başlar',
        endsWith: 'İle biter',
        andCondition: 'VE',
        orCondition: 'VEYA',


      },
    }


  }

  //Print page with data and save as PDF
  onBtPrint = () => {
    var gridApi = this.gridApi;
    //Show all of the objects and get the whole page
    var eGridDiv = document.querySelector('#myGrid');
    gridApi.setDomLayout('print');
    window.print();
  
  };

  //GET request 

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridApi.setDomLayout("autoHeight", "autoWidth");


    const httpRequest = new XMLHttpRequest();
    const updateData = data => {
      this.setState({ rowData: data });
      params.api.paginationGoToPage(0);
    };

    httpRequest.open(
      'GET',
      'http://localhost:3000/products'
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };

  };



  onPageSizeChanged = newPageSize => {
    var value = document.getElementById('page-size').value;
    this.gridApi.paginationSetPageSize(Number(value));
  };


  isFirstColumn(params) {
    var displayedColumns = params.columnApi.getAllDisplayedColumns();
    var thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
  }


  onQuickFilterChanged = () => {
    this.gridApi.setQuickFilter(document.getElementById('quickFilter').value);
  };


  //deletes the selected row
  onBtDelete = () => {

    var selectedRows = this.gridApi.getSelectedRows();
    //console.log(selectedRows[0].id)

    if (!selectedRows || selectedRows.length === 0) {
      alert('No rows selected!');
      return;
    }

    var adeeb = '/' + selectedRows[0].id

    var url = "http://localhost:3000/products";
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url + adeeb, true);

    xhr.send(null);
    var gridApi = this.gridApi;
    gridApi.applyTransaction({ remove: selectedRows });

  };


  onBtExport = () => {
    this.gridApi.exportDataAsCsv({});
  };




  onFirstDataRendered = params => {
    params.api.sizeColumnsToFit();
  };




  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {/* Header starts here */}
        <form class="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2">
          <MDBTypography tag='h1' variant="display-3">Product Table</MDBTypography>
        </form>

        <div
          id="myGrid"
          style={{
            height: '100%',
            width: '100%'
          }}
          className="ag-theme-material">




          {/* Page size and search starts here */}
          <form class="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2">
            <select class="btn btn-mini" onChange={() => this.onPageSizeChanged()} id="page-size" >
              <option selected disabled> Page Size</option>
              <option value="10" > 10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
            <input class="form-control form-control-sm mr-3 w-75" type="text"
              onInput={() => this.onQuickFilterChanged()}
              id="quickFilter"
              placeholder="Ara..." />
            <i class="fas fa-search" aria-hidden="true"></i>
          </form>



          <form class="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2">

            &nbsp;
            <Button variant="btn btn-success" onClick={() => history.push('/AddProducts')}>Ürün Ekleme</Button>
            &nbsp;
            <Button variant="btn btn-success" onClick={() => history.push('/Charts/PieChart')}>Pie Chart</Button>
            &nbsp;
            <Button variant="btn btn-success" onClick={() => history.push('/Charts/DoughnutChart')}>Doughnut Chart</Button>
            &nbsp;
            <Button variant="btn btn-success" onClick={() => history.push('/ProductTable')}>PDF</Button>
            &nbsp;
            <Button onClick={() => this.onBtPrint()}>Print</Button>
            &nbsp;
            <Button onClick={() => this.onBtDelete()}>Delete</Button>
            &nbsp;
            <Button onClick={() => this.onBtExport()}>CSV</Button>

          </form>



          {/* Product Table starts here */}
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            pagination={true}
            paginationPageSize={this.state.paginationPageSize}
            paginationNumberFormatter={this.state.paginationNumberFormatter}
            onGridReady={this.onGridReady}
            localeText={this.state.localeText}
            defaultColDef={this.state.defaultColDef}
            rowSelection={this.state.rowSelection}
            animateRows={true}
            frameworkComponents={this.state.frameworkComponents}
            onFirstDataRendered={this.onFirstDataRendered.bind(this)}
          // editType={this.state.editType}
          // oneClickEdit={true}
          >

          </AgGridReact>


          {/* Page size dropdown combo box starts here */}








        </div>
        {/* Buttons start here */}



      </div >
    );
  }





}

export default ProductTable;