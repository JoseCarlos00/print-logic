import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel } from "@tanstack/react-table";
import './simpleTable.css'
import { useState } from "react";

function SimpleTable({data, columns = []}) {

  if (columns.length === 0) {
    return <div>No columns defined</div>;
  }
 
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({ data, 
    columns, 
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
     state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  const classNameDescription = (value) => ['description', 'descripcion', 'item_desc'].includes(value.toLowerCase()) ? 'item_desc' : ''

  return (
    <>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className={classNameDescription(header.id)} onClick={header.column.getToggleSortingHandler()} >
                  <div>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                     {
                        { asc: "⬆️", desc: "⬇️" }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
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
                <td key={cell.id} className={classNameDescription(cell.id.replace(/\d+_/g,''))}>
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
