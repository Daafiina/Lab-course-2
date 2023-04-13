import IndexGenres from "./genres/IndexGenres";
import LandingPage from "./movies/LandingPage";

export const routes = [
    {
      path: '/',
      component: LandingPage,
      exact: true
    },
    {
      path: '/genres',
      component: IndexGenres,
      exact: true
    }
  ];

  export default routes;