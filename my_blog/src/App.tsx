import { useState } from 'react';
import Modal from './components/Modal';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full h-screen flex flex-col mt-24 justify-start items-center gap-2">
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          모달 열기
        </button>

        <Modal
          isOpen={open}
          title={`Title line one
Title line two`}
          description={`description line one
description line two`}
          cancelText="취소"
          confirmText="삭제하기"
          onCancel={() => setOpen(false)}
          onConfirm={() => {
            alert('삭제 실행!');
            setOpen(false);
          }}
        />

        {/* <Modal
          isOpen={open}
          title={`Title line one
Title line two`}
          cancelText="취소"
          confirmText="삭제하기"
          onCancel={() => setOpen(false)}
          onConfirm={() => {
            alert('삭제 실행!');
            setOpen(false);
          }}
        /> */}
      </div>
    </>
  );
}

export default App;
