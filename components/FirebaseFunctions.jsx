import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  or,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db, dbName, storage } from "../FirebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { deleteObject, ref } from "firebase/storage";

let authEmail;
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

// Get All Categories
export const getAllCategories = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, dbName, "Categories", "CategoriesData")
    );
    const categories = querySnapshot.docs.map((doc) => ({
      Id: doc.id,
      ...doc.data(),
    }));
    return { data: categories };
  } catch (e) {
    console.error("Error getting categories", e);
    return { error: e.message };
  }
};

// Get All Chats
export const getAllChats = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, dbName, "Chats", "ChatsData")
    );
    const chats = querySnapshot.docs.map((doc) => ({
      Id: doc.id,
      ...doc.data(),
    }));
    return { data: chats };
  } catch (e) {
    console.error("Error getting chats", e);
    return { error: e.message };
  }
};

// Send Chat
export const sendChat = async (attachment, msg, orderId, userEmail) => {
  // console.log("B", orderId);
  try {
    const docRef = await addDoc(collection(db, dbName, "Chats", "ChatsData"), {
      Message: msg,
      Attachment: attachment,
      OrderId: orderId,
      SentBy: userEmail,
      SentAt: serverTimestamp(),
    });
    // console.log("Document written with ID: ", docRef.id);
    return { data: docRef.id };
  } catch (e) {
    console.log("Error Sending Chat", e);
    return { error: e.message };
  }
};

// Delete Chat
export const deleteChat = async (chatId, attachmentUrl) => {
  // console.log(chatId);
  try {
    const docRef = doc(db, dbName, "Chats", "ChatsData", chatId);
    await deleteDoc(docRef);
    const chatRef = ref(storage, attachmentUrl);
    await deleteObject(chatRef);
    return { data: "Deleted Successfully" };
  } catch (e) {
    console.error("Error Getting Required Chat", e);
    return { error: e.message };
  }
};

// Get All Comments
export const getAllComments = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, dbName, "Comments", "CommentDatas")
    );
    const comments = querySnapshot.docs.map((doc) => ({
      Id: doc.id,
      ...doc.data(),
    }));
    return { data: comments };
  } catch (e) {
    console.error("Error getting comments", e);
    return { error: e.message };
  }
};

// Get All Vendors
export const getAllVendors = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, dbName, "Vendors", "VendorsData")
    );
    const vendors = querySnapshot.docs.map((doc) => ({
      Id: doc.id,
      ...doc.data(),
    }));
    return { data: vendors };
  } catch (e) {
    console.error("Error getting vendors", e);
    return { error: e.message };
  }
};

