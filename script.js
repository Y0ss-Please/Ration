/**
 * Welcome to script.js. Please enjoy your stay.
 * 
 * Casey Elzinga // casey@tired.dog // 2020
 * 
 * Thanks.
 */

// ---
// const paramPage has been set in index.php
// ---

class Navigation {
    /**
     * Populates the navigation bar with links based on the id="main" elements children with class="page"
     * Uses push/popstate to control history behavior
     * Adds "active" class to make pages appear
     */

    page; // The current page
    pages = []; // Names of the pages
    pageElements = []; // List of elements with the class 'page-container' that are children of main.
    navElements = []; // The elements in the navigation bar

    constructor() {

        this.mainView = document.getElementById('main')
        
        const mainChildren = this.mainView.children
        for (let i = 0; i < mainChildren.length; i++){
            if (mainChildren[i].classList.contains('page-container') && mainChildren[i].getAttribute('data-page')) {
                this.pageElements.push(mainChildren[i])
                this.pages.push(mainChildren[i].getAttribute('data-page'))
            }
        }

        this.build_links()

        this.observer = new IntersectionObserver((entires, observer) => {
            const observedPage = this.intersection(entires)
            if (observedPage) {
                this.set_active_page(observedPage)
                history.replaceState(observedPage, '', observedPage)
            }
        },{
            root: this.mainView,
            rootMargin: '0%',
            threshold: 0.5
        })
        const triggers = document.querySelectorAll('.intersection-trigger')
        triggers.forEach((trigger) => this.observer.observe(trigger) )
    }

    build_links() {
        // Make the navigation elements
        const navItemContainer = document.getElementById('nav-item-container')
        const fragment = document.createDocumentFragment()

        this.pages.forEach((page) => {
            const div = document.createElement('div')
            div.textContent = page.toUpperCase();
            div.setAttribute('data-page', page);
            div.classList.add('nav-item');

            this.navElements.push(div);

            div.addEventListener('click', () => { this.goto_page(page) });

            fragment.appendChild(div);
        })
        
        navItemContainer.innerHTML = ''
        navItemContainer.appendChild(fragment);
    }

    goto_page(page = 'home', pushState = true, smooth = true) {

        setTimeout(() => { // 0 millisecond timeout to trick Chrome into properly setting 'document'
            if (!page) {
                page = 'home'
            }
    
            this.page = page
            this.set_active_page(page)
            
            const target = document.querySelector('div[data-page="' + page + '"].page-container')
            target.scrollIntoView({behavior: (smooth ? 'smooth' : 'auto'), block: 'start', inline: 'end'})
    
            if (pushState) {
                history.pushState(page, 'Tired Dog | ' + page, page)
            }
    
            page_changed(page)
        }, 0)

    }

    set_active_page(page) {
        const activatables = [this.pageElements, this.navElements]
    
            activatables.forEach((activatable) => {
                activatable.forEach((element) => {
                    if (element.getAttribute('data-page') === page) {
                        element.classList.add('active')
                    } else {
                        element.classList.remove('active')
                    }
                })
            })
    }

    intersection(entries) {
        if (entries[0].isIntersecting) {
            return entries[0].target.getAttribute('data-page')
        } else {
            return false;
        }
    }
}

// --- PAGE FUNCTIONS --- //

