import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Input } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import shortid from "shortid";

const Comments: React.FC<any> = () => {
  const [data, setData] = useState<any>([]);
  const [contents, setContents] = useState<string>("");
  const [email, setEmail] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchData = async () => {
    // TODO: 데이터베이스에서 boards 리스트 가져오기
    try {
      const { data }: any = await axios.get("http://localhost:4000/reviews");
      console.log("data", data);
      // TODO: 가져온 결과 배열을 data state에 set 하기
      setData(data);
      const email: any = localStorage.getItem("email");
      console.log("email", data);

      setEmail(email);
    } catch (error) {
      // TODO: 네트워크 등 기타 문제인 경우, "일시적인 오류가 발생하였습니다. 고객센터로 연락주세요." alert
      alert("일시적인 오류가 발생하였습니다. 고객센터로 연락주세요.");
    }
  };

  useEffect(() => {
    // TODO: 해당 useEffect는 최초 마운트시에만 동작하게 제어

    fetchData();
  }, []);

  const handleBoardSubmit = async (e: any) => {
    // alert("TODO 요구사항에 맞추어 기능을 완성해주세요.");
    // TODO: 자동 새로고침 방지
    e.preventDefault();
    // TODO: 이메일과 contents를 이용하여 post 요청 등록(isDeleted 기본값은 false)
    try {
      await axios.post("http://localhost:4000/reviews", {
        boardId: shortid.generate(),
        email: email,
        contents: contents,
        isDeleted: false,
      });
      // TODO: 성공한 경우, "작성이 완료되었습니다. 아직 자동 새로고침이 불가하여 수동으로 갱신합니다." alert

      alert(
        "작성이 완료되었습니다. 아직 자동 새로고침이 불가하여 수동으로 갱신합니다."
      );
      // TODO: 처리완료 후, reload를 이용하여 새로고침
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    } catch (error) {
      alert("일시적인 오류가 발생하였습니다. 고객센터로 연락주세요.");
    }

    // TODO: 네트워크 등 기타 문제인 경우, "일시적인 오류가 발생하였습니다. 고객센터로 연락주세요." alert
  };

  const handleInputChange = (e: any) => {
    setContents(e.target.value);
  };

  const handleRemoveButton = async (itemId: number) => {
    try {
      await axios.patch(`http://localhost:4000/boards/${itemId}`, {
        isDeleted: true,
      });
      alert(
        "삭제가 완료되었습니다. 아직 자동 새로고침이 불가하여 수동으로 갱신합니다."
      );
      window.location.reload();
    } catch (error) {
      alert("일시적인 오류가 발생하였습니다. 고객센터로 연락주세요.");
    }
  };
  const detailButton = (itemId: any) => {
    navigate(`/detail/${itemId}`);
  };

  return (
    <MainWrapper>
      <h1>댓글달아주세요</h1>
      <StyledForm onSubmit={handleBoardSubmit}>
        <StyledInput
          placeholder="댓글입력해주세요"
          value={contents}
          onChange={handleInputChange}
        />
      </StyledForm>
      <ListWrapper>
        {data
          .filter((item: any) => {
            return item.id == id;
          })
          .map((item: any, index: any) => (
            <ListItem key={item.id}>
              <button onClick={() => detailButton(item.id)}>
                {index + 1}. {item.contents}
              </button>
              {/* // TODO: 로그인 한 user의 이메일과 일치하는 경우에만 삭제버튼 보이도록 제어 */}
              {item.email === localStorage.getItem("email") && (
                <Button onClick={() => handleRemoveButton(item.id)}>
                  삭제
                </Button>
              )}
            </ListItem>
          ))}
      </ListWrapper>
    </MainWrapper>
  );
};

export default Comments;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListWrapper = styled.div`
  width: 50%;
  padding: 10px;
`;

const ListItem = styled.div`
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
`;

const StyledInput = styled(Input)`
  width: 50%;
`;

const StyledForm = styled.form`
  width: 100%;
  text-align: center;
`;
