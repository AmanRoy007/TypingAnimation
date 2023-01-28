
type functionQueue = () => Promise<void>;
export default class Typewritter {

    #functionQueue: functionQueue[] = [];
    htmlElement: HTMLElement;
    loop: boolean;
    typingSpeed: number;
    pauseSpeed: number;

    constructor(htmlElement: HTMLElement, { loop = false, typingSpeed = 50, pauseSpeed = 60 }) {
        this.htmlElement = htmlElement;
        this.loop = loop;
        this.typingSpeed = typingSpeed;
        this.pauseSpeed = pauseSpeed;
    }

    // typing text 
    typingText(string: string) {
        this.#addToFunctonList(() => {
            return new Promise(resolve => {
                let i = 0;
                let interValId = setInterval(() => {
                    this.htmlElement.textContent += string[i];
                    i++;
                    if (i >= string.length) {
                        clearInterval(interValId)
                        resolve();
                    }

                }, this.typingSpeed)

            });
        })
        return this;
    }

    // pauseFor 
    pauseFor(pauseSpeed: number) {
        this.#addToFunctonList(() => {
            return new Promise(resolve => {
              setTimeout(resolve, pauseSpeed);
            });
          });
        return this;
    }

    // deleteChar
    deleteChar(number: number) {
        this.#addToFunctonList(() => {
            return new Promise(resolve => {
                let i = 0;
                let interValId = setInterval(() => {
                    this.htmlElement.textContent = this.htmlElement.innerText.substring(0, number);
                    i++;
                    if (i >= this.htmlElement.innerText.length) {
                        clearInterval(interValId)
                        resolve();
                    }
                }, number)
            });
        });
        return this;
    }

    // deleteAll
    deleteAll(number = this.typingSpeed) {
        this.#addToFunctonList(() => {
            return new Promise(resolve => {
                let i = 0;
                let interValId = setInterval(() => {
                    this.htmlElement.textContent = this.htmlElement.innerText.substring(this.htmlElement.innerText.length);
                    i++;
                    if (i >= this.htmlElement.innerText.length) {
                        clearInterval(interValId)
                        resolve();
                    }

                }, number)
            });
        })
        return this;
    }


    // start
    async start() {
        for (const cb of this.#functionQueue) {
            console.log(cb);
            await cb();
        }
    }

    #addToFunctonList(callBack: () => Promise<void>) {
        this.#functionQueue.push(callBack);
    }
}