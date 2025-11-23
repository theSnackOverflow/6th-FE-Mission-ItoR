import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, updatePost } from '@/api/postAPI';
import { useToast } from '@/context/ToastContext';

import Blank from '@/components/Blank';
import Devider from '@/components/Devider';
import { WriteHeader, FileHeader } from '@/components/Header';
import Menu from '@/components/Menu';

import type { PostContent } from '@/types/post';

type ContentBlock = {
  id: string;
  type: 'TEXT' | 'IMAGE';
  value: string;
};

const PostEdit = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [title, setTitle] = useState('');
  const [contents, setContents] = useState<ContentBlock[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const contentsRef = useRef<ContentBlock[]>(contents);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    contentsRef.current = contents;
  }, [contents]);

  const setImageRef = useCallback((id: string, el: HTMLDivElement | null) => {
    imageRefs.current[id] = el;
  }, []);

  useEffect(() => {
    if (!postId) return;
    const fetchPost = async () => {
      try {
        const data = await getPostById(postId);
        setTitle(data.title);
        setContents(
          data.contents.map((c: PostContent) => ({
            id: crypto.randomUUID(),
            type: c.contentType,
            value: c.content,
          })),
        );
      } catch (error) {
        console.error('게시물 불러오기 실패:', error);
        showToast({
          variant: 'error',
          message: '게시물을 불러오지 못했습니다.',
        });
      }
    };
    fetchPost();
  }, [postId, showToast]);

  const handleUpdateClick = async () => {
    const hasContent = contents.some((c) => c.value.trim());
    const hasTitle = title.trim().length > 0;

    if (!hasTitle || !hasContent) {
      showToast({
        variant: 'error',
        message: '제목과 내용을 입력해주세요.',
      });
      return;
    }

    const payload = {
      title,
      contents: contents.map((c, index) => ({
        contentOrder: index + 1,
        content: c.value,
        contentType: c.type,
      })),
    };

    try {
      if (!postId) throw new Error('postId is missing');
      await updatePost(postId, payload);
      showToast({
        variant: 'success',
        message: '수정되었습니다!',
      });
      navigate(`/post/${postId}`);
    } catch (error) {
      console.error('게시물 수정 실패:', error);
      showToast({
        variant: 'error',
        message: '수정에 실패했습니다.',
      });
    }
  };

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

    e.target.value = '';
  };

  const handleTextChange = (id: string, value: string) => {
    setContents((prev) =>
      prev.map((block) => (block.id === id ? { ...block, value } : block)),
    );
  };

  const handleImageClick = (id: string) => {
    if (isMenuOpen && selectedImageId === id) {
      setIsMenuOpen(false);
      setSelectedImageId(null);
      return;
    }

    setSelectedImageId(id);
    const element = imageRefs.current[id];
    if (element) {
      const rect = element.getBoundingClientRect();
      setMenuPosition({
        top: rect.top + window.scrollY - 50,
        left: rect.left + rect.width / 2 - 36,
      });
    }
    setIsMenuOpen(true);
  };

  const handleDeleteImage = () => {
    if (!selectedImageId) return;
    const target = contents.find((block) => block.id === selectedImageId);
    if (target?.type === 'IMAGE') URL.revokeObjectURL(target.value);
    setContents((prev) => prev.filter((block) => block.id !== selectedImageId));
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      contentsRef.current.forEach((block) => {
        if (block.type === 'IMAGE' && block.value.startsWith('blob:')) {
          URL.revokeObjectURL(block.value);
        }
      });
    };
  }, []);

  return (
    <>
      <WriteHeader onPost={handleUpdateClick} offsetTop={0} />
      <FileHeader
        addImg={true}
        onAddImage={handleAddImageClick}
        offsetTop={73}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </FileHeader>

      <main className="mt-32 w-full flex flex-col items-center relative">
        {/* 제목 */}
        <header className="w-full max-w-[688px] min-w-mobile h-fit py-2">
          <Blank variant="32" />
          <div className="w-full px-3 py-3">
            <textarea
              rows={1}
              value={title}
              onInput={handleAutoHeight}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-2xl font-medium text-black leading-[160%] border-none resize-none placeholder:text-base placeholder:font-medium placeholder:text-gray-56"
              placeholder="제목을 입력하세요"
            />
          </div>
          <Blank variant="32" />
        </header>
        <Devider />

        {/* 본문 */}
        <section className="w-full max-w-[688px] min-w-mobile h-fit relative">
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
                  placeholder="어떤 내용을 수정하시겠어요?"
                  className="w-full px-4 py-3 text-sm font-light text-gray-20 border-none resize-none overflow-hidden placeholder:text-gray-56"
                />
              ) : (
                <div
                  key={block.id}
                  ref={(el) => setImageRef(block.id, el)}
                  className="relative w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(block.id);
                  }}
                >
                  <img
                    src={block.value}
                    alt={`uploaded-${index}`}
                    className="w-full h-auto px-4 py-3 rounded-md border border-point cursor-pointer"
                  />
                </div>
              ),
            )}
          </div>
          <Blank variant="20" />
        </section>
      </main>

      {isMenuOpen && menuPosition && (
        <Menu
          ref={menuRef}
          top={menuPosition.top}
          left={menuPosition.left}
          onDelete={handleDeleteImage}
          onClose={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default PostEdit;
