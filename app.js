const tabs = document.querySelectorAll(".aboutme-ul > li");
const contents = document.querySelectorAll(".content");
const menuToggle = document.querySelector(".menu-toggle");
const navList = document.querySelector(".nav-ul");
const navLinks = document.querySelectorAll(".nav-ul a");
const themeSwitch = document.querySelector("#theme-switch");
const typedRole = document.querySelector("#typed-role");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        tabs.forEach((item) => item.classList.remove("active"));
        tab.classList.add("active");

        contents.forEach((content) => content.classList.remove("active"));
        const targetClass = tab.dataset.target;
        const target = document.querySelector(`.${targetClass}`);
        if (target) {
            target.classList.add("active");
        }
    });
});

if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => {
        navList.classList.toggle("open");
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navList.classList.remove("open");
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 800) {
            navList.classList.remove("open");
        }
    });
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    if (themeSwitch) themeSwitch.checked = true;
}

if (themeSwitch) {
    themeSwitch.addEventListener("change", () => {
        document.body.classList.toggle("light-mode");
        const isLight = document.body.classList.contains("light-mode");
        localStorage.setItem("theme", isLight ? "light" : "dark");
    });
}

if (typedRole) {
    const roles = [
        "Web Developer",
        "Frontend Developer",
        "JavaScript Enthusiast"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const typeEffect = () => {
        const currentRole = roles[roleIndex];
        if (!deleting) {
            charIndex += 1;
            typedRole.textContent = currentRole.slice(0, charIndex);
            if (charIndex === currentRole.length) {
                deleting = true;
                setTimeout(typeEffect, 1200);
                return;
            }
            setTimeout(typeEffect, 90);
            return;
        }

        charIndex -= 1;
        typedRole.textContent = currentRole.slice(0, charIndex);
        if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeEffect, 250);
            return;
        }
        setTimeout(typeEffect, 45);
    };

    typeEffect();
}
