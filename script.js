// --- SAFE ENVIRONMENT SETUP ---
// This ensures 'process' exists even in browser to avoid ReferenceError
if (typeof process === 'undefined') {
    window.process = { env: { API_KEY: '' } };
} else if (!process.env) {
    process.env = { API_KEY: '' };
}

// --- DATA ---
const MANTRAS = [
    // 1–10: ప్రధాన దైవ మంత్రాలు
    { id: 1, category: "ప్రధాన దైవ మంత్రాలు", title: "ఓం నమః శివాయ" },
    { id: 2, category: "ప్రధాన దైవ మంత్రాలు", title: "ఓం నమో నారాయణాయ" },
    { id: 3, category: "ప్రధాన దైవ మంత్రాలు", title: "ఓం శ్రీ రామ్ జై రామ్ జై జై రామ్" },
    { id: 4, category: "ప్రధాన దైవ మంత్రాలు", title: "ఓం శ్రీ కృష్ణాయ నమః" },
    { id: 5, category: "ప్రధాన దైవ మంత్రాలు", title: "ఓం గం గణపతయే నమః" },
    { id: 6, category: "ప్రధాన దైవ మంత్రాలు", title: "ఓం దుమ్ దుర్గాయై నమః" },
    { id: 7, category: "ప్రధాన దైవ మంత్రాలు", title: "ఓం నమో భగవతే వాసుదేవాయ" },
    { id: 8, category: "ప్రధాన దైవ మంత్రాలు", title: "ఓం శ్రీ హనుమతే నమః" },
    { id: 9, category: "ప్రధాన దైవ మంత్రాలు", title: "ఓం శ్రీ సాయిరామ్" },
    { id: 10, category: "ప్రధాన దైవ మంత్రాలు", title: "ఓం శ్రీ వెంకటేశాయ నమః" },

    // 11–20: దేవి మంత్రాలు
    { id: 11, category: "దేవి మంత్రాలు", title: "ఓం శ్రీ మహాలక్ష్మ్యై నమః" },
    { id: 12, category: "దేవి మంత్రాలు", title: "ఓం శ్రీ సరస్వత్యై నమః" },
    { id: 13, category: "దేవి మంత్రాలు", title: "ఓం ఐం హ్రీం క్లీం చాముండాయై విచ్చే" },
    { id: 14, category: "దేవి మంత్రాలు", title: "ఓం కాళికాయై నమః" },
    { id: 15, category: "దేవి మంత్రాలు", title: "ఓం దం బగలాముఖ్యై నమః" },
    { id: 16, category: "దేవి మంత్రాలు", title: "దుర్గా సప్తశతి అర్గలా స్తోత్రం" },
    { id: 17, category: "దేవి మంత్రాలు", title: "లక్ష్మీ అష్టోత్తర శతనామావళి" },
    { id: 18, category: "దేవి మంత్రాలు", title: "ఓం శక్తి స్వరూపిణ్యై నమః" },
    { id: 19, category: "దేవి మంత్రాలు", title: "ఓం భువనేశ్వర్యై నమః" },
    { id: 20, category: "దేవి మంత్రాలు", title: "ఓం కాళరాత్ర్యై నమః" },

    // 21–30: శివ–వైష్ణవ మంత్రాలు
    { id: 21, category: "శివ–వైష్ణవ మంత్రాలు", title: "మహామృత్యుంజయ మంత్రం" },
    { id: 22, category: "శివ–వైష్ణవ మంత్రాలు", title: "విష్ణు సహస్రనామ జపం" },
    { id: 23, category: "శివ–వైష్ణవ మంత్రాలు", title: "ఆదిత్య హృదయం" },
    { id: 24, category: "శివ–వైష్ణవ మంత్రాలు", title: "రుద్రం నమక–చమక" },
    { id: 25, category: "శివ–వైష్ణవ మంత్రాలు", title: "శివ పంచాక్షర మంత్రం" },
    { id: 26, category: "శివ–వైష్ణవ మంత్రాలు", title: "విష్ణు పంచాక్షరి – ఓం నం నారాయణాయ" },
    { id: 27, category: "శివ–వైష్ణవ మంత్రాలు", title: "రామ రక్షా స్తోత్రం" },
    { id: 28, category: "శివ–వైష్ణవ మంత్రాలు", title: "హనుమాన్ చాలీసా (తెలుగు)" },
    { id: 29, category: "శివ–వైష్ణవ మంత్రాలు", title: "శ్రీ సుబ్రహ్మణ్య స్వామి మంత్రం" },
    { id: 30, category: "శివ–వైష్ణవ మంత్రాలు", title: "ఓం శరణం అయ్యప్పా" },

    // 31–40: గణేశ, హనుమాన్, సాయిబాబా మంత్రాలు
    { id: 31, category: "గణేశ, హనుమాన్, సాయిబాబా మంత్రాలు", title: "ఓం వక్రతుండ మహాకాయ" },
    { id: 32, category: "గణేశ, హనుమాన్, సాయిబాబా మంత్రాలు", title: "గణేశ అష్టోత్తర శతనామావళి" },
    { id: 33, category: "గణేశ, హనుమాన్, సాయిబాబా మంత్రాలు", title: "హనుమాన్ బీజ మంత్రం" },
    { id: 34, category: "గణేశ, హనుమాన్, సాయిబాబా మంత్రాలు", title: "బజరంగ్ బాణం" },
    { id: 35, category: "గణేశ, హనుమాన్, సాయిబాబా మంత్రాలు", title: "సాయినాధ మహిమా జపం" },
    { id: 36, category: "గణేశ, హనుమాన్, సాయిబాబా మంత్రాలు", title: "ఓం శ్రీ దత్తాత్రేయాయ నమః" },
    { id: 37, category: "గణేశ, హనుమాన్, సాయిబాబా మంత్రాలు", title: "దత్తాత్రేయ అనఘా దేవి జపం" },
    { id: 38, category: "గణేశ, హనుమాన్, సాయిబాబా మంత్రాలు", title: "నవగ్రహ మంత్రాలు" },
    { id: 39, category: "గణేశ, హనుమాన్, సాయిబాబా మంత్రాలు", title: "శనీశ్వర మంత్రం" },
    { id: 40, category: "గణేశ, హనుమాన్, సాయిబాబా మంత్రాలు", title: "నవదుర్గ జపం" },

    // 41–50: శాంతి, రక్షణ మంత్రాలు
    { id: 41, category: "శాంతి, రక్షణ మంత్రాలు", title: "గాయత్రి మంత్రం" },
    { id: 42, category: "శాంతి, రక్షణ మంత్రాలు", title: "ఓం శాంతిః శాంతిః శాంతిః" },
    { id: 43, category: "శాంతి, రక్షణ మంత్రాలు", title: "శ్రీ రాఘవేంద్ర స్వామి జపం" },
    { id: 44, category: "శాంతి, రక్షణ మంత్రాలు", title: "శ్రీ వినాయక శాంతి పాఠం" },
    { id: 45, category: "శాంతి, రక్షణ మంత్రాలు", title: "ఓం నారసింహాయ నమః" },
    { id: 46, category: "శాంతి, రక్షణ మంత్రాలు", title: "నారసింహ కవచం" },
    { id: 47, category: "శాంతి, రక్షణ మంత్రాలు", title: "ఓం శ్రీవల్లీ దేవసేన సమేత సుబ్రహ్మణ్యాయ నమః" },
    { id: 48, category: "శాంతి, రక్షణ మంత్రాలు", title: "దత్త బావనీ మంత్రం" },
    { id: 49, category: "శాంతి, రక్షణ మంత్రాలు", title: "నవకర జపం" },
    { id: 50, category: "శాంతి, రక్షణ మంత్రాలు", title: "ఓం క్లీం కృష్ణాయ గోవిందాయ గోపీజన వల్లభాయ స్వాహా" }
];

