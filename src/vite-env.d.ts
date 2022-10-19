/// <reference types="vite/client" />

interface User {
  username: string;
}
interface ILoginProps {
  user: User | null;
  setUser: any;
}
type LoginProps = ILoginProps;
interface IDashboardProps {
  user: User | null;
}
type DashboardProps = IDashboardProps;
