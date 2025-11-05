if (location.hash && location.hash !== '#home') {
    location.replace('#home');
}
// so the const tag helps the script to connect to the html element, basically a bridge
const moodBtn = document.getElementById("mood_btn");
const moodChangeBtn = document.getElementById("moodChange_btn")
const TwomoodBtn = document.getElementsByClassName("mood_btn")
const moodText = document.getElementById("mood_txt");
const musicLink = document.getElementById("link");
const body = document.body;
const searchInput = document.getElementById("searchBar");
const suggestionsBox = document.getElementById("suggestions");
let clickCount = 0;
let currentAudio = null;

//scene change logic
const nav = document.getElementById("nav");
const home = document.getElementById("home");
const about = document.getElementById("about");
const credits = document.getElementById("credits");
const moodScene = document.getElementById("moodScene")
moodBtn.addEventListener('click', () => {
    location.hash = 'moodScene'
    nav.style.display = "none";
    home.style.display = "none";
    moodScene.style.display = "";
});

document.getElementById('home_btn').addEventListener('click', () => {
    location.hash = 'home'
    moodScene.style.display = "none";
    nav.style.display = "";
    home.style.display = "";
    body.style.backgroundColor = "";
    //stop audio playing 
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.src = '';
    }
});


//for auto caching
let moodCacheTimer;
const prefetchedFonts = new Set();

let recentMoods = []; //array
const noRepeatCount = 20; //change repeat count here

