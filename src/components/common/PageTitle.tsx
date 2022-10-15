interface IPageTitleProps {
  title: string;
}

type PageTitleProps = IPageTitleProps;

function PageTitle(props: PageTitleProps): JSX.Element {
  const { title } = props;

  return <h1>{title}</h1>;
}

export default PageTitle;
