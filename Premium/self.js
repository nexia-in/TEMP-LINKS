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

function fillSelect(selectEl, items, defaultValue) {
    items.forEach(item => {
        const opt = document.createElement("option");
        opt.value = item;
        opt.textContent = item;
        if (defaultValue && item === defaultValue) opt.selected = true;
        selectEl.appendChild(opt);
    });
}

function toWhatsAppNumber(raw) {
    const digits = String(raw || "").replace(/\D/g, "");
    if (digits.length === 10) return "91" + digits;
    if (digits.length === 12 && digits.startsWith("91")) return digits;
    return digits;
}

function buildShareLink(leaderPhone) {
    const url = new URL(window.location.href);
    url.searchParams.set("leader", leaderPhone.replace(/\D/g, "").slice(-10));
    return url.toString();
}

function initSelfPage() {
    document.getElementById("ui-chant").textContent = NEXIA_CONTENT.chant;
    document.getElementById("ui-brand-name").textContent = NEXIA_CONTENT.brandName;
    document.getElementById("ui-welcome-desc").textContent = NEXIA_CONTENT.selfCoord.welcomeDescription;
    document.getElementById("ui-exp-badge").textContent = NEXIA_CONTENT.experienceBadge;
    document.getElementById("ui-ad-title").textContent = NEXIA_CONTENT.adTitle;
    document.getElementById("ui-helpline-display").textContent = NEXIA_CONTENT.helplineDisplay;
    document.getElementById("ui-helpline-display-form").textContent = NEXIA_CONTENT.helplineDisplay;
    document.getElementById("ui-disclaimer").textContent = NEXIA_CONTENT.disclaimerText;
    document.getElementById("ui-footer-brand").textContent = NEXIA_CONTENT.footerBrand;
    document.getElementById("ui-footer-copy").textContent = NEXIA_CONTENT.footerCopy;
    document.getElementById("ui-footer-disc").textContent = NEXIA_CONTENT.footerDisclaimer;

    const srvContainer = document.getElementById("ui-services-list");
    const srvForm = document.getElementById("ui-services-list-form");
    NEXIA_CONTENT.servicesList.forEach(srv => {
        const span = document.createElement("span");
        span.className = "srv-pill";
        span.textContent = srv;
        srvContainer.appendChild(span);
        const span2 = span.cloneNode(true);
        srvForm.appendChild(span2);
    });

    fillSelect(document.getElementById("pIdType"), NEXIA_CONTENT.photoIdTypes);
    fillSelect(document.getElementById("pLanguage"), NEXIA_CONTENT.languages, NEXIA_CONTENT.defaultLanguage);
    fillSelect(document.getElementById("pStar"), NEXIA_CONTENT.stars);
    fillSelect(document.getElementById("pCountry"), NEXIA_CONTENT.countries, NEXIA_CONTENT.defaultCountry);
    fillSelect(document.getElementById("pState"), NEXIA_CONTENT.states, NEXIA_CONTENT.defaultState);
    fillSelect(document.getElementById("pDistrict"), NEXIA_CONTENT.districts, NEXIA_CONTENT.defaultDistrict);

    const params = new URLSearchParams(window.location.search);
    const presetLeader = (params.get("leader") || "").replace(/\D/g, "").slice(-10);
    if (presetLeader.length === 10) {
        document.getElementById("leaderPhone").value = presetLeader;
        showFormScreen();
    }

    document.getElementById("startSelfBtn").addEventListener("click", showFormScreen);
    document.getElementById("backToHomeBtn").addEventListener("click", showWelcomeScreen);

    const relationSelect = document.getElementById("pParentRelation");
    const relationOther = document.getElementById("pParentRelationOther");
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

    document.getElementById("copyShareLinkBtn").addEventListener("click", () => {
        const phone = document.getElementById("leaderPhone").value.trim();
        if (!/^[0-9]{10}$/.test(phone)) {
            alert("ലീഡറുടെ 10 അക്ക നമ്പർ നൽകുക. Enter leader 10-digit number first.");
            return;
        }
        const link = buildShareLink(phone);
        navigator.clipboard.writeText(link).then(() => {
            alert("ലിങ്ക് കോപ്പി ചെയ്തു. അംഗങ്ങൾക്ക് അയക്കുക. Link copied.");
        });
    });

    document.getElementById("waShareLinkBtn").addEventListener("click", () => {
        const phone = document.getElementById("leaderPhone").value.trim();
        if (!/^[0-9]{10}$/.test(phone)) {
            alert("ലീഡറുടെ 10 അക്ക നമ്പർ നൽകുക. Enter leader 10-digit number first.");
            return;
        }
        const link = buildShareLink(phone);
        const msg = `സ്വാമിയേ ശരണമയ്യപ്പ\n\nSabarimala Self Coordination - Nexia Virtual Desk, Olarikkara, Thrissur\n\nതാങ്കളുടെ വിവരങ്ങൾ ഈ ലിങ്കിൽ നൽകി എനിക്ക് അയക്കുക.\nPlease fill your details using this link and send to me:\n${link}`;
        window.open("https://wa.me/?text=" + encodeURIComponent(msg), "_blank");
    });

    document.getElementById("selfCoordForm").addEventListener("submit", (e) => {
        e.preventDefault();

        const leaderPhone = document.getElementById("leaderPhone").value.trim();
        if (!/^[0-9]{10}$/.test(leaderPhone)) {
            alert("ലീഡറുടെ 10 അക്ക നമ്പർ നൽകുക.");
            return;
        }

        const firstName = document.getElementById("pFirstName").value.trim();
        const lastName = document.getElementById("pLastName").value.trim();
        const mobile = document.getElementById("pMobile").value.trim();
        const gender = document.getElementById("pGender").value;
        const dob = document.getElementById("pDob").value;
        const idtype = document.getElementById("pIdType").value;
        const idnum = document.getElementById("pIdNum").value.trim();
        const language = document.getElementById("pLanguage").value;
        const star = document.getElementById("pStar").value;
        const address = document.getElementById("pAddress").value.trim();
        const postOffice = document.getElementById("pPostOffice").value.trim();
        const postalCode = document.getElementById("pPostalCode").value.trim();
        const country = document.getElementById("pCountry").value;
        const state = document.getElementById("pState").value;
        const district = document.getElementById("pDistrict").value;
        const pincode = document.getElementById("pPincode").value.trim();
        const parentName = document.getElementById("pParentName").value.trim();
        const parentAge = document.getElementById("pParentAge").value.trim();
        const relationSelectVal = document.getElementById("pParentRelation").value;
        const relationOtherVal = document.getElementById("pParentRelationOther").value.trim();
        const relation = relationSelectVal === "Other" ? (relationOtherVal || "Other") : relationSelectVal;

        const fullMessage =
`*SABARIMALA SELF COORDINATION*
*Nexia Virtual Desk - Olarikkara, Thrissur*
----------------------------------
*To Team Leader*
----------------------------------
*Name:* ${firstName} ${lastName}
*Mobile:* ${mobile}
*Gender:* ${gender}
*DOB:* ${dob}
*Photo ID:* ${idtype}
*ID Number:* ${idnum}
*Language:* ${language}
*Star:* ${star}
*Address:* ${address}
*Post Office:* ${postOffice} | *Postal Code:* ${postalCode}
*Country:* ${country} | *State:* ${state}
*District/City:* ${district} | *Pincode:* ${pincode}
*Guardian:* ${parentName}
*Guardian Age:* ${parentAge}
*Relation:* ${relation}
----------------------------------
*(ഫോട്ടോയും ഐഡി കാർഡ് കോപ്പിയും ഇതോടൊപ്പം അയക്കുന്നു)*`;

        const waNumber = toWhatsAppNumber(leaderPhone);
        const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(fullMessage)}`;
        window.open(waUrl, "_blank");
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSelfPage);
} else {
    initSelfPage();
}
