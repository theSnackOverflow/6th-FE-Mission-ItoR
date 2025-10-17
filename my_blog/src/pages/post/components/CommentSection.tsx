import clsx from 'clsx';
import Blank from '../../../components/Blank';
import { PostWriter } from '../../main/components/PostWriter';
import { useState } from 'react';
import CommentItem from './CommentItem';

import { mockData } from '../../../const/mockData';

interface commentSectionProps {
  commentCount: number | undefined;
}

const CommentSection = ({ commentCount }: commentSectionProps) => {
  const [text, setText] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const isEmpty = text.trim().length === 0;

  commentCount = 12; //! 테스트용 재할당

  const isLoggedIn: boolean = true; //! 테스트용 선언

  return (
    <section className="w-full flex justify-center">
      <section className="w-full max-w-[688px] min-w-mobile h-fit flex flex-col">
        {/* 댓글 수 */}
        <section className="flex gap-2 px-4 pt-4 pb-3">
          <p className="font-medium">댓글</p>
          <p className="font-normal text-point">{commentCount}</p>
        </section>

        <Blank variant="20" />

        {/* 댓글 목록 */}
        {/* CommentList.tsx 분리 예정 */}
        <section>
          {commentCount === 0 ? (
            <div className="w-full max-w-[688px] min-w-mobile h-fit flex flex-col justify-center items-center px-4 py-3 text-sm font-light text-gray-78 leading-[160%]">
              <p>작성된 댓글이 없습니다.</p>
              <p>응원의 첫 번째 댓글을 달아주세요.</p>
            </div>
          ) : (
            //! 임시
            <div className="flex flex-col gap-2.5">
              {mockData
                .map((item) =>
                  (item.comments ?? []).map((c) => (
                    <CommentItem key={c.commentId} {...c} />
                  )),
                )
                .flat()}
            </div>
          )}
        </section>
        <Blank variant="20" />

        {/* 댓글 입력 창 */}
        <section className="mx-4 my-3 px-4 py-3 border border-gray-90 rounded-sm">
          {isLoggedIn && (
            <PostWriter //! mockDate -> 추후 api 연결
              profileUrl="/public/2ssac.svg"
              nickName="고양이12"
              createdAt=""
              showCommentCount={false}
              showCreatedAt={false}
            />
          )}
          <textarea
            value={text}
            onChange={handleInputChange}
            className="w-full min-h-28 px-4 py-3 text-gray-20 text-sm font-light leading-[160%] resize-none"
            placeholder={
              isLoggedIn
                ? '댓글을 입력하세요.'
                : '로그인을 하고 댓글을 달아보세요!'
            }
          ></textarea>
          {isLoggedIn && (
            <div className="w-full py-2 flex justify-end">
              <button
                className={clsx(
                  'w-16 h-[38px] rounded-3xl text-sm font-normal leading-[160%]',
                  isEmpty
                    ? 'text-gray-56 bg-white border border-gray-56  cursor-not-allowed'
                    : 'text-white bg-black',
                )}
              >
                등록
              </button>
            </div>
          )}
        </section>

        <div className="max-[500px]:hidden">
          <Blank variant="64" />
        </div>
        <div className="hidden max-[500px]:block">
          <Blank variant="32" />
        </div>
      </section>
    </section>
  );
};
export default CommentSection;
