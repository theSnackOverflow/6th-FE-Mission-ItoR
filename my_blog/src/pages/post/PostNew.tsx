import Blank from '../../components/Blank';
import Devider from '../../components/Devider';
import Header from '../../components/Header';
import { useState, useRef } from 'react';

type ContentBlock = {
  id: string;
  type: 'TEXT' | 'IMAGE';
  value: string;
};

const PostNew = () => {
  const [contents, setContents] = useState<ContentBlock[]>([
    { id: crypto.randomUUID(), type: 'TEXT', value: '' },
  ]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAutoHeight = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  };

  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newBlocks = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      type: 'IMAGE' as const,
      value: URL.createObjectURL(file),
    }));

    setContents((prev) => {
      if (focusedIndex === null)
        return [
          ...prev,
          ...newBlocks,
          { id: crypto.randomUUID(), type: 'TEXT', value: '' },
        ];
      const before = prev.slice(0, focusedIndex + 1);
      const after = prev.slice(focusedIndex + 1);
      return [
        ...before,
        ...newBlocks,
        { id: crypto.randomUUID(), type: 'TEXT', value: '' },
        ...after,
      ];
    });
  };

  const handleTextChange = (id: string, value: string) => {
    setContents((prev) =>
      prev.map((block) => (block.id === id ? { ...block, value } : block)),
    );
  };

  return (
    <>
      <Header type="write" />
      <Header type="file" addImg={true} onAddImage={handleAddImageClick}>
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </Header>

      <main className="w-full flex flex-col items-center">
        {/* 제목 */}
        <header className="w-full max-w-[688px] min-w-mobile h-fit py-2">
          <Blank variant="32" />
          <div className="w-full px-3 py-3">
            <textarea
              rows={1}
              className="w-full text-2xl font-medium text-black leading-[160%] border-none resize-none placeholder:text-base placeholder:font-medium placeholder:text-gray-56"
              onInput={handleAutoHeight}
              placeholder="제목"
            />
          </div>
          <Blank variant="32" />
        </header>
        <Devider />

        {/* 본문 */}
        <section className="w-full max-w-[688px] min-w-mobile h-fit">
          <Blank variant="20" />
          <div className="w-full h-fit px-4 py-3 flex flex-col gap-4">
            {contents.map((block, index) =>
              block.type === 'TEXT' ? (
                <textarea
                  key={block.id}
                  value={block.value}
                  onChange={(e) => handleTextChange(block.id, e.target.value)}
                  onFocus={() => setFocusedIndex(index)}
                  onInput={handleAutoHeight}
                  placeholder="어떤 것을 깨달았나요?"
                  className="w-full text-sm font-light text-gray-20 border-none resize-none overflow-hidden placeholder:text-gray-56"
                />
              ) : (
                <img
                  key={block.id}
                  src={block.value}
                  alt={`uploaded-${index}`}
                  className="w-full h-auto rounded-md"
                />
              ),
            )}
          </div>
          <Blank variant="20" />
        </section>
      </main>
    </>
  );
};

export default PostNew;
