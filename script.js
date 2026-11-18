// SUPABASE CONNECTION
const SUPABASE_URL = "https://rckoovzeewkipfasgnul.supabase.co";

const SUPABASE_KEY = "sb_publishable_JnzgTwgrkOFRIpzgdDu0SQ_BkyH-LeD";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


function chooseTemplate(templateName) {
        // Check if couple is logged in
    if (!window.currentCouple) {
        window.pendingInvitationTemplate = templateName;

        const loginSection = document.getElementById("coupleLogin");

        if (loginSection) {
            loginSection.style.display = "block";
            loginSection.scrollIntoView({ behavior: "smooth" });
        }

        return;
    }
    const preview = document.getElementById("invitationPreview");
    const card = document.getElementById("invitationCard");
    const colorPicker = document.getElementById("weddingColor");

    let selectedColor = "#fff0f3";
    let selectedTheme = "blush-floral";

    if (templateName === "Minimalist Luxury") {
    selectedColor = "#f5f0e8";
    selectedTheme = "minimalist-luxury";

} else if (templateName === "Garden Romance") {
    selectedColor = "#eaf0e5";
    selectedTheme = "garden-romance";

} else if (templateName === "Sweet Pastel") {
    selectedColor = "#eee6f7";
    selectedTheme = "sweet-pastel";

} else if (templateName === "Burgundy & Gold") {
    selectedColor = "#541c2b";
    selectedTheme = "burgundy-gold";
}

    card.dataset.theme = selectedTheme;

    setWeddingColor(selectedColor);

    // Remember the selected template
    window.selectedInvitationTemplate = templateName;
    updateTemplateSelection();

    // Highlight the selected template card
    document.querySelectorAll(".template-card").forEach(function (item) {
        item.classList.remove("selected-template");
    });

    document.querySelectorAll(".template-card").forEach(function (item) {
        const title = item.querySelector(".card-info h3");

        if (title && title.textContent.trim() === templateName) {
            item.classList.add("selected-template");
        }
    });

    preview.style.display = "block";
    preview.scrollIntoView({ behavior: "smooth" });
}



function updateTemplateSelection() {
    const selectedTemplate = window.selectedInvitationTemplate;

    document.querySelectorAll(".template-card").forEach(function(card) {
        const title = card.querySelector(".card-info h3");
        const button = card.querySelector(".card-info button");

        if (!title || !button) return;

        const isSelected = title.textContent.trim() === selectedTemplate;

        card.classList.toggle("selected-template", isSelected);

        let badge = card.querySelector(".template-current-badge");

        if (isSelected) {
            if (!badge) {
                badge = document.createElement("span");
                badge.className = "template-current-badge";
                badge.textContent = "✓ Currently Using";
                card.querySelector(".card-info").prepend(badge);
            }

            button.textContent = "Currently Using";
            button.disabled = true;

        } else {
            if (badge) badge.remove();

            button.textContent = "Choose Template";
            button.disabled = false;
        }
    });
}




function showLogin() {
    document.getElementById("coupleLogin").style.display = "block";

    document.getElementById("home").style.display = "none";
    document.getElementById("templates").style.display = "none";
    document.getElementById("about").style.display = "none";
    document.getElementById("coupleDashboard").style.display = "none";
    document.getElementById("guestView").style.display = "none";
    document.getElementById("invitationPreview").style.display = "none";

    document.getElementById("coupleLogin").scrollIntoView({
        behavior: "smooth"
    });
}


// Live invitation preview
function updateInvitation() {
  const name1 = document.getElementById("name1").value || "Partner 1";
  const name2 = document.getElementById("name2").value || "Partner 2";
  const date = document.getElementById("weddingDate").value;
  const time = document.getElementById("weddingTime").value;
  const venue = document.getElementById("weddingVenue").value;
  const message = document.getElementById("weddingMessage").value;

  document.getElementById("previewNames").textContent =
    name1 + " & " + name2;

  document.getElementById("previewMessage").textContent = message;

  document.getElementById("previewDate").textContent = date
    ? new Date(date + "T00:00:00").toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    : "Wedding Date";

  document.getElementById("previewTime").textContent = time;
  document.getElementById("previewVenue").textContent =
    venue || "Wedding Venue";
}

document.querySelectorAll(
  "#name1, #name2, #weddingDate, #weddingTime, #weddingVenue, #weddingMessage"
).forEach(input => {
  input.addEventListener("input", updateInvitation);
});

// Couple photo upload and live preview

const couplePhotoInput = document.getElementById("couplePhoto");

if (couplePhotoInput) {

    couplePhotoInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            this.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Please choose an image smaller than 5MB.");
            this.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
            const photo = document.getElementById("previewPhoto");

            if (photo) {
                photo.src = event.target.result;
                photo.style.display = "block";
            }
        };

        reader.readAsDataURL(file);

    });

}

/* WEDDING COLOR PICKER */

function setWeddingColor(color) {
    const card = document.getElementById("invitationCard");
    const colorPicker = document.getElementById("weddingColor");

    if (!card || !colorPicker) return;

    const themes = {
        "#fff0f3": {
            heading: "#65434d",
            text: "#705b61",
            accent: "#b76e79",
            border: "#e8b8c4"
        },

        "#eaf0e5": {
            heading: "#40543b",
            text: "#596653",
            accent: "#718b65",
            border: "#c5d4bc"
        },

        "#f5f0e8": {
            heading: "#685b48",
            text: "#756b5c",
            accent: "#b59a65",
            border: "#dfd1b8"
        },

        "#eee6f7": {
            heading: "#59466e",
            text: "#6e6080",
            accent: "#9b80b5",
            border: "#d5c4e5"
        },

        "#ead0d5": {
            heading: "#762c3b",
            text: "#704650",
            accent: "#9b4055",
            border: "#d7aab4"
        },

        "#f5e6b8": {
            heading: "#70551b",
            text: "#75633e",
            accent: "#bd963e",
            border: "#e4d09a"
        },

        "#dce7f0": {
            heading: "#405c78",
            text: "#566d83",
            accent: "#668eaf",
            border: "#b8ccdd"
        },

        "#edc9b5": {
            heading: "#814a35",
            text: "#765646",
            accent: "#b66e4c",
            border: "#dfb39c"
        },

        "#dce2cb": {
            heading: "#4d5938",
            text: "#626c50",
            accent: "#82915d",
            border: "#c1cba9"
        },

        "#e5cbd9": {
            heading: "#70465d",
            text: "#765c6c",
            accent: "#a66e8d",
            border: "#d5afc3"
        }
    };

    // Use a default theme for custom colors
    const theme = themes[color] || {
        heading: "#65434d",
        text: "#705b61",
        accent: color,
        border: color
    };

    card.style.setProperty("--theme-bg", color);
    card.style.setProperty("--theme-heading", theme.heading);
    card.style.setProperty("--theme-text", theme.text);
    card.style.setProperty("--theme-accent", theme.accent);
    card.style.setProperty("--theme-border", theme.border);

// Update guest envelope colors
const guestEnvelope = document.getElementById("guestEnvelope");

if (guestEnvelope) {
    guestEnvelope.style.setProperty("--envelope-bg", color);
    guestEnvelope.style.setProperty("--envelope-flap", theme.border);
    guestEnvelope.style.setProperty("--envelope-front", color);
    guestEnvelope.style.setProperty("--envelope-seal", theme.accent);
    guestEnvelope.style.setProperty("--envelope-seal-text", theme.heading);
}
    colorPicker.value = color;
}
const weddingColorInput = document.getElementById("weddingColor");

if (weddingColorInput) {
    weddingColorInput.addEventListener("input", function () {
        setWeddingColor(this.value);
    });

    weddingColorInput.addEventListener("change", function () {
        setWeddingColor(this.value);
    });
}
// INVITATION SECTION TOGGLES

const sectionToggles = [
    { toggle: "storyToggle", section: "storySection", editor: "storyEditor" },
    { toggle: "entourageToggle", section: "entourageSection", editor: "entourageEditor" },
    { toggle: "dressCodeToggle", section: "dressCodeSection", editor: "dressCodeEditor" },
    { toggle: "galleryToggle", section: "gallerySection", editor: "galleryEditor" },
    { toggle: "giftToggle", section: "giftSection", editor: "giftEditor" },
    { toggle: "rsvpToggle", section: "rsvpSection", editor: "rsvpEditor" },
    { toggle: "mapToggle", section: "mapSection", editor: "locationsEditor" }
];

sectionToggles.forEach(function(item) {
    const toggle = document.getElementById(item.toggle);
    const section = document.getElementById(item.section);
    const editor = document.getElementById(item.editor);
    
    function updateVisibility() {
        if (section) {
            section.style.display = toggle.checked ? "block" : "none";
        }
        
        if (editor) {
            editor.style.display = toggle.checked ? "block" : "none";
        }
    }
    
    if (toggle) {
        updateVisibility();
        
        toggle.addEventListener("change", updateVisibility);
    }
});
// LIVE LOVE STORY PREVIEW

const loveStoryInput = document.getElementById("loveStoryInput");
const previewStory = document.getElementById("previewStory");

if (loveStoryInput && previewStory) {
    loveStoryInput.addEventListener("input", function () {
        previewStory.textContent = this.value.trim() ||
            "Every love story is beautiful, but ours is our favorite.";
    });
}




// LIVE ENTOURAGE PREVIEW

const entourageFields = [
    "brideParents",
    "groomParents",
    "principalSponsors",
    "bridesmaids",
    "groomsmen"
];

function updateEntourage() {

    const preview = document.getElementById("previewEntourage");

    if (!preview) return;

    const sections = [
        {
            title: "Parents of the Bride",
            field: "brideParents",
            style: "family"
        },
        {
            title: "Parents of the Groom",
            field: "groomParents",
            style: "family"
        },
        {
            title: "Principal Sponsors",
            field: "principalSponsors",
            style: "sponsors"
        },
        {
            title: "Bridesmaids",
            field: "bridesmaids",
            style: "wedding-party"
        },
        {
            title: "Groomsmen",
            field: "groomsmen",
            style: "wedding-party"
        }
    ];

    preview.innerHTML = `
        <div class="entourage-preview-layout">

            ${sections.map(function (item) {

                const field = document.getElementById(item.field);
                const value = field ? field.value.trim() : "";

                if (!value) return "";

                const names = value.split("\n")
                    .map(name => name.trim())
                    .filter(Boolean);

                return `
                    <div class="entourage-preview-group ${item.style}">

                        <h3>${item.title}</h3>

                        <div class="entourage-names">
                            ${names.map(name =>
                                `<p>${escapeHTML(name)}</p>`
                            ).join("")}
                        </div>

                    </div>
                `;

            }).join("")}

        </div>
    `;
}

function escapeHTML(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
}

entourageFields.forEach(function (id) {
    const field = document.getElementById(id);

    if (field) {
        field.addEventListener("input", updateEntourage);
    }
});

updateEntourage();

// LIVE DRESS CODE PREVIEW

const dressCodeInput = document.getElementById("dressCodeInput");
const dressCodeNoteInput = document.getElementById("dressCodeNoteInput");

const previewDressCode = document.getElementById("previewDressCode");
const previewDressCodeNote = document.getElementById("previewDressCodeNote");

if (dressCodeInput && previewDressCode) {
    dressCodeInput.addEventListener("input", function () {
        previewDressCode.textContent =
            this.value.trim() || "Formal Attire";
    });
}

if (dressCodeNoteInput && previewDressCodeNote) {
    dressCodeNoteInput.addEventListener("input", function () {
        previewDressCodeNote.textContent =
            this.value.trim() ||
            "We kindly invite our guests to follow our wedding theme.";
    });
}