// --- INITIALIZATION ---
function initApp() {
    console.log("Japam App Initializing...");
    const loadingEl = document.getElementById('loading-indicator');
    
    try {
        if (document.getElementById('dashboard-container')) {
            renderDashboard();
            if(loadingEl) loadingEl.remove(); // Force remove
        } else if (document.getElementById('mantra-detail-container')) {
            renderMantraDetail();
            if(loadingEl) loadingEl.remove();
        } else {
            console.warn("No valid container found.");
        }
    } catch (e) {
        console.error("Initialization Error", e);
        if (loadingEl) {
            loadingEl.innerHTML = `<div class="text-red-600 p-4 border border-red-200 rounded bg-red-50">
                <p class="font-bold">Error loading content:</p>
                <p class="text-sm">${e.message}</p>
            </div>`;
        }
    }
}

// Robust start logic
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    // If DOM is already ready, run immediately
    initApp();
}

// --- LOGIC: DASHBOARD ---
function renderDashboard() {
    const container = document.getElementById('dashboard-container');
    if (!container) return;
    
    // Clear previous content
    container.innerHTML = '';

    // Group by Category
    const grouped = {};
    MANTRAS.forEach(m => {
        if (!grouped[m.category]) grouped[m.category] = [];
        grouped[m.category].push(m);
    });

    // Generate HTML
    for (const [category, mantras] of Object.entries(grouped)) {
        const section = document.createElement('section');
        section.className = "space-y-4 mb-8";
        
        const heading = document.createElement('h2');
        heading.className = "text-xl font-bold text-orange-900 border-l-4 border-orange-500 pl-3";
        heading.textContent = category;
        section.appendChild(heading);

        const grid = document.createElement('div');
        grid.className = "grid grid-cols-1 md:grid-cols-2 gap-4";

        mantras.forEach(mantra => {
            const card = document.createElement('div');
            card.className = "bg-white rounded-xl shadow-sm border border-orange-100 p-4 flex items-center justify-between cursor-pointer mantra-card group";
            
            // Standard navigation
            card.onclick = function() {
                window.location.href = 'mantra.html?id=' + mantra.id;
            };

            card.innerHTML = `
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800 group-hover:text-orange-700 transition-colors">${mantra.title}</h3>
                        <p class="text-xs text-gray-500 mt-0.5">మంత్రం తెరవండి</p>
                    </div>
                </div>
                <svg class="text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            `;
            grid.appendChild(card);
        });

        section.appendChild(grid);
        container.appendChild(section);
    }
}

