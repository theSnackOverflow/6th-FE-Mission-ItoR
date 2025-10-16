import Text from '../../components/Text';

const TestForText = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4 bg-[#E2DCFF]">
      <Text
        title={'32 title'}
        titleVariant="32"
        mainText="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores, id suscipit aspernatur esse neque voluptate ipsum quaerat maiores blanditiis, eius possimus repellendus? Distinctio itaque reprehenderit placeat, commodi laboriosam maiores magnam!"
      />
      <br />
      <Text
        title={'32 title'}
        titleVariant="16"
        mainText="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores, id suscipit aspernatur esse neque voluptate ipsum quaerat maiores blanditiis, eius possimus repellendus? Distinctio itaque reprehenderit placeat, commodi laboriosam maiores magnam!"
      />
      <br />
      <Text
        titleVariant="16"
        mainText="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores, id suscipit aspernatur esse neque voluptate ipsum quaerat maiores blanditiis, eius possimus repellendus? Distinctio itaque reprehenderit placeat, commodi laboriosam maiores magnam!"
      />
    </main>
  );
};

export { TestForText };