// =================================
// PHOTO GALLERY - ONE PHOTO AT A TIME
// =================================

const galleryPhotos = document.getElementById("galleryPhotos");
const previewGallery = document.getElementById("previewGallery");
const galleryUploadPreview = document.getElementById("galleryUploadPreview");

const galleryPhotoDetails = document.getElementById("galleryPhotoDetails");
const galleryPhotoDate = document.getElementById("galleryPhotoDate");
const galleryPhotoCaption = document.getElementById("galleryPhotoCaption");
const saveGalleryPhotoBtn = document.getElementById("saveGalleryPhotoBtn");

let weddingGallery = [];
let pendingGalleryPhoto = null;


// UPLOAD ONE PHOTO
if (galleryPhotos) {
    galleryPhotos.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please upload an image file.");
            this.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Please choose an image smaller than 5MB.");
            this.value = "";
            return;
        }

        if (weddingGallery.length >= 10) {
            alert("You can upload a maximum of 10 photos.");
            this.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {

            pendingGalleryPhoto = event.target.result;

            // Show date and caption fields
            galleryPhotoDetails.style.display = "block";

            galleryPhotoDate.value = "";
            galleryPhotoCaption.value = "";

            // Show temporary uploaded photo in builder
            galleryUploadPreview.innerHTML = "";

            const image = document.createElement("img");
            image.src = pendingGalleryPhoto;
            image.alt = "Photo waiting to be saved";

            galleryUploadPreview.appendChild(image);

            const message = document.createElement("p");
            message.textContent = "Add the date and caption, then save your photo.";
            galleryUploadPreview.appendChild(message);
        };

        reader.readAsDataURL(file);

        this.value = "";
    });
}


// SAVE PHOTO
if (saveGalleryPhotoBtn) {
    saveGalleryPhotoBtn.addEventListener("click", function () {

        if (!pendingGalleryPhoto) {
            alert("Please upload a photo first.");
            return;
        }

        if (weddingGallery.length >= 10) {
            alert("You can upload a maximum of 10 photos.");
            return;
        }

        weddingGallery.push({
            src: pendingGalleryPhoto,
            date: galleryPhotoDate.value.trim(),
            caption: galleryPhotoCaption.value.trim()
        });

        pendingGalleryPhoto = null;

        galleryPhotoDetails.style.display = "none";
        galleryPhotoDate.value = "";
        galleryPhotoCaption.value = "";

        updateGallery();
    });
}


// UPDATE GALLERY PREVIEWS
function updateGallery() {

    if (!previewGallery || !galleryUploadPreview) return;

    previewGallery.innerHTML = "";
    galleryUploadPreview.innerHTML = "";

    weddingGallery.forEach(function (photo, index) {

        // GUEST VIEW
        const memory = document.createElement("div");
        memory.className = "gallery-memory";

        const image = document.createElement("img");
        image.src = photo.src;
        image.alt = "Wedding memory";

        memory.appendChild(image);

        if (photo.date) {
            const date = document.createElement("p");
            date.className = "gallery-memory-date";
            date.textContent = photo.date;
            memory.appendChild(date);
        }

        if (photo.caption) {
            const caption = document.createElement("p");
            caption.className = "gallery-memory-caption";
            caption.textContent = photo.caption;
            memory.appendChild(caption);
        }

        previewGallery.appendChild(memory);


        // BUILDER SAVED PHOTO
        const wrapper = document.createElement("div");
        wrapper.className = "gallery-upload-item";

        const thumbnail = document.createElement("img");
        thumbnail.src = photo.src;
        thumbnail.alt = "Saved wedding photo";

        const details = document.createElement("p");
        details.textContent = [photo.date, photo.caption]
            .filter(Boolean)
            .join(" — ");

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", function () {
            weddingGallery.splice(index, 1);
            updateGallery();
        });

        wrapper.appendChild(thumbnail);
        wrapper.appendChild(details);
        wrapper.appendChild(removeButton);

        galleryUploadPreview.appendChild(wrapper);
    });
}




// UPDATE GUEST GALLERY WITHOUT REBUILDING EDITOR INPUTS
function updateGuestGallery() {
    if (!previewGallery) return;

    previewGallery.innerHTML = "";

    weddingGallery.forEach(function (photo) {

        const card = document.createElement("div");
        card.className = "gallery-memory";

        const image = document.createElement("img");
        image.src = photo.src;
        image.alt = "Wedding memory";

        card.appendChild(image);

        if (photo.date) {
            const date = document.createElement("p");
            date.className = "gallery-memory-date";
            date.textContent = photo.date;
            card.appendChild(date);
        }

        if (photo.caption) {
            const caption = document.createElement("p");
            caption.className = "gallery-memory-caption";
            caption.textContent = photo.caption;
            card.appendChild(caption);
        }

        previewGallery.appendChild(card);
    });
}

// LIVE GIFT INFORMATION PREVIEW

const giftMessageInput = document.getElementById("giftMessageInput");
const giftPreferenceInput = document.getElementById("giftPreferenceInput");
const giftDetailsInput = document.getElementById("giftDetailsInput");

const previewGiftMessage = document.getElementById("previewGiftMessage");
const previewGiftDetails = document.getElementById("previewGiftDetails");

if (giftMessageInput && previewGiftMessage) {
    giftMessageInput.addEventListener("input", function () {
        previewGiftMessage.textContent =
            this.value.trim() ||
            "Your presence is the greatest gift. Thank you for celebrating with us!";
    });
}


function updateGiftDetails() {
    if (!previewGiftDetails) return;

    const preference = giftPreferenceInput
        ? giftPreferenceInput.value
        : "No preference";

    const details = giftDetailsInput
        ? giftDetailsInput.value.trim()
        : "";

    // UPDATE GIFT PREFERENCE
    const previewPreference = document.getElementById("previewGiftPreference");

    if (previewPreference) {
        previewPreference.textContent = preference || "No preference";
    }

    // UPDATE GIFT DETAILS
    previewGiftDetails.innerHTML = "";

    if (details) {
        const detailsText = document.createElement("p");

detailsText.textContent = details;

detailsText.style.color =
    "var(--custom-section-card-body, var(--card-text, #705b61))";

previewGiftDetails.appendChild(detailsText);
    }
}


if (giftPreferenceInput) {
    giftPreferenceInput.addEventListener("change", updateGiftDetails);
}

if (giftDetailsInput) {
    giftDetailsInput.addEventListener("input", updateGiftDetails);
}




const rsvpMessageInput = document.getElementById("rsvpMessageInput");
const rsvpDeadlineInput = document.getElementById("rsvpDeadlineInput");

const previewRsvpMessage = document.getElementById("previewRsvpMessage");
const previewRsvpDeadline = document.getElementById("previewRsvpDeadline");

if (rsvpMessageInput && previewRsvpMessage) {
    rsvpMessageInput.addEventListener("input", function () {
        previewRsvpMessage.textContent =
            this.value.trim() || "We hope you can celebrate with us!";
    });
}

if (rsvpDeadlineInput && previewRsvpDeadline) {
    rsvpDeadlineInput.addEventListener("change", function () {
        if (!this.value) {
            previewRsvpDeadline.textContent = "Please set RSVP deadline";
            return;
        }

        const date = new Date(this.value + "T00:00:00");

        previewRsvpDeadline.textContent = date.toLocaleDateString("en-PH", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    });
}


// SAVE GUEST RSVP TO SUPABASE
document.addEventListener("submit", async function(event) {

    if (event.target.id !== "guestRsvpForm") return;

    event.preventDefault();

    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const confirmation = form.querySelector("#rsvpConfirmation");

    const invitationId =
        window.publicGuestInvitation?.id ||
        window.currentInvitation?.id;

    if (!invitationId) {
        alert("Invitation information not found. Please open the invitation link again.");
        return;
    }

    const guestName = form.querySelector("#guestName").value.trim();
    const attendance = form.querySelector("#guestAttendance").value;
    const guestCount = Number(form.querySelector("#guestCount").value);

    if (!guestName || !attendance || !guestCount ||
        guestCount < 1 || guestCount > 10) {
        alert("Please complete the RSVP form correctly.");
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
        const { error } = await supabaseClient
            .from("rsvps")
            .insert({
                invitation_id: invitationId,
                guest_name: guestName,
                attending: attendance === "Joyfully accepts",
                guest_count: attendance === "Joyfully accepts" ? guestCount : 0
            });

        if (error) throw error;

        confirmation.style.display = "block";
        form.reset();

    } catch (error) {
        console.error("RSVP submission error:", error);
        alert("Unable to send your RSVP. Please try again.");
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Send My Response ♡";
    }
});


function updateVenuePreview(type) {
    const venue = document.getElementById(type + "VenueInput");
    const address = document.getElementById(type + "AddressInput");
    const map = document.getElementById(type + "MapInput");

    const previewVenue = document.getElementById("preview" +
        type.charAt(0).toUpperCase() + type.slice(1) + "Venue");

    const previewAddress = document.getElementById("preview" +
        type.charAt(0).toUpperCase() + type.slice(1) + "Address");

    const previewMap = document.getElementById("preview" +
        type.charAt(0).toUpperCase() + type.slice(1) + "Map");

    if (venue && previewVenue) {
        previewVenue.textContent = venue.value.trim() ||
            (type === "ceremony" ? "Ceremony venue" : "Reception venue");
    }

    if (address && previewAddress) {
        previewAddress.textContent = address.value.trim() ||
            (type === "ceremony" ? "Ceremony address" : "Reception address");
    }

    if (map && previewMap) {
        const link = map.value.trim();

        if (link) {
            try {
                const parsedLink = new URL(link);

                if (parsedLink.protocol === "https:" &&
                    ["google.com", "www.google.com", "maps.google.com",
                     "maps.app.goo.gl", "goo.gl"].includes(parsedLink.hostname)) {
                    previewMap.href = parsedLink.href;
                    previewMap.style.display = "inline-block";
                } else {
                    previewMap.style.display = "none";
                }
            } catch (error) {
                previewMap.style.display = "none";
            }
        } else {
            previewMap.style.display = "none";
        }
    }
}

["ceremony", "reception"].forEach(function (type) {
    ["Venue", "Address", "Map"].forEach(function (field) {
        const input = document.getElementById(type + field + "Input");

        if (input) {
            input.addEventListener("input", function () {
                updateVenuePreview(type);
            });
        }
    });

    updateVenuePreview(type);
});

const languageSelect = document.getElementById("languageSelect");

const invitationTranslations = {
    english: {
        title: "You're Invited!",
        message: "Together with our families, we joyfully invite you to celebrate our wedding.",
        date: "Wedding Date",
        time: "Wedding Time",
        venue: "Wedding Venue"
    },

    filipino: {
        title: "Inaanyayahan Kayo!",
        message: "Kasama ang aming mga pamilya, malugod namin kayong inaanyayahang makiisa sa pagdiriwang ng aming kasal.",
        date: "Petsa ng Kasal",
        time: "Oras ng Kasal",
        venue: "Lugar ng Kasal"
    },

    taglish: {
        title: "You're Invited!",
        message: "Together with our families, iniimbitahan namin kayo to celebrate our special day!",
        date: "Wedding Date",
        time: "Wedding Time",
        venue: "Wedding Venue"
    }
};

function updateInvitationLanguage() {
    if (!languageSelect) return;

    const language = languageSelect.value;
    const translation = invitationTranslations[language];

    document.getElementById("previewInvitationTitle").textContent =
        translation.title;

    document.getElementById("previewInvitationMessage").textContent =
        translation.message;
}

if (languageSelect) {
    languageSelect.addEventListener("change", updateInvitationLanguage);
}

(function () {
    const fields = [
        {
            input: "weddingTime",
            preview: "previewTime",
            fallback: "Wedding Time"
        },
        {
            input: "weddingVenue",
            preview: "previewVenue",
            fallback: "Wedding Venue"
        }
    ];

    fields.forEach(function (field) {
        const input = document.getElementById(field.input);
        const preview = document.getElementById(field.preview);

        if (!input || !preview) {
            console.log("Missing element:", field.input, field.preview);
            return;
        }

        function updatePreview() {
            preview.textContent = input.value.trim() || field.fallback;
        }

        input.addEventListener("input", updatePreview);
        input.addEventListener("change", updatePreview);

        updatePreview();
    });
})();


const builderTabs = document.querySelectorAll(".builder-tab");
const builderPanels = document.querySelectorAll(".builder-panel");

builderTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
        const selectedTab = this.dataset.tab;

        builderTabs.forEach(function (button) {
            button.classList.remove("active");
        });

        builderPanels.forEach(function (panel) {
            panel.classList.remove("active");
        });

        this.classList.add("active");

        const selectedPanel = document.getElementById("tab-" + selectedTab);

        if (selectedPanel) {
            selectedPanel.classList.add("active");
            console.log("Opened panel:", selectedPanel.id);
        } else {
            console.log("Panel not found:", selectedTab);
        }
    });
});

