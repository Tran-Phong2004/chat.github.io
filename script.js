// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
// import { getDatabase } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getDatabase, ref, set, push , onValue,onChildAdded, onChildChanged, onChildRemoved  } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAeDpauyCg3wcUAZQ3xQ8KKUrC_e9l9pdU",
    authDomain: "lbtcuoiky.firebaseapp.com",
    databaseURL: "https://lbtcuoiky-default-rtdb.firebaseio.com",
    projectId: "lbtcuoiky",
    storageBucket: "lbtcuoiky.appspot.com",
    messagingSenderId: "199904249141",
    appId: "1:199904249141:web:8793b47b33fb269e51b87c",
    measurementId: "G-LQF5LM997S"
  };

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const database = getDatabase(app); // Thêm dòng này

let nameUser;
let Message;


function sendMessage() {
    Message = document.querySelector("#message").value;
    const postListRef = ref(database, 'messages');
    const newPostRef = push(postListRef);
    set(newPostRef, {
        name:"Ẩn danh",
        message:Message
    });
    window.scrollTo(0, scrollPosition);
    return false;
}

let countCmt = 0;
let discussdetail = document.querySelector(".discuss-detail")
let messages = ``; // Initialize an empty string to store messages
const messageRef = ref(database, 'messages');
  onChildAdded(messageRef, (data) => {
//   addCommentElement(postElement, data.key, data.val().text, data.val().author);
    let sender = data.val().name;
    let message = data.val().message;
    // Add new message to the accumulated messages string
    messages = `
      <div class="row">
        <div class="col">
          <span>${sender} :</span> <span>${message}</span>
        </div>
      </div>
      <hr>
    `;
    discussdetail.insertAdjacentHTML("afterbegin",messages);
    countCmt++;
    let quantityCmt = document.querySelector(".quantitycmt");
    quantityCmt.textContent = countCmt;
});
// let countCmt = 0;
// onValue(messageRef, (snapshot) => {
//     snapshot.forEach((childSnapshot) => {
//       const childData = childSnapshot.val();
//       messages = `
//             <div class="row">
//               <div class="col">
//                 <span>${childData.name} :</span> <span>${childData.message}</span>
//               </div>
//             </div>
//             <hr>
//           `;
//           discussdetail.insertAdjacentHTML("afterbegin",messages);
//           countCmt++;
//     });
//     let quantityCmt = document.querySelector(".quantitycmt");
//     quantityCmt.textContent = countCmt;
//   }, {
//     onlyOnce: true
//   });

let btn = document.querySelector(".submitform");
btn.addEventListener("click", sendMessage);
