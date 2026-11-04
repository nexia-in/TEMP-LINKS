function showFormScreen() {
    const welcomeScreen = document.getElementById("welcomeScreen");
    const formScreen = document.getElementById("formScreen");
    if (welcomeScreen) welcomeScreen.classList.remove("active-screen");
    if (formScreen) formScreen.classList.add("active-screen");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function showWelcomeScreen() {
    const welcomeScreen = document.getElementById("welcomeScreen");
    const formScreen = document.getElementById("formScreen");
    if (formScreen) formScreen.classList.remove("active-screen");
    if (welcomeScreen) welcomeScreen.classList.add("active-screen");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function initApp() {
    const maxPilgrims = 5;
    let pilgrimCount = 0;

    document.getElementById("startBtn").addEventListener("click", showFormScreen);
    document.getElementById("backToHomeBtn").addEventListener("click", showWelcomeScreen);

    // 1. Load Texts from content.js
    document.getElementById("ui-chant").textContent = NEXIA_CONTENT.chant;
    document.getElementById("ui-brand-name").textContent = NEXIA_CONTENT.brandName;
    document.getElementById("ui-welcome-desc").textContent = NEXIA_CONTENT.welcomeDescription;
    document.getElementById("ui-start-btn-text").textContent = NEXIA_CONTENT.startButtonText;
    document.getElementById("ui-exp-badge").textContent = NEXIA_CONTENT.experienceBadge;
    document.getElementById("ui-ad-title").textContent = NEXIA_CONTENT.adTitle;
    document.getElementById("ui-helpline-display").textContent = NEXIA_CONTENT.helplineDisplay;
    document.getElementById("ui-disclaimer").textContent = NEXIA_CONTENT.disclaimerText;
    document.getElementById("ui-reporting-note").textContent = NEXIA_CONTENT.reportingInstruction;
    document.getElementById("ui-footer-brand").textContent = NEXIA_CONTENT.footerBrand;
    document.getElementById("ui-footer-copy").textContent = NEXIA_CONTENT.footerCopy;
    document.getElementById("ui-footer-disc").textContent = NEXIA_CONTENT.footerDisclaimer;

    // Populate Services List on Landing Page
    const srvContainer = document.getElementById("ui-services-list");
    NEXIA_CONTENT.servicesList.forEach(srv => {
        const span = document.createElement("span");
        span.className = "srv-pill";
        span.textContent = srv;
        srvContainer.appendChild(span);
    });

    function fillSelect(selectEl, items, defaultValue) {
        items.forEach(item => {
            const opt = document.createElement("option");
            opt.value = item;
            opt.textContent = item;
            if (defaultValue && item === defaultValue) opt.selected = true;
            selectEl.appendChild(opt);
        });
    }

    fillSelect(document.getElementById("visitSlot"), NEXIA_CONTENT.timeSlots);

    // 3. Pilgrim Row Builder (Up to 5 Pilgrims)
    const pilgrimsList = document.getElementById("pilgrimsList");
    const addPilgrimBtn = document.getElementById("addPilgrimBtn");

    function getStarsOptionsHtml() {
        return NEXIA_CONTENT.stars.map(s => `<option value="${s}">${s}</option>`).join("");
    }

    function getLanguageOptionsHtml() {
        return NEXIA_CONTENT.languages.map(lang => {
            const selected = lang === NEXIA_CONTENT.defaultLanguage ? " selected" : "";
            return `<option value="${lang}"${selected}>${lang}</option>`;
        }).join("");
    }

    function getPhotoIdOptionsHtml() {
        return NEXIA_CONTENT.photoIdTypes.map(t => `<option value="${t}">${t}</option>`).join("");
    }

    function getCountryOptionsHtml() {
        return NEXIA_CONTENT.countries.map(c => {
            const selected = c === NEXIA_CONTENT.defaultCountry ? " selected" : "";
            return `<option value="${c}"${selected}>${c}</option>`;
        }).join("");
    }

    function getStateOptionsHtml() {
        return NEXIA_CONTENT.states.map(s => {
            const selected = s === NEXIA_CONTENT.defaultState ? " selected" : "";
            return `<option value="${s}"${selected}>${s}</option>`;
        }).join("");
    }

    function getDistrictOptionsHtml() {
        return NEXIA_CONTENT.districts.map(d => {
            const selected = d === NEXIA_CONTENT.defaultDistrict ? " selected" : "";
            return `<option value="${d}"${selected}>${d}</option>`;
        }).join("");
    }

    function addPilgrimCard() {
        if (pilgrimCount >= maxPilgrims) return;
        pilgrimCount++;

        const isLeader = pilgrimCount === 1;
        const roleTitle = isLeader ? "ടീം ലീഡർ (Main Swami - 1)" : `തീർത്ഥാടകൻ (Pilgrim - ${pilgrimCount})`;

        const card = document.createElement("div");
        card.className = "pilgrim-box";
        card.dataset.index = pilgrimCount;

        card.innerHTML = `
            <div class="pilgrim-top-bar">
                <span class="p-role-tag">${roleTitle}</span>
                ${!isLeader ? `<button type="button" class="remove-p-btn" onclick="removePilgrim(this)">✕ ഒഴിവാക്കുക</button>` : ""}
            </div>

            <div class="pilgrim-row-2">
                <div>
                    <label>First Name <span class="req">*</span></label>
                    <input type="text" class="p-first-name" placeholder="First Name" required>
                </div>
                <div>
                    <label>Last Name <span class="req">*</span></label>
                    <input type="text" class="p-last-name" placeholder="Last Name" required>
                </div>
            </div>

            <div class="pilgrim-row-3">
                <div>
                    <label>Mobile Number <span class="req">*</span></label>
                    <input type="tel" class="p-mobile" pattern="[0-9]{10}" placeholder="10 അക്ക നമ്പർ" required>
                </div>
                <div>
                    <label>Gender <span class="req">*</span></label>
                    <select class="p-gender" required>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div>
                    <label>Date of Birth <span class="req">*</span></label>
                    <input type="date" class="p-dob" required>
                </div>
            </div>

            <div class="pilgrim-row-3">
                <div>
                    <label>Photo ID Type <span class="req">*</span></label>
                    <select class="p-idtype" required>
                        ${getPhotoIdOptionsHtml()}
                    </select>
                </div>
                <div>
                    <label>ID Number <span class="req">*</span></label>
                    <input type="text" class="p-idnum" placeholder="ID Number" required>
                </div>
                <div>
                    <label>Language <span class="req">*</span></label>
                    <select class="p-language" required>
                        ${getLanguageOptionsHtml()}
                    </select>
                </div>
            </div>

            <div class="field-group">
                <label>Star (നക്ഷത്രം) <span class="req">*</span></label>
                <select class="p-star" required>
                    <option value="">തിരഞ്ഞെടുക്കുക</option>
                    ${getStarsOptionsHtml()}
                </select>
            </div>

            <div class="pilgrim-section-label">വിലാസം (Address)</div>
            <div class="field-group">
                <label>Address <span class="req">*</span></label>
                <input type="text" class="p-address" placeholder="House Name, Street, Locality" required>
            </div>
            <div class="pilgrim-row-2">
                <div>
                    <label>Post Office <span class="req">*</span></label>
                    <input type="text" class="p-post-office" placeholder="Post Office" required>
                </div>
                <div>
                    <label>Postal Code <span class="req">*</span></label>
                    <input type="text" class="p-postal-code" pattern="[0-9]{6}" placeholder="6 അക്ക നമ്പർ" required>
                </div>
            </div>
            <div class="pilgrim-row-3">
                <div>
                    <label>Country <span class="req">*</span></label>
                    <select class="p-country" required>
                        ${getCountryOptionsHtml()}
                    </select>
                </div>
                <div>
                    <label>State / Province <span class="req">*</span></label>
                    <select class="p-state" required>
                        ${getStateOptionsHtml()}
                    </select>
                </div>
                <div>
                    <label>District / City <span class="req">*</span></label>
                    <select class="p-district" required>
                        ${getDistrictOptionsHtml()}
                    </select>
                </div>
            </div>
            <div class="field-group">
                <label>Zip / Pincode <span class="req">*</span></label>
                <input type="text" class="p-pincode" pattern="[0-9]{6}" placeholder="6 അക്ക നമ്പർ" required>
            </div>

            <div class="pilgrim-section-label">രക്ഷകർത്താവ് (Guardian)</div>
            <div class="pilgrim-row-3">
                <div>
                    <label>രക്ഷകർത്താവിന്റെ പേര് (Guardian Name) <span class="req">*</span></label>
                    <input type="text" class="p-parent-name" placeholder="Guardian Name" required>
                </div>
                <div>
                    <label>രക്ഷകർത്താവിന്റെ പ്രായം (Guardian Age) <span class="req">*</span></label>
                    <input type="number" class="p-parent-age" min="1" max="120" placeholder="Age" required>
                </div>
                <div>
                    <label>രക്ഷകർത്താവുമായുള്ള ബന്ധം (Relation) <span class="req">*</span></label>
                    <select class="p-parent-relation" required>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="text" class="p-parent-relation-other" placeholder="Specify relation" style="display:none; margin-top:8px;">
                </div>
            </div>
        `;

        const relationSelect = card.querySelector(".p-parent-relation");
        const relationOther = card.querySelector(".p-parent-relation-other");
        relationSelect.addEventListener("change", () => {
            if (relationSelect.value === "Other") {
                relationOther.style.display = "block";
                relationOther.required = true;
            } else {
                relationOther.style.display = "none";
                relationOther.required = false;
                relationOther.value = "";
            }
        });

        pilgrimsList.appendChild(card);
        updateAddButtonState();
    }

    window.removePilgrim = function(btn) {
        const card = btn.closest(".pilgrim-box");
        card.remove();
        pilgrimCount--;
        renumberPilgrims();
        updateAddButtonState();
    };

    function renumberPilgrims() {
        const boxes = pilgrimsList.querySelectorAll(".pilgrim-box");
        boxes.forEach((box, idx) => {
            const num = idx + 1;
            const tag = box.querySelector(".p-role-tag");
            tag.textContent = num === 1 ? "ടീം ലീഡർ (Main Swami - 1)" : `തീർത്ഥാടകൻ (Pilgrim - ${num})`;
        });
    }

    function updateAddButtonState() {
        if (pilgrimCount >= maxPilgrims) {
            addPilgrimBtn.style.display = "none";
        } else {
            addPilgrimBtn.style.display = "block";
            addPilgrimBtn.textContent = `+ അടുത്ത തീർത്ഥാടകനെ ചേർക്കുക (Add Pilgrim ${pilgrimCount + 1}/${maxPilgrims})`;
        }
    }

    addPilgrimBtn.addEventListener("click", addPilgrimCard);

    // Initialize with 1st Pilgrim (Group Leader)
    addPilgrimCard();

    // 4. Form Submission -> Single Line Format + HTML Download + WhatsApp
    let latestPilgrimHtmlRows = "";

    document.getElementById("sabarimalaForm").addEventListener("submit", (e) => {
        e.preventDefault();

        const teamNumber = document.getElementById("teamNumber").value.trim();
        const visitDate = document.getElementById("visitDate").value;
        const visitSlot = document.getElementById("visitSlot").value;

        const boxes = pilgrimsList.querySelectorAll(".pilgrim-box");
        let singleLinesText = "";
        latestPilgrimHtmlRows = "";

        boxes.forEach((box, idx) => {
            const role = idx === 0 ? "TEAM LEADER" : `PILGRIM ${idx + 1}`;
            const firstName = box.querySelector(".p-first-name").value.trim();
            const lastName = box.querySelector(".p-last-name").value.trim();
            const mobile = box.querySelector(".p-mobile").value.trim();
            const gender = box.querySelector(".p-gender").value;
            const dob = box.querySelector(".p-dob").value;
            const idtype = box.querySelector(".p-idtype").value;
            const idnum = box.querySelector(".p-idnum").value.trim();
            const language = box.querySelector(".p-language").value;
            const star = box.querySelector(".p-star").value;
            const address = box.querySelector(".p-address").value.trim();
            const postOffice = box.querySelector(".p-post-office").value.trim();
            const postalCode = box.querySelector(".p-postal-code").value.trim();
            const country = box.querySelector(".p-country").value;
            const state = box.querySelector(".p-state").value;
            const district = box.querySelector(".p-district").value;
            const pincode = box.querySelector(".p-pincode").value.trim();
            const parentName = box.querySelector(".p-parent-name").value.trim();
            const parentAge = box.querySelector(".p-parent-age").value.trim();
            const relationSelect = box.querySelector(".p-parent-relation").value;
            const relationOther = box.querySelector(".p-parent-relation-other").value.trim();
            const relation = relationSelect === "Other" ? (relationOther || "Other") : relationSelect;

            singleLinesText += `${idx + 1}. [${role}] ${firstName} ${lastName} | Mobile: ${mobile} | ${gender} | DOB: ${dob} | ${idtype}: ${idnum} | Lang: ${language} | Star: ${star} | Address: ${address}, ${postOffice}, ${district}, ${state}, ${country} - ${postalCode}/${pincode} | Guardian: ${parentName} (${relation}, ${parentAge} Yrs)\n`;

            latestPilgrimHtmlRows += `
                <tr>
                    <td>${idx + 1} (${role})</td>
                    <td><strong>${firstName} ${lastName}</strong></td>
                    <td>${mobile}</td>
                    <td>${gender}</td>
                    <td>${dob}</td>
                    <td>${idtype}</td>
                    <td>${idnum}</td>
                    <td>${language}</td>
                    <td>${star}</td>
                    <td>${address}, ${postOffice}, ${district}, ${state}, ${country} - ${postalCode}/${pincode}</td>
                    <td>${parentName} (${relation}, ${parentAge} Yrs)</td>
                </tr>`;
        });

        const teamLine = teamNumber ? `*Team Name/Number:* ${teamNumber}\n` : "";

        const fullMessage = 
`*SABARIMALA VIRTUAL-Q BOOKING*
*Nexia Virtual Desk*
----------------------------------
${teamLine}*Date:* ${visitDate} | *Slot:* ${visitSlot}
----------------------------------
*PILGRIMS LIST (${boxes.length} / 5):*
${singleLinesText}----------------------------------
*(ഫോട്ടോയും ഐഡി കാർഡ് കോപ്പിയും ഇതോടൊപ്പം വാട്സാപ്പിൽ അയക്കുന്നു)*`;

        // Show Copy / Download Panel
        const outputPanel = document.getElementById("outputPanel");
        const generatedText = document.getElementById("generatedText");
        generatedText.value = fullMessage;
        outputPanel.style.display = "block";

        // Open WhatsApp
        const waUrl = `https://wa.me/${NEXIA_CONTENT.whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;
        window.open(waUrl, "_blank");
    });

    // Copy Button
    document.getElementById("copyDataBtn").addEventListener("click", () => {
        const text = document.getElementById("generatedText");
        text.select();
        navigator.clipboard.writeText(text.value);
        alert("വിവരങ്ങൾ കോപ്പി ചെയ്തു!");
    });

    // Download Interactive HTML Slip Button
    document.getElementById("downloadHtmlBtn").addEventListener("click", () => {
        const teamNumber = document.getElementById("teamNumber").value.trim();
        const visitDate = document.getElementById("visitDate").value;
        const visitSlot = document.getElementById("visitSlot").value;
        const firstBox = pilgrimsList.querySelector(".pilgrim-box");
        const leaderMobile = firstBox ? firstBox.querySelector(".p-mobile").value.trim() : "booking";
        const teamLabel = teamNumber || leaderMobile;

        const downloadableHtml = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Nexia Sabarimala Booking Data - ${teamLabel}</title>
<style>
body { font-family: Arial, sans-serif; padding: 20px; background: #f8fafc; color: #1e293b; }
h2 { color: #0f172a; }
table { width: 100%; border-collapse: collapse; margin-top: 15px; background: #fff; }
th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; font-size: 13px; }
th { background: #1e293b; color: #fff; }
</style></head>
<body>
<h2>SABARIMALA VIRTUAL-Q DATA | NEXIA VIRTUAL DESK</h2>
${teamNumber ? `<p><strong>Team Name/Number:</strong> ${teamNumber}</p>` : ""}
<p><strong>Preferred Date:</strong> ${visitDate} | <strong>Slot:</strong> ${visitSlot}</p>
<table>
    <thead>
        <tr><th>#</th><th>Name</th><th>Mobile</th><th>Gender</th><th>DOB</th><th>Photo ID Type</th><th>ID Number</th><th>Language</th><th>Star</th><th>Address</th><th>Guardian (Relation, Age)</th></tr>
    </thead>
    <tbody>${latestPilgrimHtmlRows}</tbody>
</table>
</body></html>`;

        const blob = new Blob([downloadableHtml], { type: "text/html" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `Sabarimala_Team_${teamLabel}.html`;
        link.click();
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}