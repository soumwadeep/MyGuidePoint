"use client";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db, dbName, storage } from "./FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { deleteObject, ref } from "firebase/storage";

//   Student Sign Up
export const SignUpUser = async (name, email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    const signUpRef = await addDoc(
      collection(db, dbName, "Users", "UsersData"),
      {
        Name: name,
        Email: email,
        RegisteredAt: serverTimestamp(),
      }
    );
    // console.log("Document written with ID: ", signUpRef.id);
    return { data: signUpRef.id };
  } catch (e) {
    console.log("Error Signing Up", e);
    return { error: e.message };
  }
};

//   Teacher Sign Up
export const SignUpTeacher = async (
  name,
  dob,
  mobileNo,
  email,
  password,
  address,
  qualifications,
  experiences,
  achievements
) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    const signUpRef = await addDoc(
      collection(db, dbName, "Teachers", "TeachersData"),
      {
        Name: name,
        Dob: dob,
        MobileNo: mobileNo,
        Email: email,
        Address: address,
        Qualifications: qualifications,
        Experiences: experiences,
        Achievements: achievements,
        RegisteredAt: serverTimestamp(),
      }
    );
    // console.log("Document written with ID: ", signUpRef.id);
    return { data: signUpRef.id };
  } catch (e) {
    console.log("Error Signing Up", e);
    return { error: e.message };
  }
};

// Get All Users
export const getAllUsers = async () => {
  try {
    const q = query(collection(db, dbName, "Users", "UsersData"));
    const querySnapshot = await getDocs(q);
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return { data: users };
  } catch (e) {
    console.error("Error Getting All Users", e);
    return { error: e.message };
  }
};

// Get All Posts
export const getAllPosts = async () => {
  try {
    const q = query(collection(db, dbName, "Posts", "PostsData"));
    const querySnapshot = await getDocs(q);
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return { data: users };
  } catch (e) {
    console.error("Error Getting All Posts", e);
    return { error: e.message };
  }
};

// Get All Teachers
export const getAllTeachers = async () => {
  try {
    const q = query(collection(db, dbName, "Teachers", "TeachersData"));
    const querySnapshot = await getDocs(q);
    const teachers = [];
    querySnapshot.forEach((doc) => {
      teachers.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return { data: teachers };
  } catch (e) {
    console.error("Error Getting All Teachers", e);
    return { error: e.message };
  }
};

// Get All Classes
export const getAllClasses = async () => {
  try {
    const q = query(collection(db, dbName, "Classes", "ClassDatas"));
    const querySnapshot = await getDocs(q);
    const classes = [];
    querySnapshot.forEach((doc) => {
      classes.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return { data: classes };
  } catch (e) {
    console.error("Error Getting All Classes", e);
    return { error: e.message };
  }
};

// Create Class
export const createClass = async (name, section, subject, room, user) => {
  try {
    const docRef = await addDoc(
      collection(db, dbName, "Classes", "ClassDatas"),
      {
        ClassName: name,
        Section: section,
        Subject: subject,
        Room: room,
        CreatedBy: user,
        CreatedAt: serverTimestamp(),
      }
    );
    // console.log("Document written with ID: ", docRef.id);
    return { data: docRef.id };
  } catch (e) {
    console.log("Error Creating Class", e);
    return { error: e.message };
  }
};

// Get All Class Announcements
export const getAllClassAnnouncements = async () => {
  try {
    const q = query(
      collection(db, dbName, "ClassAnnouncements", "ClassAnnouncementDatas")
    );
    const querySnapshot = await getDocs(q);
    const classes = [];
    querySnapshot.forEach((doc) => {
      classes.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return { data: classes };
  } catch (e) {
    console.error("Error Getting All Class Announcements", e);
    return { error: e.message };
  }
};

// Get Class Announcement By Its Id
export const getClassAnnouncementById = async (aId) => {
  try {
    const docRef = doc(
      db,
      dbName,
      "ClassAnnouncements",
      "ClassAnnouncementDatas",
      aId
    );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
    } else {
      console.log("No Such Document Found!");
    }
    return { data: docSnap.data() };
  } catch (e) {
    console.error("Error Getting Required Announcement", e);
    return { error: e.message };
  }
};
// Create Post
export const createPost = async (
  title,
  thumbnailImg,
  description,
  userName,
  userEmail,
  userId
) => {
  try {
    const docRef = await addDoc(collection(db, dbName, "Posts", "PostsData"), {
      Title: title,
      ThumbnailImg: thumbnailImg,
      Description: description,
      PosterName: userName,
      PosterEmail: userEmail,
      PosterId: userId,
      PostedAt: serverTimestamp(),
    });
    // console.log("Document written with ID: ", docRef.id);
    return { data: docRef.id };
  } catch (e) {
    console.log("Error Creating Class Announcements", e);
    return { error: e.message };
  }
};

// Delete Announcement
export const deleteAnnouncement = async (aId) => {
  try {
    const docRef = doc(
      db,
      dbName,
      "ClassAnnouncements",
      "ClassAnnouncementDatas",
      aId
    );
    await deleteDoc(docRef);
    return { data: "Deleted Successfully" };
  } catch (e) {
    console.error("Error Getting Required Announcement", e);
    return { error: e.message };
  }
};

//   User Sign In
export const UserSignIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { data: "Signed In" };
  } catch (e) {
    const match = e.message.match(/auth\/(.*?)\)/);
    const errorMessage = match ? match[1] : e.message;
    console.log("Error Signing In", errorMessage);
    return { error: errorMessage.toUpperCase() };
  }
};

// Get Logged In User Data
export const getLoggedInUserData = () => {
  return new Promise((resolve, reject) => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve({ data: user });
          authEmail = user.email;
        } else {
          reject({ error: "User Not Logged In!" });
        }
      });
    } catch (e) {
      console.error("Error getting user data", e);
      reject({ error: e.message });
    }
  });
};

