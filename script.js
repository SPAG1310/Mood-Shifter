// so the const tag helps the script to connect to the html element, basically a bridge
const moodBtn = document.getElementById("mood_btn");
const moodText = document.getElementById("mood_txt");
const body = document.body;

let recentMoods = []; //array
const noRepeatCount = 5; //change repeat count here

//this const stores all the moods
const moods = [
    { text: "Feeling joyful :)", color: "#FFD93D", textColor: "#333", font: "Crafty Girls, sans-serif"},
    { text: "Calm and peaceful 😌", color: "#A7C7E7", textColor: "#1a1a1a", font: "Playwrite FR Moderne, sans-serif" },
    { text: "Energetic ⚡", color: "#FF6B6B", textColor: "#fff", font: "Bad Script, sans-serif" },
    { text: "Mysterious 🌌", color: "#2D2A4A", textColor: "#E0E0E0", font: "Griffy, sans-serif" },
    { text: "Creative 🎨", color: "#9C27B0", textColor: "#fff", font: "Fuggles, sans-serif" },
    { text: "Chill 🧊", color: "#B3E5FC", textColor: "#003366", font: "Shizuru, sans-serif" },
    { text: "Dreamy 🌙", color: "#6A5ACD", textColor: "#fff", font: "Dokdo, sans-serif" },
    { text: "Back to Neutral", color: "#f0f0f0", textColor: "#333", font: "Funnel Sans, sans-serif" }
    
];

moodBtn.addEventListener("click", () => {
    //actual brain of the code, helps make this "random"
    let randomMood;
    do{ 
        randomMood = moods[Math.floor(Math.random() * moods.length)]; 
    } while (recentMoods.includes(randomMood.text));

    //another bridge from element in const moods to the original element
    moodText.textContent = randomMood.text;
    moodText.style.color = randomMood.textColor;
    body.style.backgroundColor = randomMood.color;
    body.style.fontFamily = randomMood.font;

    //memorylist
    recentMoods.push(randomMood.text)
    
    //memory list auto removal
    if (recentMoods.length> noRepeatCount) {
        recentMoods.shift();
    }
});