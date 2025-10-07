// so the const tag helps the script to connect to the html element, basically a bridge
const moodBtn = document.getElementById("mood_btn");
const moodText = document.getElementById("mood_txt");
const body = document.body;

//this const stores all the moods
const moods = [
    { text: "Feeling joyful :)", color: "#FFD93D", textColor: "#333" },
    { text: "Calm and peaceful 😌", color: "#A7C7E7", textColor: "#1a1a1a" },
    { text: "Energetic ⚡", color: "#FF6B6B", textColor: "#fff" },
    { text: "Mysterious 🌌", color: "#2D2A4A", textColor: "#E0E0E0" },
    { text: "Creative 🎨", color: "#9C27B0", textColor: "#fff" },
    { text: "Chill 🧊", color: "#B3E5FC", textColor: "#003366" },
    { text: "Dreamy 🌙", color: "#6A5ACD", textColor: "#fff" },
    { text: "Back to Neutral", color: "#f0f0f0", textColor: "#333" },
    
];

moodBtn.addEventListener("click", () => {
    //actual brain of the code, helps make this "random"
    const randomMood = moods[Math.floor(Math.random() * moods.length)];

    //another bridge from element in const moods to the original element
    moodText.textContent = randomMood.text;
    moodText.style.color = randomMood.textColor;
    body.style.backgroundColor = randomMood.color;
});