// INVITATION PAGE NAVIGATION

const invitationPages = [
    { page: "detailsPage" },
    { page: "storyPage", toggle: "storyToggle" },
    { page: "entouragePage", toggle: "entourageToggle" },
    { page: "dressCodePage", toggle: "dressCodeToggle" },
    { page: "galleryPage", toggle: "galleryToggle" },
    { page: "giftPage", toggle: "giftToggle" },
    { page: "rsvpPage", toggle: "rsvpToggle" },
    { page: "locationsPage", toggle: "mapToggle" }
];

let currentPageIndex = 0;

const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");
const pageIndicator = document.getElementById("pageIndicator");

function getVisibleInvitationPages() {
    return invitationPages.filter(function (item) {
        if (!item.toggle) return true;

        const toggle = document.getElementById(item.toggle);
        return toggle && toggle.checked;
    });
}

function showInvitationPage(index) {
    const visiblePages = getVisibleInvitationPages();

    if (visiblePages.length === 0) return;

    currentPageIndex = Math.max(
        0,
        Math.min(index, visiblePages.length - 1)
    );

    document.querySelectorAll(".invitation-page").forEach(function (page) {
        page.classList.remove("active");
    });

    const currentPage = document.getElementById(
        visiblePages[currentPageIndex].page
    );

    if (currentPage) {
        currentPage.classList.add("active");
    }

    pageIndicator.textContent =
        "Page " + (currentPageIndex + 1) +
        " of " + visiblePages.length;

    prevPageBtn.disabled = currentPageIndex === 0;
    nextPageBtn.disabled =
        currentPageIndex === visiblePages.length - 1;
}

prevPageBtn.addEventListener("click", function () {
    showInvitationPage(currentPageIndex - 1);
});

nextPageBtn.addEventListener("click", function () {
    showInvitationPage(currentPageIndex + 1);
});

// Update navigation when a section is enabled or disabled
invitationPages.forEach(function (item) {
    if (!item.toggle) return;

    const toggle = document.getElementById(item.toggle);

    if (toggle) {
        toggle.addEventListener("change", function () {
            showInvitationPage(currentPageIndex);
        });
    }
});

showInvitationPage(0);



// =================================
// INVITATION DECORATIONS - MULTIPLE
// =================================

const decorationUpload = document.getElementById("decorationUpload");
const decorationSelect = document.getElementById("decorationSelect");
const decorationPosition = document.getElementById("decorationPosition");
const decorationSize = document.getElementById("decorationSize");
const decorationOpacity = document.getElementById("decorationOpacity");
const opacityValue = document.getElementById("opacityValue");
const sizeValue = document.getElementById("sizeValue");
const removeDecorationBtn = document.getElementById("removeDecorationBtn");

let decorations = [];
let selectedDecoration = null;
let decorationCounter = 0;

// Update selected decoration
function updateDecoration() {
    if (!selectedDecoration) return;

    selectedDecoration.position = decorationPosition.value;
    selectedDecoration.size = decorationSize.value;
    selectedDecoration.opacity = decorationOpacity.value;

    const image = selectedDecoration.element;

    image.className = "user-decoration";
    image.classList.add(selectedDecoration.position);

    // Update size and opacity
    image.style.width = (120 * selectedDecoration.size / 100) + "px";
    image.style.opacity = selectedDecoration.opacity / 100;

    sizeValue.textContent = selectedDecoration.size + "%";
    opacityValue.textContent = selectedDecoration.opacity + "%";
}

// Refresh decoration dropdown
function refreshDecorationList() {
    decorationSelect.innerHTML = "";

    if (decorations.length === 0) {
        const option = document.createElement("option");
        option.value = "";
        option.textContent = "No decorations added yet";
        decorationSelect.appendChild(option);
        return;
    }

    decorations.forEach(function(item) {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.name;
        decorationSelect.appendChild(option);
    });

    if (selectedDecoration) {
        decorationSelect.value = selectedDecoration.id;
    }
}

// Select decoration
function selectDecoration(id) {
    selectedDecoration = decorations.find(function(item) {
        return item.id === id;
    }) || null;

    if (!selectedDecoration) return;

    decorationPosition.value = selectedDecoration.position;
    decorationSize.value = selectedDecoration.size;
    decorationOpacity.value = selectedDecoration.opacity;

    sizeValue.textContent = selectedDecoration.size + "%";
    opacityValue.textContent = selectedDecoration.opacity + "%";

    decorationSelect.value = selectedDecoration.id;
}


// UPLOAD DECORATION TO SUPABASE STORAGE
decorationUpload.addEventListener("change", async function() {

    const file = decorationUpload.files[0];

    if (!file) return;

    if (!["image/png", "image/webp", "image/jpeg"].includes(file.type)) {
        alert("Please upload a PNG, WebP, or JPG image.");
        decorationUpload.value = "";
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        alert("Please choose an image smaller than 5MB.");
        decorationUpload.value = "";
        return;
    }

    const activePage = document.querySelector(".invitation-page.active");

    if (!activePage) {
        alert("Please select an invitation page first.");
        decorationUpload.value = "";
        return;
    }

    // Check logged-in couple
    if (!window.currentCouple || !window.currentCouple.id) {
        alert("Please log in before uploading decorations.");
        decorationUpload.value = "";
        return;
    }

    try {

        decorationUpload.disabled = true;

        const extension = file.type === "image/png" ? "png" :
                          file.type === "image/webp" ? "webp" : "jpg";

        const filePath =
            window.currentCouple.id +
            "/decorations/" +
            Date.now() + "-" +
            Math.random().toString(36).slice(2, 10) +
            "." + extension;

        // Upload actual image to Supabase Storage
        const { data, error } = await supabaseClient
            .storage
            .from("invitation-assets")
            .upload(filePath, file, {
                cacheControl: "3600",
                upsert: false,
                contentType: file.type
            });

        if (error) throw error;

        // Get permanent public image URL
        const { data: publicData } = supabaseClient
            .storage
            .from("invitation-assets")
            .getPublicUrl(data.path);

        const imageUrl = publicData.publicUrl;

        decorationCounter++;

        const image = document.createElement("img");

        image.src = imageUrl;
        image.alt = "Invitation decoration";
        image.className = "user-decoration";
        image.dataset.storagePath = data.path;

        activePage.appendChild(image);

        const newDecoration = {
            id: "decoration-" + decorationCounter,
            name: "Decoration " + decorationCounter,
            element: image,
            position: decorationPosition.value,
            size: decorationSize.value,
            opacity: decorationOpacity.value
        };

        decorations.push(newDecoration);
        selectedDecoration = newDecoration;

        refreshDecorationList();
        selectDecoration(newDecoration.id);
        updateDecoration();

        decorationUpload.value = "";

    } catch (error) {

        console.error("Decoration upload error:", error);

        alert("Unable to upload decoration. Please try again.");

    } finally {

        decorationUpload.disabled = false;

    }

});

// Select another decoration
decorationSelect.addEventListener("change", function() {
    selectDecoration(decorationSelect.value);
});

// Live position changes
decorationPosition.addEventListener("change", updateDecoration);

// Live size changes
decorationSize.addEventListener("input", updateDecoration);

// Live opacity changes
decorationOpacity.addEventListener("input", updateDecoration);

// Remove selected decoration
removeDecorationBtn.addEventListener("click", function() {

    if (!selectedDecoration) {
        alert("Please select a decoration first.");
        return;
    }

    selectedDecoration.element.remove();

    decorations = decorations.filter(function(item) {
        return item.id !== selectedDecoration.id;
    });

    selectedDecoration = null;

    refreshDecorationList();

    if (decorations.length > 0) {
        selectDecoration(decorations[0].id);
    }
});

/* =================================
   MOVE DECORATION BETWEEN PAGES
================================= */

const decorationTargetPage = document.getElementById("decorationTargetPage");
const moveDecorationBtn = document.getElementById("moveDecorationBtn");

moveDecorationBtn.addEventListener("click", function() {

    if (!selectedDecoration) {
        alert("Please select a decoration first.");
        return;
    }

    const targetPage = document.getElementById(decorationTargetPage.value);

    if (!targetPage) {
        alert("The selected invitation page could not be found.");
        return;
    }

    // Move the selected decoration
    targetPage.appendChild(selectedDecoration.element);

    alert("Decoration successfully moved!");

});


// =================================
// TEXT COLOR CUSTOMIZATION
// =================================

const invitationCard = document.getElementById("invitationCard");

const coupleNameColor = document.getElementById("coupleNameColor");
const headingColor = document.getElementById("headingColor");
const bodyTextColor = document.getElementById("bodyTextColor");
const accentTextColor = document.getElementById("accentTextColor");

// NEW: Section card colors
const sectionCardHeadingColor = document.getElementById("sectionCardHeadingColor");
const sectionCardBodyColor = document.getElementById("sectionCardBodyColor");

const resetTextColorsBtn = document.getElementById("resetTextColorsBtn");

// Apply selected text colors


function updateTextColors() {

    invitationCard.style.setProperty("--custom-name-color", coupleNameColor.value);
    invitationCard.style.setProperty("--custom-heading-color", headingColor.value);
    invitationCard.style.setProperty("--custom-body-color", bodyTextColor.value);
    invitationCard.style.setProperty("--custom-accent-color", accentTextColor.value);

    invitationCard.style.setProperty("--custom-section-card-heading", sectionCardHeadingColor.value);
    invitationCard.style.setProperty("--custom-section-card-body", sectionCardBodyColor.value);
}


// HEX INPUT CONNECTIONS
const textColorControls = [
    { picker: coupleNameColor, hex: document.getElementById("coupleNameHex") },
    { picker: headingColor, hex: document.getElementById("headingColorHex") },
    { picker: bodyTextColor, hex: document.getElementById("bodyTextColorHex") },
    { picker: accentTextColor, hex: document.getElementById("accentTextColorHex") },
    { picker: sectionCardHeadingColor, hex: document.getElementById("sectionCardHeadingColorHex") },
    { picker: sectionCardBodyColor, hex: document.getElementById("sectionCardBodyColorHex") }
];


// APPLY HEX CODE
function applyHexColor(control, resetInvalid = false) {

    let hexValue = control.hex.value.trim();

    // Allow HEX codes without #
    if (/^[0-9A-Fa-f]{6}$/.test(hexValue)) {
        hexValue = "#" + hexValue;
    }

    if (/^#[0-9A-Fa-f]{6}$/.test(hexValue)) {

        control.picker.value = hexValue;
        control.hex.value = hexValue.toUpperCase();

        updateTextColors();

    } else if (resetInvalid) {

        control.hex.value = control.picker.value.toUpperCase();

    }
}


