import Typewritter from "./Plugin/plugin";
let setting = {
    typingSpeed : 100,
    pauseSpeed:60,
    loop:true
}
let demo = new Typewritter(document.querySelector('#app')!,setting);
demo.typingText("Hello")
.pauseFor(50)
.deleteAll(100)
.typingText("My Name is Aman")
.deleteAll(100)
.deleteChar(10)
.typingText("What the fuck is this ?")
.deleteAll(100)
.typingText("Javascript is Amazing")
.deleteAll(100)
.start();