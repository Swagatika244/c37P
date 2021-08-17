class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    
    //write code to change the background color here
    background("yellow");

    //write code to show a heading for showing the result of Quiz
    this.message = createElement('h1');
    this.message.html('Result of the QUIZ !!!');
    this.message.position(350, 0);

    //call getContestantInfo( ) here
      Contestant.getContestantInfo();


    //write condition to check if contestantInfor is not undefined
    if(allContestants !==undefined){

      //write code to add a note here

      fill("blue");
      textSize(20);
      text("Note: Contestant who answered correct are highlighted in green colour!",130, 230);
      

    }

    //write code to highlight contest who answered correctly
    for (var plr in allContestants){
      var correctAns = "2";
      if(correctAns === allContestants[plr].answer){
        fill("green");
        text(allContestants[plr].name + " :-)    " +allContestants[plr].answer,130, 230+50);
      }else{
        fill("red");
        text(allContestants[plr].name + " :-(    " +allContestants[plr].answer,130, 230+100);

      }
    }
  }

}
