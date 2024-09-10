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