// CONNECT COLOR PICKERS AND HEX INPUTS

textColorControls.forEach(function(control) {

    // Select existing code when tapping the field
    control.hex.addEventListener("focus", function() {
        control.hex.select();
    });

    // Color picker to HEX
    control.picker.addEventListener("input", function() {
        control.hex.value = control.picker.value.toUpperCase();
        updateTextColors();
    });

    // HEX typing or pasting
    control.hex.addEventListener("input", function() {

        let hexValue = control.hex.value.trim();

        if (/^[0-9A-Fa-f]{6}$/.test(hexValue)) {
            hexValue = "#" + hexValue;
        }

        if (/^#[0-9A-Fa-f]{6}$/.test(hexValue)) {
            control.picker.value = hexValue;
            updateTextColors();
        }
    });

    // Validate when leaving the field
    control.hex.addEventListener("blur", function() {

        let hexValue = control.hex.value.trim();

        if (/^[0-9A-Fa-f]{6}$/.test(hexValue)) {
            hexValue = "#" + hexValue;
        }

        if (/^#[0-9A-Fa-f]{6}$/.test(hexValue)) {
            control.hex.value = hexValue.toUpperCase();
            control.picker.value = hexValue;
            updateTextColors();
        } else {
            control.hex.value = control.picker.value.toUpperCase();
        }
    });

});



// RESET COLORS
function resetTextColors() {

    const themeStyles = getComputedStyle(invitationCard);

    coupleNameColor.value =
        themeStyles.getPropertyValue("--theme-heading").trim();

    headingColor.value =
        themeStyles.getPropertyValue("--theme-heading").trim();

    bodyTextColor.value =
        themeStyles.getPropertyValue("--theme-text").trim();

    accentTextColor.value =
        themeStyles.getPropertyValue("--theme-accent").trim();

    sectionCardHeadingColor.value = "#65434d";
    sectionCardBodyColor.value = "#705b61";

    // Synchronize all HEX fields
    textColorControls.forEach(function(control) {
        control.hex.value = control.picker.value.toUpperCase();
    });

    updateTextColors();
}


// RESET BUTTON
resetTextColorsBtn.addEventListener("click", resetTextColors);


// INITIALIZE
resetTextColors();



// =================================
// PREMIUM FONT CUSTOMIZATION
// =================================

const coupleNamesFont = document.getElementById("coupleNamesFont");
const mainHeadingFont = document.getElementById("mainHeadingFont");
const sectionHeadingFont = document.getElementById("sectionHeadingFont");
const bodyFont = document.getElementById("bodyFont");

// Available premium fonts
const premiumFonts = {
    "great-vibes": "'Great Vibes', cursive",
    "allura": "'Allura', cursive",
    "playfair": "'Playfair Display', serif",
    "cormorant": "'Cormorant Garamond', serif",
    "cinzel": "'Cinzel', serif",
    "bodoni": "'Bodoni Moda', serif",
    "prata": "'Prata', serif",
    "dancing-script": "'Dancing Script', cursive",
    "dm-serif": "'DM Serif Display', serif",
    "libre-baskerville": "'Libre Baskerville', serif",

    "lato": "'Lato', sans-serif",
    "montserrat": "'Montserrat', sans-serif",
    "poppins": "'Poppins', sans-serif",
    "open-sans": "'Open Sans', sans-serif",
    "lora": "'Lora', serif",
    "raleway": "'Raleway', sans-serif",
    "jost": "'Jost', sans-serif",
    "dm-sans": "'DM Sans', sans-serif"
};


// Apply selected fonts
function updateFontStyle() {
    
    const guestInvitationCard =
        document.getElementById("guestInvitationCard");
    
    const cards = [
        invitationCard,
        guestInvitationCard
    ].filter(Boolean);
    
    cards.forEach(function(card) {
        
        card.style.setProperty(
            "--couple-names-font",
            premiumFonts[coupleNamesFont.value]
        );
        
        card.style.setProperty(
            "--heading-font",
            premiumFonts[mainHeadingFont.value]
        );
        
        card.style.setProperty(
            "--section-heading-font",
            premiumFonts[sectionHeadingFont.value]
        );
        
        card.style.setProperty(
            "--body-font",
            premiumFonts[bodyFont.value]
        );
        
    });
    
}

// Listen for font changes
[
    coupleNamesFont,
    mainHeadingFont,
    sectionHeadingFont,
    bodyFont
].forEach(function(control) {

    control.addEventListener("change", updateFontStyle);

});


// Apply initial font selections
updateFontStyle();



// =================================
// SAVE AND LOAD INVITATION DRAFT
// =================================

const saveDraftBtn = document.getElementById("saveDraftBtn");
const loadDraftBtn = document.getElementById("loadDraftBtn");
const draftStatus = document.getElementById("draftStatus");

const DRAFT_STORAGE_KEY = "everAfterWeddingDraft";

// SAVE DRAFT
saveDraftBtn.addEventListener("click", async function() {

    const formData = {};

    document.querySelectorAll(
        ".builder-panel input, .builder-panel textarea, .builder-panel select"
    ).forEach(function(field) {

        if (!field.id || field.type === "file") return;

        formData[field.id] = {
            value: field.value,
            checked: field.checked
        };

    });

    // Save uploaded decorations
    const savedDecorations = [];

    invitationCard.querySelectorAll(".user-decoration").forEach(function(image) {

        const page = image.closest(".invitation-page");

        savedDecorations.push({
            id: image.dataset.decorationId || null,
            name: image.alt || "Decoration",
            src: image.src,
            className: image.className,
            style: image.getAttribute("style") || "",
            pageId: page ? page.id : null
        });

    });

    const draft = {
    formData: formData,
    invitationStyle: invitationCard.getAttribute("style"),
    decorations: savedDecorations,
    selectedTemplate: window.selectedInvitationTemplate || "Floral Romance",
    sealLogo: sealLogoData
};

    try {

        // Save locally first
        localStorage.setItem(
            DRAFT_STORAGE_KEY,
            JSON.stringify(draft)
        );

        draftStatus.textContent = "Saved locally. Syncing to your account...";

    } catch (error) {

        draftStatus.textContent =
            "Unable to save. Your uploaded images may be too large.";

        return;
    }

    // Save to Supabase
    try {

        if (!window.currentInvitation || !window.currentInvitation.id) {
            throw new Error("Please log in to your couple account first.");
        }

        const { data, error } = await supabaseClient
            .from("invitations")
            .update({
                content: draft
            })
            .eq("id", window.currentInvitation.id)
            .select()
            .single();

        if (error) throw error;

        window.currentInvitation = data;
        window.currentInvitationContent = data.content;

        draftStatus.textContent =
            "Your invitation has been saved to your account! ♡";

    } catch (error) {

        console.error("Supabase save error:", error);

        draftStatus.textContent =
            "Saved on this device, but account sync failed. Please try again.";

    }

});




async function loadCoupleInvitationDraft(providedDraft = null, guestMode = false) {
    try {
        let draft = providedDraft;

        // Get invitation from Supabase for couple accounts
        if (!draft && window.currentInvitation?.id) {
            const { data, error } = await supabaseClient
                .from("invitations")
                .select("*")
                .eq("id", window.currentInvitation.id)
                .single();

            if (error) throw error;

            window.currentInvitation = data;
            window.currentInvitationContent = data.content;
            draft = data.content;
        }

        // Local fallback for couple accounts only
        if (!draft && !guestMode) {
            const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
            if (savedDraft) draft = JSON.parse(savedDraft);
        }

        if (!draft || !draft.formData) {
            if (!guestMode && draftStatus) {
                draftStatus.textContent = "No saved draft found yet.";
            }
            return false;
        }

        // Restore form fields
        Object.keys(draft.formData).forEach(function(id) {
            const field = document.getElementById(id);
            if (!field) return;

            const savedField = draft.formData[id];

            if (field.type === "checkbox" || field.type === "radio") {
                field.checked = savedField.checked;
            } else {
                field.value = savedField.value;
            }

            field.dispatchEvent(new Event("input", { bubbles: true }));
            field.dispatchEvent(new Event("change", { bubbles: true }));
        });
        
// RESTORE ENVELOPE SEAL CUSTOMIZATION
const savedFormData = draft.formData || {};

sealLogoData = draft.sealLogo || "";

savedSealStyle =
    savedFormData.sealStyle?.value || "initials";

if (sealStyle) {
    sealStyle.value = savedSealStyle;
}

if (sealBackgroundStyle) {
    sealBackgroundStyle.value =
        savedFormData.sealBackgroundStyle?.value || "original";
}

if (customSealColor && savedFormData.customSealColor?.value) {
    customSealColor.value =
        savedFormData.customSealColor.value;
}

if (sealUploadContainer) {
    sealUploadContainer.style.display =
        savedSealStyle === "image" ? "block" : "none";
}

if (customSealColorContainer) {
    customSealColorContainer.style.display =
        sealBackgroundStyle?.value === "custom" ? "block" : "none";
}

updateEnvelopeSeal();


        // Restore selected invitation template
        if (draft.selectedTemplate) {
            window.selectedInvitationTemplate = draft.selectedTemplate;

            const card = document.getElementById("invitationCard");

            if (card) {
                const templateThemes = {
                    "Floral Romance": "blush-floral",
                    "Minimalist Luxury": "minimalist-luxury",
                    "Garden Romance": "garden-romance",
                    "Sweet Pastel": "sweet-pastel",
                    "Burgundy & Gold": "burgundy-gold"
                };

                card.dataset.theme =
                    templateThemes[draft.selectedTemplate] || "blush-floral";
            }
        }
updateTemplateSelection();

        // Restore invitation styling
        if (draft.invitationStyle !== undefined) {
            invitationCard.setAttribute(
                "style",
                draft.invitationStyle || ""
            );
        }
        
        // Reapply selected fonts after restoring saved styling
if (
    coupleNamesFont &&
    mainHeadingFont &&
    sectionHeadingFont &&
    bodyFont
) {
    updateFontStyle();
}

        // Remove previous decorations
        invitationCard.querySelectorAll(".user-decoration").forEach(
            function(image) {
                image.remove();
            }
        );

        decorations.length = 0;
        selectedDecoration = null;

        // Restore decorations
        (draft.decorations || []).forEach(function(savedDecoration) {
            const page = document.getElementById(savedDecoration.pageId);

            if (!page || !savedDecoration.src ||
    !savedDecoration.src.startsWith("data:image/") &&
    !savedDecoration.src.startsWith("https://")) {
    return;
}

            const image = document.createElement("img");

            image.src = savedDecoration.src;
            image.alt = savedDecoration.name || "Decoration";
            image.className = savedDecoration.className;
            image.setAttribute("style", savedDecoration.style || "");

            const id = savedDecoration.id || ++decorationCounter;
            image.dataset.decorationId = id;

            page.appendChild(image);

            const position = [
                "top-left", "top-center", "top-right",
                "bottom-left", "bottom-center", "bottom-right"
            ].find(function(pos) {
                return image.classList.contains(pos);
            }) || "top-left";

            const width = parseFloat(image.style.width) || 120;

            decorations.push({
                id: id,
                name: savedDecoration.name,
                element: image,
                position: position,
                size: (width / 120) * 100,
                opacity: parseFloat(image.style.opacity || 0.65) * 100
            });

            if (typeof id === "number") {
                decorationCounter = Math.max(decorationCounter, id);
            }
        });

        refreshDecorationList();

        if (!guestMode && decorations.length > 0) {
            selectDecoration(decorations[0].id);
        }

        // Save local backup only for the couple's editor
        if (!guestMode) {
            localStorage.setItem(
                DRAFT_STORAGE_KEY,
                JSON.stringify(draft)
            );

            if (draftStatus) {
                draftStatus.textContent =
                    "Your saved invitation has been restored! ♡";
            }
        }

        return true;

    } catch (error) {
        console.error("Load invitation error:", error);

        if (!guestMode && draftStatus) {
            draftStatus.textContent =
                "Something went wrong while loading your draft.";
        }

        return false;
    }
}