//this const stores all the moods
const moods = [
    { text: "Joyful", color: "#ffd93dff", textColor: "#333", font: "Crafty Girls, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/Joyful.mp3", link: "https://youtu.be/xFrGuyw1V8s" },
    { text: "Calm and peaceful", color: "#A7C7E7", textColor: "#1a1a1a", font: "Playwrite FR Moderne, sans-serif", fontWeight: "clamp(2rem, 5vw, 3rem)", music: "Music/Calm.mp3", link: "https://youtu.be/L9l8zCOwEII" },
    { text: "Energetic", color: "#FF5252", textColor: "#fff", font: "Bad Script, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/Energetic.mp3", link: "https://youtu.be/9bZkp7q19f0" },
    { text: "Mysterious", color: "#2D2A4A", textColor: "#E0E0E0", font: "Griffy, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/Mysterious.mp3", link: "https://youtu.be/u7K72X4eo_s" },
    { text: "Creative", color: "#9C27B0", textColor: "#fff", font: "Fuggles, sans-serif", fontWeight: "clamp(5rem, 5vw, 6rem)", music: "Music/Creative.mp3", link: "https://youtu.be/rVeMiVU77wo" },
    { text: "Chill", color: "#B3E5FC", textColor: "#003366", font: "Shizuru, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/Chill.mp3", link: "https://youtu.be/XutKfAL7wx8" },
    { text: "Dreamy", color: "#6A5ACD", textColor: "#fff", font: "Dokdo, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/Dreamy.mp3", link: "https://youtu.be/dX3k_QDnzHE" },
    { text: "Neutral", color: "#f0f0f0", textColor: "#333", font: "Funnel Sans, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", link:"https://youtu.be/dQw4w9WgXcQ"},
    { text: "Anxious", color: "#e66464ff", textColor: "#311B0B", font: "Roboto, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/Anxious.mp3", link: "https://youtu.be/EgBJmlPo8Xw" },
    { text: "Anger", color: "#d32f2f", textColor: "#F9D7D7", font: "Oswald, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/Anger.mp3", link: "https://youtu.be/3L4YrGaR8E4" },
    { text: "Lonely", color: "#90a4ae", textColor: "#3e4646ff", font: "Lato, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/Lonely.mp3", link: "https://youtu.be/W-Khe7DInxo" },
    { text: "Nostalgic", color: "#fbc02d", textColor: "#3E2723", font: "Merriweather, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/Nostalgic.mp3", link: "https://youtu.be/Man4Xw8Xypo" },
    { text: "Suspicious", color: "#9e9d24", textColor: "#cecec4ff", font: "Barlow Semi Condensed, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/Suspicious.mp3", link: "https://youtu.be/woUt7wPe8Ow" },
    { text: "Jealous", color: "#388e3c", textColor: "#FFFFF0", font: "Montserrat, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/Jelous.mp3", link: "https://youtu.be/rywUS-ohqeE" },
    { text: "Tense", color: "#f57c00", textColor: "#212121", font: "Righteous, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/Tense.mp3", link: "https://youtu.be/kpK4cDk2bRs" },
    { text: "Hopeless", color: "#757575", textColor: "#DDDADA", font: "Bitter, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/Hopeless.mp3", link: "https://youtu.be/k1-TrAvp_xs" },
    { text: "Loving", color: "#e91e63", textColor: "#FDE4EC", font: "Pacifico, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/Loving.mp3", link: "https://youtu.be/wyXNQiRCfRg" },
    { text: "Hopefull", color: "#4caf50", textColor: "#173F2E", font: "Nunito, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/Hopeful.mp3", link: "https://youtu.be/BbgQ98LdIeM" },
    { text: "Hatred", color: "#bf360c", textColor: "#FFDDE4", font: "Anton, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/Hatred.mp3", link: "https://youtu.be/5abamRO41fE" },
    { text: "Tired", color: "#616161", textColor: "#A0A0A0", font: "Mulish, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/Tired.mp3", link: "https://youtu.be/sWcLccMuCA8" },
    { text: "Motivated", color: "#FFB300", textColor: "#31271A", font: "Bebas Neue, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/Motivated.flac", link: "https://youtu.be/4qlCC1GOwFw" },
    { text: "Aggressive", color: "#C62828", textColor: "#FFEBEE", font: "Red Hat Display, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/Aggressive.mp3", link: "https://youtu.be/TnRZhLRv6eM" },
    { text: "Left out", color: "#546E7A", textColor: "#ECEFF1", font: "Indie Flower, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/leftOut.mp3", link: "https://youtu.be/g6MnpD5_4GI" },
    { text: "Lovesick", color: "#EC407A", textColor: "#FFC0CB", font: "Dancing Script, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/Lovesick.mp3", link: "https://youtu.be/rYEDA3JcQqw" },
    { text: "Melancholy", color: "#7986CB", textColor: "#49176D", font: "Raleway, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/Melancholy.mp3", link: "https://youtu.be/WKU8DJzipW4" },
    { text: "Sad", color: "#1976D2", textColor: "#C5CAE9", font: "LXGW WenKai Mono TC, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/Sad.mp3", link: "https://youtu.be/5YXVMCHG-Nk" },
    { text: "Apologetic", color: "#90CAF9", textColor: "#003366", font: "Quicksand, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/Apologetic.mp3", link: "https://youtu.be/tO4dxvguQDk" },
    { text: "Lost", color: "#455A64", textColor: "#EDF0F2", font: "Poppins, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/Lost.mp3", link: "https://youtu.be/oKLY08Gju1I" },
    { text: "Optimistic", color: "#AED581", textColor: "#234F1E", font: "Comfortaa, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/Optimistic.mp3", link: "https://youtu.be/3ZKq2ptu7qw" },
    { text: "Pride", color: "#FFD54F", textColor: "#7E5B1B", font: "Abril Fatface, sans-serif", fontWeight: "clamp(3rem, 5vw, 5rem)", music: "Music/Pride.mp3", link: "https://youtu.be/f4Mc-NYPHaQ" },
];

