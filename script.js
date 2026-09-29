
function create(tag, container, text=null){
    let element = document.createElement(tag)
    if (text)
        element.innerText = text
    container.appendChild(element)
    return element
}
const date = new  Date();
let hour = date.getHours();
const html = document.querySelector('html')
let language = html.lang 
console.log(language)
 

commoditer = document.querySelector("h1")

if (language == "en"){

    if (hour <= 6 || hour > 20 ) {
        commoditer.textContent = "You don't have to be there at this time !!!";
    }
    else if (hour > 6 && hour < 12)
    {
        commoditer.textContent = "GoodMorning !";
    }
    else if (hour >= 12 && hour < 18)
    {
        commoditer.textContent = "GoodAfternoon !";
    }
    else
    {
        commoditer.textContent = "GoodEvening !";
    }
}else if (language == "fr"){
    if (hour <= 6 || hour > 20 ) {
        commoditer.textContent = "Que fait-tu ici !!!";
    }
    else if (hour > 6 && hour < 12)
    {
        commoditer.textContent = "Bonjour !";
    }
    else if (hour >= 12 && hour < 18)
    {
        commoditer.textContent = "Bon après-midi !";
    }
    else
    {
        commoditer.textContent = "Bonsoir !";
    }
}
            
const sidebarToggleBtn = document.getElementById('sidebar-toggle');
const sidebar = document.querySelector('.sidebar');

sidebarToggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

const links = document.querySelectorAll('.sidebar a');
links.forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });
});

document.querySelector("#en").addEventListener("click", () => {
    window.location.href = "index.html";
})
document.querySelector("#fr").addEventListener("click", () => {
    window.location.href = "indexFR.html";
})