// Logout User
export const logOutUser = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("Email");
    localStorage.removeItem("UserType");
    return { data: "Logout Successful" };
  } catch (error) {
    return { error: error.message };
  }
};

// Get All Comments
export const getAllComments = async () => {
  try {
    const q = query(collection(db, dbName, "Comments", "CommentDatas"));
    const querySnapshot = await getDocs(q);
    const comments = [];
    querySnapshot.forEach((doc) => {
      comments.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return { data: comments };
  } catch (e) {
    console.error("Error Getting All Comments", e);
    return { error: e.message };
  }
};

// Send Message
export const sendMessage = async (name, mobileNo, email, subject, message) => {
  try {
    const docRef = await addDoc(
      collection(db, dbName, "Comments", "CommentDatas"),
      {
        Name: name,
        MobileNo: mobileNo,
        SentBy: email,
        Subject: subject,
        Message: message,
        SentAt: serverTimestamp(),
      }
    );
    // console.log("Document written with ID: ", docRef.id);
    return { data: docRef.id };
  } catch (e) {
    console.log("Error Creating Category", e);
    return { error: e.message };
  }
};

// Get Category With Id
export const getCategoryById = async (catId) => {
  try {
    const docRef = doc(db, dbName, "Categories", "CategoriesData", catId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
    } else {
      console.log("No Such Document Found!");
    }
    return { data: docSnap.data() };
  } catch (e) {
    console.error("Error Getting Required Category", e);
    return { error: e.message };
  }
};

// Get All Photos
export const getAllPhotos = async () => {
  try {
    const q = query(collection(db, dbName, "Photos", "PhotosData"));
    const querySnapshot = await getDocs(q);
    const photos = [];
    querySnapshot.forEach((doc) => {
      photos.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return { data: photos };
  } catch (e) {
    console.error("Error Getting Required Photos", e);
    return { error: e.message };
  }
};

// Edit Category
export const editCategory = async (name, status, userEmail, catId) => {
  try {
    const categoryRef = doc(db, dbName, "Categories", "CategoriesData", catId);
    await updateDoc(categoryRef, {
      Name: name,
      Status: status,
      UpdatedBy: userEmail,
      UpdatedAt: serverTimestamp(),
    });
    // console.log("Document written with ID: ", docRef.id);
    return { data: `Updated ${name} Successfully!` };
  } catch (e) {
    console.log("Error Creating Category", e);
    return { error: e.message };
  }
};

// Delete Category
export const deleteCategory = async (catId) => {
  try {
    const docRef = doc(db, dbName, "Categories", "CategoriesData", catId);
    await deleteDoc(docRef);
    return { data: "Deleted Successfully" };
  } catch (e) {
    console.error("Error Getting Required Category", e);
    return { error: e.message };
  }
};

// Delete Photos From Category
export const deletePhotosFromCategory = async (imageId, photoUrl) => {
  try {
    // Delete from db
    const docRef = doc(db, dbName, "Photos", "PhotosData", imageId);
    await deleteDoc(docRef);
    // Delete the photo from storage
    const photoRef = ref(storage, photoUrl);
    await deleteObject(photoRef);
    return { data: "Deleted Successfully" };
  } catch (e) {
    console.error("Error Getting Required Data To Delete", e);
    return { error: e.message };
  }
};
