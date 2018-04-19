const cookieLink = "URL" // URL page cookies condition
const cookieText = `Utilizamos cookies para mejorar nuestros servicios. Si continua navegando, acepta su uso. Puede cambiar la configuración u obtener más información <a href='${cookieLink}' target='_blank'>aquí</a>.` // Text for alert
const scrollLimit = 600 // Scroll size for accept cookies and hide alert
let hideAlertCookie = false // Boolean control hide alert

function checkCookiesAcepted() {
    if (window.localStorage.getItem("cookieAcepted") != "true") {
        displayAlert()
    } else {
        hideAlertCookie = true
    }
}

function acceptCookies() {
    if (!hideAlertCookie) {
        window.localStorage.setItem("cookieAcepted", true)
        hideAlertCookie = true
        document.getElementById("cookieAlert").remove()
        window.removeEventListener('scroll', scrollPage)
    }
}

function displayAlert() {
    let alertDiv = document.createElement("div")
    alertDiv.classList.add("cookieAlert")
    alertDiv.id = "cookieAlert"

    let p = document.createElement("p")
    p.innerHTML = cookieText
    alertDiv.appendChild(p)

    let btn = document.createElement("button")
    btn.type = "button"
    btn.onclick = acceptCookies
    btn.innerText = "Acepto"
    alertDiv.appendChild(btn)

    let style = document.createElement("style")
    style.innerHTML = ".cookieAlert {position:fixed; bottom:0; left:0; background:white; display:block; border-top:1px solid #ccc; border-right:1px solid #ccc; padding:5px 10px 10px 10px; z-index:1; width:80%; border-top-right-radius:3px;} .cookieAlert p {display:inline-block; width:90%; margin:0; font-size:14px;} .cookieAlert button {float:right; display:block; background:transparent; border:1px solid #999; border-radius:15px; padding:2px 10px; max-width:20%;}"
    alertDiv.appendChild(style)
    document.body.appendChild(alertDiv)
}

function scrollPage() {
    if (document.documentElement.scrollTop >= scrollLimit) {
        acceptCookies()
    }
}

function init() {
    checkCookiesAcepted()
    if (!hideAlertCookie) {
        window.addEventListener('scroll', scrollPage)
    }
}

init()
