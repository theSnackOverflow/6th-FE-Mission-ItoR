import Button from '../../components/Button/Button';

const TestForButton = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4 bg-[#E2DCFF]">
      <div className="grid grid-cols-2 gap-2">
        <Button
          text="깃 로그 시작하기"
          size="lg"
          fontColor="gray"
          bgColor="white"
          borderColor="gray"
        />
        <Button
          text="깃 로그 시작하기"
          size="lg"
          fontColor="gray"
          bgColor="white"
          borderColor="none"
        />
        <Button
          text="깃 로그 시작하기"
          size="lg"
          fontColor="gray"
          bgColor="gray"
          borderColor="gray"
        />
        <Button
          text="깃 로그 시작하기"
          size="lg"
          fontColor="gray"
          bgColor="gray"
          borderColor="none"
        />
        <Button
          text="깃 로그 시작하기"
          size="lg"
          fontColor="white"
          bgColor="black"
          borderColor="none"
        />
        <Button
          text="깃 로그 시작하기"
          size="lg"
          fontColor="gray"
          bgColor="black"
          borderColor="none"
        />
        <Button
          text="깃 로그 시작하기"
          size="lg"
          fontColor="blue"
          bgColor="white"
          borderColor="blue"
        />
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>

        <Button
          text="깃 로그 시작하기"
          size="md"
          fontColor="gray"
          bgColor="none"
          borderColor="none"
        />
        <Button
          text="깃 로그 시작하기"
          size="md"
          fontColor="gray"
          bgColor="none"
          borderColor="none"
          isBoxed={true}
        />
      </div>
    </main>
  );
};

export default TestForButton;
