type ButtonProps = {
  color?: string;
  text?: string;
};

export default function Button({ color = '#00A1FF', text = '' }: ButtonProps) {
  return (
    <>
      <div
        className={`w-[99px] h-[38px] border border-[${color}] rounded-[25px] px-3 py-2 flex justify-center items-center`}
      >
        <p className={`text-sm font-normal text-[${color}]`}>{text}</p>
      </div>
    </>
  );
}