// --- LOGIC: MANTRA DETAIL ---
let audioCtx = null;
let isPlaying = false;
let loopCount = 0;
const LOOP_TARGET = 5;
let abortController = null;
let genaiAudioBuffer = null; // Cache

function renderMantraDetail() {
    const container = document.getElementById('mantra-detail-container');
    if (!container) return;

    // Get ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');
    const id = idParam ? parseInt(idParam) : null;
    const mantra = MANTRAS.find(m => m.id === id);

    if (!mantra) {
        container.innerHTML = `
            <div class="text-center p-8 bg-white rounded-xl shadow-sm border border-orange-200">
                <p class="text-red-500 text-lg mb-4">మంత్రం కనుగొనబడలేదు. (Mantra not found)</p>
                <a href="index.html" class="inline-block px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">Go Back</a>
            </div>`;
        return;
    }

    // Load Count
    let count = 0;
    try {
        const saved = localStorage.getItem('chant_count_' + id);
        if(saved) count = parseInt(saved);
    } catch(e) {
        console.warn("Local storage error", e);
    }
    
    // Render Template
    container.innerHTML = `
        <div class="bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden relative animate-zoom-in">
            <!-- Mandala Background Header -->
            <div class="h-32 bg-gradient-to-r from-orange-400 to-red-500 relative">
                <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle, #fff 10%, transparent 10%); background-size: 20px 20px;"></div>
                <div class="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <span class="text-3xl font-bold text-orange-600">${mantra.id}</span>
                </div>
            </div>

            <div class="pt-12 pb-8 px-6 text-center space-y-6">
                <!-- Titles -->
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 leading-tight mb-4">${mantra.title}</h1>
                    <div class="bg-orange-50 p-6 rounded-2xl border border-orange-100 inline-block w-full">
                        <p class="text-xl font-serif text-orange-800 leading-relaxed font-medium" id="mantra-text">
                           ${mantra.title}
                        </p>
                    </div>
                </div>

                <!-- Audio Controls -->
                <div class="flex flex-col items-center gap-3">
                    <button id="play-btn" class="w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 bg-orange-600 text-white hover:bg-orange-700 hover:scale-105">
                        <svg id="play-icon" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        <svg id="pause-icon" class="hidden" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                    </button>
                    <div id="status-text" class="h-6 text-sm font-medium text-gray-400">Click Play to Chant (5x)</div>
                </div>

                <div class="border-t border-gray-100 my-4 w-full"></div>

                <!-- Counter -->
                <div class="flex flex-col items-center gap-4">
                    <h3 class="text-gray-500 font-medium uppercase tracking-widest text-xs">Japam Counter</h3>
                    <div class="text-6xl font-bold text-gray-800 tabular-nums tracking-tight" id="counter-display">${count}</div>
                    
                    <div class="flex items-center gap-4">
                        <button id="reset-btn" class="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors" title="Reset">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12"/><path d="M3 3v9h9"/></svg>
                        </button>
                        <button id="count-btn" class="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                            <span class="font-semibold text-lg">Count</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Event Listeners
    const playBtn = document.getElementById('play-btn');
    const resetBtn = document.getElementById('reset-btn');
    const countBtn = document.getElementById('count-btn');
    const counterDisplay = document.getElementById('counter-display');
    const statusText = document.getElementById('status-text');

    playBtn.onclick = function() { toggleAudio(playBtn, statusText, mantra.title); };
    
    countBtn.onclick = function() {
        count++;
        counterDisplay.textContent = count;
        try { localStorage.setItem('chant_count_' + id, count); } catch(e) {}
    };

    resetBtn.onclick = function() {
        if(confirm('Reset counter?')) {
            count = 0;
            counterDisplay.textContent = count;
            try { localStorage.setItem('chant_count_' + id, count); } catch(e) {}
        }
    };
}

// --- LOGIC: AUDIO & GENAI ---
async function toggleAudio(btn, statusEl, mantraTitle) {
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');

    if (isPlaying) {
        // STOP
        isPlaying = false;
        if (abortController) abortController.abort();
        
        btn.classList.remove('bg-red-50', 'text-red-600', 'playing-pulse');
        btn.classList.add('bg-orange-600', 'text-white');
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        statusEl.textContent = "Audio Paused";
        statusEl.classList.remove('text-orange-600');
        statusEl.classList.add('text-gray-400');
    } else {
        // START
        isPlaying = true;
        loopCount = 0;
        abortController = new AbortController();
        const signal = abortController.signal;

        btn.classList.remove('bg-orange-600', 'text-white');
        btn.classList.add('bg-red-50', 'text-red-600', 'playing-pulse');
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        statusEl.classList.remove('text-gray-400');
        statusEl.classList.add('text-orange-600');
        statusEl.textContent = "Preparing...";

        try {
            // Attempt to get GenAI Audio first (only once per session per page load for now)
            if (!genaiAudioBuffer) {
                // Check if API Key is available via process.env
                let apiKey = '';
                try {
                     if (process && process.env) apiKey = process.env.API_KEY;
                } catch (e) {}
                
                if (apiKey) {
                    statusEl.textContent = "Generating Divine Voice...";
                    try {
                        genaiAudioBuffer = await generateMantraAudio(mantraTitle, apiKey);
                    } catch (err) {
                        console.log("GenAI skipped or failed", err);
                    }
                }
            }

            // Loop
            while (loopCount < LOOP_TARGET && isPlaying) {
                if (signal.aborted) break;
                
                statusEl.textContent = "Chanting... " + (loopCount + 1) + " / " + LOOP_TARGET;
                
                if (genaiAudioBuffer) {
                   await playGenAIAudio(genaiAudioBuffer);
                } else {
                   await playOmSound(4); // Fallback to synth
                }
                
                if (signal.aborted || !isPlaying) break;
                
                // Gap
                await new Promise(r => setTimeout(r, 1000));
                loopCount++;
            }
            if (loopCount >= LOOP_TARGET) {
                 statusEl.textContent = "Chanting Completed";
            }
        } catch (e) {
            console.error(e);
            statusEl.textContent = "Error";
        } finally {
            if (isPlaying && loopCount >= LOOP_TARGET) {
                // Auto-stop UI reset if finished naturally
                isPlaying = false;
                btn.classList.remove('bg-red-50', 'text-red-600', 'playing-pulse');
                btn.classList.add('bg-orange-600', 'text-white');
                playIcon.classList.remove('hidden');
                pauseIcon.classList.add('hidden');
            }
        }
    }
}

// Generate Audio using Gemini API with Dynamic Import
async function generateMantraAudio(mantraTitle, apiKey) {
    if (!apiKey) return null;

    let GoogleGenAI, Modality;
    try {
        // Use direct URL for dynamic import. Note: This requires network access.
        const genAIModule = await import("https://esm.sh/@google/genai@0.1.0");
        GoogleGenAI = genAIModule.GoogleGenAI;
        Modality = genAIModule.Modality;
    } catch (e) {
        console.warn("Could not load Google GenAI SDK:", e);
        return null;
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Specific prompt
    const promptText = "Chant the mantra '" + mantraTitle + "' in a gentle, soft female voice. Maintain a slow, rhythmic japam style appropriate for meditation. Add light natural reverb and a calm spiritual ambience. Pronunciation should be clear, traditional, and emotionally calming.";
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: promptText }] }],
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: 'Kore' },
                },
            },
        },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) return null;

    const ctx = getAudioContext();
    const binaryString = atob(base64Audio);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    
    return await ctx.decodeAudioData(bytes.buffer);
}

function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
}

// Play Decoded GenAI Buffer
function playGenAIAudio(buffer) {
    return new Promise((resolve) => {
        const ctx = getAudioContext();
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.onended = resolve;
        source.start(0);
    });
}

// Generate Soft Bell/Om Sound (Fallback)
function playOmSound(duration) {
    return new Promise((resolve) => {
        try {
            const ctx = getAudioContext();
            if (ctx.state === 'suspended') ctx.resume();

            const now = ctx.currentTime;
            const fundamental = 136.1; // Om (C#3 approx)

            const masterGain = ctx.createGain();
            masterGain.connect(ctx.destination);
            
            // Envelope: Slow Attack, Long Decay
            masterGain.gain.setValueAtTime(0, now);
            masterGain.gain.linearRampToValueAtTime(0.3, now + 0.5); 
            masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

            // Osc 1: Sine (Base)
            const osc1 = ctx.createOscillator();
            osc1.type = 'sine';
            osc1.frequency.value = fundamental;
            osc1.connect(masterGain);

            // Osc 2: Triangle (Harmonic 1)
            const osc2 = ctx.createOscillator();
            osc2.type = 'triangle';
            osc2.frequency.value = fundamental * 2;
            const g2 = ctx.createGain(); g2.gain.value = 0.1;
            osc2.connect(g2); g2.connect(masterGain);

            // Osc 3: Sub Sine (Depth)
            const osc3 = ctx.createOscillator();
            osc3.type = 'sine';
            osc3.frequency.value = fundamental / 2;
            const g3 = ctx.createGain(); g3.gain.value = 0.15;
            osc3.connect(g3); g3.connect(masterGain);

            osc1.start(now); osc2.start(now); osc3.start(now);
            osc1.stop(now + duration); osc2.stop(now + duration); osc3.stop(now + duration);

            setTimeout(resolve, duration * 1000);
        } catch (e) {
            console.error("Audio Error", e);
            resolve();
        }
    });
}