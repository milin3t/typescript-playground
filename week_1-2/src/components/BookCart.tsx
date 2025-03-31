// import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface BookType {
  title: string;
  author: string;
  image: string;
  description: string;
}

// const BookImage = styled.img`
//   width: 180px;
//   height: 270px;
// `;

// 지금 해야하는 거 :
// 홈 버튼 / 내 서재 label component grouping
// 하단 viewer
// 위 두개를 적절한 배치

const BookCart = () => {
  const navigate = useNavigate();

  const handleToBookSelect = () => {
    navigate("/");
  };

  const [savedBooks, setSavedBooks] = useState<BookType[]>([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("myLibrary") || "[]");
    setSavedBooks(data);
  }, []);

  return (
    <ViewContainer>
      <HeaderBar>
        <HomeButton onClick={handleToBookSelect}>
          <FaHome size="20" />
        </HomeButton>
        <TitleLabel>내 서재</TitleLabel>
      </HeaderBar>
      <BookCartViewer>
        {savedBooks.map((book, index) => (
          <BookItem key={index}>
            <BookImage src={book.image} alt={book.title} />
            <BookTitle>{book.title}</BookTitle>
          </BookItem>
        ))}
      </BookCartViewer>
    </ViewContainer>
  );
};

// 근데 이 ViewContainer를 어차피 BookSelect에서도 사용하는데
// 이걸 따로 빼서 import해서 쓰는게 좋을까?
// 아니면 App.tsx에서 전역으로 설정해주는게 좋을까?
const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

// 헤더영역
const HeaderBar = styled.div`
  width: 900px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

// 좌측 홈버튼
const HomeButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 30px;
  border: none;
  background-color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #cbcbcb;
  }
`;

// 우측 라벨
const TitleLabel = styled.div`
  width: 400px;
  height: 50px;
  background-color: #d9d9d9;
  display: flex;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
`;

const BookCartViewer = styled.div`
  width: 900px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 870px;
  height: 700px;
  border-radius: 30px;
  background-color: #d9d9d9;
`;

const BookItem = styled.div`
  width: 180px;
  height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: white;
  shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin: 10px;
`;

const BookImage = styled.img`
  max-width: 50px;
  max-height: 50px;
`;

const BookTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  max-width: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default BookCart;
