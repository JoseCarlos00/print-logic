import { useEffect, useState } from "react";

import Header from "../components/Header"
import * as XLSX from "xlsx";
import mock  from "../mock/mock.json";
import SimpleTable from "../components/SimpleTable";

function HomePage() {
  const [data, setData] = useState({ data: mock, columns: [{
      id: "firstName",
      header: ()=> "First Name",
      accessorKey: 'firstName',
      cell: info => info.getValue() + '!!!',
    },
    {
      id: "lastName",
      header: 'Last Name',
      accessorKey: 'lastName',
    },
    { 
      id: "age",
      header: 'Age',
      accessorFn: row => row.age + '*', 
    },
    {
      id: "visits",
      header: 'visits',
      accessorKey: 'visits',
    },
    {
      id: "progress",
      header: 'progress',
      accessorKey: 'progress',
    },
    {
      id: 'status',
      header: 'status',
      accessorKey: 'status',
    },
    {
      id: 'description',
      header: 'description',
      accessorKey: 'description',
    }
    ]});

  const [isLoading, setIsLoading] = useState(false);
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setIsLoading(true)

    if (!file) {
      setIsLoading(false);
      return
    }
    
    const reader = new FileReader();
    reader.readAsArrayBuffer(file)

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      
       const workbook = XLSX.read(data, { type: 'array' });
       const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

      const rows = XLSX.utils.sheet_to_json(firstSheet);

       if (rows.length === 0) return;

      const columns = Object.keys(rows[0]).map((key) => ({
        header: key,
        accessorKey: key,
      }));

      setData({ data: rows, columns });
      setIsLoading(false);
    }
 
  }



  return (
    <>
      <Header />
      <h1 className="d-print-none">HomePage</h1>
      <div className="d-print-none">
        <form >
          <label htmlFor="dataInput">Sube tu archivo</label>
          <input accept=".xlsx, .csv" type="file" id="dataInput" onChange={handleFileChange} />
        </form>
      </div>

      {
        isLoading ? <p>Loading...</p> :
         <SimpleTable data={data.data} columns={data.columns}  />
      }
       
    </>
  )
}


export default HomePage
