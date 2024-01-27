const userEmail = document.querySelector('input[name="email"]');
const userMessage = document.querySelector('textarea[name="message"]');

const loadFormData = () => {
    const userInputData = localStorage.getItem('feedback-form-state');
    if (userInputData) {
        const parsedData = JSON.parse(userInputData);
        userEmail.value = parsedData.email || "";
        userMessage.value = parsedData.message || "";
    }
};

const saveFormData = () => {
    const email = userEmail.value.trim();
    const message = userMessage.value.trim();
    let formData = JSON.parse(localStorage.getItem("feedback-form-state")) || {};

    if (email !== "" || message !== "") {
        formData.email = email;
        formData.message = message;
    } else {
        delete formData.email;
        delete formData.message;
    }
    localStorage.setItem("feedback-form-state", Object.keys(formData).length ? JSON.stringify(formData) : "");
};

const onSubmit = (event) => {
    event.preventDefault();
    const email = userEmail.value.trim();
    const message = userMessage.value.trim();
    if (email && message) {
        console.log({ email, message });
        localStorage.removeItem('feedback-form-state');
        userEmail.value = "";
        userMessage.value = "";
    } else {
        alert("Both email and message fields must be filled in");
    }
};

const feedbackForm = document.querySelector('.feedback-form');

feedbackForm.addEventListener("submit", onSubmit);
feedbackForm.addEventListener("input", saveFormData);

loadFormData();