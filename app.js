import { auth, db } from "./firebase.js";
import { ref, push, onValue, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const postBtn = document.getElementById("postBtn");
const postInput = document.getElementById("postInput");
const feed = document.getElementById("feed");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

const provider = new GoogleAuthProvider();

loginBtn.onclick = () => {
    signInWithPopup(auth, provider);
};

logoutBtn.onclick = () => {
    signOut(auth);
};

postBtn.onclick = () => {
    const text = postInput.value;
    if(text !== ""){
        push(ref(db, "posts"), {
            text: text,
            likes: 0
        });
        postInput.value = "";
    }
};

onValue(ref(db, "posts"), snapshot => {
    feed.innerHTML = "";
    snapshot.forEach(child => {
        const data = child.val();
        const postId = child.key;

        const postDiv = document.createElement("div");
        postDiv.classList.add("post-card");
        postDiv.innerHTML = `
            <p>${data.text}</p>
            <button class="like-btn" onclick="likePost('${postId}', ${data.likes})">
                ❤️ ${data.likes}
            </button>
        `;
        feed.appendChild(postDiv);
    });
});

window.likePost = (id, currentLikes) => {
    update(ref(db, "posts/" + id), {
        likes: currentLikes + 1
    });
};
