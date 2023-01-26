import { getAuth } from "firebase/auth";
import { db } from "../App";
import { collection, getDocs, query } from "firebase/firestore";

//constants
const GET_USER_FOLLOWING = "following/GET_USER_FOLLOWING";
const getUserFollowing = (follwing) => ({
  type: GET_USER_FOLLOWING,
  following: follwing,
});

export const getUserFollowingThunk = () => async (dispatch) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return console.log(" No user is signed in");

  const docRef = collection(db, "following/" + user.uid + "/userFollowing/");

  const q = query(docRef);

  const querySnapshot = await getDocs(q);
  let follwing = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    follwing.push(doc.id);
  });
  dispatch(getUserFollowing(follwing));
};

const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_FOLLOWING:
      return [...action.following];
    default:
      return state;
  }
}