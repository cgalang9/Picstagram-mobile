import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../App";

//constants
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

const initialState = { currUser: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { currUser: action.currUser };
    default:
      return state;
  }
}
