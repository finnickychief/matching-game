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
        
    } // end initGame()
    
    showPic() {
        alert("Name: " + event.target.name + " ID: " + event.target.id)
    } // end showPic()
    
} // close class MemoryGame




