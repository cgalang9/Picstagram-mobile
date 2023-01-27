import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../App";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const GET_FEED_POSTS = "feedPosts/GET_FEED_POSTS";
const getfeedPosts = (posts) => ({
  type: GET_FEED_POSTS,
  feedPosts: posts,
});

export const getFollwingThunk = (following) => async (dispatch) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return console.log(" No user is signed in");

  let followingKey = new Map();
  let posts = [];

  following.forEach(async (fid) => {
    const docRef = doc(db, "users", fid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(fid, docSnap.data());
      followingKey.set(fid, { ...docSnap.data(), id: fid });

      const docR = collection(db, "posts/" + fid + "/userPosts");
      const q = query(docR);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        posts.push({ ...doc.data(), id: doc.id });
      });
      console.log(followingKey);
      console.log(querySnapshot);
    }
  });
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
