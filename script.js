const habitInput = document.getElementById("habitInput");
const addHabitBtn = document.getElementById("addHabitBtn");
const habitList = document.getElementById("habitList");
const progress = document.getElementById("progress");
const progressText = document.getElementById("progressText");
const quoteBox = document.getElementById("quoteBox");

let habits = [];
let completed = 0;

// Motivational Quotes
const quotes = [
  "Small steps lead to big results.",
  "Consistency is the key to success.",
  "Every day is a new beginning.",
  "Stay disciplined, stay strong.",
  "Your future is built by what you do today.",
  "Great things never come from comfort zones.",
  "Push yourself, because no one else will."
];

// Add Habit
addHabitBtn.addEventListener("click", () => {
  const habit = habitInput.value.trim();
  if (habit === "") {
    alert("Please enter a habit!");
    return;
  }

  habits.push({ text: habit, done: false });
  habitInput.value = "";
  renderHabits();
  updateProgress();
});

// Render Habits
function renderHabits() {
  habitList.innerHTML = "";
  habits.forEach((habit, index) => {
    const li = document.createElement("li");
    li.textContent = habit.text;

    if (habit.done) li.classList.add("completed");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✅";
    completeBtn.classList.add("completeBtn");

    completeBtn.addEventListener("click", () => {
      habits[index].done = !habits[index].done;
      if (habits[index].done) {
        showRandomQuote();
      }
      renderHabits();
      updateProgress();
    });

    li.appendChild(completeBtn);
    habitList.appendChild(li);
  });
}

// Update Progress Bar
function updateProgress() {
  completed = habits.filter(h => h.done).length;
  const percentage = habits.length > 0 ? Math.round((completed / habits.length) * 100) : 0;
  progress.style.width = percentage + "%";
  progressText.textContent = `${percentage}% completed`;

  if (percentage === 100 && habits.length > 0) {
    quoteBox.textContent = "🎉 You nailed it today!";
  }
}

// Show Random Quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteBox.textContent = "💡 " + quotes[randomIndex];
}
