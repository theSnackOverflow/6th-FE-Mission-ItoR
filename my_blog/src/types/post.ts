export type ContentType = 'TEXT' | 'IMAGE';

export interface PostContent {
  contentOrder: number;
  content: string;
  contentType: ContentType;
}

export interface Comment {
  commentId: number;
  content: string;
  nickName: string;
  profileUrl: string;
  createdAt: string;
  isOwner: boolean;
}

export interface Post {
  postId: string;
  title: string;
  contents: PostContent[];
  isOwner: boolean;
  comments: Comment[];
  nickName: string;
  profileUrl: string;
  introduction: string;
  createdAt: string;
}
