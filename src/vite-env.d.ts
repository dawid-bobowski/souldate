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

/* Component Props */

interface IPrivateRouteProps {
  redirectPath?: string;
}
type PrivateRouteProps = IPrivateRouteProps;

interface IPageTitleProps {
  title: string;
}
type PageTitleProps = IPageTitleProps;

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
