import React from "react";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../components/Post";
import { fetchPosts } from "../../redux/slices/posts";
import { useParams } from "react-router-dom";

export default function Tags() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);
  const isPostsLoading = posts.status === "loading";

  const { tag } = useParams();

  let sortedPosts = [];

  if (!isPostsLoading) {
    sortedPosts = posts.items.filter((obj) => obj.tags.includes(tag));
  }

  React.useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <>
      <div>
        <h2>#{tag}</h2>
      </div>

      <div>
        <Grid xs={8} item>
          {isPostsLoading
            ? [...Array(5)]
            : sortedPosts.map((obj, index) =>
                isPostsLoading ? (
                  <Post isLoading={true} key={index} />
                ) : (
                  <Post
                    key={obj._id}
                    _id={obj._id}
                    title={obj.title}
                    imageUrl={`http://localhost:4444${obj.imageUrl}`}
                    user={obj.user}
                    createdAt={obj.createdAt}
                    viewsCount={obj.viewsCount}
                    commentsCount={3}
                    tags={obj.tags}
                    isEditable={userData?.userData?._id === obj.user}
                  />
                )
              )}
        </Grid>
      </div>
    </>
  );
}
