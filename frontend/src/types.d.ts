export interface RegisterMutation {
  username: string;
  displayName: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  displayName: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface Post {
  _id: string;
  title: string;
  description: string;
  image: string | null;
  user: {
    _id: string;
    displayName: string;
  }
  datetime: string;
}

export interface PostMutation {
  title: string;
  description: string;
  image: string | null;
}