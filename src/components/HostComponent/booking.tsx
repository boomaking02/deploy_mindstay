import React, { useState, useEffect, ReactElement } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
  Box,
  Chip,
  Link,
} from '@mui/material';
import { format } from 'date-fns';
import { BookingProps } from '@src/models/booking.model';

type BookingListProps = {
  bookings: { items: BookingProps[]; meta: { [key: string]: number } };
};
interface Data {
  id: number;
  bookingCode: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  status: ReactElement;
  paymentMethod: string;
  totalPrice: string;
  email: string;
}
function createData(
  id: number,
  bookingCode: string,
  roomName: string,
  checkIn: string,
  checkOut: string,
  status: ReactElement,
  paymentMethod: string,
  totalPrice: string,
  email: string
): Data {
  return {
    id,
    bookingCode,
    roomName,
    checkIn,
    checkOut,
    status,
    paymentMethod,
    totalPrice,
    email,
  };
}

const BookingHost: React.FC<BookingListProps> = ({ ...props }: BookingListProps) => {
  const [rows, setRows] = useState<Array<Data>>([]);
  useEffect(() => {
    const fetchRow: Array<Data> = [];
    async function handleFetchTable() {
      if (Array.isArray(props.bookings.items)) {
        if (props.bookings.items.length > 0) {
          props.bookings.items.forEach((bl: BookingProps) => {
            let statusColor: 'error' | 'success' | 'info' | 'warning' | 'secondary' | undefined;
            if (bl.status === 'success' || bl.status === 'complete') {
              statusColor = 'success';
            } else if (bl.status === 'check-in') {
              statusColor = 'secondary';
            } else if (bl.status === 'check-out') {
              statusColor = 'info';
            } else if (bl.status === 'pending') {
              statusColor = 'warning';
            } else {
              statusColor = 'error';
            }
            fetchRow.push(
              createData(
                bl.id,
                bl.bookingCode,
                bl.room.name,
                format(new Date(bl.checkIn), 'dd/MM/yyyy'),
                format(new Date(bl.checkOut), 'dd/MM/yyyy'),
                <Chip label={bl.status} color={statusColor} sx={{ color: 'white', fontWeight: 'bold' }} />,
                bl.paymentMethod,
                bl.totalPrice ? bl.totalPrice.toLocaleString() : '',
                String(bl.email)
              )
            );
          });
        }

        setRows(fetchRow);
      }
    }
    handleFetchTable();
  }, [props.bookings]);
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight="bold">Booking Code</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Room Name</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Check-In</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Check-Out</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Status</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Payment</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Total Price</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Email</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.bookingCode} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Typography fontWeight="bold"> {row.bookingCode}</Typography>
                </TableCell>
                <TableCell>
                  <Link href={`bookingDetail/${row.id}`}>
                    <Typography color="primary" sx={{ cursor: 'pointer' }}>
                      {row.roomName}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell>
                  <Typography>{row.checkIn}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{row.checkOut}</Typography>
                </TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <Typography>{row.paymentMethod}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{row.totalPrice}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{row.email}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', py: 3 }}>
        <Pagination count={props?.bookings?.meta.totalPages} color="primary" />
      </Box>
    </>
  );
};

export default BookingHost;
