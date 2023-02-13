import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../App";

//get user
const GET_USER = "user/SET_USER";
const getUser = (user, uid) => ({
  type: GET_USER,
  currUser: { ...user, uid: uid },
});

export const getUserThunk = () => async (dispatch) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return console.log(" No user is signed in");

  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    dispatch(getUser(docSnap.data(), user.uid));
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

//change profile pic
const CHANGE_PIC = "user/CHANGE_PIC";
const changePic = (picUri) => ({
  type: CHANGE_PIC,
  pic: picUri,
});

export const changePicThunk = (picUri) => async (dispatch) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return console.log(" No user is signed in");

  const docRef = doc(db, "users", user.uid);
  await updateDoc(docRef, {
    pic: picUri,
  }).then(() => {
    dispatch(changePic(picUri));
  });
};

//logout
const LOG_OUT = "user/SET_USER";
const logOut = () => ({
  type: LOG_OUT,
});
export const logOutThunk = () => async (dispatch) => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      dispatch(logOut());
    })
    .catch((error) => {
      console.log(error);
    });
};

const initialState = { currUser: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { currUser: action.currUser };
    case LOG_OUT:
      return { currUser: null };
    case CHANGE_PIC:
      const newState = { ...state };
      state.currUser.pic = action.pic;
      return newState;
    default:
      return state;
  }
}