function form_submit(e) {
    e.preventDefault()
    
    const formPage = document.querySelector('div[data-page="contact"].page')
    oldFormPage = formPage.cloneNode(true)
    formPage.innerHTML = ''
    add_hero(formPage, 'CONTACT', 'MESSAGE', undefined, ['SENDING', 'MAILING', 'DISPATCHING', 'REMITTING', 'SENDING'])

    form = new FormData(e.target)
    form.append('js', true)

    xhr = new XMLHttpRequest()
    xhr.open('POST', 'contact.php', true)
    xhr.send(form)

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            const result = this.responseText
            if (result == 'sent') {
                formPage.innerHTML = ''
                add_hero(formPage, 'CONTACT', '', 'I\'ll get back to you soon!', ['SENT!', 'DELIVERED!', 'CONVEYED!', 'FULFILLED!', 'SENT!'])
            } else {
                formPage.innerHTML = ''
                add_hero(formPage, 'ERROR', 'UH OH.', 'Sorry, your message was lost somewhere along the way. Please try again or send your message to <a href="mailto::casey@tired.dog">casey@tired.dog</a>')
            }

            window.addEventListener('click', revert)
        }
    }

    function revert() {
        formPage.innerHTML = oldFormPage.innerHTML
    }
}

function add_hero(target, title = false, tagline = false, content = false, console = false) {
    const fragment = document.createDocumentFragment()

    const hero = document.createElement('div')
    hero.classList.add('hero')

    if (title) {
        const titleEle = document.createElement('div')
        titleEle.classList.add('title')
        titleEle.textContent = title
        hero.appendChild(titleEle)
    }

    if (tagline !== false) {
        const taglineEle = document.createElement('div')
        taglineEle.classList.add('tagline')
        taglineEle.setAttribute('id', 'add_hero' + title)
        taglineEle.textContent = tagline
        hero.appendChild(taglineEle)
    }
    
    if (content) {
        const contentEle = document.createElement('div')
        contentEle.classList.add('content')
        contentEle.innerHTML = content
        hero.appendChild(contentEle)
    }

    fragment.appendChild(hero)
    target.appendChild(fragment)

    if (console) {
        const effect = new ConsoleEffect(tagline, console, document.getElementById('add_hero' + title))
    }
}

function page_changed(page) {
    // callback from Navigation.goto_page()
}

/**
 * 
 * // --- INITIALIZE PAGE --- //
 * 
 */
// Grab some elements
mainEle = document.getElementById('main')

// Set body height for mobile friendly full screen
document.body.style.height = window.innerHeight + 'px';
window.addEventListener('resize', () => document.body.style.height = window.innerHeight + 'px')

//Build navigation
const nav = new Navigation();
if (!nav.pages.includes(paramPage)) {
    paramPage = 'home'
}
nav.goto_page(paramPage, false, false)

// Popstate listener
window.addEventListener('popstate', function(event) {
    nav.goto_page(event.state, false)
});

// Get Started button listener
document.getElementById('get-started')
.addEventListener('click', () => nav.goto_page('contact'))


// Hamburger Menu
const hamburger = document.getElementById('hamburger-menu')
const navbar = document.getElementById('navbar')

hamburger.addEventListener('click', (e) => {
    e.stopImmediatePropagation()
    navbar.style.height = '90vh'
    navbar.style.paddingBottom = '5vh'
    hamburger.style.left = '-50vw'

    navbar.addEventListener('transitionend', open_transition)

    function open_transition() {
        window.addEventListener('click', close_nav)
        navbar.removeEventListener('transitionend', open_transition)
    }
})

close_nav = function() {
    window.removeEventListener('click', close_nav)
    navbar.style.height = '0'
    navbar.style.paddingBottom = '0'

    navbar.addEventListener('transitionend', close_transition)

    function close_transition() {
        hamburger.style.left = '0'
        navbar.removeEventListener('transitionend', close_transition)
    }
}

// Make it so the mobile keyboard doesn't break the page
const keyboardSpacer = document.getElementById('keyboard-spacer')
const contactMessage = document.getElementById('contact-message')
document.body.addEventListener("focus", event => {
    if (window.innerWidth <= 740) {
        const target = event.target;
        switch (target.tagName) {
        case "INPUT":
        case "TEXTAREA":
            keyboardSpacer.style.height = '100vh'
            contactMessage.style.height = contactMessage.scrollHeight + 'px'
        }
    }
}, true);

document.body.addEventListener("blur", () => {
    keyboardSpacer.style.height = '0'
}, true); 