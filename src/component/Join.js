import React, { useRef, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Join() {
  const idRef = useRef();
  const nameRef = useRef();
  const genderRef = useRef();
  const phoneRef = useRef();
  const addrRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    idRef.current.focus(); // 처음 화면에 들어오면 id에 포커스가 맞춰짐
  }, []);

  async function fnJoin() {
    const id = idRef.current.value;
    const name = nameRef.current.value;
    const gender = genderRef.current.value;
    const phone = phoneRef.current.value;
    const addr = addrRef.current.value;

    try {
      const res = await axios.post("http://localhost:3100/porson", {
        id,
        name,
        gender,
        phone,
        addr
      });
      console.log(res.data);
      if (res.data.success) {
        alert("추가하기 성공");
        navigate("/main");

      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("서버 오류 발생", error);
      alert("서버 오류 발생");
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{ backgroundColor: '#e0f7fa', padding: 3 }}
    >
      <Box 
        sx={{ 
          width: '100%', 
          maxWidth: '400px', 
          padding: '20px',  
          backgroundColor: '#fff', 
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', 
          borderRadius: '8px'  
        }}
      >
        <Typography variant="h4" mb={3} align="center">
          회원가입
        </Typography>
        <TextField inputRef={idRef} label="아이디" variant="outlined" fullWidth margin="normal" />
        <TextField inputRef={nameRef} label="이름" variant="outlined" type="password" fullWidth margin="normal" />
        <TextField inputRef={genderRef} label="성별" variant="outlined" fullWidth margin="normal" />
        <TextField inputRef={phoneRef} label="번호" variant="outlined" fullWidth margin="normal" />
        <TextField inputRef={addrRef} label="주소" variant="outlined" fullWidth margin="normal" />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={fnJoin}>
          추가하기
        </Button>
        <Typography mt={2} align="center">
          이미 계정이 있으신가요? <a href="/login">로그인</a>
        </Typography>
      </Box>
    </Box>
  );
}

export default Join;
