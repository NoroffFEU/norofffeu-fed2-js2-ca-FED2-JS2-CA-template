// API Types
type Name = string;
type Email = string;
type Password = string;
type Bio = string;
type Avatar = {
  url: string;
  alt: string;
};
type Banner = {
  url: string;
  alt: string;
};
type VenueManager = boolean;
type Meta = {};
type AccessToken = string;
export type FormNames = "register" | "login";

// API Error
export interface APIError {
  message: string;
}

// API Register
export interface APIRegisterRequest {
  name: Name;
  email: Email;
  password: Password;
  bio?: Bio;
  avatar: Avatar;
  banner: Banner;
  venueManager: VenueManager;
}

export interface APIRegisterResponse {
  name: Name;
  email: Email;
  bio: Bio;
  avatar: Avatar;
  banner: Banner;
  venueManager: VenueManager;
}

// API Login
export interface APILoginRequest {
  email: Email;
  password: Password;
}

export interface APILoginResponse {
  name: Name;
  email: Email;
  avatar: Avatar;
  banner: Banner;
  accessToken: AccessToken;
}

// API Key
export interface APIKeyRequest {
  name: name;
}

export interface APIKeyResponse {
  data: {
    name: Name;
    status: string;
    key: string;
  };
  meta: Meta;
}

//Pagination
export interface Pagination {
  limit: number;
  page: number;
  tag?: string;
}

// Posts
export type PostID = number;

type Media = {
  url: string;
  alt: string;
};

type Comment = {
  body: string;
  replyToId: number | null;
  id: number;
  postId: number;
  owner: string;
  created: Date;
  author: Author;
};

type Reaction = {
  symbol: string;
  count: number;
  reactors: string[];
};

type Author = {
  name: string;
  email: string;
  bio: string;
  avatar: Media;
  banner: Media;
};

type Count = {
  comments: number;
  reactions: number;
};

export interface PostResponse {
  id: number;
  title: string;
  body: string;
  tags: string[];
  media: Media;
  comments: Comment[];
  created: Date;
  updated: Date;
  reactions: Reaction[];
  author: Author;
  _count: Count;
}

export interface CreatePostRequest {
  title: string;
  body: string;
  tags: string[];
  media: Media;
}
