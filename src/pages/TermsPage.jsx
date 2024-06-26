import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TermsPage = () => {
  const navigate = useNavigate();

  const handleTermsAgreement = async () => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await axios.post('/api/join', {}, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      if (response.data.isSuccess) {
        const { accessToken, refreshToken } = response.data.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        navigate('/'); // 약관 동의 후 메인 페이지로 이동
      } else {
        console.error('약관 동의 실패:', response.data.message);
      }
    } catch (error) {
      console.error('약관 동의 중 오류 발생:', error);
    }
  };

  return (
    <div>
      <h1>약관 동의</h1>
      <p>약관에 동의하시겠습니까?</p>
      <button onClick={handleTermsAgreement}>동의</button>
    </div>
  );
};

export default TermsPage;
