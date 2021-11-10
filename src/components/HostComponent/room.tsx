import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Link,
  Chip,
  Box,
  Fab,
} from '@mui/material';
import { format } from 'date-fns';
import { RoomProps } from '@src/models/room.model';

type RoomListProps = {
  rooms: RoomProps[];
};
interface Data {
  id: string;
  name: string;
  reservationPrice: string;
  price: string;
  tag: string;
  isActive: boolean;
  updateDate: string;
}
function createData(
  id: string,
  name: string,
  reservationPrice: string,
  price: string,
  tag: string,
  isActive: boolean,
  updateDate: string
): Data {
  return {
    id,
    name,
    reservationPrice,
    price,
    tag,
    isActive,
    updateDate,
  };
}

const RoomHost: React.FC<RoomListProps> = ({ ...props }: RoomListProps) => {
  const [rows, setRows] = useState<Array<Data>>([]);
  useEffect(() => {
    const fetchRow: Array<Data> = [];
    async function handleFetchTable() {
      if (props.rooms.length > 0) {
        props.rooms.forEach((r: RoomProps) => {
          fetchRow.push(
            createData(
              String(r.id),
              String(r.name),
              String(r.reservationPrice),
              String(r.price),
              String(Array.isArray(r.tag) ? r.tag.join(',') : ''),
              r.isActive,
              String(format(new Date(r.updateDate), 'dd/MM/yyyy h:m:s'))
            )
          );
        });
      }
      setRows(fetchRow);
    }
    handleFetchTable();
  }, [props.rooms]);
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight="bold">Resort ID</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Room Name</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Reservation Price</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Price</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Tag</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Status</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Update Date</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Edit Room</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Typography fontWeight="bold"> {row.id}</Typography>
                </TableCell>
                <TableCell>
                  <Link href={`/hostManagement/room/${row.id}`}>
                    <Typography color="primary" sx={{ cursor: 'pointer' }}>
                      {row.name}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell>
                  <Typography>{row.reservationPrice}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{row.price}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{row.tag}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.isActive ? 'Active' : 'Inactive'}
                    color={row.isActive ? 'success' : 'error'}
                    sx={{ color: 'white', fontWeight: 'bold' }}
                  />
                </TableCell>
                <TableCell>
                  <Typography>{row.updateDate}</Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Link href={`editResort/${row.id}`}>
                      <Fab color="primary" aria-label="edit">
                        <EditIcon />
                      </Fab>
                    </Link>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default RoomHost;
