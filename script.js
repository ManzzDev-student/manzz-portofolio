document.addEventListener("DOMContentLoaded", () => {
    // 1. ENGINE THEME SWITCHER
    const btnTheme = document.getElementById("theme-toggle");
    const body = document.body;
    let isDark = localStorage.getItem("theme") !== "light";
    
    const updateTheme = () => {
        body.className = isDark ? "dark-mode" : "light-mode";
        btnTheme.textContent = isDark ? "🌙" : "☀️";
        localStorage.setItem("theme", isDark ? "dark" : "light");
    };
    updateTheme();
    
    btnTheme.addEventListener("click", () => {
        isDark = !isDark;
        updateTheme();
    });

    // 2. INTERAKTIF MISTERIUS (ANOMALY SCREEN GLITCH)
    const anomalyBtns = document.querySelectorAll(".anomaly-btn");
    const glitchOverlay = document.getElementById("glitch-overlay");

    anomalyBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            const originalText = this.textContent;
            this.textContent = this.getAttribute("data-msg");
            
            body.classList.add("is-glitching");
            glitchOverlay.style.opacity = "1";

            setTimeout(() => {
                body.classList.remove("is-glitching");
                glitchOverlay.style.opacity = "0";
                this.textContent = originalText;
            }, 1200);
        });
    });

    // 3. THE VAULT DROPDOWN SYSTEM
    const triggers = document.querySelectorAll(".vault-trigger");
    triggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const item = trigger.closest(".vault-item");
            const content = item.querySelector(".vault-content");
            const status = trigger.querySelector(".vault-status");
            
            if(item.classList.contains("active")) {
                item.classList.remove("active");
                content.style.maxHeight = null;
                status.textContent = "[ENCRYPTED]";
            } else {
                document.querySelectorAll(".vault-item").forEach(i => i.classList.remove("active"));
                document.querySelectorAll(".vault-content").forEach(c => c.style.maxHeight = null);
                document.querySelectorAll(".vault-status").forEach(s => s.textContent = "[ENCRYPTED]");
                
                item.classList.add("active");
                content.style.maxHeight = content.scrollHeight + "px";
                status.textContent = "[DECRYPTED]";
            }
        });
    });

    // 4. RAW JS EVAL ENGINE
    const evalInput = document.getElementById("playground-input");
    const evalOutput = document.getElementById("playground-output");
    const btnRun = document.getElementById("btn-run-code");
    const btnClear = document.getElementById("btn-clear-pg");

    btnRun.addEventListener("click", () => {
        try {
            const res = eval(evalInput.value);
            if(res === undefined) {
                evalOutput.innerHTML = `<span style="color: #10b981;">[OK] Eksekusi tanpa return.</span>`;
            } else {
                evalOutput.innerHTML = `<span style="color: #fff;">${String(res)}</span>`;
            }
        } catch(e) {
            evalOutput.innerHTML = `<span style="color: #ef4444;">[FATAL] ${e.message}</span>`;
        }
    });

    btnClear.addEventListener("click", () => {
        evalInput.value = `// Clean slate.\nlet x = "Manzz Logic";\nx;`;
        evalOutput.textContent = "Menunggu instruksi...";
    });

    // 5. ANIMASI SCROLL ELEMENT
    const faders = document.querySelectorAll(".fade-in");
    const appearOptions = { threshold: 0.1 };
    const appearScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if(!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => appearScroll.observe(fader));
});
