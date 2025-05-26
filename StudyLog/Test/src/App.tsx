import { useState } from "react";

const App = () => {
  const [items, setItems] = useState(["사과", "바나나", "포도", "오렌지"]); // 리스트 항목 상태 (초기값: 과일 이름들)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null); // 현재 드래그 중인 항목의 인덱스를 저장하는 상태

  const handleDragStart = (index: number) => {
    setDraggedIndex(index); // 드래그 시작 시 호출: 드래그한 항목의 인덱스를 기억함
  };

  // 드래그 중 다른 요소 위에 있을 때 호출됨
  // drop이 허용되도록 e.preventDefault()를 반드시 호출해야 함
  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  // 드래그한 항목을 다른 위치에 drop했을 때 호출됨
  const handleDrop = (index: number) => {
    // drop 위치가 원래 위치와 같거나, 드래그가 시작되지 않았다면 무시
    if (draggedIndex === null || draggedIndex === index) return;

    // 기존 항목 복사
    const updatedItems = [...items];

    // 드래그된 항목 꺼냄
    const draggedItem = updatedItems[draggedIndex];

    // 드래그된 항목 제거
    updatedItems.splice(draggedIndex, 1);

    // 드롭된 위치에 드래그 항목 삽입
    updatedItems.splice(index, 0, draggedItem);

    // 상태 업데이트
    setItems(updatedItems);

    // 드래그 상태 초기화
    setDraggedIndex(null);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>React DnD (순수 구현)</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item, index) => (
          <li
            key={index}
            draggable // HTML5에서 필수 속성: 드래그 가능하게 함
            onDragStart={() => handleDragStart(index)} // 드래그 시작 이벤트
            onDragOver={handleDragOver} // 드래그 중 위에 올릴 때
            onDrop={() => handleDrop(index)} // 드롭할 때 실행
            style={{
              padding: "12px",
              marginBottom: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#fff",
              cursor: "move", // 사용자에게 드래그 가능하다는 시각적 피드백
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
