import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public name : string = "";
  public questionList : any = [];
  public currentQuestion: number = 0;
  public points : number = 0;
  counter = 30;
  correctAnswer : number = 0;
  incorrectAnswer : number = 0;
  interval$ : any;
  progress : string = "0";
  constructor(private gameService : GameService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
  }
  getAllQuestions() {
    this.gameService.getQuestionJson()
    .subscribe(res=>{
      this.questionList = res.questions;
    })
  }
  nextQuestion() {
    this.currentQuestion++;
  }
  previousQuestion() {
    this.currentQuestion--;
  }
  answer(currentQno:number,option:any) {
    if(option.correct){
      this.points+= 5;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
      this.currentQuestion++;
      this.resetCounter();
      this.getProgressPercent();
    }else {
      setTimeout(() => {
        this.currentQuestion++;
        this.incorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);

      this.points -= 5;
    }
  }
  startCounter() {
    this.interval$ = interval(500)
    .subscribe(val=>{
      this.counter--;
      if(this.counter===0) {
        this.currentQuestion++;
        this.counter = 30;
        this.points -= 5;
      }
    });
    setTimeout(() => {
      this.interval$.unsubcribe();
    }, 150000);
  }
  stopCounter() {
    this.interval$.unsubcribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 30;
    this.startCounter();
  }
  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 30;
    this.currentQuestion = 0;
  }

  getProgressPercent() {
    this.progress = ((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }
}
