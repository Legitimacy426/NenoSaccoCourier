// UITable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Column {
  header: string; // The header name of the column
  accessor: string; // The key to access the data in each row
  badge?: boolean; // If true, the data will be wrapped in a Badge component
}

interface UITableProps {
  columns: Column[]; // Array of column definitions
  data: any[]; // Array of data rows
}

const UITable = ({ columns, data }: UITableProps) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
      <Table className=" bg-white dark:bg-gray-900">
        <TableHeader className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 border-b border-gray-100 dark:border-none">
          <TableRow >
            {columns.map((column, index) => (
              <TableHead key={index} className="font-semibold">
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>
                  {column.badge ? (
                    <Badge variant={"destructive"}>
                      {row[column.accessor]}
                    </Badge>
                  ) : (
                    row[column.accessor]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UITable;
