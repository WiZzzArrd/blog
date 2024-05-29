import Container from "@mui/material/Container";
import { Route, Routes } from "react-router-dom";
import { Header, SideBlock, TagsBlock } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import NotFound from "./pages/NotFound/NotFound";
import Tags from "./pages/Tags/Tags";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/posts/:id' element={<FullPost />}></Route>
          <Route path='/add-post' element={<AddPost />}></Route>
          <Route path='/posts/:id/edit' element={<AddPost />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Registration />}></Route>
          <Route path='/posts/tags' element={<Home></Home>}></Route>
          <Route path='/tags/:tag' element={<Tags></Tags>}></Route>
          <Route path='*' element={<NotFound></NotFound>}></Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