// LOAD BUTTON
// LOAD BUTTON
loadDraftBtn.addEventListener("click", function () {
    loadCoupleInvitationDraft();
});


// =================================
// RESET INVITATION DESIGN
// =================================

const resetDesignBtn = document.getElementById("resetDesignBtn");

resetDesignBtn.addEventListener("click", function() {

    const confirmReset = confirm(
        "Are you sure you want to reset your invitation? This will remove your current customizations."
    );

    if (!confirmReset) return;

    // Remove saved draft
    localStorage.removeItem(DRAFT_STORAGE_KEY);

    // Reload the page to restore original defaults
    location.reload();

});


// =================================
// GUEST INVITATION PAGE CONNECTION
// =================================

function loadGuestInvitation() {
    const guestCard = document.getElementById("guestInvitationCard");
    const originalCard = document.getElementById("invitationCard");
    const guestNames = document.getElementById("guestCoupleNames");

    if (!guestCard || !originalCard) return;

    // Copy the couple's current invitation pages

// Copy selected wedding theme
guestCard.dataset.theme = originalCard.dataset.theme;

// Apply selected template to envelope
const guestEnvelope = document.getElementById("guestEnvelope");

if (guestEnvelope) {
    guestEnvelope.dataset.theme = originalCard.dataset.theme;
}

// RESTORE PERSONALIZED ENVELOPE SEAL FOR GUESTS

let guestContent = window.currentInvitationContent || {};

// Use the latest local draft for Couple Builder preview
try {
    const localDraft = localStorage.getItem(DRAFT_STORAGE_KEY);

    if (localDraft) {
        const parsedDraft = JSON.parse(localDraft);

        if (parsedDraft && parsedDraft.formData) {
            guestContent = parsedDraft;
        }
    }
} catch (error) {
    console.error("Unable to read local invitation draft:", error);
}

sealLogoData = guestContent.sealLogo || "";

savedSealStyle =
    guestContent.formData?.sealStyle?.value || "initials";

if (sealStyle) {
    sealStyle.value = savedSealStyle;
}

updateEnvelopeSeal();

const themeProperties = [
    "--theme-bg",
    "--theme-heading",
    "--theme-text",
    "--theme-accent",
    "--theme-border"
];

const originalStyles = getComputedStyle(originalCard);

themeProperties.forEach(function(property) {
    guestCard.style.setProperty(
        property,
        originalStyles.getPropertyValue(property).trim()
    );
});

// Copy all custom text colors
const customColorVariables = [
    "--custom-name-color",
    "--custom-heading-color",
    "--custom-body-color",
    "--custom-accent-color",
    "--custom-section-card-heading",
    "--custom-section-card-body"
];

customColorVariables.forEach(function(variable) {
    const value = originalStyles.getPropertyValue(variable).trim();

    if (value) {
        guestCard.style.setProperty(variable, value);
    }
});


    guestCard.innerHTML = "";

    const visiblePages = getVisibleInvitationPages();

    visiblePages.forEach(function (item) {
        const originalPage = document.getElementById(item.page);

        if (originalPage) {
            const guestPage = originalPage.cloneNode(true);

            guestPage.removeAttribute("id");
            guestPage.classList.remove("active");
            guestPage.classList.add("guest-invitation-page");

            guestCard.appendChild(guestPage);
        }
    });

    // Show the couple's actual names
    if (guestNames) {
        const names = document.getElementById("previewNames");

        if (names) {
            guestNames.textContent = names.textContent;
        }
    }

    showGuestInvitationPage(0);
}

// Guest-only page navigation
let guestCurrentPageIndex = 0;

function showGuestInvitationPage(index) {
const pages = document.querySelectorAll(
"#guestInvitationCard .guest-invitation-page"
);

if (pages.length === 0) return;  

guestCurrentPageIndex = Math.max(  
    0,  
    Math.min(index, pages.length - 1)  
);  

pages.forEach(function (page, i) {  
    page.classList.toggle(  
        "active",  
        i === guestCurrentPageIndex  
    );  
});  

document.getElementById("guestPageIndicator").textContent =  
    "Page " + (guestCurrentPageIndex + 1) +  
    " of " + pages.length;  

document.getElementById("guestPrevPageBtn").disabled =  
    guestCurrentPageIndex === 0;  

document.getElementById("guestNextPageBtn").disabled =  
    guestCurrentPageIndex === pages.length - 1;

}

document.getElementById("guestPrevPageBtn").addEventListener(
"click",
function () {
showGuestInvitationPage(guestCurrentPageIndex - 1);
}
);

document.getElementById("guestNextPageBtn").addEventListener(
"click",
function () {
showGuestInvitationPage(guestCurrentPageIndex + 1);
}
);



// =================================
// OPEN GUEST INVITATION
// =================================


const guestEnvelope = document.getElementById("guestEnvelope");
const guestInvitationContent = document.getElementById("guestInvitationContent");

function openGuestInvitation() {
    if (!guestEnvelope || !guestInvitationContent) return;

    loadGuestInvitation();

    guestEnvelope.classList.add("flap-open");

    setTimeout(function () {
        guestEnvelope.classList.add("paper-rise");
    }, 850);

    setTimeout(function () {
        guestEnvelope.style.display = "none";
        guestInvitationContent.style.display = "block";

        requestAnimationFrame(function () {
            guestInvitationContent.classList.add("show-invitation");
        });
    }, 1500);
}

// ENVELOPE SEAL CUSTOMIZATION
const sealStyle = document.getElementById("sealStyle");
const sealLogoUpload = document.getElementById("sealLogoUpload");
const sealUploadContainer = document.getElementById("sealUploadContainer");
const removeSealLogo = document.getElementById("removeSealLogo");

// SEAL BACKGROUND CUSTOMIZATION
const sealBackgroundStyle = document.getElementById("sealBackgroundStyle");
const customSealColor = document.getElementById("customSealColor");
const customSealColorContainer = document.getElementById("customSealColorContainer");

let sealLogoData = "";
let savedSealStyle = "initials";


// SHOW OR HIDE LOGO UPLOAD
if (sealStyle && sealUploadContainer) {
    sealStyle.addEventListener("change", function () {
        savedSealStyle = sealStyle.value;
        sealUploadContainer.style.display =
            sealStyle.value === "image" ? "block" : "none";

        updateEnvelopeSeal();
    });
}

// HANDLE LOGO UPLOAD
if (sealLogoUpload) {
    sealLogoUpload.addEventListener("change", function () {
        const file = sealLogoUpload.files[0];

        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            alert("Please upload an image smaller than 2MB.");
            sealLogoUpload.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
            sealLogoData = event.target.result;
            updateEnvelopeSeal();
        };

        reader.readAsDataURL(file);
    });
}

// REMOVE UPLOADED LOGO
if (removeSealLogo) {
    removeSealLogo.addEventListener("click", function () {
        sealLogoData = "";

        if (sealLogoUpload) {
            sealLogoUpload.value = "";
        }

        if (sealStyle) {
            sealStyle.value = "initials";
        }

        if (sealUploadContainer) {
            sealUploadContainer.style.display = "none";
        }

        updateEnvelopeSeal();
    });
}

// SHOW OR HIDE CUSTOM SEAL COLOR PICKER
if (sealBackgroundStyle && customSealColorContainer) {
    sealBackgroundStyle.addEventListener("change", function () {
        customSealColorContainer.style.display =
            sealBackgroundStyle.value === "custom" ? "block" : "none";

        updateEnvelopeSeal();
    });
}

// UPDATE SEAL WHEN CUSTOM COLOR CHANGES
if (customSealColor) {
    customSealColor.addEventListener("input", function () {
        updateEnvelopeSeal();
    });
}

// UPDATE ENVELOPE SEAL

function updateEnvelopeSeal() {
    const logo = document.getElementById("envelopeSealLogo");
    const initials = document.getElementById("envelopeInitials");
    const seal = document.querySelector("#guestEnvelope .envelope-seal");

    if (!logo || !initials) return;

    // LOGO OR INITIALS
    const currentStyle = sealStyle ?
        sealStyle.value :
        savedSealStyle;

    if (currentStyle === "image" && sealLogoData) {
        logo.src = sealLogoData;
        logo.style.display = "block";
        initials.style.display = "none";
    } else {
        logo.src = "";
        logo.style.display = "none";
        initials.style.display = "block";
    }

    // SEAL BACKGROUND COLOR
    if (seal) {
        const backgroundStyle = sealBackgroundStyle ?
            sealBackgroundStyle.value :
            "original";

        // Reset previous custom styling
        seal.style.removeProperty("background");
        seal.style.removeProperty("color");

        if (backgroundStyle === "gold") {
            seal.style.background =
                "linear-gradient(145deg, #f4d98a, #b88a36)";
            seal.style.color = "#5b3b22";

        } else if (backgroundStyle === "ivory") {
            seal.style.background =
                "linear-gradient(145deg, #fffdf4, #e9dfc8)";
            seal.style.color = "#5b3b22";

        } else if (backgroundStyle === "custom" && customSealColor) {
            seal.style.background = customSealColor.value;
            seal.style.color = "#ffffff";
        }
    }
}

const envelopeArt = document.querySelector(".envelope-art");

if (envelopeArt) {
    envelopeArt.addEventListener("click", openGuestInvitation);

    envelopeArt.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openGuestInvitation();
        }
    });
}



// =================================
// SWITCH BETWEEN BUILDER AND GUEST VIEW
// =================================

const previewGuestViewBtn = document.getElementById("previewGuestViewBtn");
const backToBuilderBtn = document.getElementById("backToBuilderBtn");

