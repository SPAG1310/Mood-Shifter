// so the const tag helps the script to connect to the html element, basically a bridge
const moodBtn = document.getElementById("mood_btn");
const moodText = document.getElementById("mood_txt");
const body = document.body;
let clickCount = 0;

let recentMoods = []; //array
const noRepeatCount = 5; //change repeat count here

//this const stores all the moods
const moods = [
    { text: "Feeling joyful :D", color: "#FFD93D", textColor: "#333", font: "Crafty Girls, sans-serif", fontWeight: "3rem"},
    { text: "Calm and peaceful ^_^", color: "#A7C7E7", textColor: "#1a1a1a", font: "Playwrite FR Moderne, sans-serif", fontWeight: "2.5rem" },
    { text: "Energetic!!", color: "#FF6B6B", textColor: "#fff", font: "Bad Script, sans-serif", fontWeight: "3rem" },
    { text: "Mysterious...", color: "#2D2A4A", textColor: "#E0E0E0", font: "Griffy, sans-serif", fontWeight: "3rem"},
    { text: "Creative :3", color: "#9C27B0", textColor: "#fff", font: "Fuggles, sans-serif", fontWeight: "5rem" },
    { text: "Chill:)", color: "#B3E5FC", textColor: "#003366", font: "Shizuru, sans-serif", fontWeight: "4rem" },
    { text: "Dreamy zZz", color: "#6A5ACD", textColor: "#fff", font: "Dokdo, sans-serif", fontWeight: "3rem" },
    { text: "Back to Neutral", color: "#f0f0f0", textColor: "#333", font: "Funnel Sans, sans-serif", fontWeight: "3rem" }
    
];

moodBtn.addEventListener("click", () => {
    //actual brain of the code, helps make this "random"
    let randomMood;
    clickCount++;
    do{ 
        randomMood = moods[Math.floor(Math.random() * moods.length)]; 
    } while (recentMoods.includes(randomMood.text) ||
    (clickCount<8 && randomMood.text === "Back to Neutral")
    );

    //another bridge from element in const moods to the original element
    moodText.textContent = randomMood.text;
    moodText.style.color = randomMood.textColor;
    moodText.style.fontSize = randomMood.fontWeight;
    body.style.backgroundColor = randomMood.color;
    body.style.fontFamily = randomMood.font;

    //memorylist
    recentMoods.push(randomMood.text)
    
    //memory list auto removal
    if (recentMoods.length> noRepeatCount) {
        recentMoods.shift();
    }

    //reseting click counter
     if (randomMood.text === "Back to neutral 😐") {
        clickCount = 0;
    }
});