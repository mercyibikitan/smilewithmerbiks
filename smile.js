const thoughtsList = document.getElementById("thoughtsList");


function addThought() {
  const text = document.getElementById("thoughtInput").value;
  if (text.trim() === "") return;

  const thoughtDiv = document.createElement("div");
  thoughtDiv.classList.add("thought");

  // Default response if no keyword matches
  let response = "🌸 Keep going, you are not alone! — Isaiah 41:10: 'Do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you.'";

  // Search for keywords
  for (let item of autoReplies) {
    if (text.toLowerCase().includes(item.keyword)) {
      response = item.reply;
      break;
    }
  }

  thoughtDiv.innerHTML = `
    <p><strong>📝 Student Thought:</strong> ${text}</p>
    <div class="reply"><p><strong>✨ Merbiks:</strong> ${response}</p></div>
    <div class="actions">
      <button class="smile-btn" onclick="smile(this)">🌸 Smile</button>
    </div>
  `;

  thoughtsList.prepend(thoughtDiv);
  document.getElementById("thoughtInput").value = "";
}

function smile(btn) {
  btn.textContent = "🌸 Smiled!";
  btn.disabled = true;
}
function addTask() {
    const input = document.getElementById("todo-input");
    const taskText = input.value.trim();
    if (taskText === "") return;
  
    const li = document.createElement("li");
    li.textContent = taskText;
  
    // Mark complete toggle
    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });
  
    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.style.marginLeft = "10px";
    delBtn.onclick = () => {
      li.remove();
      saveTasks();
    };
  
    li.appendChild(delBtn);
    document.getElementById("todo-list").appendChild(li);
  
    input.value = "";
    saveTasks();
  }
  
  // ✅ Save to local storage
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#todo-list li").forEach(li => {
      tasks.push({
        text: li.firstChild.textContent,
        completed: li.classList.contains("completed")
      });
    });
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }
  
  // 📌 Load saved tasks
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];
    tasks.forEach(t => {
      const li = document.createElement("li");
      li.textContent = t.text;
      if (t.completed) li.classList.add("completed");
  
      li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
      });
  
      const delBtn = document.createElement("button");
      delBtn.textContent = "❌";
      delBtn.style.marginLeft = "10px";
      delBtn.onclick = () => {
        li.remove();
        saveTasks();
      };
  
      li.appendChild(delBtn);
      document.getElementById("todo-list").appendChild(li);
    });
  }
  
  // Run on page load
  window.onload = loadTasks;
  import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function run() {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: "Hello from JavaScript!" }],
  });

  console.log(response.choices[0].message.content);
}

run();