if (previewGuestViewBtn) {
    previewGuestViewBtn.addEventListener("click", function () {

        // Copy the latest customized invitation
        loadGuestInvitation();

        // Reset the envelope for a fresh preview
        guestEnvelope.style.display = "flex";
        guestEnvelope.classList.remove("opening");
        guestInvitationContent.style.display = "none";

        // Switch to Guest View
        document.getElementById("invitationPreview").style.display = "none";
        guestView.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

if (backToBuilderBtn) {
    backToBuilderBtn.addEventListener("click", function () {

        // Return to Couple Builder
        guestView.style.display = "none";
        document.getElementById("invitationPreview").style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// LOVE STORY THREE PHOTO PREVIEW

function setupStoryPhoto(inputId, previewId) {

    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);

    if (!input || !preview) return;

    input.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Please choose an image smaller than 5MB.");
            this.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
            preview.src = event.target.result;
            preview.style.display = "block";
            preview.closest(".story-photo-card").style.display = "block";
        };

        reader.readAsDataURL(file);

    });
}

setupStoryPhoto("storyPhoto1", "previewStoryPhoto1");
setupStoryPhoto("storyPhoto2", "previewStoryPhoto2");
setupStoryPhoto("storyPhoto3", "previewStoryPhoto3");

// LOVE STORY CAPTION CUSTOMIZATION

function updateStoryCaption(inputId, previewId) {

    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);

    if (!input || !preview) return;

    input.addEventListener("input", function () {
        preview.textContent = this.value;
    });
}

// PHOTO 1
updateStoryCaption("storyCaption1", "previewStoryCaption1");
updateStoryCaption("storyChapter1", "previewStoryChapter1");

// PHOTO 2
updateStoryCaption("storyCaption2", "previewStoryCaption2");
updateStoryCaption("storyChapter2", "previewStoryChapter2");

// PHOTO 3
updateStoryCaption("storyCaption3", "previewStoryCaption3");
updateStoryCaption("storyChapter3", "previewStoryChapter3");


// SHOW OR HIDE ALL PHOTO CAPTIONS

const storyCaptionsToggle = document.getElementById("storyCaptionsToggle");

if (storyCaptionsToggle) {

    storyCaptionsToggle.addEventListener("change", function () {

        const captions = document.querySelectorAll(
            "#invitationCard .story-photo-caption"
        );

        captions.forEach(function (caption) {
            caption.style.display = storyCaptionsToggle.checked ? "block" : "none";
        });

    });

}

// OPTIONAL WRITTEN LOVE STORY

const writtenStoryToggle = document.getElementById("writtenStoryToggle");
const previewStoryText = document.getElementById("previewStory");

if (writtenStoryToggle && previewStoryText) {

    function updateWrittenStoryVisibility() {
        previewStoryText.style.display =
            writtenStoryToggle.checked ? "block" : "none";
    }

    writtenStoryToggle.addEventListener("change", updateWrittenStoryVisibility);

    updateWrittenStoryVisibility();
}

// ENTOURAGE BACKGROUND PHOTO
const entourageBackgroundInput = document.getElementById("entourageBackgroundInput");
const entourageSection = document.getElementById("entourageSection");

if (entourageBackgroundInput && entourageSection) {

    entourageBackgroundInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image.");
            this.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Please choose an image smaller than 5MB.");
            this.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {

            entourageSection.style.setProperty(
                "--entourage-bg-image",
                `url("${event.target.result}")`
            );

        };

        reader.readAsDataURL(file);
    });
}



document.getElementById("dashboardEditBtn").addEventListener("click", function () {

    // Make sure the couple is logged in
    if (!window.currentCouple || !window.currentInvitation) {
        alert("Please log in to your couple account first.");
        return;
    }

    // Keep the current couple's invitation available to the builder
    window.currentInvitationContent =
        window.currentInvitation.content || {};

    // Hide dashboard
    document.getElementById("coupleDashboard").style.display = "none";

    // Open existing invitation builder
    const editor = document.getElementById("invitationPreview");

    if (!editor) {
        alert("Invitation editor could not be found.");
        document.getElementById("coupleDashboard").style.display = "block";
        return;
    }

    editor.style.display = "block";
loadCoupleInvitationDraft();
    editor.scrollIntoView({
        behavior: "smooth"
    });

});


document.getElementById("dashboardPreviewBtn").addEventListener("click", function () {
    document.getElementById("previewGuestViewBtn").click();
});

document.getElementById("dashboardRsvpBtn").addEventListener("click", function () {
    alert("RSVP Management will be available once online guest submissions are connected.");
});


/* =================================
   SHARE WEDDING INVITATION
================================= */

const dashboardShareBtn =
    document.getElementById("dashboardShareBtn");

if (dashboardShareBtn) {
    dashboardShareBtn.addEventListener("click", async function () {

        const invitation = window.currentInvitation;

        if (!invitation || invitation.status !== "published") {
            alert("Please publish your invitation before sharing it.");
            return;
        }

        const invitationUrl =
            window.location.origin +
            window.location.pathname +
            "?invite=" +
            encodeURIComponent(invitation.slug);

        const shareData = {
            title: "Wedding Invitation",
            text: "You're invited to celebrate our special day! ♡",
            url: invitationUrl
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(invitationUrl);
                alert("Invitation link copied! You can now share it with your guests. ♡");
            } else {
                window.prompt("Copy your wedding invitation link:", invitationUrl);
            }

        } catch (error) {
            if (error.name !== "AbortError") {
                console.error("Share invitation error:", error);
                alert("Unable to share your invitation. Please try again.");
            }
        }
    });
}



document.getElementById("backToHomeBtn").addEventListener("click", function () {
    document.getElementById("coupleLogin").style.display = "none";
    document.getElementById("coupleDashboard").style.display = "none";
    document.getElementById("guestView").style.display = "none";
    document.getElementById("invitationPreview").style.display = "none";

    document.getElementById("home").style.display = "block";
    document.getElementById("templates").style.display = "block";

    document.getElementById("home").scrollIntoView({
        behavior: "smooth"
    });
});


// OWNER LOGIN NAVIGATION

function showOwnerLogin() {
    document.getElementById("home").style.display = "none";
    document.getElementById("templates").style.display = "none";
    document.getElementById("coupleLogin").style.display = "none";
    document.getElementById("coupleDashboard").style.display = "none";
    document.getElementById("guestView").style.display = "none";
    document.getElementById("invitationPreview").style.display = "none";

    document.getElementById("ownerLogin").style.display = "block";

    document.getElementById("ownerLogin").scrollIntoView({
        behavior: "smooth"
    });
}

// BACK TO HOME
document.getElementById("ownerBackToHomeBtn").addEventListener("click", function () {
    document.getElementById("ownerLogin").style.display = "none";
    document.getElementById("home").style.display = "block";
    document.getElementById("templates").style.display = "block";

    document.getElementById("home").scrollIntoView({
        behavior: "smooth"
    });
});

//  OWNER LOGIN 


document.getElementById("ownerLoginBtn").addEventListener("click", async function () {
    const email = document.getElementById("ownerUsername").value.trim();
    const password = document.getElementById("ownerPassword").value;

    if (!email || !password) {
        alert("Please enter your email and password.");
        return;
    }

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        alert("Login failed. Please check your email and password.");
        return;
    }

    const { data: adminRecord, error: adminError } =
        await supabaseClient
            .from("platform_admins")
            .select("user_id")
            .eq("user_id", data.user.id)
            .maybeSingle();

    if (adminError || !adminRecord) {
        await supabaseClient.auth.signOut();
        alert("Access denied. Owner Admin authorization required.");
        return;
    }

    document.getElementById("ownerLogin").style.display = "none";
    document.getElementById("ownerAdmin").style.display = "block";
    
    loadAdminCouples();

    document.getElementById("ownerAdmin").scrollIntoView({
        behavior: "smooth"
    });

    alert("Welcome to your Owner Admin Dashboard!");
});




document.getElementById("coupleLoginBtn").addEventListener("click", async function () {
    const email = document.getElementById("coupleUsername").value.trim();
    const password = document.getElementById("couplePassword").value;

    if (!email || !password) {
        alert("Please enter your email and password.");
        return;
    }

    const button = this;
    button.disabled = true;
    button.textContent = "Signing In...";

    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            throw error;
        }

        const user = data.user;

        // Load the couple's profile
        const { data: couple, error: coupleError } = await supabaseClient
            .from("couples")
            .select("*")
            .eq("owner_user_id", user.id)
            .single();

        if (coupleError || !couple) {
            throw new Error("Couple profile not found.");
        }

        // Load the couple's invitation
        const { data: invitation, error: invitationError } =
            await supabaseClient
                .from("invitations")
                .select("*")
                .eq("couple_id", couple.id)
                .single();

        if (invitationError || !invitation) {
            throw new Error("Invitation not found.");
        }

        // Save logged-in couple information
        window.currentCouple = couple;
        window.currentInvitation = invitation;
        renderCoupleDashboard(couple, invitation);
        updateNavigation()
        
        // Continue with the selected template after login
if (window.pendingInvitationTemplate) {
    const templateToOpen = window.pendingInvitationTemplate;

    window.pendingInvitationTemplate = null;

    chooseTemplate(templateToOpen);
}

        // Hide login and show couple dashboard
        document.getElementById("coupleLogin").style.display = "none";
        document.getElementById("coupleDashboard").style.display = "block";

        document.getElementById("coupleDashboard").scrollIntoView({
            behavior: "smooth"
        });

        alert("Welcome, " + couple.couple_names + "!");

    } catch (error) {
        await supabaseClient.auth.signOut();
        alert(error.message || "Login failed. Please check your credentials.");
    } finally {
        button.disabled = false;
        button.textContent = "Login";
    }
});


