import React, { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import axios from 'axios';


const representatives = [
  {name: "John Carney"},
  {name: "Patty Jenkins"},
  {name: "Travis Fine"},
  {name: "Amy Poehler"},
  {name: "David Ayer"},
  {name: "Zach Snyder"},
  {name: "Pete Docter"},
  {name: "Ryan Coogler"},
  {name: "Luc Besson"}
];

const statuses = [
  'General', 'CA-PG', '14 Accompaniment'
];

const DataTableExample = () =>{
  const[data, setData]= useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
       axios
       .get("https://skyit-coding-challenge.herokuapp.com/movies")
       .then((res)=> setData(res.data))
     
  },[]);


  const titleBodyTemplate = (data) => {
    return (
        <React.Fragment>
            <span className="image-text">{data.title}</span>
        </React.Fragment>
    );
}

const representativeBodyTemplate = (rowData) => {
  const representative = rowData.director;
  return (
      <React.Fragment>
          <span className="image-text">{representative}</span>
      </React.Fragment>
  );
}



const representativesItemTemplate = (option) => {
  return (
      <div className="p-multiselect-representative-option">
          <span className="image-text">{option.name}</span>
      </div>
  );
}

const representativeRowFilterTemplate = (options) => {
  return <MultiSelect value={options.value} options={representatives} itemTemplate={representativesItemTemplate} onChange={(e) => options.filterApplyCallback(e.value)} optionLabel="name" placeholder="All" className="p-column-filter" maxSelectedLabels={9} />;
}


const statusBodyTemplate = (rowData) => {
  return <span className={`customer-badge status-${rowData.certification}`}>{rowData.certification}</span>;
}

const statusItemTemplate = (option) => {
  return <span className={`customer-badge status-${option}`}>{option}</span>;
}

const statusRowFilterTemplate = (options) => {
  
  return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
}



  return (
    <div className="card">
      <DataTable value={data}
       responsiveLayout='scroll'
       paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
       dataKey="id"
     
       filterDisplay="row"
       globalFilterFields={['title', 'year', 'director', 'certification', 'rating']} 
       rowHover
       paginator
       emptyMessage='no data found'
       className="datatable-responsive"
       currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
       rows={10}
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
        <Column field="title" header="Title" body={titleBodyTemplate} filter filterPlaceholder="Search by title" style={{ minWidth: '20rem' }} />
        <Column field="releaseDate" header="Year" filter filterPlaceholder="Search by year" style={{ minWidth: '20rem' }} />
        <Column field="length" header="Running Time" filter filterPlaceholder="Search by running time" style={{ minWidth: '20rem' }} />
        <Column header="Director" filterField="representative" showFilterMenu={false} filterMenuStyle={{ width: '14rem'}}  style={{ minWidth: '20rem' }}  body={representativeBodyTemplate} filter filterElement={representativeRowFilterTemplate}/>
        <Column field="certification" header="Certification" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />
        <Column field="rating" header="Rating" filter filterPlaceholder="Search by rating" style={{ minWidth: '20rem' }} />
 
      </DataTable>
    </div>
  )
}

export default DataTableExample