import TextField from '../../components/TextField';
import TextFieldSet from '../../components/TextFieldSet';

const TestForTextField = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4 bg-[#E2DCFF]">
      <TextFieldSet title="제목" />

      <TextField font="32" state="default" />
      <TextField font="32" state="input" />
      <TextField font="32" state="click" value={'Text Field'} type={'button'} />
      <TextField font="32" state="disabled" disabled={true} />

      <TextField font="16" state="default" />
      <TextField font="16" state="input" />
      <TextField font="16" state="click" type={'button'} />
      <TextField font="16" state="disabled" disabled={true} />
    </main>
  );
};

export default TestForTextField;
