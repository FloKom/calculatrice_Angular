import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() { }
  input: string = '';
  result: string = '';
  ans: string = '';
  last: boolean = false;
  ngOnInit(): void {
    
  }
  pressNum(num: string) {
    let formula = this.input;
    let lastKey = formula[formula.length - 1];
    let prevKey = formula[formula.length - 2];
    if (this.last == true) {
      this.input = '';
      this.last = false;
    }
    
    if (num == '.') {
      if (this.input != '') {
        const lastNum = this.getLastOperand();
        console.log(lastNum.lastIndexOf('.'));
        if (lastNum.lastIndexOf('.') >= 0) return;
      }
    }
    if ((
      prevKey === '/' ||
      prevKey === '*' ||
      prevKey === '-' ||
      prevKey === '+'
    ) && lastKey == '0') {
        formula = formula.substring(0, formula.length-1)
        this.input = formula
    }
    if(this.input == "0"){
      this.input = "" 
    }
    if (num == '0') {
      
      if((lastKey ==='0' && formula.length==1)||((prevKey === '+'||prevKey === '-'||prevKey === '*'||prevKey === '/')&&lastKey==='0')){
        return
      }

      
      /*  if (this.input == '') {
        return;
      }  */
    }

    this.input = this.input + num;
    this.calcAnswer();
  }

  getLastOperand() {
    let pos: number;
    console.log(this.input);
    pos = this.input.toString().lastIndexOf('+');
    if (this.input.toString().lastIndexOf('-') > pos)
      pos = this.input.lastIndexOf('-');
    if (this.input.toString().lastIndexOf('*') > pos)
      pos = this.input.lastIndexOf('*');
    if (this.input.toString().lastIndexOf('/') > pos)
      pos = this.input.lastIndexOf('/');
    console.log('Last ' + this.input.substr(pos + 1));
    return this.input.substr(pos + 1);
  }

  pressOperator(op: string) {
    //Do not allow operators more than once
    this.last = false;
    const lastKey = this.input[this.input.length - 1];
    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '-' ||
      lastKey === '+'
    ) {
      return;
    }

    this.input = this.input + op;
    this.calcAnswer();
  }

  effacer() {
    if (this.input != '') {
      try {
        this.input = this.input.substr(0, this.input.length - 1);
      } catch (e) {
        this.effacerTout();
      }
    }
  }

  effacerTout() {
    this.result = '';
    this.input = '';
  }

  calcAnswer() {
    let formula = this.input;
    let lastKey = formula[formula.length - 1];
    let pprevKey = formula[formula.length - 3];
    /* if((formula[0] == '0') && (pr)){
      formula = formula.substr(1, formula.length)
    } */
   
    /* if ((
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '-' ||
      lastKey === '+' ||
      lastKey === '.'
    )&&(formula[0] == '0')){
      formula = formula.substr(1, formula.length)
    } */
    if (lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
    }

    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '-' ||
      lastKey === '+' ||
      lastKey === '.'
    ) {
      formula = formula.substr(0, formula.length - 1);
    }

    console.log('Formula ' + formula);
    this.result = eval(formula);
    this.ans = this.result;
  }

  getAnswer() {
    try {
      this.calcAnswer();
      this.input = this.result;
    }
    catch (err) {
      console.log(err)
      this.input = 'Syntax error'
    }
    this.last = true;
  }
  getAns(){
    this.input = this.input + this.ans;
  }
}