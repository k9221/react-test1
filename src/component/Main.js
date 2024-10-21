import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import Alert from '@mui/material/Alert';

const Main = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    async function fetchPersons() {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:3100/person');
        if (res.data.success) {
          setPersons(res.data.list);
        } else {
          setError("Failed to fetch persons");
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    }
    fetchPersons();
  }, []);

  const fnDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3100/person/${id}`);
      setPersons((prev) => prev.filter(person => person.id !== id));
      setSuccessMessage("User deleted successfully");
    } catch (err) {
      setError("Error deleting user");
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage('');
    setError(null);
  };

  if (loading) return <CircularProgress />;

  return (
    <Box padding={3} sx={{ backgroundColor: '#f0f4f8' }}>
      <Typography variant="h5" gutterBottom>
        사용자 목록
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>휴대폰 번호</TableCell>
              <TableCell>주소</TableCell>
              <TableCell>삭제</TableCell>
              <TableCell>수정</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {persons.map((person) => (
              <TableRow key={person.id}>
                <TableCell>{person.id}</TableCell>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.gender}</TableCell>
                <TableCell>{person.phone}</TableCell>
                <TableCell>{person.addr}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="error" onClick={() => fnDelete(person.id)}>
                    삭제
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary">
                    수정
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar open={Boolean(successMessage || error)} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={error ? "error" : "success"}>
          {error || successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Main;
