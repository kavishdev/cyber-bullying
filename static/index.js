function submit(){
  inputField = document.getElementById("inForm");
  // let str = inputField.value;
  // console.log(str)
  output();
  // inputField.value = "";
}
document.getElementById("inForm").addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    output(submit);    
  }
});


// function resize(){
  // chatDiv=document.getElementById("frame")
  // console.info(chatDiv)
// }

function testMobile() {
  const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
  ];

  return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
  });
}


function getinForm(){
  field= document.getElementById("inForm");
  setTimeout(function resetVal(){field.value=""},1)
  return field.value;
  // feild.value="";
}
function output() {
  let product;
  input=getinForm()
  // console.log("str from func  "+str);
  // console.info(str.text)
  console.info(typeof(input))

  txt = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
  text = txt
    .replace(/ a /g, " ")
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you")
    .replace(/"?"/g, "")
    .replace(/"i'am"/, "i am")
    .replace(/don't/,"do not");
  console.info(text)
  if (compare(prompts, replies, text)) { 
    
    product = compare(prompts, replies, text);
    addChat(input, product);

  } else if (text.match(/thank/gi)) {
    product = "You're welcome!"
    addChat(input,product)
  } else if (text.match(/(corona|covid|virus)/gi)) {
    addChat(input,product)
    product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
  } else {
    product = alternative[0];
    addChat(input,product,true)
  }


}

function compare(promptsArray, repliesArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < promptsArray.length; x++) {
    for (let y = 0; y < promptsArray[x].length; y++) {
      if (promptsArray[x][y] === string) {
        // console.info("Reply has been found for the asked question")
        let replies = repliesArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;

        break;
      }
    }
    if (replyFound) {

      break;
    }
  }
  return reply;
}

function addChat(input, product,googlesearch=false) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="/static/user.png" class="avatar"><span>${input}</span>`;
  
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "/static/bot-mini.png";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

  if (`${googlesearch}` === "true"){
    console.info(`${googlesearch}`)
    setTimeout(() => {
      botText.innerText = `${product}`;
      let gsearch=document.createElement("iframe");
      gsearch.className= "bot response";
      gsearch.src = "https://google.com/search?igu=1&ei=&q="+`${input}`
      gsearch.width="900px"
      gsearch.height="900px"
      document.getElementById("messages").appendChild(gsearch)
      
      // textToSpeech(product)
    }, 2000
    )
  }
  else{
    setTimeout(() => {
      botText.innerText = `${product}`;
      // textToSpeech(product)
    }, 2000
    )
  }

}