const navButton = document.querySelector(".navButton");
const navbar = document.querySelector("nav");
const projectsInfoButton = document.querySelectorAll(".projectInfo");
const popUpWindow = document.querySelector("#Modal_Window");
let closePopUpWindowButton = document.querySelector("#closeWindow");
const pages = {
    "home-page": "#Home",
    "about-page": "#About",
    "portfolio-page": "#Portfolio",
    "contact-page": "#ContactPage",
};
let currentPage = document.querySelector("#Home");
let currentProject = {};

const getListOfString = (strings) => {
    let techniques = strings.split(",");
    if (techniques.length > 0 && techniques[0] != "") {
        techniques = techniques.map((tech) => {
            return tech.trim();
        });
        return techniques;
    }
    return [];
};

const getIcons = (iconNames, frontEnd = true) => {
    let techniques = getListOfString(iconNames);
    if (techniques.length > 0) {
        let result = "<h4>Frontend</h4>";
        if (!frontEnd) {
            result = "<h4>Other Techniques</h4>";
        }
        result += techniques
            .map((tech) => {
                return `<li><span class="iconify" data-icon="akar-icons:${tech.toLowerCase()}-fill"></span><small>${tech}</small></li>`;
            })
            .join(" ");
        return result;
    }
    return "";
};

const getBackEndIcons = (backend) => {
    let databases = ["MySQL", "PostgreSQL"];
    let techniques = getListOfString(backend);
    if (techniques.length > 0) {
        let result = "<h4>Backend</h4>";
        result += techniques
            .map((tech) => {
                if (databases.includes(tech)) {
                    return `<li><span class="iconify" data-icon="logos:${tech.toLowerCase()}"></span><small>${tech}</small></li>`;
                }
                return `<li><span class="iconify" data-icon="akar-icons:${tech.toLowerCase()}-fill"></span><small>${tech}</small></li>`;
            })
            .join(" ");
        return result;
    }
    return "";
};

const updatePopupHTML = () => {
    popUpWindow.innerHTML = `
	<div class="modal-content">
        <button id="closeWindow"><span class="iconify" data-icon="fontisto:close-a"></span></button>
        <figure>
            <img
                src="${currentProject.image_2}"
                alt="Project Image"
            />
            <ul class="summary">
                <li>
                    Projectsname:
                    <span>${currentProject.name}</span>
                </li>
                <li>Type: <span>${currentProject.type}</span></li>
                <li>Date it was created: <span>${
                    currentProject.date_created
                }</span></li>
                <li class="description">
                    <h3>Description</h3>
                    <p>
                        ${currentProject.description}
                    </p>
                    <a href="${
                        currentProject.url
                    }" class="btn" target="_blank">Visit the website &nbsp; </a>
                </li>
            </ul>
        </figure>
        <div class="techniques">
            <h3>Techniques used in this project:</h3>
            <ul>
				${getIcons(currentProject.frontEnd_techniques)}
                ${getBackEndIcons(currentProject.backEnd_techniques)}
				${getIcons(currentProject.other_techniques, false)}
            </ul>
        </div>
    </div>
	`;
    closePopUpWindowButton = document.querySelector("#closeWindow");
    updateEvents();
};

const onHashChange = (e) => {
    e.preventDefault();
    let hash = window.location.hash.substr(1);
    if (hash == "" || !(hash in pages)) {
        hash = "home-page";
    }

    for (const [key, value] of Object.entries(pages)) {
        if (key === hash) {
            currentPage = document.querySelector(value);
            currentPage.classList.remove("hide");
            currentPage.scrollIntoView();
        } else {
            document.querySelector(value).classList.add("hide");
        }
    }
    if (document.querySelector(".message")) {
        const message = document.querySelector(".message");
        if (!message.classList.contains("hide")) {
            setTimeout(() => {
                message.classList.add("hide");
            }, 3000);
        }
    }
};

const updateEvents = () => {
    closePopUpWindowButton.addEventListener("click", () => {
        popUpWindow.style.display = "none";
    });
};

// List of sentences
const content = [
    "Full stack developer",
    "Front End Developer",
    "Backend Developer",
];

var _PART = 0;

// Character number of the current sentence being processed
var _PART_INDEX = 0;

// Holds the handle returned from setInterval
var _INTERVAL_VAL;

// Element that holds the text
var _ELEMENT = document.querySelector("#text");

// Cursor element
var _CURSOR = document.querySelector("#cursor");

// Implements typing effect
function Type() {
    // Get substring with 1 characater added
    var text = content[_PART].substring(0, _PART_INDEX + 1);
    _ELEMENT.innerHTML = text;
    _PART_INDEX++;

    // If full sentence has been displayed then start to delete the sentence after some time
    if (text === content[_PART]) {
        // Hide the cursor
        _CURSOR.style.display = "none";

        clearInterval(_INTERVAL_VAL);
        setTimeout(function () {
            _INTERVAL_VAL = setInterval(Delete, 50);
        }, 1000);
    }
}

// Implements deleting effect
function Delete() {
    // Get substring with 1 characater deleted
    var text = content[_PART].substring(0, _PART_INDEX - 1);
    _ELEMENT.innerHTML = text;
    _PART_INDEX--;

    // If sentence has been deleted then start to display the next sentence
    if (text === "") {
        clearInterval(_INTERVAL_VAL);

        // If current sentence was last then display the first one, else move to the next
        if (_PART == content.length - 1) _PART = 0;
        else _PART++;

        _PART_INDEX = 0;

        // Start to display the next sentence after some time
        setTimeout(function () {
            _CURSOR.style.display = "inline-block";
            _INTERVAL_VAL = setInterval(Type, 100);
        }, 200);
    }
}

// Start the typing effect on load
_INTERVAL_VAL = setInterval(Type, 100);

projectsInfoButton.forEach((button) => {
    button.addEventListener("click", (e) => {
        const projectID = e.currentTarget.dataset.projectId;
        fetch(`https://www.ismailnijazi.com/project/${projectID}`).then(
            (response) => {
                response.json().then((data) => {
                    currentProject = data;
                    var options = {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    };

                    let date = new Date(data.date_created);
                    currentProject.date_created = date.toLocaleDateString(
                        "en-US",
                        options
                    );
                    updatePopupHTML();
                });
            }
        );
        popUpWindow.style.display = "block";
    });
});

const init = () => {
    window.addEventListener("load", onHashChange);
    navButton.addEventListener("click", () => {
        navbar.classList.toggle("hiddenNavbar");
    });
    document.querySelector("main").addEventListener("click", () => {
        navbar.classList.add("hiddenNavbar");
    });
    window.addEventListener("hashchange", onHashChange);
};

init();
