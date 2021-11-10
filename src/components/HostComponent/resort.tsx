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
  Chip,
  Link,
  Fab,
  Box,
} from '@mui/material';
import { ResortProps } from '@src/models/resort.model';

type ResortListProps = {
  resorts: { items: ResortProps[]; meta: { [key: string]: number } };
};
interface Data {
  id: string;
  name: string;
  isActive: boolean;
  isPetAllowed: boolean;
  resortType: string;
}
function createData(id: string, name: string, isActive: boolean, isPetAllowed: boolean, resortType: string): Data {
  return {
    id,
    name,
    isActive,
    isPetAllowed,
    resortType,
  };
}

const ResortHost: React.FC<ResortListProps> = ({ ...props }: ResortListProps) => {
  const [rows, setRows] = useState<Array<Data>>([]);
  useEffect(() => {
    const fetchRow: Array<Data> = [];
    async function handleFetchTable() {
      if (props.resorts.items.length > 0) {
        props.resorts.items.forEach((rs: ResortProps) => {
          fetchRow.push(
            createData(
              String(rs.id),
              String(rs.name),
              rs.isActive,
              rs.isPetAllowed,
              String(rs.resortType ? rs.resortType.name : '')
            )
          );
        });
      }
      setRows(fetchRow);
    }
    handleFetchTable();
  }, [props.resorts]);
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
                <Typography fontWeight="bold">Resort Name</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Status</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Pet Allowed</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Type</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold" align="center">
                  Edit Resort
                </Typography>
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
                  <Link href={`resortDetail/${row.id}`}>
                    <Typography color="primary" sx={{ cursor: 'pointer' }}>
                      {row.name}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.isActive ? 'Active' : 'Inactive'}
                    color={row.isActive ? 'success' : 'error'}
                    sx={{ color: 'white', fontWeight: 'bold' }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.isPetAllowed ? 'อนุญาต' : 'ไม่อนุญาต'}
                    color={row.isPetAllowed ? 'success' : 'error'}
                    sx={{ color: 'white', fontWeight: 'bold' }}
                  />
                </TableCell>
                <TableCell>
                  <Typography>{row.resortType}</Typography>
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
export default ResortHost;
