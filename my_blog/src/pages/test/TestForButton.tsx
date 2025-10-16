import Button from '../../components/Button/Button';

const TestForButton = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4 bg-[#E2DCFF]">
      <div className="grid grid-cols-2 gap-4">
        <Button
          text="깃 로그 시작하기"
          size="lg"
          fontColor="gray"
          bgColor="white"
          borderColor="gray"
          showIcon={true}
        />
        <Button
          text="깃 로그 시작하기"
          size="lg"
          fontColor="gray"
          bgColor="white"
          borderColor="none"
          showIcon={true}
        />
        <Button
          text="깃 로그 시작하기"
          size="lg"
          fontColor="gray"
          bgColor="gray"
          borderColor="gray"
          showIcon={true}
        />
        <Button
          text="깃 로그 시작하기"
          size="lg"
          fontColor="gray"
          bgColor="gray"
          borderColor="none"
          showIcon={true}
        />
        <Button
          text="깃 로그 시작하기"
          size="lg"
          fontColor="white"
          bgColor="black"
          borderColor="none"
          showIcon={true}
        />
        <Button
          text="깃 로그 시작하기"
          size="lg"
          fontColor="gray"
          bgColor="black"
          borderColor="none"
          showIcon={true}
        />
        <Button
          text="깃 로그 시작하기"
          size="lg"
          fontColor="blue"
          bgColor="white"
          borderColor="blue"
          showIcon={true}
        />
        <br />
        <br />

        <Button
          text="깃 로그 시작하기"
          size="md"
          fontColor="gray"
          bgColor="none"
          borderColor="none"
          showIcon={true}
        />
        <Button
          text="깃 로그 시작하기"
          size="md"
          fontColor="gray"
          bgColor="none"
          borderColor="none"
          isBoxed={true}
          showIcon={true}
        />
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

export { TestForButton };