function renderCoupleDashboard(couple, invitation) {

    // Couple names
    document.getElementById("dashboardCoupleNames").textContent =
        couple.couple_names || "Your Wedding";

    // Wedding date
    const dateElement = document.getElementById("dashboardWeddingDate");

    if (couple.wedding_date) {
        const parts = couple.wedding_date.split("-");
        const weddingDate = new Date(
            Number(parts[0]),
            Number(parts[1]) - 1,
            Number(parts[2])
        );

        dateElement.textContent = weddingDate.toLocaleDateString(
            "en-US",
            {
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        );
    } else {
        dateElement.textContent = "Wedding date not set";
    }

    // Invitation status
    const status = invitation.status || "draft";
    const isPublished = status === "published";

    document.getElementById("invitationStatusBadge").textContent =
        status.toUpperCase();

    document.getElementById("invitationStatusText").textContent =
        isPublished ? "Published" : "Not yet published";

    // Published date
    // Your current database does not have a dedicated published_at column.
    const publishedDateElement =
    document.getElementById("invitationPublishedDate");

if (invitation.published_at) {
    publishedDateElement.textContent =
        new Date(invitation.published_at).toLocaleDateString(
            "en-PH",
            {
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        );
} else {
    publishedDateElement.textContent = "Not yet published";
}

    // Invitation link
    const linkElement = document.getElementById("invitationShareLink");
    const copyButton = document.getElementById("copyInvitationLinkBtn");

    if (isPublished && invitation.slug) {
        const invitationUrl =
    window.location.origin +
    window.location.pathname +
    "?invite=" +
    encodeURIComponent(invitation.slug);

        linkElement.textContent = invitationUrl;
        copyButton.disabled = false;

        copyButton.onclick = async function () {
            try {
                await navigator.clipboard.writeText(invitationUrl);
                alert("Invitation link copied!");
            } catch (error) {
                alert("Unable to copy automatically. Please copy the link manually.");
            }
        };

    } else {
        linkElement.textContent =
            "Your link will appear here after publishing.";

        copyButton.disabled = true;
        copyButton.onclick = null;
    }
}



// UPDATE COUPLE DASHBOARD DETAILS

function updateDashboardDetails() {
    const name1 = document.getElementById("name1").value.trim();
    const name2 = document.getElementById("name2").value.trim();
    const weddingDate = document.getElementById("weddingDate").value;

    const coupleNames = [name1, name2].filter(Boolean).join(" & ");

    document.getElementById("dashboardCoupleNames").textContent =
        coupleNames || "Your Names Here";

    if (weddingDate) {
        const dateParts = weddingDate.split("-");
        const formattedDate = new Date(
            Number(dateParts[0]),
            Number(dateParts[1]) - 1,
            Number(dateParts[2])
        );

        document.getElementById("dashboardWeddingDate").textContent =
            formattedDate.toLocaleDateString("en-PH", {
                month: "long",
                day: "numeric",
                year: "numeric"
            });
    } else {
        document.getElementById("dashboardWeddingDate").textContent =
            "Wedding date not set";
    }
}

// UPDATE WHEN DETAILS CHANGE

document.getElementById("name1").addEventListener("input", updateDashboardDetails);
document.getElementById("name2").addEventListener("input", updateDashboardDetails);
document.getElementById("weddingDate").addEventListener("change", updateDashboardDetails);

// INITIAL DASHBOARD DETAILS

updateDashboardDetails();

document.getElementById("backToDashboardBtn").addEventListener("click", function () {
    updateDashboardDetails();

    document.getElementById("invitationPreview").style.display = "none";
    document.getElementById("coupleDashboard").style.display = "block";

    document.getElementById("coupleDashboard").scrollIntoView({
        behavior: "smooth"
    });
});



document.getElementById("createCoupleAccountBtn").addEventListener("click", async function () {
    const button = this;

    const coupleNames = document.getElementById("adminCoupleNames").value.trim();
    const email = document.getElementById("adminUsername").value.trim();
    const password = document.getElementById("adminPassword").value;
    const weddingDate = document.getElementById("adminWeddingDate").value;

    const status = document.getElementById("adminAccountStatus");

    if (!coupleNames || !email || !password) {
        status.textContent = "Please complete all required fields.";
        return;
    }

    if (password.length < 12) {
        status.textContent = "Password must be at least 12 characters.";
        return;
    }

    button.disabled = true;
    button.textContent = "Creating Account...";

    status.textContent = "Please wait while we create the couple account.";

    try {
        const { data, error } = await supabaseClient.functions.invoke(
            "create-couple-account",
            {
                body: {
                    couple_names: coupleNames,
                    email: email,
                    password: password,
                    wedding_date: weddingDate || null
                }
            }
        );

        if (error) {
            throw new Error(error.message);
        }

        if (!data || !data.success) {
            throw new Error(data?.error || "Account creation failed.");
        }

        status.textContent = "Success! Couple account created.";
        await loadAdminCouples();

        document.getElementById("adminCoupleNames").value = "";
        document.getElementById("adminUsername").value = "";
        document.getElementById("adminPassword").value = "";
        document.getElementById("adminWeddingDate").value = "";

        alert("Couple account created successfully!");

    } catch (error) {
        status.textContent = "Error: " + error.message;
    } finally {
        button.disabled = false;
        button.textContent = "Create Couple Account";
    }
});


// =================================
// PUBLISH WEDDING INVITATION
// =================================

const publishInvitationBtn =
    document.getElementById("publishInvitationBtn");

publishInvitationBtn.addEventListener("click", async function() {

    if (!window.currentCouple || !window.currentInvitation) {
        alert("Please log in to your couple account first.");
        return;
    }

    const confirmed = confirm(
        "Are you ready to publish your wedding invitation?"
    );

    if (!confirmed) return;

    const button = this;

    button.disabled = true;
    button.textContent = "Publishing...";

    draftStatus.textContent = "Saving your latest changes...";

    try {

        // Collect latest builder details
        const formData = {};

        document.querySelectorAll(
            ".builder-panel input, .builder-panel textarea, .builder-panel select"
        ).forEach(function(field) {

            if (!field.id || field.type === "file") return;

            formData[field.id] = {
                value: field.value,
                checked: field.checked
            };

        });

        // Collect uploaded decorations
        const savedDecorations = [];

        invitationCard.querySelectorAll(".user-decoration").forEach(function(image) {

            const page = image.closest(".invitation-page");

            savedDecorations.push({
                id: image.dataset.decorationId || null,
                name: image.alt || "Decoration",
                src: image.src,
                className: image.className,
                style: image.getAttribute("style") || "",
                pageId: page ? page.id : null
            });

        });

        
const draft = {
    formData: formData,
    invitationStyle: invitationCard.getAttribute("style"),
    decorations: savedDecorations,
    selectedTemplate: window.selectedInvitationTemplate || "Floral Romance",
    sealLogo: sealLogoData
};


        // Save and publish in Supabase
        const { data, error } = await supabaseClient
            .from("invitations")
.update({
    content: draft,
    status: "published",
    published_at: window.currentInvitation.published_at ||
        new Date().toISOString()
})
            .eq("id", window.currentInvitation.id)
            .select()
            .single();

        if (error) throw error;

        // Update current invitation data
        window.currentInvitation = data;
        window.currentInvitationContent = data.content;

        // Keep local backup
        localStorage.setItem(
            DRAFT_STORAGE_KEY,
            JSON.stringify(draft)
        );

        // Refresh dashboard information
        if (typeof renderCoupleDashboard === "function") {
            renderCoupleDashboard(window.currentCouple, data);
        }

        draftStatus.textContent =
            "Your wedding invitation is now published! ♡";

        alert("Congratulations! Your invitation has been published.");

    } catch (error) {

        console.error("Publishing error:", error);

        draftStatus.textContent =
            "Unable to publish. Please check your connection and try again.";

    } finally {

        button.disabled = false;
        button.textContent = "Publish Invitation";

    }

});


// =================================
// LOAD PUBLISHED INVITATION FOR GUESTS
// =================================

async function loadPublishedGuestInvitation() {

    const params = new URLSearchParams(window.location.search);
    const invitationSlug = params.get("invite");

    // No invitation slug? Continue normal website behavior.
    if (!invitationSlug) return;

// Activate standalone guest invitation mode
document.body.classList.add("guest-invitation-mode");
// Silent loading - no visible loading message
    try {

        const { data: invitation, error } = await supabaseClient
            .from("invitations")
            .select("*")
            .eq("slug", invitationSlug)
            .eq("status", "published")
            .single();

        if (error) throw error;
        

        if (!invitation || !invitation.content) {
            throw new Error("Published invitation not found.");
        }

        // Restore the published invitation data
        const restored = await loadCoupleInvitationDraft(
            invitation.content,
            true
        );

        if (!restored) {
            throw new Error("Unable to load invitation content.");
        }

        window.publicGuestInvitation = invitation;
        

        // Prepare Guest View
        loadGuestInvitation();

        const guestView = document.getElementById("guestView");
        const guestEnvelope = document.getElementById("guestEnvelope");
        const guestContent = document.getElementById("guestInvitationContent");
        const backButton = document.getElementById("backToBuilderBtn");

        // Hide account and editing areas
        [
            "ownerLogin",
            "ownerAdmin",
            "coupleLogin",
            "coupleDashboard",
            "invitationPreview"
        ].forEach(function(id) {
            const element = document.getElementById(id);
            if (element) element.style.display = "none";
        });

        // Show the guest invitation envelope
        if (guestView) guestView.style.display = "block";
        if (guestEnvelope) {
            guestEnvelope.style.display = "flex";
            guestEnvelope.classList.remove("flap-open", "paper-rise");
        }

        if (guestContent) {
            guestContent.style.display = "none";
            guestContent.classList.remove("show-invitation");
        }

        // Guests cannot return to the builder
        if (backButton) backButton.style.display = "none";

        // Set envelope initials from couple names
        const namesElement = document.getElementById("guestCoupleNames");
        const initialsElement = document.getElementById("envelopeInitials");

        if (namesElement && initialsElement) {
            const initials = namesElement.textContent
                .split("&")
                .map(name => name.trim().charAt(0))
                .filter(Boolean);

            if (initials.length > 0) {
                initialsElement.textContent = initials.join(" & ");
            }
        }

        document.title = "Wedding Invitation";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        
        const loading = document.getElementById("guestLoadingMessage");

if (loading) {
    loading.remove();
}

    } catch (error) {

        console.error("Guest invitation error:", error);
        const loading = document.getElementById("guestLoadingMessage");

if (loading) {
    loading.remove();
}

        alert(
            "Sorry, this wedding invitation could not be found or is no longer published."
        );
    }
}

// Automatically check whether this is a guest invitation link
loadPublishedGuestInvitation();


/* =================================
   COUPLE RSVP MANAGEMENT
================================= */

(function () {

    const rsvpButton = document.getElementById("dashboardRsvpBtn");
    const refreshButton = document.getElementById("refreshRsvpBtn");
    const backButton = document.getElementById("backToDashboardFromRsvp");

    const rsvpPanel = document.getElementById("rsvpManagementPanel");
    const dashboardActions = document.querySelector("#coupleDashboard .dashboard-actions");

    async function loadCoupleRsvps() {

        const status = document.getElementById("rsvpManagementStatus");
        const list = document.getElementById("rsvpResponseList");

        if (!window.currentInvitation?.id) {
            status.textContent = "Invitation information not found. Please log in again.";
            return;
        }

        status.textContent = "Loading guest responses...";
        list.textContent = "Loading...";

        try {
            const { data, error } = await supabaseClient
                .from("rsvps")
                .select("guest_name, attending, guest_count, message, created_at")
                .eq("invitation_id", window.currentInvitation.id)
                .order("created_at", { ascending: false });

            if (error) throw error;

            const responses = data || [];

            const attending = responses.filter(item => item.attending === true);
            const declined = responses.filter(item => item.attending === false);

            document.getElementById("rsvpTotalResponses").textContent =
                responses.length;

            document.getElementById("rsvpAttendingCount").textContent =
                attending.length;

            document.getElementById("rsvpDeclinedCount").textContent =
                declined.length;

            document.getElementById("rsvpTotalGuests").textContent =
                attending.reduce((total, item) => {
                    return total + Number(item.guest_count || 0);
                }, 0);

            list.innerHTML = "";

            if (responses.length === 0) {
                list.textContent = "No guest responses yet. Your responses will appear here.";
                status.textContent = "Your RSVP list is up to date.";
                return;
            }

            responses.forEach(function (item) {

                const card = document.createElement("div");
                card.className = "rsvp-response-card";

                const name = document.createElement("h4");
                name.textContent = item.guest_name || "Guest";

                const attendance = document.createElement("p");
                attendance.textContent = item.attending
                    ? "♡ Joyfully accepts"
                    : "Regretfully declines";

                const count = document.createElement("p");
                count.textContent = "Number of guests: " +
                    (item.attending ? item.guest_count : 0);

                card.appendChild(name);
                card.appendChild(attendance);
                card.appendChild(count);

                if (item.message) {
                    const message = document.createElement("p");
                    message.textContent = "Message: " + item.message;
                    card.appendChild(message);
                }

                if (item.created_at) {
                    const date = document.createElement("small");
                    date.textContent = new Date(item.created_at)
                        .toLocaleDateString("en-PH", {
                            month: "long",
                            day: "numeric",
                            year: "numeric"
                        });

                    card.appendChild(date);
                }

                list.appendChild(card);
            });

            status.textContent = "Your RSVP list is up to date.";

        } catch (error) {
            console.error("Load RSVP error:", error);
            list.textContent = "Unable to load guest responses.";
            status.textContent = error.message || "Something went wrong.";
        }
    }

    if (rsvpButton && rsvpPanel) {
        rsvpButton.addEventListener("click", function () {

            rsvpPanel.style.display = "block";

            if (dashboardActions) {
                dashboardActions.style.display = "none";
            }

            loadCoupleRsvps();

            rsvpPanel.scrollIntoView({
                behavior: "smooth"
            });
        });
    }

    if (refreshButton) {
        refreshButton.addEventListener("click", loadCoupleRsvps);
    }

    if (backButton) {
        backButton.addEventListener("click", function () {

            rsvpPanel.style.display = "none";

            if (dashboardActions) {
                dashboardActions.style.display = "";
            }
        });
    }

})();


/* =================================
   OWNER ADMIN - LOAD COUPLE ACCOUNTS
================================= */

async function loadAdminCouples() {
    const list = document.getElementById("adminCouplesList");
    const status = document.getElementById("adminAccountStatus");

    list.innerHTML = "<p>Loading couple accounts...</p>";

    try {
        const { data, error } = await supabaseClient.functions.invoke(
            "list-couple-accounts",
            { body: {} }
        );

        if (error) throw error;
        if (!data || !data.success) {
            throw new Error(data?.error || "Unable to load accounts.");
        }

        const couples = data.couples || [];

        document.getElementById("totalCouples").textContent =
            couples.length;

document.getElementById("activeCouples").textContent =
    couples.filter(c => c.is_active === true).length;

        document.getElementById("totalInvitations").textContent =
            couples.filter(c => c.invitation_status !== "not created").length;

        list.innerHTML = "";

        if (couples.length === 0) {
            list.innerHTML =
                '<p class="admin-empty-message">No couple accounts created yet.</p>';
            return;
        }

        couples.forEach(function(couple) {
            const card = document.createElement("div");
            card.className = "admin-couple-card";

            const name = document.createElement("h4");
            name.textContent = couple.couple_names;

            const email = document.createElement("p");
            email.textContent = "Email: " + couple.email;

            const weddingDate = document.createElement("p");
            weddingDate.textContent = "Wedding Date: " +
                (couple.wedding_date
                    ? new Date(couple.wedding_date + "T00:00:00")
                        .toLocaleDateString("en-PH", {
                            month: "long",
                            day: "numeric",
                            year: "numeric"
                        })
                    : "Not set");

            const invitationStatus = document.createElement("p");
            invitationStatus.textContent = "Invitation: " +
                couple.invitation_status;

            const accountStatus = document.createElement("p");
accountStatus.className = "admin-account-status";
accountStatus.textContent = couple.is_active ?
    "Account: Active" :
    "Account: Suspended";

accountStatus.classList.add(
    couple.is_active ? "account-active" : "account-suspended"
);

const accessButton = document.createElement("button");
accessButton.type = "button";
accessButton.className = "admin-access-button";
accessButton.dataset.coupleId = couple.id;
accessButton.dataset.active = String(couple.is_active);

accessButton.textContent = couple.is_active ?
    "Suspend Account" :
    "Reactivate Account";

card.appendChild(name);
card.appendChild(email);
card.appendChild(weddingDate);
card.appendChild(invitationStatus);
card.appendChild(accountStatus);
card.appendChild(accessButton);

list.appendChild(card);
        });

        if (status) {
            status.textContent = "Couple accounts loaded successfully.";
        }

    } catch (error) {
        console.error("Admin couples error:", error);
        list.innerHTML =
            '<p class="admin-empty-message">Unable to load couple accounts.</p>';

        if (status) status.textContent = error.message;
    }
}

/* =================================
   OWNER ADMIN - ACCOUNT ACCESS
================================= */

document.getElementById("adminCouplesList")
    .addEventListener("click", async function(event) {

    const button = event.target.closest(".admin-access-button");

    if (!button) return;

    const coupleId = button.dataset.coupleId;
    const currentlyActive = button.dataset.active === "true";
    const newStatus = !currentlyActive;

    const action = newStatus ? "reactivate" : "suspend";

    if (!confirm(
        `Are you sure you want to ${action} this couple's account?`
    )) return;

    button.disabled = true;
    button.textContent = "Updating...";

    try {
        const { data, error } =
            await supabaseClient.functions.invoke(
                "manage-couple-access",
                {
                    body: {
                        couple_id: coupleId,
                        is_active: newStatus
                    }
                }
            );

        if (error) throw error;

        if (!data || !data.success) {
            throw new Error(data?.error || "Unable to update account.");
        }

        await loadAdminCouples();

        alert(data.message);

    } catch (error) {
        console.error("Account access error:", error);
        alert(error.message || "Unable to update account.");
        await loadAdminCouples();
    }
});

/* =================================
   COUPLE - CHANGE PASSWORD
================================= */

(function () {
    const dashboardActions =
        document.querySelector("#coupleDashboard .dashboard-actions");

    const passwordPanel =
        document.getElementById("changePasswordPanel");

    const openButton =
        document.getElementById("dashboardPasswordBtn");

    const backButton =
        document.getElementById("backToDashboardFromPassword");

    const passwordForm =
        document.getElementById("changePasswordForm");

    if (openButton && passwordPanel) {
        openButton.addEventListener("click", function () {
            dashboardActions.style.display = "none";
            passwordPanel.style.display = "block";
            passwordPanel.scrollIntoView({ behavior: "smooth" });
        });
    }

    if (backButton) {
        backButton.addEventListener("click", function () {
            passwordPanel.style.display = "none";
            dashboardActions.style.display = "";
        });
    }

    if (passwordForm) {
        passwordForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const newPassword =
                document.getElementById("newCouplePassword").value;

            const confirmPassword =
                document.getElementById("confirmCouplePassword").value;

            const status =
                document.getElementById("changePasswordStatus");

            const button =
                document.getElementById("saveCouplePasswordBtn");

            if (newPassword.length < 12) {
                status.textContent =
                    "Password must be at least 12 characters.";
                return;
            }

            if (newPassword !== confirmPassword) {
                status.textContent = "Passwords do not match.";
                return;
            }

            button.disabled = true;
            button.textContent = "Updating Password...";
            status.textContent = "Please wait...";

            try {
                const { error } =
                    await supabaseClient.auth.updateUser({
                        password: newPassword
                    });

                if (error) throw error;

                status.textContent =
                    "Your password has been updated successfully! ♡";

                passwordForm.reset();

            } catch (error) {
                status.textContent =
                    error.message || "Unable to update password.";
            } finally {
                button.disabled = false;
                button.textContent = "Save New Password";
            }
        });
    }
})();

