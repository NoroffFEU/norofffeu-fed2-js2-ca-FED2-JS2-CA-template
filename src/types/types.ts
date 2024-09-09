// API Types
type name = string;
type email = string;
type password = string;
type bio = string;
type avatar = {
  url: string;
  alt: string;
};
type banner = {
  url: string;
  alt: string;
};
type venueManager = boolean;

// API Response interfaces
export interface APIRegister {
  name: name;
  email: email;
  password: password;
  bio?: bio;
  avatar?: avatar;
  banner?: banner;
  venueManager?: venueManager;
}

export interface APILogin {
  email: email;
  password: password;
}

export interface APIKey {
  name: name;
}
