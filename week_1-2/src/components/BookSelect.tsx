import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { LuLibraryBig } from "react-icons/lu";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 타입스크립트 인터페이스 : API로 가져온 데이터를 다룰 때 타입을 명시해줘야함
interface BookType {
  title: string;
  author: string;
  image: string;
  description: string;
}

const Book = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<BookType[]>([]); // ts : 타입 지정
  const NaverClientID = import.meta.env.VITE_NAVERAPI_CLIENT_ID;
  const NaverClientSecret = import.meta.env.VITE_NAVERAPI_CLIENT_SECRET;

  const handleToBookCart = () => {
    navigate("/bookcart");
  };

  // 책 추가 버튼 클릭 시 localStorage에 책 정보를 저장하는 함수
  const handleAddToLibrary = (book: BookType) => {
    const existing = JSON.parse(localStorage.getItem("myLibrary") || "[]");
    const isDuplicate = existing.some((b: BookType) => b.title === book.title);

    if (isDuplicate) {
      toast.warning("이미 추가된 책입니다!", { position: "top-center" });
      return;
    }

    const updated = [...existing, book];
    localStorage.setItem("myLibrary", JSON.stringify(updated));
    toast.success("내 서재에 추가되었습니다!", { position: "top-center" });
  };

  const fetchBookData = async () => {
    try {
      const response = await axios.get("v1/search/book.json?query=" + query, {
        headers: {
          "Content-Type": "application.json",
          "X-Naver-Client-Id": NaverClientID,
          "X-Naver-Client-Secret": NaverClientSecret,
        },
      });
      setBooks(response.data.items);
    } catch (error) {
      console.error(
        "빈 값을 보내거나 뭔가 잘못된 요청 : toast처리 해보자",
        error
      );
      toast.error("책을 찾을 수 없습니다.", { position: "top-center" });
    }
  };

  // 해야되는 styled
  // 내 서재버튼 / 검색 input태그 component grouping
  // 하단 viewer는 검색했을 때 나오는 책의 정보들

  return (
    <ViewContainer>
      <HeaderBar>
        <BookCartButton onClick={handleToBookCart}>
          <LuLibraryBig size="25" style={{ margin: "12px" }} />내 서재
        </BookCartButton>
        <SearchContainer>
          <StyledInput
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="책 이름을 입력하세요"
          />
          <SearchButton onClick={fetchBookData}>
            <FaSearch size="20" />
          </SearchButton>
        </SearchContainer>
      </HeaderBar>
      <BookListView>
        {books.map((book, index) => (
          <BookItem key={index}>
            <BookImage src={book.image} alt={book.title} />
            <div>
              <TitleRow>
                <BookTitle>{book.title}</BookTitle>
                <LikeBtn onClick={() => handleAddToLibrary(book)}>추가</LikeBtn>
              </TitleRow>
              <BookAuthor>{book.author}</BookAuthor>
              <BookDescription>{book.description}</BookDescription>
            </div>
          </BookItem>
        ))}
      </BookListView>
      <ToastContainer />
    </ViewContainer>
  );
};

// using styled-components

// 뷰어 컨테이너 (전체를 감싸는 컨테이너)
const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

// 상단쪽 감싸는 컨테이너
const HeaderBar = styled.div`
  width: 1020px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

// 내 서재 버튼 style 규칙
const BookCartButton = styled.button`
  padding: 8px 16px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  color: black;
  border-radius: 30px;
  width: 180px;
  height: 50px;
  border: none;
  background-color: #d9d9d9;
  cursor: pointer;

  &:hover {
    background-color: #cbcbcb;
  }
`;

// 검색창 묶음
const SearchContainer = styled.div`
  display: flex;
  position: relative;
  gap: 10px;
  align-items: center;
`;

// ------- 검색창 내부 button과 input style
const SearchButton = styled.button`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: #d9d9d9;
  border: none;
  cursor: pointer;
  padding: 4px;
`;

const StyledInput = styled.input`
  font-size: 14px;
  padding: 8px 40px 8px 20px;
  border-radius: 4px;
  background-color: #d9d9d9;
  height: 50px;
  border-radius: 30px;
  width: 400px;
`;

// 받아오는 책 사진이 너무 제각각이어서 따로 스타일 지정을 해주었다.
const BookImage = styled.img`
  width: 155px;
  height: 210px;
`;

// ====하단 style 컴포넌트들====
// 전체 북 리스트에 대한 컨테이너뷰 styled
const BookListView = styled.div`
  width: 980px;
  height: 700px;
  border-radius: 30px;
  background-color: #d9d9d9;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  overflow-y: auto;
  -webkit-scrollbar {
    display: none;
  }
`;

// 각각의 책에 대한 정보들을 담고 있는 styled
const BookItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  margin: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// 제목 스타일

// 제목 라인 : 버튼과 제목 정렬
const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BookTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4px;
  max-width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LikeBtn = styled.button`
  width: 80px;
  height: 30px;
  border-radius: 5px;
  border: none;
  background-color: #d9d9d9;
  &:hover {
    background-color: #c0c0c0;
  }
`;

// 저자 스타일
const BookAuthor = styled.p`
  font-size: 14px;
  margin-bottom: 12px;
`;

// 설명 스타일
const BookDescription = styled.p`
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  margin-top: 30px;
  -webkit-line-clamp: 6; // 줄 수 제한
  -webkit-box-orient: vertical;
`;
export default Book;
