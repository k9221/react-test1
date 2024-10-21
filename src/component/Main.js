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
} from '@mui/material';

const Main = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    async function fetchPersons() {
      try {
        const res = await axios.get('http://localhost:3100/person'); // API 엔드포인트 변경
        if (res.data.success) {
          setPersons(res.data.list);
        } else {
          console.log("에러");
        }
      } catch (err) {
        console.log("에러:", err);
      }
    }
    fetchPersons();
  }, []);

  const fnDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3100/person/${id}`); // API 엔드포인트 변경
      setPersons(persons.filter(person => person.id !== id));
      console.log("삭제되었습니다");
    } catch (err) {
      console.log("오류가 발생했습니다.", err);
    }
  };

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
                <TableCell><button onClick={()=>{fnDelete(person.id)}}>삭제</button></TableCell>
                <TableCell><button>수정</button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Main;
