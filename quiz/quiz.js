//henter elementer fra DOM
var skip = document.getElementById('skip');
var score=document.getElementById('score');
var totalScore = document.getElementById('totalScore');
var count =0;
var scoreCount=0;
var qaSet = document.querySelectorAll('.qa_set');
var qaAnsRow = document.querySelectorAll('.qa_set .qa_ans_row input');

skip.addEventListener('click', function(){
    step();
});

//for hver av "gruppene" med classene nevt får de en single som gjør at 
qaAnsRow.forEach(function(qaAnsRowSingle){
    qaAnsRowSingle.addEventListener('click', function(){ //legger til en lytter når det blir klikket på
        setTimeout(function(){
            step();
        },500) // Gjør at siden automatisk skippes etter 500 millisekunder

        var valid = this.getAttribute("valid"); // Sjekker om svaret inneholder attributen valid
        if(valid=="valid"){
            scoreCount+=1;
            score.innerHTML=scoreCount;
            totalScore.innerHTML=scoreCount;
        }
    })
});

function step(){
    count += 1; //øker tellingen med 1 for hver gang løkken kjøres
    for(var i=0; i<qaSet.length; i++){
        qaSet[i].className='qa_set'; // Gir element nummer i en klasse qa_set
    }
    qaSet[count].className='qa_set active';
    if(count==8){ //hvis løkken har kjørt 8 ganger, så vises ikke skip klassen
        skip.style.display= 'none'
    }
}