function showHome() {
    showPublicPage();
    document.getElementById("home").style.display = "block";
    document.getElementById("home").scrollIntoView({ behavior: "smooth" });
}

function showTemplates() {
    showPublicPage();
    document.getElementById("templates").style.display = "block";
    document.getElementById("templates").scrollIntoView({ behavior: "smooth" });
}

function showAbout() {
    showPublicPage();
    document.getElementById("about").style.display = "block";
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
}

function showPublicPage() {
    document.getElementById("coupleLogin").style.display = "none";
    document.getElementById("coupleDashboard").style.display = "none";
    document.getElementById("guestView").style.display = "none";
    document.getElementById("invitationPreview").style.display = "none";

    document.getElementById("home").style.display = "block";
    document.getElementById("templates").style.display = "block";
    document.getElementById("about").style.display = "block";
}

function toggleAccountMenu() {
    const dropdown = document.getElementById("accountDropdown");

    dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
}

function updateNavigation() {
    const isLoggedIn = !!window.currentCouple;

    document.querySelector(".login-btn").style.display =
        isLoggedIn ? "none" : "inline-block";

    document.getElementById("accountMenu").style.display =
        isLoggedIn ? "block" : "none";

    if (isLoggedIn) {
        const coupleName = window.currentCouple.couple_names || "My Account";

        document.getElementById("accountMenuName").textContent = coupleName;
        document.getElementById("accountDropdownName").textContent =
            coupleName + " Account";
    }

    document.getElementById("accountDropdown").style.display = "none";
}


function updateNavigation() {
    const loginButton = document.querySelector(".login-btn");
    const accountMenu = document.getElementById("accountMenu");
    const accountName = document.getElementById("accountMenuName");
    const dropdownName = document.getElementById("accountDropdownName");
    const dropdown = document.getElementById("accountDropdown");

    const isLoggedIn = !!window.currentCouple;

    if (loginButton) {
        loginButton.style.display = isLoggedIn ? "none" : "inline-block";
    }

    if (accountMenu) {
        accountMenu.style.display = isLoggedIn ? "block" : "none";
    }

    if (isLoggedIn) {
        const coupleName = window.currentCouple.couple_names || "My Account";

        if (accountName) accountName.textContent = coupleName;
        if (dropdownName) dropdownName.textContent = coupleName + " Account";
    }

    if (dropdown) {
        dropdown.style.display = "none";
    }
}


function showCoupleDashboard() {
    document.getElementById("coupleLogin").style.display = "none";
    document.getElementById("home").style.display = "none";
    document.getElementById("templates").style.display = "none";
    document.getElementById("about").style.display = "none";
    document.getElementById("guestView").style.display = "none";
    document.getElementById("invitationPreview").style.display = "none";

    document.getElementById("coupleDashboard").style.display = "block";

    document.getElementById("coupleDashboard").scrollIntoView({
        behavior: "smooth"
    });
}

async function logoutCouple() {
    const confirmLogout = confirm("Are you sure you want to log out?");

    if (!confirmLogout) return;

    await supabaseClient.auth.signOut();

    window.currentCouple = null;
    window.currentInvitation = null;
    window.currentInvitationContent = null;

    updateNavigation();
    showHome();
}


// TEMPLATE PREVIEW CAROUSEL

function changeTemplateSlide(button, direction) {
    const gallery = button.closest(".template-gallery");

    if (!gallery) return;

    const slides = gallery.querySelectorAll(".template-slide");
    const dots = gallery.querySelectorAll(".gallery-dots span");
    const counter = gallery.querySelector(".gallery-counter");

    let currentIndex = Array.from(slides).findIndex(function(slide) {
        return slide.style.display === "flex";
    });

    if (currentIndex === -1) currentIndex = 0;

    let nextIndex = currentIndex + direction;

    if (nextIndex >= slides.length) {
        nextIndex = 0;
    }

    if (nextIndex < 0) {
        nextIndex = slides.length - 1;
    }

    slides.forEach(function(slide, index) {
        slide.style.display = index === nextIndex ? "flex" : "none";
    });

    dots.forEach(function(dot, index) {
        dot.classList.toggle("active", index === nextIndex);
    });

    if (counter) {
        counter.textContent =
            (nextIndex + 1) + " / " + slides.length;
    }
}

document.getElementById("platformAccessBtn").addEventListener("click", function () {

    const ownerLogin = document.getElementById("ownerLogin");

    ownerLogin.style.display = "block";

    ownerLogin.scrollIntoView({
        behavior: "smooth"
    });

});

document.getElementById("ownerLogoutBtn").addEventListener("click", async function () {

    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        alert("Unable to log out. Please try again.");
        return;
    }

    document.getElementById("ownerAdmin").style.display = "none";
    document.getElementById("ownerLogin").style.display = "none";

    window.currentCouple = null;
    window.currentInvitation = null;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    alert("You have successfully logged out.");

});




// =====================================
// RESTORE EXISTING LOGIN SESSION
// =====================================

async function restoreExistingSession() {

    const { data: { session }, error } =
        await supabaseClient.auth.getSession();

    if (error || !session) {
        return;
    }

    const user = session.user;

    try {

        // FIRST: Check if the user is an Owner Admin
        const { data: adminRecord, error: adminError } =
            await supabaseClient
                .from("platform_admins")
                .select("user_id")
                .eq("user_id", user.id)
                .maybeSingle();

        if (adminError) {
            console.error("Admin session check failed:", adminError);
            return;
        }

        if (adminRecord) {

            document.getElementById("ownerLogin").style.display = "none";
            document.getElementById("ownerAdmin").style.display = "block";

            loadAdminCouples();

            return;
        }

        // SECOND: Check if the user is a Couple
        const { data: couple, error: coupleError } =
            await supabaseClient
                .from("couples")
                .select("*")
                .eq("owner_user_id", user.id)
                .maybeSingle();

        if (coupleError) {
            console.error("Couple session check failed:", coupleError);
            return;
        }

        if (!couple) {
            return;
        }

        // Load the couple's invitation
        const { data: invitation, error: invitationError } =
            await supabaseClient
                .from("invitations")
                .select("*")
                .eq("couple_id", couple.id)
                .maybeSingle();

        if (invitationError || !invitation) {
            console.error("Invitation restoration failed:", invitationError);
            return;
        }

        window.currentCouple = couple;
        window.currentInvitation = invitation;

        renderCoupleDashboard(couple, invitation);
        updateNavigation();

        document.getElementById("coupleLogin").style.display = "none";
        document.getElementById("coupleDashboard").style.display = "block";

    } catch (error) {
        console.error("Session restoration error:", error);
    }
}

// Restore session when the page loads
restoreExistingSession();
