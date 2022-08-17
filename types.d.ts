export interface ArticleProp {
  title: string;
  urlToImage: string;
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  description: string;
  url: string;
  publishedAt: string;
  content: string;
}

export interface UserProps {
  name: {
    first: string;
    last: string;
    title: string;
  };
  login: {
    username: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  email: string;
}

export interface PostProps {
  id: string; // key for the posts[key] = value:(data())
  data: () => {
    id: string;
    name: string;
    username: string;
    userImage: string;
    image: string;
    text: string;
    timestamp: string;
  };
}

export interface CommentProps {
  id: string; // key for the posts[key] = value:(data())
  data: () => CommentReturnType;
}

export type CommentReturnType = {
  id: string;
  comment: string;
  name: string;
  timestamp: string;
  userImg: string;
  username: string;
  userId: string;
};
