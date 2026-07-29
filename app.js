async function sendMessage(){

  const input = document.getElementById("message");
  const chat = document.getElementById("chat");

  const text = input.value.trim();

  if(!text) return;

  addMessage(text, "user");

  input.value = "";

  const response = await fetch("/api/chat",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      message:text
    })
  });

  const data = await response.json();

  addMessage(data.reply, "bot");
}

function addMessage(text, type){

  const div = document.createElement("div");

  div.className = `message ${type}`;

  div.innerText = text;

  document.getElementById("chat").appendChild(div);
}
