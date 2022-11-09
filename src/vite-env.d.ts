/// <reference types="vite/client" />

interface IUser {
  username: string | null;
  token: string | null;
}
type User = IUser;
interface IPrivateRouteProps {
  redirectPath?: string;
}
type PrivateRouteProps = IPrivateRouteProps;

interface IQuestion {
  id: string;
  text: string;
}
type Question = IQuestion;
type Questions = Question[];

interface IAnswers {
  [key: string]: number;
}
type Answers = IAnswers;
