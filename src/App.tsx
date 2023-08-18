import {
  ActionFunction,
  createBrowserRouter,
  LoaderFunction,
  RouterProvider,
} from 'react-router-dom';

interface IRoute {
  path: string;
  Element: JSX.Element;
  loader?: LoaderFunction;
  action?: ActionFunction;
  ErrorBoundary?: JSX.Element;
}

const pages = import.meta.glob('./pages/**/*.tsx', { eager: true });

const routes: IRoute[] = [];
for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
  if (!fileName) {
    continue;
  }

  const normalizedPathName = fileName.includes('$')
    ? fileName.replace('$', ':')
    : fileName.replace(/\/index/, '');

  routes.push({
    path: fileName === 'index' ? '/' : `/${normalizedPathName.toLowerCase()}`,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Element: pages[path].default,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    loader: pages[path]?.loader as unknown as LoaderFunction | undefined,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    action: pages[path]?.action as unknown as ActionFunction | undefined,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ErrorBoundary: pages[path]?.ErrorBoundary as unknown as JSX.Element,
  });
}

const router = createBrowserRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    element: <Element />,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  }))
);


const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App