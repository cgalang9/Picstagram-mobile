import { getAuth } from "firebase/auth";
import { db } from "../App";
import { collection, getDocs, query } from "firebase/firestore";

const GET_FEED_POSTS = "feedPosts/GET_FEED_POSTS";
const getfeedPosts = (posts) => ({
  type: GET_FEED_POSTS,
  feedPosts: posts,
});

export const getFeedPostsThunk = (following) => async (dispatch) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return console.log(" No user is signed in");

  let posts = [];

  for (let fid of following) {
    const docR = collection(db, "posts/" + fid + "/userPosts");
    const q = query(docR);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      posts.push({ ...doc.data(), id: doc.id });
    });
  }

  dispatch(getfeedPosts(posts));
};

const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_FEED_POSTS:
      return [...action.feedPosts];
    default:
      return state;
  }
}
