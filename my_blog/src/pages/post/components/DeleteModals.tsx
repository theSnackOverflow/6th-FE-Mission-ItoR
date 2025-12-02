import ModalWrapper from '@/components/Modal/ModalWrapper';
import Modal from '@/components/Modal/Modal';

interface DeleteModalsProps {
  showDeletePostModal: boolean;
  showDeleteCommentModal: boolean;
  onDeletePost: () => void;
  onDeleteComment: () => void;
  onClosePostModal: () => void;
  onCloseCommentModal: () => void;
}

const DeleteModals = ({
  showDeletePostModal,
  showDeleteCommentModal,
  onDeletePost,
  onDeleteComment,
  onClosePostModal,
  onCloseCommentModal,
}: DeleteModalsProps) => {
  return (
    <>
      {showDeletePostModal && (
        <ModalWrapper isOpen={showDeletePostModal} onClose={onClosePostModal}>
          <Modal
            type="delete"
            color="delete"
            title={'해당 블로그를 삭제하시겠어요?'}
            des={'삭제된 블로그는 다시 확인할 수 없어요.'}
            onDelete={onDeletePost}
            onClose={onClosePostModal}
          />
        </ModalWrapper>
      )}
      {showDeleteCommentModal && (
        <ModalWrapper
          isOpen={showDeleteCommentModal}
          onClose={onCloseCommentModal}
        >
          <Modal
            type="delete"
            color="delete"
            title={'댓글을 삭제하시겠어요?'}
            onDelete={onDeleteComment}
            onClose={onCloseCommentModal}
          />
        </ModalWrapper>
      )}
    </>
  );
};

export default DeleteModals;
