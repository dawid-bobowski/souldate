/// <reference types="vite/client" />

interface IUser {
  username: string | null;
  token: string | null;
}
type User = IUser;

interface IAppState {
  isMenuOpen: boolean;
}
type AppState = IAppState;

interface IQuestion {
  id: number;
  name: string;
  text: string;
}
type Question = IQuestion;
type Questions = Question[];

interface IAnswers {
  [key: string]: number;
}
type Answers = IAnswers;

interface IMatch {
  username: string;
  email: string;
  bday: string;
  city: string;
  fb: string;
  ig: string;
  tt: string;
}
type Match = IMatch;

interface IUserInfo {
  username: string | null;
  email: string;
  bday: string;
  city: string;
  fb: string;
  ig: string;
  tt: string;
}
type UserInfo = IUserInfo;

/* Component Props */

interface IPrivateRouteProps {
  redirectPath?: string;
}
type PrivateRouteProps = IPrivateRouteProps;

interface TextInputProps {
  type: string;
  value: string;
  setState: any;
}

interface IFormProps {
  type: string;
  defaultAnswers?: Answers;
}
type FormProps = IFormProps;
