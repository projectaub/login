import { Button } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: localStorage의 토큰 검색
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const check = async () => {
      try {
        await axios.get("http://localhost:4000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        alert("토큰정보가 유효하지않습니다. 로그인화면으로 이동합니다.");
        localStorage.removeItem("token");
        navigate("/auth");
      }
    };
    if (!token || !email) {
      alert("토큰이 없습니다.로그인화면으로 이동합니다.");
      navigate("/auth");
    } else {
      check();
    }

    // TODO: localStorage의 이메일 검색

    // TODO: 토큰 또는 이메일 중 하나라도 없을 경우 "토큰 또는 이메일이 없습니다. 로그인해주세요." alert
    // TODO: localStorage에 있는 token, email을 제거
    // TODO: "/auth"로 이동
  }, [navigate]);

  const handleLogoutButtonClick = () => {
    // TODO: "로그아웃 하시겠습니까?" confirm
    // TODO: yes 선택 시, localStorage의 token과 email 제거
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    // TODO: "로그아웃이 완료되었습니다" alert
    alert("로그아웃이 완료되었습니다.");
    // TODO: "/auth"로 이동
    navigate("/auth");
  };

  return (
    <>
      <StyledHeaderBox>
        <Button onClick={handleLogoutButtonClick}>로그아웃</Button>
      </StyledHeaderBox>
      <Outlet />
    </>
  );
};

export default AuthLayout;

const StyledHeaderBox = styled.div`
  display: flex;
  justify-content: right;
  padding: 10px;
`;
