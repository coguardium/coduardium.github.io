let PracticeText = (function() {
    let container;
    let repo = {
        "quotes": "https://api.quotable.io/random"
    }
    function practiceText(selector) {
        let elem = document.querySelector(selector);
        if(elem) {
            container = elem;
        } else {
            throw(`Error: ${selector} does not exist.`)
        }
    }
    practiceText.prototype.generateText = (type = "quotes") => {
        return fetch(repo[type])
            .then(response => response.json())
            .then(data => {
                container.innerHTML = "";
                data.content.split("").forEach(char => {
                    let charSpan = document.createElement("span");
                    charSpan.innerHTML = char;
                    container.appendChild(charSpan);
                });
            }).catch(err => console.log("Error: Network not found. Please ensure that you are connected to internet.", err))
        //container.innerHTML = es_2015_keywords;
    }
    return practiceText;
})();

let Editor = (function() {
    let pad;
    let text;
    let textSpanArray;
    let correct_entries;
    let incorrect_entries;
    let fixed_mistakes;
    let total_words;
    let incorrect_words;
    let practice_text;
    function editor(editorSelector, textContainerSelector) {
        let elem = document.querySelector(editorSelector);
        let textContainer = document.querySelector(textContainerSelector);
        if(textContainer) {
            text = textContainerSelector;
            textSpanArray = textContainer.querySelectorAll("span");
        } else {
            throw(`Error: ${textContainerSelector} does not exist.`)
        }
        if(elem) {
            pad = elem;
            init();
        } else {
            throw(`Error: ${selector} does not exist.`)
        }
    }
    function init() {
        correct_entries = 0;
        incorrect_entries = 0;
        fixed_mistakes = 0;
        total_words = [];
        incorrect_words = [];
        setKeydownHandler();
        practice_text = new PracticeText(text);
    }
    function load() {
        pad.value = null;
        practice_text.generateText().then(() => {
            textSpanArray = document.querySelector(text).querySelectorAll("span");
            let timer = new Timer("#seconds");
        });
        console.log("loaded")
    }
    function setKeydownHandler() {
        pad.addEventListener("keydown", (e) => {
            let ctrlEnter = e.ctrlKey && e.keyCode == 13;
            let shiftEnter = e.shiftKey && e.keyCode == 13;
            if(ctrlEnter || shiftEnter) {
                load();
            }
        });
        pad.addEventListener("input", (e) => {
            let charArr = pad.value.split("");
            textSpanArray.forEach((item, index) => {
                let char = charArr[index];
                if(!char) {
                    textSpanArray[index].classList.remove("incorrect");
                    textSpanArray[index].classList.remove("correct");
                } else if(char == item.innerHTML) {
                    textSpanArray[index].classList.remove("incorrect");
                    textSpanArray[index].classList.add("correct");
                } else {
                    textSpanArray[index].classList.add("incorrect");
                    textSpanArray[index].classList.remove("correct");
                }
            });
        });
    }
    return editor;
})()

let Timer = (function() {
    let start_time;
    let clear_timer;
    let seconds_elapsed_display;
    function timer(timer_selector) {
        start_time = new Date();
        seconds_elapsed_display = timer_selector;
        init();
    }
    function init() {
        clear_timer = setInterval(() => {
            document.querySelector(seconds_elapsed_display).innerHTML = Math.floor((new Date() - start_time) / 1000);
        }, 1000)
    }
    return timer;
})()

let sample_text = new PracticeText("#cue_text");
sample_text.generateText().then(() => {
    let ed = new Editor("#cue_input", "#cue_text");
    let timer = new Timer("#seconds");
});