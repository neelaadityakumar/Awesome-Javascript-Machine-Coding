const container = document.querySelector(".container");

function createInputBox() {
  let div = document.createElement("div");
  div.classList.add("comment-details");

  div.innerHTML += `
    <input type="text" placeholder="add text here" class="input" />
    <button class="btn submit">Submit</button>`;

  return div;
}

function addReply(text) {
  let div = document.createElement("div");
  div.classList.add("comment-container");

  div.innerHTML += `
    <div class="card">
      <span class="text">${text}</span>
      <span id="reply" class="reply">
        Add Reply
      </span>
    </div>`;

  return div;
}

container.addEventListener("click", function (e) {
  let replyClicked = e.target.classList.contains("reply");
  let submitClicked = e.target.classList.contains("submit");
  let closestCard = e.target.closest(".comment-container");

  if (replyClicked) {
    closestCard.appendChild(createInputBox());
  }

  if (submitClicked) {
    const commentDetails = e.target.closest(".comment-details");
    if (commentDetails.children[0].value) {
      closestCard.appendChild(addReply(commentDetails.children[0].value));
      commentDetails.remove();
    }
  }
});
