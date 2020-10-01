class ConsoleEffect {
    /**
     * Reconfigures the target div to support console typing effect
     * Types out the string given in "fixed"
     * Will type out, wait, and then backspace each value in the "dynamic" array
     * leaves last dynamic value showing
     */
    fixed;
    dynamic = []
    target;

    fixedWidth = 0
    dynamicWidth = 0

    typeSpeed = 112

    loop = false
    looped = false

    constructor(fixed, dynamic, target, loop = false) {
        this.fixed = fixed ? fixed + '\u00A0' : fixed
        this.dynamic = dynamic
        this.target = target
        this.loop = loop

        this.get_widths()
        
        target.innerHTML = ''
        target.textContent = '// '

        if (this.fixed) {
            this.fixedTarget = this.build_containers(target, this.fixedWidth)
        }
        if (this.dynamic) {
            this.dynamicTarget = this.build_containers(target, this.dynamicWidth)
        }

        this.blinker()
        this.start()

        window.addEventListener('resize', () => {
            this.resize()
        })
    }

    async start() {

        if (this.looped === false) {
            if (this.fixed) {
                await this.type(this.fixed, this.fixedTarget)
                this.dynamicTarget.parentNode.appendChild(this.blinker)
            }
        }
        let i;
        for(i=0; i<this.dynamic.length; i++) {
            await this.type(this.dynamic[i], this.dynamicTarget)
            if (i != this.dynamic.length - 1) {
                await this.pause(1500)
                await this.backspace(this.dynamic[i], this.dynamicTarget)
            }
        }

        if (this.loop) {
            await this.pause(1500)
            await this.backspace(this.dynamic[i-1], this.dynamicTarget)
            this.start()
            this.dynamicTarget.innerHTML = ''
        }
    }

    async type(word, target) {
        let i = 0
        let intervalId;

        let promise = new Promise((resolve, reject) => {
            intervalId = setInterval(() => {
                target.textContent += word.charAt(i)
                if (i >= word.length) {
                    clearInterval(intervalId)
                    resolve()
                }
                i++
            }, this.typeSpeed)
        })

        return await promise     
    }

    async backspace(word, target) {
        parent = this
        let i = 0
        let intervalId;

        let promise = new Promise((resolve, reject) => {
            intervalId = setInterval(() => {
                target.textContent = target.textContent.substr(0, (target.textContent.length -1))
                if (i >= word.length - 1) {
                    clearInterval(intervalId)
                    resolve()
                }
                i++
            }, this.typeSpeed)
        })

        return await promise     
    }

    async pause(time) {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(), time)
        })
        return await promise
    }

    blinker() {
        // add a span after after target that contains _ and blinks
        const span = document.createElement('span');
        span.style.display = 'inline-block'
        span.style.position = 'absolute'
        span.textContent = '_'
        
        this.blinker = span
        if (this.fixed) {
            this.fixedTarget.parentNode.appendChild(span)
        } else {
            this.dynamicTarget.parentNode.appendChild(span)
        }
        
        const blink = function(interval, callback) {
            setTimeout(() => {
                if (span.textContent == '_') {
                    span.textContent = ' '
                    callback(350, callback)
                } else {
                    span.textContent = '_'
                    callback(750, callback)
                }
            }, interval)
        }

        blink(500, blink)
    }

    get_widths() {
        // Creates a clone of the target div offscreen and checks how wide the completed words will be
        this.fixedWidth = 0
        this.dynamicWidth = 0

        const testDiv = this.target.cloneNode(false)
        testDiv.style.position = 'absolute'
        testDiv.style.left = '-200vw'
        this.target.parentNode.appendChild(testDiv)

        testDiv.textContent = this.fixed
        this.fixedWidth = testDiv.clientWidth

        this.dynamic.forEach((word) => {
            testDiv.textContent = word + '\u2003'
            if (testDiv.offsetWidth > this.dynamicWidth) {
                this.dynamicWidth = testDiv.offsetWidth
            }
        })

        testDiv.parentNode.removeChild(testDiv)
    }

    build_containers(target, width) {
        const targetContainer = document.createElement('span')
        targetContainer.style.display = 'inline-block'
        targetContainer.style.minWidth = width + 'px'
        target.appendChild(targetContainer)

        const targetInner = document.createElement('span')
        targetInner.style.position = 'relative'
        targetContainer.prepend(targetInner)

        const targetTarget = document.createElement('span')
        targetTarget.style.display = 'inline-block'
        targetTarget.style.minHeight = '1ex'
        targetInner.appendChild(targetTarget)

        return targetTarget
    }

    resize() {
        this.get_widths()
        this.fixedTarget.parentNode.parentNode.style.minWidth = this.fixedWidth + 'px'
        this.dynamicTarget.parentNode.parentNode.style.minWidth = this.dynamicWidth + 'px'
    }
}