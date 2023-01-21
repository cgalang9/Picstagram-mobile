import { getAuth } from "firebase/auth";
import { db } from "../App";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

//constants
const GET_USER_POSTS = "userPosts/GET_USER_POSTS";
const getUserPosts = (posts) => ({
  type: GET_USER_POSTS,
  userPosts: posts,
});

export const getUserPostsThunk = () => async (dispatch) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return console.log(" No user is signed in");

  const docRef = collection(db, "posts/" + user.uid + "/userPosts");

  const q = query(docRef, orderBy("created", "desc"));

  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  let posts = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    posts.push({ ...doc.data(), id: doc.id });
  });
  console.log(posts);
  dispatch(getUserPosts(posts));
};

const initialState = null;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_POSTS:
      return action.userPosts;
    default:
      return state;
  }
}
