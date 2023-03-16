import "./index.html";
import "./styles/reset.css";
import "./styles/styles.sass";

const NAME_TOO_SHORT = "Слишком короткое имя";
const TEXT_EMPTY = "Комментарий не должен быть пустым";
const DATE_INCORRECT = "Неправильная дата";

let form = document.querySelector("#comment-form");
form.text.addEventListener("keydown", onEnter);
form.name.addEventListener("focusout", checkName);
form.text.addEventListener("focusout", checkText);
form.date.addEventListener("focusout", checkDate);
form.date.addEventListener("keydown", allowOnlyNumber);
form.addEventListener("submit", onSubmit);

function onEnter(event) {
    if (event.key == "Enter" && !event.shiftKey) {
        event.preventDefault();
        onSubmit(event);
    }
}

function checkName() {
    if (form.name.value.length < 3) {
        showError(form.name, NAME_TOO_SHORT);
    }
}

function checkText() {
    if (form.text.value.length < 1) {
        showError(form.text, TEXT_EMPTY);
    }
}

function checkDate() {
    let date = form.date.value.split(".");
    if (date == "") {
        return;
    }
    let realDate = new Date(date[2], Number(date[1]) - 1, date[0]);
    if (
        date[0] != realDate.getDate() ||
        date[1] != realDate.getMonth() + 1 ||
        date[2] != realDate.getFullYear()
    ) {
        showError(form.date, DATE_INCORRECT);
    }
}

function allowOnlyNumber(event) {
    let specialKeys = ["Enter", "Backspace", "Delete", "Tab"];
    if (specialKeys.includes(event.key)) {
        return;
    }

    let numbers = "0123456789";
    if (!numbers.includes(event.key)) {
        event.preventDefault();
    }
    let length = form.date.value.length;
    if (length == 2 || length == 5) {
        form.date.value += ".";
    }
}

function showError(target, error) {
    if (target.nextElementSibling.classList.contains("comment-form__tooltip")) {
        return;
    }
    let tooltip = document.createElement("div");
    tooltip.classList.add("comment-form__tooltip");
    tooltip.innerHTML = error;
    target.after(tooltip);
    target.addEventListener("input", hideError);
}

function hideError(event) {
    let target = event.target;
    let tooltip = target.nextElementSibling;
    tooltip.remove();
    event.target.removeEventListener("input", hideError);
}

function onSubmit(event) {
    event.preventDefault();
    checkName();
    checkText();
    checkDate();
    let tooltips = form.querySelectorAll(".comment-form__tooltip");
    if (tooltips.length != 0) {
        return;
    }

    let name = form.name.value;
    let text = form.text.value;
    let date = prettifyDate(form.date.value);
    addComment(name, text, date);
    form.reset();
}

function prettifyDate(date) {
    let now = new Date();
    let hour = addZeroToTime(now.getHours().toString());
    let mins = addZeroToTime(now.getMinutes().toString());
    let time = `${hour}:${mins}`;
    let tomorrow = now;
    tomorrow.setDate(now.getDate() + 1);
    let dateCopy = date.split(".");
    dateCopy = new Date(dateCopy[2], dateCopy[1] - 1, dateCopy[0]);
    let isTomorrow =
        dateCopy.getFullYear() == tomorrow.getFullYear() &&
        dateCopy.getMonth() == tomorrow.getMonth() &&
        dateCopy.getDate() == tomorrow.getDate();
    let isToday =
        dateCopy.getFullYear() == now.getFullYear() &&
        dateCopy.getMonth() == now.getMonth() &&
        dateCopy.getDate() == now.getDate();
    if (date == "" || isToday) {
        return `сегодня, ${time}`;
    }
    if (isTomorrow) {
        return `вчера, ${time}`;
    }
    return `${date}, ${time}`;
}

function addZeroToTime(str) {
    if (str.length < 2) {
        return "0" + str;
    }
    return str;
}

function addComment(name, text, date) {
    let commentHTML = `<div class="comment">
        <div class="comment__info">
            <div>
                <div class="comment__name"></div>
                <div class="comment__date"></div>
            </div>
            <span
                class="comment__delete-icon material-symbols-outlined"
            >
                delete
            </span>
        </div>
        <div class="comment__text"></div>
        <div class="comment__like">
            <span
                class="comment__like-icon material-symbols-outlined"
            >
                favorite
            </span>
            <span>Нравится</span>
        </div>
    </div>`;
    let comments = document.querySelector(".comments");
    comments.insertAdjacentHTML("beforeend", commentHTML);

    let comment = comments.lastElementChild;
    let cName = comment.querySelector(".comment__name");
    let cText = comment.querySelector(".comment__text");
    let cDate = comment.querySelector(".comment__date");
    let deleteBtn = comment.querySelector(".comment__delete-icon");
    let likeBtn = comment.querySelector(".comment__like");
    cName.innerHTML = name;
    cText.innerHTML = text;
    cDate.innerHTML = date;
    deleteBtn.addEventListener("click", deleteComment);
    likeBtn.addEventListener("click", likeComment);
}
function deleteComment(event) {
    let target = event.target.closest(".comment");
    target.remove();
}

function likeComment(event) {
    let target = event.target.closest(".comment__like");
    target.classList.toggle("comment__like_pressed");
}
