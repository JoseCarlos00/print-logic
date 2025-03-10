import { useReactTable,
   getCoreRowModel,
   flexRender,
   getSortedRowModel,
 } from "@tanstack/react-table";

import './simpleTable.css'
import { useState } from "react";

function SimpleTable({data, columns = []}) {

  const [sorting, setSorting] = useState([]);


  const table = useReactTable({ 
    data, 
    columns, 
    columnResizeMode: 'onChange', 
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

   if (columns.length === 0) {
    return <div>No columns defined</div>;
  }
  // onClick={header.column.getToggleSortingHandler()} 

  const classNameDescription = (value) => ['description', 'descripcion', 'item_desc'].includes(value.toLowerCase()) ? 'item_desc' : ''
  return (
    <>
      <table style={{width: table.getTotalSize() || 'auto'}}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className={classNameDescription(header.id)}  style={{ width: header.getSize() }} >
                  <div>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                     {
                        { asc: "⬆️", desc: "⬇️",}[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                  </div>

                  <div 
                    onMouseDown={(e) => header.getResizeHandler()(e)}
                    onTouchStart={(e) => header.getResizeHandler()(e)}
                    className={`resizer ${header.column.getIsResizing() ? "isResizing" : ""}`}
                  >
                </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className={classNameDescription(cell.id.replace(/\d+_/g,''))} style={{ width: cell.column.getSize() || 'auto' }} >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default SimpleTable