// Get All Admins
export const getAllAdmins = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, dbName, "Admins", "AdminsData")
    );
    const Admins = querySnapshot.docs.map((doc) => ({
      Id: doc.id,
      ...doc.data(),
    }));
    return { data: Admins };
  } catch (e) {
    console.error("Error getting Admins", e);
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

// Get Vendor With Id
export const getVendorById = async (vendorId) => {
  try {
    const docRef = doc(db, dbName, "Vendors", "VendorsData", vendorId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
    } else {
      console.log("No Such Document Found!");
    }
    return { data: docSnap.data() };
  } catch (e) {
    console.error("Error Getting Required Vendor", e);
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
//Get All Collections
export const getAllCollections = async () => {
  try {
    const q = query(collection(db, dbName, "Collections", "CollectionDatas"));
    const querySnapshot = await getDocs(q);
    const colDatas = [];
    querySnapshot.forEach((doc) => {
      colDatas.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return { data: colDatas };
  } catch (e) {
    console.error("Error Getting Required Collections", e);
    return { error: e.message };
  }
};

//Get All Orders
export const getAllOrders = async () => {
  try {
    const q = query(collection(db, dbName, "Orders", "OrderDatas"));
    const querySnapshot = await getDocs(q);
    const orderDatas = [];
    querySnapshot.forEach((doc) => {
      orderDatas.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return { data: orderDatas };
  } catch (e) {
    console.error("Error Getting Required Collections", e);
    return { error: e.message };
  }
};

// Get Photos Of Category With Id
export const getAllPhotosByCategoryId = async (catId) => {
  try {
    const q = query(
      collection(db, dbName, "Photos", "PhotosData"),
      where("CategoryId", "==", catId)
    );
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
    console.error("Error Getting Required Photos Of Category", e);
    return { error: e.message };
  }
};

// Create Category
export const createCategory = async (name, status, userEmail) => {
  try {
    const docRef = await addDoc(
      collection(db, dbName, "Categories", "CategoriesData"),
      {
        Name: name,
        Status: status,
        CreatedBy: userEmail,
        CreatedAt: serverTimestamp(),
      }
    );
    // console.log("Document written with ID: ", docRef.id);
    return { data: docRef.id };
  } catch (e) {
    console.log("Error Creating Category", e);
    return { error: e.message };
  }
};

// Create Vendor
export const createVendor = async (
  vendorName,
  vendorGstn,
  vendorAddress,
  vendorEmail,
  vendorPassword,
  vendorContactNumber,
  vendorSecondaryContactName,
  vendorSecondaryContactNumber
) => {
  try {
    // await createUserWithEmailAndPassword(auth, vendorEmail, vendorPassword);
    const docRef = await addDoc(
      collection(db, dbName, "Vendors", "VendorsData"),
      {
        VendorName: vendorName,
        VendorGstn: vendorGstn,
        VendorAddress: vendorAddress,
        VendorGstn: vendorGstn,
        VendorEmail: vendorEmail,
        VendorPassword: vendorPassword,
        VendorContactNumber: vendorContactNumber,
        VendorSecondaryContactName: vendorSecondaryContactName,
        VendorSecondaryContactNumber: vendorSecondaryContactNumber,
        CreatedBy: authEmail,
        CreatedAt: serverTimestamp(),
        UpdatedBy: authEmail,
        UpdatedAt: serverTimestamp(),
      }
    );
    // console.log("Document written with ID: ", docRef.id);
    return { data: docRef.id };
  } catch (e) {
    console.log("Error Creating Vendor", e);
    return { error: e.message };
  }
};

// Add Photos To Categories
export const addPhotosToCategory = async (
  photoId,
  photoUrl,
  catId,
  userEmail
) => {
  try {
    const docRef = await addDoc(
      collection(db, dbName, "Photos", "PhotosData"),
      {
        PhotoId: photoId,
        PhotoUrl: photoUrl,
        CategoryId: catId,
        CreatedBy: userEmail,
        CreatedAt: serverTimestamp(),
        UpdatedBy: userEmail,
        UpdatedAt: serverTimestamp(),
      }
    );
    // console.log("Document written with ID: ", docRef.id);
    return { data: docRef.id };
  } catch (e) {
    console.log("Error Adding Photos", e);
    return { error: e.message };
  }
};

// Add Photos To Categories
export const addPhotos = async (photoId, photoUrl, userEmail) => {
  try {
    const docRef = await addDoc(
      collection(db, dbName, "Photos", "PhotosData"),
      {
        PhotoId: photoId,
        PhotoUrl: photoUrl,
        CategoryId: "Global Upload",
        CreatedBy: userEmail,
        CreatedAt: serverTimestamp(),
        UpdatedBy: userEmail,
        UpdatedAt: serverTimestamp(),
      }
    );
    // console.log("Document written with ID: ", docRef.id);
    return { data: docRef.id };
  } catch (e) {
    console.log("Error Adding Photos", e);
    return { error: e.message };
  }
};

// Add Collection Data To DB
export const addDataToCategory = async (
  Barcode,
  PhotoId,
  Description,
  Design,
  Collection,
  Shade,
  SerialNo,
  UOM,
  HSNCode,
  GST,
  RRP,
  RRPWithGST,
  DPRoll,
  DPRollWithGST,
  DPCut,
  DPCutWithGST,
  CatId
) => {
  try {
    // console.log("User:", authEmail);
    const docRef = await addDoc(
      collection(db, dbName, "Collections", "CollectionDatas"),
      {
        Barcode: Barcode,
        PhotoId: PhotoId,
        Description: Description,
        Design: Design,
        Collection: Collection,
        Shade: Shade,
        SerialNo: SerialNo,
        UOM: UOM,
        HSNCode: HSNCode,
        GST: GST,
        RRP: RRP,
        RRPWithGST: RRPWithGST,
        DPRoll: DPRoll,
        DPRollWithGST: DPRollWithGST,
        DPCut: DPCut,
        DPCutWithGST: DPCutWithGST,
        CategoryId: CatId,
        AddedBy: authEmail,
        AddedAt: serverTimestamp(),
        UpdatedBy: userEmail,
        UpdatedAt: serverTimestamp(),
      }
    );
    // console.log("Document written with ID: ", docRef.id);
    return { data: docRef.id };
  } catch (e) {
    console.log("Error Adding Datas", e);
    return { error: e.message };
  }
};

// Add Order To Vendor
export const addOrderToVendor = async (
  SNo,
  DeliveryDate,
  ItemName,
  Description,
  PhotoId,
  Qty,
  VendorEmail,
  OrderDate,
  AnyMaterialToBeSent,
  EDR,
  AnySpecialNotesForVendor,
  Remarks
) => {
  try {
    // console.log("User:", authEmail);
    const docRef = await addDoc(
      collection(db, dbName, "Orders", "OrderDatas"),
      {
        SNo: SNo,
        DeliveryDate: DeliveryDate,
        ItemName: ItemName,
        Description: Description,
        PhotoId: PhotoId,
        Qty: Qty,
        VendorEmail: VendorEmail,
        OrderDate: OrderDate,
        AnyMaterialToBeSent: AnyMaterialToBeSent,
        EDR: EDR,
        AnySpecialNotesForVendor: AnySpecialNotesForVendor,
        Remarks: Remarks,
        AddedBy: authEmail,
        AddedAt: serverTimestamp(),
        UpdatedBy: authEmail,
        UpdatedAt: serverTimestamp(),
      }
    );
    // console.log("Document written with ID: ", docRef.id);
    return { data: docRef.id };
  } catch (e) {
    console.log("Error Adding Datas", e);
    return { error: e.message };
  }
};

// Get Collection Data Of A Category
export const getAllDatasByCategoryId = async (catId) => {
  try {
    const q = query(
      collection(db, dbName, "Collections", "CollectionDatas"),
      where("CategoryId", "==", catId)
    );
    const querySnapshot = await getDocs(q);
    const colDatas = [];
    querySnapshot.forEach((doc) => {
      colDatas.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return { data: colDatas };
  } catch (e) {
    console.error("Error Getting Required Datas Of Category", e);
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

// Edit Vendor
export const editVendor = async (
  vendorName,
  vendorGstn,
  vendorAddress,
  vendorEmail,
  vendorPassword,
  vendorContactNumber,
  vendorSecondaryContactName,
  vendorSecondaryContactNumber,
  vendorId
) => {
  try {
    const vendorRef = doc(db, dbName, "Vendors", "VendorsData", vendorId);
    await updateDoc(vendorRef, {
      VendorName: vendorName,
      VendorGstn: vendorGstn,
      VendorAddress: vendorAddress,
      VendorGstn: vendorGstn,
      VendorEmail: vendorEmail,
      VendorPassword: vendorPassword,
      VendorContactNumber: vendorContactNumber,
      VendorSecondaryContactName: vendorSecondaryContactName,
      VendorSecondaryContactNumber: vendorSecondaryContactNumber,
      UpdatedBy: authEmail,
      UpdatedAt: serverTimestamp(),
    });
    // console.log("Document written with ID: ", docRef.id);
    return { data: `Updated ${name} Successfully!` };
  } catch (e) {
    console.log("Error Updating Vendor", e);
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

// Delete Order
export const deleteOrder = async (orderId) => {
  try {
    const docRef = doc(db, dbName, "Orders", "OrderDatas", orderId);
    await deleteDoc(docRef);
    return { data: "Deleted Successfully" };
  } catch (e) {
    console.error("Error Getting Required Order", e);
    return { error: e.message };
  }
};

// Delete Vendor
export const deleteVendor = async (VendorId) => {
  try {
    const docRef = doc(db, dbName, "Vendors", "VendorsData", VendorId);
    await deleteDoc(docRef);
    return { data: "Deleted Successfully" };
  } catch (e) {
    console.error("Error Getting Required Vendor", e);
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

// Delete Comments
export const deleteComments = async (
  commentId,
  uploadedFileUrl,
  replyUploadedDocUrl
) => {
  console.log(commentId);
  try {
    // Delete from db
    const docRef = doc(db, dbName, "Comments", "CommentDatas", commentId);
    await deleteDoc(docRef);
    // Delete the Uploaded Files from storage
    const uploadedFileRef = ref(storage, uploadedFileUrl);
    await deleteObject(uploadedFileRef);
    const uploadedReplyFileRef = ref(storage, replyUploadedDocUrl);
    await deleteObject(uploadedReplyFileRef);
    return { data: "Deleted Successfully" };
  } catch (e) {
    console.error("Error Getting Required Data To Delete", e);
    return { error: e.message };
  }
};

// Delete Datas from Collection
export const deleteDatasFromCollection = async (docId, photoUrl, imageId) => {
  // console.log("Id",imageId);
  try {
    // Delete from db
    const docRef = doc(db, dbName, "Collections", "CollectionDatas", docId);
    await deleteDoc(docRef);
    // // Delete the photo from storage
    // const photoRef = ref(storage, photoUrl);
    // await deleteObject(photoRef);
    // // Delete the photo from photos db
    // const photoQuery = doc(db, dbName, "Photos", "PhotosData", imageId);
    // await deleteDoc(photoQuery);
    return { data: "Deleted Successfully" };
  } catch (e) {
    console.error("Error Getting Required Data To Delete", e);
    return { error: e.message };
  }
};

// Update Collection Data On DB
export const updateCollectionData = async (
  Barcode,
  PhotoId,
  Description,
  Design,
  Collection,
  Shade,
  SerialNo,
  UOM,
  HSNCode,
  GST,
  RRP,
  RRPWithGST,
  DPRoll,
  DPRollWithGST,
  DPCut,
  DPCutWithGST,
  colId
) => {
  try {
    // console.log("User:", authEmail);
    const colRef = doc(db, dbName, "Collections", "CollectionDatas", colId);
    await updateDoc(colRef, {
      Barcode: Barcode,
      PhotoId: PhotoId,
      Description: Description,
      Design: Design,
      Collection: Collection,
      Shade: Shade,
      SerialNo: SerialNo,
      UOM: UOM,
      HSNCode: HSNCode,
      GST: GST,
      RRP: RRP,
      RRPWithGST: RRPWithGST,
      DPRoll: DPRoll,
      DPRollWithGST: DPRollWithGST,
      DPCut: DPCut,
      DPCutWithGST: DPCutWithGST,
      UpdatedBy: authEmail,
      UpdatedAt: serverTimestamp(),
    });
    // console.log("Document written with ID: ", docRef.id);
    return { data: colRef.id };
  } catch (e) {
    console.log("Error Adding Datas", e);
    return { error: e.message };
  }
};

// Update Order Data On DB
export const updateOrderData = async (
  AnyMaterialToBeSent,
  AnySpecialNotesForVendor,
  DeliveryDate,
  Description,
  EDR,
  ItemName,
  OrderDate,
  PhotoId,
  Qty,
  Remarks,
  Reply,
  SNo,
  VendorEmail,
  orderId
) => {
  try {
    // console.log("User:", authEmail);
    const orderRef = doc(db, dbName, "Orders", "OrderDatas", orderId);
    await updateDoc(orderRef, {
      AnyMaterialToBeSent: AnyMaterialToBeSent,
      AnySpecialNotesForVendor: AnySpecialNotesForVendor,
      DeliveryDate: DeliveryDate,
      Description: Description,
      EDR: EDR,
      ItemName: ItemName,
      OrderDate: OrderDate,
      PhotoId: PhotoId,
      Qty: Qty,
      Remarks: Remarks,
      SNo: SNo,
      VendorEmail: VendorEmail,
      UpdatedBy: authEmail,
      UpdatedAt: serverTimestamp(),
      Reply: Reply ? Reply : "No Reply Yet",
      RepliedAt: serverTimestamp(),
      RepliedBy: Reply ? authEmail : "None",
    });
    // console.log("Document written with ID: ", docRef.id);
    return { data: orderRef.id };
  } catch (e) {
    console.log("Error Updating Datas", e);
    return { error: e.message };
  }
};

// Give Comment To A Order
export const giveComment = async (
  CommentField,
  Comment,
  UploadedFileUrl,
  OrderId
) => {
  try {
    const docRef = await addDoc(
      collection(db, dbName, "Comments", "CommentDatas"),
      {
        Comment: Comment,
        CommentField: CommentField,
        UploadedFileUrl: UploadedFileUrl,
        OrderId: OrderId,
        CommentedBy: authEmail,
        CommentedAt: serverTimestamp(),
        Reply: "We Have Received Your Comment",
        RepliedBy: "Admin",
        RepliedAt: serverTimestamp(),
      }
    );
    // console.log("Document written with ID: ", docRef.id);
    return { data: docRef.id };
  } catch (e) {
    console.log("Error Giving Comment", e);
    return { error: e.message };
  }
};
// Update Comment Data On DB
export const updateCommentData = async (
  Reply,
  ReplyUploadedDocUrl,
  commentId
) => {
  try {
    // console.log("User:", authEmail);
    const commentRef = doc(db, dbName, "Comments", "CommentDatas", commentId);
    await updateDoc(commentRef, {
      Reply: Reply,
      ReplyUploadedDocUrl: ReplyUploadedDocUrl,
      RepliedAt: serverTimestamp(),
      RepliedBy: authEmail,
    });
    // console.log("Document written with ID: ", docRef.id);
    return { data: commentRef.id };
  } catch (e) {
    console.log("Error Replying Comment", e);
    return { error: e.message };
  }
};

// Update Photo Data
export const updatePhotoData = async (
  itemDesc,
  itemPrice,
  rateOfGst,
  dpCutPrice,
  id
) => {
  try {
    // console.log("User:", authEmail);
    const colRef = doc(db, dbName, "Photos", "PhotosData", id);
    await updateDoc(colRef, {
      itemDesc: itemDesc,
      itemPrice: itemPrice,
      rateOfGst: rateOfGst,
      dpCutPrice: dpCutPrice,
      UpdatedBy: authEmail,
      UpdatedAt: serverTimestamp(),
    });
    // console.log("Document written with ID: ", docRef.id);
    return { data: colRef.id };
  } catch (e) {
    console.log("Error Updating Datas", e);
    return { error: e.message };
  }
};
