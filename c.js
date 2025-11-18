document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("form-input");
    const button = document.getElementById("form-button");
    const para = document.getElementById("form-text");
    const form = document.getElementById("my-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // ← не стандартный поток типа не перезагружай сайт после отправки

        const value = input.value.trim();

        if (value !== "") {
            
            para.textContent = value; 
            input.value = "";
        }
    });
});
function toggleText(id) {
    let text = document.getElementById(id);

    if (text.style.display === "none" || text.style.display === "") {
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
}
//CapEducation
