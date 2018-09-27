class MemoryGamePROGRESS {
    
    constructor(app, arr) {
        
        // pass the main app div to property
        this.app = document.getElementById(app)
        
        // I. Get full array coming into constrctor method
        this.arr = arr
        
        // PLAY button calls initGame() method when clicked
        this.playBtn = document.getElementById('play-btn');
        this.playBtn.addEventListener('click', this.initGame.bind(this))
        
        // div for displaying feedback messages during game
        this.msgBox = document.getElementById('msg-box')
        
        // footer that holds the score and timer
        this.footer = document.querySelector('footer')
        
        // an array to keep track of choices for comparison (2 at a time)
        this.choicesArr = []
        
    } // close constructor()
            
    initGame() { // runs when user clicks PLAY
                
        // II. Scramble (Randomize) array
        this.arr.sort((a, b) => 0.5 - Math.random())
        
        // III. Take the exact number of array items that you need for the game
        let gameSize = document.getElementById('chooser').value
        gameSize = Number(gameSize)
        
        // make a new array with a slice of the needed size, starting at index 0
        let gameArr = this.arr.slice(0, gameSize)

        // IV. Double the array for matching game play (must have pairs)
        gameArr = [...gameArr, ...gameArr]

        // V. Randomize again, but this time using a different way, with temp var:
        for(let i = 0; i < gameArr.length; i++) {

            let tempy = gameArr[i]
            let rando = Math.floor(Math.random() * gameArr.length)
            gameArr[i] = gameArr[rando]
            gameArr[rando] = tempy
            
        } // end randomizer loop
        
        // VI. Scramble it again, just to be safe, using sort() again
        gameArr.sort((a, b) => 0.5 - Math.random())
                
        // VII, VIII: loop to make clickable images w name and ID properties
        for(let i = 0; i < gameArr.length; i++) {

            let pic = new Image()
            pic.src = `images/final/200x200/${gameArr[i]}.jpg`
            // pic calls showPic method on click
            pic.addEventListener('click', this.showPic.bind(this))
            // set pic class to "pics"
            pic.className = "pics"
            // assign name property ("cat", "car", etc)
            pic.name = gameArr[i] // "anchor" or whatever
            // give each pic a unique ID
            pic.id = i
            // output the image to the app div
            this.app.appendChild(pic)
            
        } // end image-maker loop
        
        this.msgBox.innerHTML = 'HIDING ALL IMAGES IN <span id="countdown" style="color:red; font-size:2rem">5</span>'
        
        let countdownInterval = setInterval(function() {
            
            // update the countdown span tag number
            let countdown = document.getElementById('countdown')
            let countdownValue = countdown.innerHTML
            countdownValue = Number(countdownValue)
            countdownValue-- // reduce by 1 second
            countdown.innerHTML = countdownValue
            
            // when the countdown reaches zero, stop it
            if(countdownValue == 0) {
                clearInterval(countdownInterval)
            }
            
        }, 1000)
        
        // hide the images after 6.5 sec
        setTimeout(function() {
        
//            // hide all images (set img src to blank.png)
//            let imgArr = document.querySelectorAll('img')
//            for(let i = 0; i < imgArr.length; i++) {
//                imgArr[i].src = "images/blank.png"
//            }
//          // this also hides all pics, w/o first "grabbing them" from DOM:
            for(let i = 0; i < gameArr.length; i++) {
                this.app.children[i].src = "images/blank.png"
            }
        
        }, 6500) // countdown briefly reads "0" before all pics are hidden 

    } // end initGame()
    
    showPic() { // runs on any image click
        
        // restore JPG as source of just-clicked img element:
        event.target.src = "images/final/200x200/" + event.target.name + ".jpg"
        
        this.choicesArr.push(event.target) // push current img element into array
        
        // IF array contains 2 items, we need to see if they match:
        if(this.choicesArr.length == 2) {
                        
            // Do the image names match? ("cat" == "cat")..?
            if(this.choicesArr[0].name == this.choicesArr[1].name) {
                
                // The names match, so great! But..
                // IF ID's also match, that's bad.. means it's the same item twice
                if(this.choicesArr[0].id == this.choicesArr[1].id) {
                    
                    // Player clicked the same pic twice! Hide the first pic in the array. Since both pics are the same, we only need to hide one ...
                    
                    this.msgBox.innerHTML = '<span style="color:red">Oops! You Clicked the <br/>Same Pic Twice!</span>'

                    setTimeout(() => { // wait before hiding twice-clicked pic
                        this.choicesArr[0].src = "images/blank.png"
                        this.msgBox.innerHTML = 'Please Try again!'
                        this.choicesArr = []
                    }, 750)

                } else { // Names match, but ID's don't--great! That's a Match!
                   
                    // Don't hide pics. Leave them visible. Give positive feedback:
                    this.msgBox.innerHTML = "Congrats! That's a Match!"
                    this.choicesArr = []
                   
                } // end if(this.choicesArr[0].id == this.choicesArr[1].id)
                
            } else { // names do not match ("cat" != "car"), so hide them both
                
                // after delay, hide the mismatch, first one pic, then the other
                // must use fat-arrow for setTimeout or it won't work
                this.msgBox.innerHTML = 'Oops! Try Again!'
                
                // wait before hiding 1st pic
                setTimeout(() => { 
                    
                    this.choicesArr[0].src = "images/blank.png"
                    
                }, 750)

                // wait a little longer before hiding 2nd pic
                setTimeout(() => { 
                    
                    this.choicesArr[1].src = "images/blank.png"
                    this.choicesArr = []
                    
                }, 1250)

                              
            } // end if(this.choicesArr[0].name == this.choicesArr[1].name)
            
        } // end if(this.choicesArr.length == 2)
        
    } // end showPic()
    
} // close class MemoryGame




