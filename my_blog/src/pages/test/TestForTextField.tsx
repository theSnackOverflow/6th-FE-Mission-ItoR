import TextField from '../../components/TextField';

const TestForTextField = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4 bg-[#E2DCFF]">
      <TextField text="Text Field" font="32" state="default" />
      <TextField text="Text Field" font="32" state="input" />
      <TextField text="Text Field" font="32" state="click" type={'button'} />
      <TextField text="Text Field" font="32" state="disabled" disabled={true} />

      <TextField text="Text Field" font="16" state="default" />
      <TextField text="Text Field" font="16" state="input" />
      <TextField text="Text Field" font="16" state="click" type={'button'} />
      <TextField text="Text Field" font="16" state="disabled" disabled={true} />
    </main>
  );
};

export default TestForTextField;
