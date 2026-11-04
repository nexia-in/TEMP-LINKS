// ഭാവിയിൽ ഫോൺ നമ്പറോ, എഴുത്തുകളോ, സർവീസുകളോ മാറ്റണമെങ്കിൽ ഈ ഫയൽ മാത്രം എഡിറ്റ് ചെയ്താൽ മതിയാകും.

const NEXIA_CONTENT = {
    whatsappNumber: "919961850698",
    helplineDisplay: "+91 9961850698",
    brandName: "NEXIA VIRTUAL DESK",
    chant: "സ്വാമിയേ ശരണമയ്യപ്പ",
    
    welcomeDescription: "നെക്സിയ വെർച്വൽ ഡെസ്കിലേക്ക് സ്വാഗതം. ശബരിമല തീർത്ഥാടനവുമായി ബന്ധപ്പെട്ട വെർച്വൽ ക്യൂ (Virtual-Q) ബുക്കിംഗ് സേവനങ്ങൾ ഭക്തർക്ക് നേരിട്ട് സന്ദർശിക്കാതെ തന്നെ വാട്സാപ്പിലൂടെ എളുപ്പത്തിൽ ലഭ്യമാക്കുന്നതിനുള്ള സഹായക സംവിധാനമാണിത്.",
    
    startButtonText: "തുടരുന്നതിനായി ഇവിടെ ക്ലിക്ക് ചെയ്യുക ➔",
    
    experienceBadge: "★ 17 വർഷത്തെ വിശ്വസ്ത സേവന പാരമ്പര്യം (2009 - 2027) ★",
    adTitle: "നെക്സിയ വെർച്വൽ ഡെസ്ക് നൽകുന്ന സേവനങ്ങൾ",
    
    servicesList: [
        "🌐 എല്ലാവിധ ഓൺലൈൻ അപേക്ഷകളും",
        "📄 പ്രൊഫഷണൽ Resume / CV / Biodata",
        "🎓 KEAM / JEE / NEET / SSC അപേക്ഷകൾ",
        "🛂 പാസ്‌പോർട്ട് & പാൻ കാർഡ് സേവനങ്ങൾ",
        "🏛️ സർക്കാർ പോർട്ടൽ സേവനങ്ങൾ",
        "🛡️ വാഹന ഇൻഷുറൻസ് & ബിൽ പേയ്‌മെന്റുകൾ"
    ],

    disclaimerText: "ശ്രദ്ധിക്കുക: ഇതൊരു ഔദ്യോഗിക വെബ്സൈറ്റ് അല്ല (Not an Official Page). ഉപഭോക്താക്കൾക്ക് ഓൺലൈൻ ബുക്കിംഗ് സഹായം നൽകുന്നതിനായി Nexia Virtual Desk തയ്യാറാക്കിയ പേജാണിത്.",
    
    reportingInstruction: "⏰ പ്രധാന നിർദ്ദേശം: തിരഞ്ഞെടുക്കുന്ന ദർശന സമയത്തിന് ഏകദേശം 3 മണിക്കൂർ മുൻപെങ്കിലും പമ്പയിൽ റിപ്പോർട്ട് ചെയ്യേണ്ടതാണ്. പൂർണ്ണമായ നിർദ്ദേശങ്ങൾ ബുക്കിംഗിന് മുൻപ് അറിയിക്കുന്നതാണ്.",

    timeSlots: [
        "രാവിലെ (Morning: 03:00 AM - 07:00 AM)",
        "രാവിലെ (Morning: 07:00 AM - 11:00 AM)",
        "ഉച്ചയ്ക്ക് (Afternoon: 11:00 AM - 01:00 PM)",
        "വൈകുന്നേരം (Evening: 03:00 PM - 07:00 PM)",
        "രാത്രി (Night: 07:00 PM - 10:00 PM)",
        "ലഭ്യമായ ഏത് സമയവും (Any Available Slot)"
    ],

    languages: [
        "Malayalam", "English", "Hindi", "Tamil", "Kannada", "Telugu"
    ],
    defaultLanguage: "Malayalam",

    photoIdTypes: [
        "Aadhaar Card", "Voter ID", "Driving Licence", "Passport", "PAN Card"
    ],

    countries: [
        "INDIA"
    ],
    defaultCountry: "INDIA",

    states: [
        "KERALA", "Tamil Nadu", "Karnataka", "Andhra Pradesh", "Telangana",
        "Maharashtra", "Goa", "Puducherry", "Other"
    ],
    defaultState: "KERALA",

    districts: [
        "THRISSUR", "Thiruvananthapuram", "Kollam", "Pathanamthitta",
        "Alappuzha", "Kottayam", "Idukki", "Ernakulam", "Palakkad",
        "Malappuram", "Kozhikode", "Wayanad", "Kannur", "Kasaragod", "Other"
    ],
    defaultDistrict: "THRISSUR",

    stars: [
        "അശ്വതി (Aswathi)", "ഭരണി (Bharani)", "കാർത്തിക (Kaarthika)", "രോഹിണി (Rohini)",
        "മകയിരം (Makeeryam)", "തിരുവാതിര (Thiruvaathira)", "പുണർതം (Punartham)", "പൂയം (Pooyyam)",
        "ആയില്യം (Aayilyam)", "മകം (Makham)", "പൂരം (Pooram)", "ഉത്രം (Uthram)",
        "അത്തം (Atham)", "ചിത്തിര (Chitra)", "ചോതി (Chothi)", "വിശാഖം (Visaakam)",
        "അനിഴം (Anizham)", "തൃക്കേട്ട (Thruketta)", "മൂലം (Moolam)", "പൂരാടം (Pooraadam)",
        "ഉത്രാടം (Uthraadam)", "തിരുവോണം (Thiruvonam)", "അവിട്ടം (Avittam)", "ചതയം (Chathayam)",
        "പൂരുരുട്ടാതി (Poorattadhi)", "ഉത്രട്ടാതി (Uthrattathi)", "രേവതി (Revathi)"
    ],

    locationLine: "Olarikkara, Thrissur, Kerala",

    footerBrand: "NEXIA VIRTUAL DESK • Olarikkara, Thrissur | WhatsApp: +91 9961850698",
    footerCopy: "2009 - 2027 © Created by Nexia Tech. Celebrating 17 Years of Digital Service Excellence.",
    footerDisclaimer: "Disclaimer: Not an official Travancore Devaswom Board website. Created for customer assistance.",

    selfCoord: {
        pageTitle: "സെൽഫ് കോർഡിനേഷൻ | Self Coordination",
        welcomeDescription: "ടീം ലീഡർ ഈ ലിങ്ക് അംഗങ്ങൾക്ക് അയക്കുക. ഓരോ തീർത്ഥാടകനും സ്വന്തം വിവരങ്ങൾ നൽകി ലീഡറുടെ വാട്സാപ്പിലേക്ക് അയക്കാം. Team leader shares this link. Each pilgrim fills their own details and sends them to the leader on WhatsApp.",
        howTitle: "എങ്ങനെ ഉപയോഗിക്കാം / How it works",
        howSteps: [
            "1. ടീം ലീഡർ ഈ പേജ് ലിങ്ക് അംഗങ്ങൾക്ക് വാട്സാപ്പിൽ അയക്കുക. / Leader shares this page link with members.",
            "2. അംഗം ലീഡറുടെ വാട്സാപ്പ് നമ്പർ നൽകുക. / Member enters the leader WhatsApp number.",
            "3. സ്വന്തം മുഴുവൻ വിവരങ്ങൾ നൽകുക. / Member fills their own full details.",
            "4. Send ക്ലിക്ക് ചെയ്താൽ വിവരങ്ങൾ ലീഡറുടെ വാട്സാപ്പിലേക്ക് പോകും. / Send opens WhatsApp to the leader number."
        ]
    }
};