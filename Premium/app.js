document.addEventListener("DOMContentLoaded", () => {
    const maxPilgrims = 5;
    let pilgrimCount = 0;

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

    // Populate Slots & Districts
    const slotSelect = document.getElementById("visitSlot");
    NEXIA_CONTENT.timeSlots.forEach(slot => {
        const opt = document.createElement("option");
        opt.value = slot;
        opt.textContent = slot;
        slotSelect.appendChild(opt);
    });

    const distSelect = document.getElementById("groupDistrict");
    NEXIA_CONTENT.districts.forEach(dist => {
        const opt = document.createElement("option");
        opt.value = dist;
        opt.textContent = dist;
        distSelect.appendChild(opt);
    });

    // 2. Navigation Between Welcome Screen & Form Screen
    const welcomeScreen = document.getElementById("welcomeScreen");
    const formScreen = document.getElementById("formScreen");

    document.getElementById("startBtn").addEventListener("click", () => {
        welcomeScreen.classList.remove("active-screen");
        formScreen.classList.add("active-screen");
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.getElementById("backToHomeBtn").addEventListener("click", () => {
        formScreen.classList.remove("active-screen");
        welcomeScreen.classList.add("active-screen");
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // 3. Pilgrim Row Builder (Up to 5 Pilgrims)
    const pilgrimsList = document.getElementById("pilgrimsList");
    const addPilgrimBtn = document.getElementById("addPilgrimBtn");

    function getStarsOptionsHtml() {
        return NEXIA_CONTENT.stars.map(s => `<option value="${s}">${s}</option>`).join("");
    }

    function addPilgrimCard() {
        if (pilgrimCount >= maxPilgrims) return;
        pilgrimCount++;

        const isLeader = pilgrimCount === 1;
        const roleTitle = isLeader ? "ഗ്രൂപ്പ് ലീഡർ (Main Swami - 1)" : `തീർത്ഥാടകൻ (Pilgrim - ${pilgrimCount})`;

        const card = document.createElement("div");
        card.className = "pilgrim-box";
        card.dataset.index = pilgrimCount;

        card.innerHTML = `
            <div class="pilgrim-top-bar">
                <span class="p-role-tag">${roleTitle}</span>
                ${!isLeader ? `<button type="button" class="remove-p-btn" onclick="removePilgrim(this)">✕ ഒഴിവാക്കുക</button>` : ""}
            </div>

            <!-- Line 1: Swami Name, Gender, Age/DOB, Star -->
            <div class="pilgrim-compact-row-1">
                <div>
                    <label>പേര് (ID പ്രകാരം) <span class="req">*</span></label>
                    <div class="swami-input-wrap">
                        <span class="swami-prefix">സ്വാമി:</span>
                        <input type="text" class="p-name" placeholder="മുഴുവൻ പേര്" required>
                    </div>
                </div>
                <div>
                    <label>ലിംഗം <span class="req">*</span></label>
                    <select class="p-gender" required>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div>
                    <label>വയസ്സ് / DOB <span class="req">*</span></label>
                    <input type="text" class="p-age" placeholder="വയസ്സ് അല്ലെങ്കിൽ DOB" required>
                </div>
                <div>
                    <label>നക്ഷത്രം <span class="req">*</span></label>
                    <select class="p-star" required>
                        <option value="">തിരഞ്ഞെടുക്കുക</option>
                        ${getStarsOptionsHtml()}
                    </select>
                </div>
            </div>

            <!-- Line 2: ID Number, Parent/Nominee Name, Parent Age -->
            <div class="pilgrim-compact-row-2">
                <div>
                    <label>ആധാർ / ID നമ്പർ <span class="req">*</span></label>
                    <input type="text" class="p-idnum" placeholder="ID കാർഡ് നമ്പർ" required>
                </div>
                <div>
                    <label>അച്ഛന്റെ / നോമിനിയുടെ പേര് <span class="req">*</span></label>
                    <input type="text" class="p-parent-name" placeholder="രക്ഷിതാവിന്റെ പേര്" required>
                </div>
                <div>
                    <label>രക്ഷിതാവിന്റെ വയസ്സ് <span class="req">*</span></label>
                    <input type="number" class="p-parent-age" min="1" max="115" placeholder="വയസ്സ്" required>
                </div>
            </div>
        `;

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
            tag.textContent = num === 1 ? "ഗ്രൂപ്പ് ലീഡർ (Main Swami - 1)" : `തീർത്ഥാടകൻ (Pilgrim - ${num})`;
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

        const visitDate = document.getElementById("visitDate").value;
        const visitSlot = document.getElementById("visitSlot").value;
        const mobile = document.getElementById("groupMobile").value.trim();
        const district = document.getElementById("groupDistrict").value;
        const pincode = document.getElementById("groupPincode").value.trim();
        const address = document.getElementById("groupAddress").value.trim();

        const boxes = pilgrimsList.querySelectorAll(".pilgrim-box");
        let singleLinesText = "";
        latestPilgrimHtmlRows = "";

        boxes.forEach((box, idx) => {
            const role = idx === 0 ? "GROUP LEADER" : `PILGRIM ${idx + 1}`;
            const name = box.querySelector(".p-name").value.trim();
            const gender = box.querySelector(".p-gender").value;
            const age = box.querySelector(".p-age").value.trim();
            const star = box.querySelector(".p-star").value;
            const idnum = box.querySelector(".p-idnum").value.trim();
            const parentName = box.querySelector(".p-parent-name").value.trim();
            const parentAge = box.querySelector(".p-parent-age").value.trim();

            // Single-line compact format for easy copy-paste
            singleLinesText += `${idx + 1}. [${role}] സ്വാമി: ${name} | ${gender} | Age/DOB: ${age} | Star: ${star} | ID: ${idnum} | Parent: ${parentName} (${parentAge} Yrs)\n`;

            latestPilgrimHtmlRows += `
                <tr>
                    <td>${idx + 1} (${role})</td>
                    <td><strong>സ്വാമി: ${name}</strong></td>
                    <td>${gender}</td>
                    <td>${age}</td>
                    <td>${star}</td>
                    <td>${idnum}</td>
                    <td>${parentName} (${parentAge})</td>
                </tr>`;
        });

        const fullMessage = 
`*SABARIMALA VIRTUAL-Q BOOKING*
*Nexia Virtual Desk*
----------------------------------
*Date:* ${visitDate} | *Slot:* ${visitSlot}
*Leader Mobile:* ${mobile}
*Address:* ${address}, ${district} - ${pincode}
----------------------------------
*PILGRIMS LIST (${boxes.length}):*
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
        const visitDate = document.getElementById("visitDate").value;
        const visitSlot = document.getElementById("visitSlot").value;
        const mobile = document.getElementById("groupMobile").value.trim();
        const district = document.getElementById("groupDistrict").value;
        const pincode = document.getElementById("groupPincode").value.trim();
        const address = document.getElementById("groupAddress").value.trim();

        const downloadableHtml = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Nexia Sabarimala Booking Data - ${mobile}</title>
<style>
body { font-family: Arial, sans-serif; padding: 20px; background: #f8fafc; color: #1e293b; }
h2 { color: #0f172a; }
table { width: 100%; border-collapse: collapse; margin-top: 15px; background: #fff; }
th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; font-size: 14px; }
th { background: #1e293b; color: #fff; }
</style></head>
<body>
<h2>SABARIMALA VIRTUAL-Q DATA | NEXIA VIRTUAL DESK</h2>
<p><strong>Preferred Date:</strong> ${visitDate} | <strong>Slot:</strong> ${visitSlot}</p>
<p><strong>Mobile:</strong> ${mobile} | <strong>Address:</strong> ${address}, ${district} - ${pincode}</p>
<table>
    <thead>
        <tr><th>#</th><th>Swami Name</th><th>Gender</th><th>Age/DOB</th><th>Star</th><th>ID Number</th><th>Parent/Nominee (Age)</th></tr>
    </thead>
    <tbody>${latestPilgrimHtmlRows}</tbody>
</table>
</body></html>`;

        const blob = new Blob([downloadableHtml], { type: "text/html" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `Sabarimala_Group_${mobile}.html`;
        link.click();
    });
});