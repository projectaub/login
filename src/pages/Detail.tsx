import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "../components/Comments";

const Detail = () => {
  const [data, setData] = useState<{
    email: string;
    contents: string;
    isDeleted: boolean;
    id: number;
  }>({
    email: "",
    contents: "",
    isDeleted: false,
    id: 0,
  });
  const [countComment, setCountComment] = useState([]);
  const [comment, setComment] = useState<string>("");

  const { id } = useParams();
  const navigate = useNavigate();
  const fetchData = async () => {
    // TODO: 데이터베이스에서 boards 리스트 가져오기
    try {
      const response = await axios.get(
        `http://localhost:4000/boards?isDeleted=${false}&id=${id}`
      );
      const commentResponse = await axios.get(
        `http://localhost:4000/boards?isDeleted=${false}&id=${id}`
      );
      setData(response.data[0]);
      setCountComment(commentResponse.data);
    } catch (error) {
      // TODO: 네트워크 등 기타 문제인 경우, "일시적인 오류가 발생하였습니다. 고객센터로 연락주세요." alert
      alert("일시적인 오류가 발생하였습니다. 고객센터로 연락주세요.");
    }
  };

  useEffect(() => {
    // TODO: 해당 useEffect는 최초 마운트시에만 동작하게 제어

    fetchData();
  }, []);

  const handleRemoveButton = async (itemId: any) => {
    try {
      await axios.patch(`http://localhost:4000/boards/${itemId}`, {
        isDeleted: true,
      });
      alert(
        "삭제가 완료되었습니다. 아직 자동 새로고침이 불가하여 수동으로 갱신합니다."
      );
      navigate("/");
    } catch (error) {
      alert("일시적인 오류가 발생하였습니다. 고객센터로 연락주세요.");
    }
  };
  const enterButton = async () => {
    await axios.post(`http://localhost:4000/reviews/`, {
      boardId: id,
      email: localStorage.getItem("email"),
      comment: comment,
      isDeleted: false,
    });
  };

  return (
    <main>
      <div>
        {data && (
          <div>
            <h3>내용 : {data.contents}</h3>
            <h3>email : {data.email}</h3>
            {localStorage.getItem("email") === data.email && (
              <button onClick={handleRemoveButton}>삭제</button>
            )}
          </div>
        )}
      </div>
      <div>
        <input
          value={comment}
          onChange={(e: any) => {
            setComment(e.target.value);
          }}
        />
      </div>
      <button onClick={enterButton}>입력</button>
      <Comments />
    </main>
  );
};

export default Detail;
