import Blank from '../../../components/Blank';

interface commentSectionProps {
  commentCount: number;
}

const CommentSection = ({ commentCount }: commentSectionProps) => {
  commentCount = 0; // 테스트 용 재할당
  const isLoggined: boolean = false; // 테스트용 선언

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
        <section className="p-4">
          {commentCount === 0 ? (
            <div className="w-full max-w-[688px] min-w-mobile h-fit flex flex-col justify-center items-center px-4 py-3 text-sm font-light text-gray-78 leading-[160%]">
              <p>작성된 댓글이 없습니다.</p>
              <p>응원의 첫 번째 댓글을 달아주세요.</p>
            </div>
          ) : (
            // 임시
            <>댓글목록</>
          )}
        </section>
        <Blank variant="20" />

        {/* 댓글 입력 창 */}
        <section className="px-4 py-3">
          {isLoggined ? (
            ''
          ) : (
            <textarea
              className="w-full min-h-28 px-4 py-3 text-gray-20 text-sm font-light leading-[160%] border border-gray-90 rounded-sm resize-none"
              placeholder="로그인을 하고 댓글을 달아보세요!"
            ></textarea>
          )}
        </section>
        <Blank variant="64" />
      </section>
    </section>
  );
};
export default CommentSection;
