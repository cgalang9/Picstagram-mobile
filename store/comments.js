import { getAuth } from "firebase/auth";
import { db } from "../App";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

const GET_COMMENTS = "comments/GET_COMMENTS";
const getComments = (comments) => ({
  type: GET_COMMENTS,
  comments: comments,
});

export const getCommentsThunk = (uid, postId) => async (dispatch) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return console.log(" No user is signed in");

  let commentsArr = [];

  const docR = collection(db, "posts", uid, "userPosts", postId, "comments");
  const q = query(docR, orderBy("created", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    commentsArr.push({ ...doc.data(), id: doc.id });
  });

  dispatch(getComments(commentsArr));
};

const ADD_COMMENT = "comments/ADD_COMMENT";
const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment: comment,
});

export const addCommentThunk =
  (uid, postId, comment, userObj) => async (dispatch) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return console.log(" No user is signed in");

    const timestamp = serverTimestamp();

    addDoc(collection(db, "posts", uid, "userPosts", postId, "comments"), {
      text: comment,
      created: timestamp,
      postedBy: userObj,
    });

    dispatch(
      addComment({
        text: comment,
        created: timestamp,
        postedBy: userObj,
      })
    );
  };

const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return [...action.comments];
    case ADD_COMMENT:
      return [...state, action.comment];
    default:
      return state;
  }
}
