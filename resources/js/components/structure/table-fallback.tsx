import { TableBody, TableRow, TableCell } from "../ui/table";

export default function TableFallback({
  count,
  children,
}: {
  count: number;
  children: React.ReactNode;
}) {
  return (
    <TableBody>
      {count > 0 ? (
        children
      ) : (
        <TableRow>
          <TableCell colSpan={999} className="text-center">
            No items.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
