

const container = document.querySelector('.app');

// CRIANDO ESTRUTURA DA APLICAÇÃO
    const myApp = [
        {
            type: 'fruit',
            msg:'Escolha a Opção Correta',
            path:'./assets/images/fruits',
            structure: [
                { question: 'apple', options:['apple.jpg', 'guava.jpg', 'banana.jpg', 'kiwi.jpg'], key:0},

                { question: 'banana', options:['papaya.jpg', 'guava.jpg', 'banana.jpg', 'kiwi.jpg'], key:2},

                { question: 'guava', options:['apple.jpg', 'guava.jpg', 'banana.jpg', 'kiwi.jpg'], key:1},

                { question: 'kiwi', options:['kiwi.jpg', 'guava.jpg', 'banana.jpg', 'apple.jpg'], key:0},

                { question: 'mango', options:['apple.jpg', 'mango.jpg', 'banana.jpg', 'kiwi.jpg'], key:1},

                { question: 'orange', options:['orange.jpg', 'guava.jpg', 'banana.jpg', 'kiwi.jpg'], key:0},

                { question: 'papaya', options:['orange.jpg', 'guava.jpg', 'papaya.jpg', 'kiwi.jpg'], key:2},
            ]
        },

        {
            type: 'vegetable',
            msg:'Escolha a Opção Correta',
            path:'./assets/images/vegetables',
            structure: [
                { question: 'cabbage', options:['cabbage.jpg', 'carrot.jpg', 'potato.jpg', 'tomato.jpg'], key:0},

                { question: 'potato', options:['cabbage.jpg', 'carrot.jpg', 'potato.jpg', 'tomato.jpg'], key:2},

                { question: 'carrot', options:['carrot.jpg', 'cabbage.jpg', 'potato.jpg', 'tomato.jpg'], key:0},

                { question: 'tomato', options:['cabbage.jpg', 'carrot.jpg', 'potato.jpg', 'tomato.jpg'], key:3},
                
            ]
        },

        {
            type: 'animal',
            msg:'Escolha a Opção Correta',
            path:'./assets/images/animals',
            structure: [
                { question: 'horse', options:['tiger.jpg', 'horse.jpg', 'elephant.jpg', 'lion.jpg'], key:1},
                
                { question: 'goat', options:['goat.jpg', 'tiger.jpg', 'elephant.jpg', 'lion.jpg'], key:0}, 

                { question: 'lion', options:['goat.jpg', 'horse.jpg', 'elephant.jpg', 'lion.jpg'], key:3}, 

                { question: 'elephant', options:['goat.jpg', 'horse.jpg', 'elephant.jpg', 'lion.jpg'], key:2}, 

                { question: 'tiger', options:['tiger.jpg', 'horse.jpg', 'elephant.jpg', 'lion.jpg'], key:0},
            ]
        },
    ]




// CRIANDO SELETOR DE ELEMENTOS
    const select = document.createElement('select');
        select.setAttribute('onchange', 'load(this)')
    for( let i = 0; i < myApp.length; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.innerHTML = myApp[i].type;
        select.appendChild(option)
    }
    document.querySelector('.quiz-box').appendChild(select)



// CRIANDO A CLASS APP
    class App {
        // CRIANDO CONTRUCTOR
        constructor(myApp, container) {
            this.app = myApp;
            this.container = container;
            this.index = 0;
            this.score = 0;
            this.quizSize = this.app.structure.length;
            this.optionSize = this.app.structure[0].options.length;
            this.msgEle = this.container.querySelector('.msg');
            this.quizEle = this.container.querySelector('.quiz');
            this.optionEle = this.container.querySelector('.option-box');
            this.questionNumber = this.container.querySelector('.question-number');
            this.scoreEle = this.container.querySelector('.score-board');
            this.setQuestion();
            this.setOptions();
            this.scoreBoard();
        }

        // LÓGICA PARA VENCER OU PERDER
        setQuestion() {
            this.msgEle.innerHTML = this.app.msg;
            this.quizEle.innerHTML = this.app.structure[this.index].question;
            this.questionNumber.innerHTML = (this.index + 1) + "/" +this.quizSize;
        }

        // CRIANDO AS OPÇÕES
        setOptions() {
            this.optionEle.innerHTML="";
            for(let i = 0; i < this.optionSize; i++) {
                const button = document.createElement("button")
                    button.type = "button";
                    button.id = i;
                const img = document.createElement("img");
                img.src = this.app.path + "/" + this.app.structure[this.index].options[i];
                button.appendChild(img)
                this.optionEle.appendChild(button)

            }
            this.optionClick();
        }

        scoreBoard() {
            this.scoreEle.innerHTML=this.score;
        }
        
        // SCRIT DE ROTEIRO
        optionClick() {
            const that = this;
            const options = this.optionEle.children;
            for(let i = 0; i < options.length; i++) {
                options[i].addEventListener('click', function() {
                    const span = document.createElement('span'); 

                    if(this.id == that.app.structure[that.index].key) {
                        span.innerHTML = "Acertou 😄";
                        this.classList.add('correct')
                        that.score++;
                        that.scoreBoard();
                    }else {
                        span.innerHTML = "Errou 😭";
                        this.classList.add('wrong')                   
                    }
                    this.appendChild(span);

                    for(let j = 0; j < that.optionEle.children.length; j++) {
                        if(this.id == that.optionEle.children[j].id) {

                        }

                        else if(that.optionEle.children[j].id == that.app.structure[that.index].key) {
                            var span2 = document.createElement('span') 
                                span2.innerHTML = "Correta";
                                that.optionEle.children[j].appendChild(span2)
                                that.optionEle.children[j].classList.add('correct') 
                        }
                        else {
                            that.optionEle.children[j].classList.add('hide')
                        }
                    }
                    this.style.pointerEvents = "none";
                    that.index++;

                    if(that.index > that.quizSize - 1) {
                        setTimeout(function() {
                            that.quizOver();
                        }, 2000);                    
                    }else {
                        setTimeout(function() {
                            //next quiz update
                            that.setQuestion()
                            that.setOptions()
                        },2000)
                    }     
                })
            }
        }
    
        quizOver() {

            this.msgEle.innerHTML = "";
            this.quizEle.innerHTML ="";

            if(this.score > this.quizSize/2) {
                this.optionEle.innerHTML = " <h1> <span> Você foi muito bem 😎 </span> <br> <br>  Continue Assim 💪  </h1>"
            }
            else {
                this.optionEle.innerHTML = " <h1> <span> Você precisa praticar <br> um pouco mais 😑 </span> <br> <br> Tente Novamente !!! </h1> "
            }
        }
    }


// SETANDO  FUNÇÕES
    const app1 = new App(myApp[0],container);

    function load(ele) {
        const app1 = new App(myApp[ele.value],container);
    }



