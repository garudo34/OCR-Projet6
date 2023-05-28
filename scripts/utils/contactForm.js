function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.visibility = "visible";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.visibility = "hidden";
}

function sendMessage(event) {
    event.preventDefault()
    for (let element of event.target.elements) {
        if (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea') {
            console.log(element.value)
            element.value = ''
        }
    }
    closeModal()
}