for (let btn of TwomoodBtn) {
    btn.addEventListener("click", () => {
        //actual brain of the code, helps make this "random"
        let randomMood;
        clickCount++;
        do {
            randomMood = moods[Math.floor(Math.random() * moods.length)];
        } while (recentMoods.includes(randomMood.text) ||
            (clickCount < 15 && randomMood.text === "Neutral")
        );
        cacheFonts(randomMood);

        //another bridge from element in const moods to the original element
        moodText.textContent = randomMood.text;
        moodText.style.color = randomMood.textColor;
        moodText.style.fontSize = randomMood.fontWeight;
        body.style.backgroundColor = randomMood.color;
        moodText.style.fontFamily = randomMood.font;
        musicLink.href = randomMood.link;

        playAudio(randomMood);

        //memorylist
        recentMoods.push(randomMood.text)

        //memory list auto removal
        if (recentMoods.length > noRepeatCount) {
            recentMoods.shift();
        }

        //reseting click counter
        if (randomMood.text === "Neutral") {
            clickCount = 0;
        }
    });
}


searchInput.addEventListener('input', async (e) => {
    const query = e.target.value.toLowerCase().trim();
    suggestionsBox.innerHTML = "";
    if (!query) { suggestionsBox.style.display = "none"; return; }

    // search- find moods where text loosely matches
    const matches = moods.filter(m => m.text.toLowerCase().includes(query));
    if (matches.length === 0) { suggestionsBox.style.display = "none"; return; }

    matches.forEach((mood, i) => {
        const li = document.createElement("li");
        li.textContent = mood.text;
        li.setAttribute("tabindex", "0");    // makes it focusable
        suggestionsBox.setAttribute("role", "listbox");
        li.addEventListener("click", () => openMood(mood));
        suggestionsBox.appendChild(li);
    });
    suggestionsBox.style.display = "block";
});


//Functions start from here

function openMood(mood) {

    randomMood = mood
    cacheFonts(randomMood);
    moodText.textContent = mood.text;
    moodText.style.color = mood.textColor;
    moodText.style.fontSize = mood.fontWeight;
    body.style.backgroundColor = mood.color;
    moodText.style.fontFamily = mood.font;
    musicLink.href = mood.link;
    playAudio(mood);
    suggestionsBox.style.display = "none";
    location.hash = 'moodScene'
    nav.style.display = "none";
    home.style.display = "none";
    moodScene.style.display = "";
}

function cacheFonts(randomMood) {
    //auto cache fonts (works)
    clearTimeout(moodCacheTimer);
    moodCacheTimer = setTimeout(() => {
        const otherMoods = moods
            .filter(m => m.text !== randomMood.text)
            .sort(() => 0.5 - Math.random())
            .slice(0, 8);

        otherMoods.forEach(m => {
            const fontName = m.font.split(',')[0].trim();
            if (prefetchedFonts.has(fontName)) return;
            prefetchedFonts.add(fontName);

            // Create invisible text to force browser to load the font
            const span = document.createElement('span');
            span.style.fontFamily = fontName;
            span.textContent = 'cacheme';
            span.style.position = 'absolute';
            span.style.opacity = '0';
            document.body.appendChild(span);
            setTimeout(() => document.body.removeChild(span), 10_000);//remove font after 10 secs

            console.log(`Cached ${fontName}`);
        });
    }, 10000);
}
function playAudio(currentMood) {
    //playing audio
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.src = ''; //rapid click safe
    }

    if (!currentMood.music) return;

    currentAudio = new Audio(currentMood.music);
    currentAudio.play().catch(err => {
        if (err.name !== "AbortError") console.warn("Audio error:", err);
    });

    currentAudio.addEventListener("ended", () => {
        alert("Your current mood has ended — Lets switch it up!");
    });
}

// function showHome() {
//     moodScene.style.display = "none";
//     nav.style.display = "block";
//     home.style.display = "contents";
//     //stop audio playing 
//     if (currentAudio) {
//         currentAudio.pause();
//         currentAudio.src = '';
//     }
// }

// function showMoodScene() {
//     nav.style.display = "none";
//     home.style.display = "none";
// }