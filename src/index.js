module.exports = function solveSudoku(matrix) {
  
/*  var matrix =[ 
    [0, 5, 0, 0, 7, 0, 0, 0, 1],
              [8, 7, 6, 0, 2, 1, 9, 0, 3],
              [0, 0, 0, 0, 3, 5, 0, 0, 0],
              [0, 0, 0, 0, 4, 3, 6, 1, 0],
              [0, 4, 0, 0, 0, 9, 0, 0, 2],
              [0, 1, 2, 0, 5, 0, 0, 0, 4],
              [0, 8, 9, 0, 6, 4, 0, 0, 0],
              [0, 0, 0, 0, 0, 7, 0, 0, 0],
              [1, 6, 7, 0, 0, 2, 5, 4, 0]
    
      ];
    
    */
    
    function Solver() {
        this.mat = matrix;
        this.backTr(0,-1);
    };
    
    Solver.prototype.findMis = function (r, c) {          // поиск ошибок 
        var value = this.mat[r][c]; 
        var mist=true; 
        var kvR = Math.floor(r / 3);
        var kvC = Math.floor(c / 3);                     //          console.log('---========---');
        for (var _c = 0; _c < 9; _c++) {                    // по сткокам
            if (_c != c && this.mat[r][_c] == value) {
                mist= false;
            }
        }
        for (var _r = 0; _r < 9; _r++) {                   // по столбцам
            if (_r != r && this.mat[_r][c] == value) {
                mist= false;
            }
        }
        for (var _r = kvR * 3; _r < kvR * 3 + 3; _r++) {                   // в квадранте
            for (var _c = kvC * 3; _c < kvC * 3 + 3; _c++) {
                if (_r != r && _c != c && this.mat[_r][_c] == value) {
                   mist= false
                }
            }
        }
        return mist;
    };
    
    Solver.prototype.backTr = function (r, c) {      // 
        c++;                                             //          console.log(r,c);                                     
        if (c > 8) {                                                  // переход на следующую строку елси уперся 
            c = 0;
            r++;
            if (r > 8) {                                          // дошли до упора
                return true;
            }
        }
        if (this.mat[r][c] != 0) {                                // если ячейка задана переходим к следующей
            if (!this.findMis(r, c)){
                return false;
            }
            return this.backTr(r, c);
        } else {                                                // перебираеи варианты числа
            for (var x = 1; x < 10; x++) {
                this.mat[r][c] = x;
                if (this.findMis(r, c)){
                    if (this.backTr(r, c)) {
                        return true;
                    }
                }
            }
            this.mat[r][c] = 0;
            return false;
        }
    };
       
    function solve(){
            var solver = new Solver(); 
            for(var row = 0; row < 9; row++){
                for(var column = 0; column < 9; column ++){
                    matrix[row][column] = solver.mat[row][column];
                                                         //         console.log('----write in matrix---',row,'-',column,' = ',solver.mat[row][column]); 
                }
            }
    }
        
    Solver.mat=matrix;
    //   console.log(Solver.mat); 
    solve();    
    
   // console.log(matrix);      
   return matrix;  
  }









/* 
                    

  function elemInSq(elem,i,j){                          // функция поиска элемента в квадранте возвращает true/false
    let into=false;
    for (let ii=i; ii<i+3; ii++)                          // проходим по квадранту
      for (let jj=j; jj<j+3; jj++){
        if (matrix[ii][jj]==elem)
          into=true;}
    return into;
  };

  function elemInCol(elem,i){                             // функция поиска элемента в столбце true/false
    let into=false;
    for (let j=0; j<9; j++){
      if (matrix[j][i]==elem)
      into=true; }
    return into;
  }

  function elemInStr(elem,j){                             // функция поиска элемента в строке true/false
    let into=false;
    for (let i=0; i<9; i++){
      if (matrix[j][i]==elem)
      into=true; }
    return into;
  }

  function lastHero(){
    let change=false;                                    // функция поиска элемента последний герой по квадранту
  for (let i=0; i<9; i++){                                // цикл перебора всех столбцов по матрице
    sectIst=Math.floor(i-i%3);                                // координата квадранта по столбцу
    for (let j=0; j<9; j++){                                // цикл перебора всех элементов строк
      sectJst=Math.floor(j-j%3);                                // координата квадранта по строке
      currElem=matrix[i][j];                                // текущий элемент массива
     
                                          //  console.log('i=',i,'  sectIst=',sectIst,'   j=',j,'   sectJst=',sectJst, '   elem-',currElem,' elemInSq()',elemInSq(currElem,sectIst,sectJst));
      if (currElem==0){                                       // если текущий элемент не определен 
        for (let x=1; x<=9; x++){                         // цикл поиска цифры от 1 до 9 
          elemInN=0; findII=0;findJJ=0;                             // количество найденных элементов  и место нахождения     
                    //  console.log('x=',x,'   elemInN=',elemInN);           
          if (!elemInSq(x,sectIst,sectJst)){                // если цифра отсутствует в текущем квадранте 
            for (let ii=sectIst; ii<sectIst+3; ii++){       // console.log('=');           // проходим по столбцам квадранта
              for (let jj=sectJst; jj<sectJst+3; jj++){     //  console.log('==');           // проходим по строкам квадранта
                                        //    console.log(!elemInCol(x,   j   ),!elemInStr(x,i))
                if (matrix[ii][jj]==0){                            // если это место в квадранте свободно     
                                       //   console.log('=====',x, '==; в столбце-',jj,!elemInCol(x,   jj   ), '; в строке-',ii,!elemInStr(x,ii))  
                  if (!elemInCol(x,   jj   )){                            // если элемент отсутствует в столбце
                    if (!elemInStr(x,   ii   )){                         // если элемент отсутствует в строке
                      elemInN++;             //    console.log('x=',x,'   elemInN=',elemInN);
                      findII=ii;findJJ=jj;
                  
                    }
                  }
                }                  
              }
            }
          }
      
      
          if (elemInN==1){                                        // если найдена только одна позиция для цифры
            matrix[findII][findJJ]=x;   //  console.log('============faund===============');      // утанавливаем найденный элемент в матрицу
            change=true;
          }
        }
      }
    }
  }
  return change;
}

function lastHeroStr(){                                           // функциЯ поиско последнего героя по строкам
  let change=false;                                             // были ли переменные
  for (let i=0; i<9; i++){                                // цикл перебора всех строк по матрице
    for (let j=0; j<9; j++){                              // цикл перебора всех столбцов по матрице
      if (matrix[i][j]==0){                                        // если элемент пустой
        for (let x=1; x<=9; x++){             
          elemInN=0;                                   // запускаем цикл перебора Иксов
          if (!elemInStr(x,i)){                                     // если элемент Икс отсутствует в строке
            for (let jj=0; jj<9; jj++){                                // передираем возможные позиции в строке
                                    //  console.log('===',x, '==; ',i ,'-',jj ,' в квадранте-',Math.floor(i-i%3),Math.floor(jj-jj%3),elemInSq(x,Math.floor(i-i%3),Math.floor(jj-jj%3)), '; в столбце-',jj,elemInCol(x,jj),'условие', matrix[i][jj]==0,' elemInN=',elemInN);
              if (matrix[i][jj]==0){                              // если элемент пустой                    
                      
                if (!elemInSq(x,Math.floor(i-i%3),Math.floor(jj-jj%3))){    // если в квадранте этого элемента нет
                  if (!elemInCol(x,jj)){                                    // если в столбце элемента нет
                    elemInN++;                                        // инкременируем количество найденных элементов
                    jjp=jj;                   //     console.log('===',x,'==   elemInN=',elemInN);
                      
                  }
                }

              }
            }
          } 
          if (elemInN==1){                                        // если найдена только одна позиция для цифры
            matrix[i][jjp]=x;    // console.log('============found===============',x,'---->',i,'-',j,'   jj=',jjp);      // утанавливаем найденный элемент в матрицу
            change=true;
          }
        }
      }
    } 
  }
  return change;
}

function lastHeroCol(){                                           // функциЯ поиско последнего героя по столбцам
  let change=false;                                             // были ли найдены элементы
  for (let i=0; i<9; i++){                                // цикл перебора всех строк по матрице
    for (let j=0; j<9; j++){                              // цикл перебора всех столбцов по матрице
      if (matrix[i][j]==0){                                        // если элемент пустой
        for (let x=1; x<=9; x++){                         // запускаем цикл перебора Иксов 
          elemInN=0;                                       // счетчик для найденных возможностей
          if (!elemInCol(x,j)){                                     // если элемент Икс отсутствует в столбце j
            for (let ii=0; ii<9; ii++){                                // передираем возможные позиции в столбце
                                    //  console.log('===',x, '==; ',i ,'-',jj ,' в квадранте-',Math.floor(i-i%3),Math.floor(jj-jj%3),elemInSq(x,Math.floor(i-i%3),Math.floor(jj-jj%3)), '; в столбце-',jj,elemInCol(x,jj),'условие', matrix[i][jj]==0,' elemInN=',elemInN);
              if (matrix[ii][j]==0){                              // если элемент пустой                    
                      
                if (!elemInSq(x,Math.floor(ii-ii%3),Math.floor(j-j%3))){    // если в квадранте этого элемента нет
                  if (!elemInStr(x,ii)){                                    // если в столбце элемента нет
                    elemInN++;                                        // инкременируем количество найденных элементов
                    iip=ii;                   //     console.log('===',x,'==   elemInN=',elemInN);
                      
                  }
                }

              }
            }
          } 
          if (elemInN==1){                                        // если найдена только одна позиция для цифры
            matrix[iip][j]=x;    // console.log('============found===============',x,'---->',i,'-',j,'   jj=',jjp);      // утанавливаем найденный элемент в матрицу
            change=true;
          }
        }
      }
    } 
  }
  return change;
}

function whoIsNotI(){
  let change=false;                                             // были ли найдены элементы
  for (let i=0; i<9; i++){                                // цикл перебора всех строк по матрице
    for (let j=0; j<9; j++){                              // цикл перебора всех столбцов по матрице
      if (matrix[i][j]==0){                                    // если элемент пустой
        elemInN=0;                                        // счетчик для найденных возможностей
        for (let x=1; x<=9; x++){                         // запускаем цикл перебора Иксов 
                               
          if (!elemInCol(x,j)){                           // если элемента нет в столбце
            if (!elemInStr(x,i)){                         // если элемента нет с строке
              if (!elemInSq(x,Math.floor(i-i%3),Math.floor(j-j%3))){        // если элемента нет в квадранте
                elemInN++;                                // инкреминируем счетчик найденных возможностей
                xp=x;                                       // сохраняем найденное значенин x
              }
            }
          }
        }
        if (elemInN==1){                                        // если найдена только одна позиция для цифры
          matrix[i][j]=xp;    // console.log('============found===============',xp,'---->',i,'-',j,'   jj=');      // утанавливаем найденный элемент в матрицу
          change=true;
        }
      }
    }
  }
  return change;
}

function noChoice (){
  let change=false; 
  for (let i=0; i<9; i++){                                // цикл перебора всех строк по матрице
    for (let j=0; j<9; j++){                              // цикл перебора всех столбцов по матрице
      if (matrix[i][j]==0){                                    // если элемент пустой
       
        for (let x=1; x<=9; x++){                         // запускаем цикл перебора Иксов 
          elemInN=0;                                        // счетчик для найденных возможностей
          if (!elemInCol(x,j)){                           // если элемента нет в столбце
            if (!elemInStr(x,i)){                         // если элемента нет с строке
              if (!elemInSq(x,Math.floor(i-i%3),Math.floor(j-j%3))){        // если элемента нет в квадранте
                for (let ii=0; ii<9; ii++){                                // цикл перебора строк в столбце
                  if (!elemInStr(x,ii) && !elemInSq(x,Math.floor(ii-ii%3),Math.floor(j-j%3))){
                    elemInN++;                       console.log( 'i=',i,' j=',j,'string (ii)=',ii,'==',x,'==  elemInN=',elemInN)         // инкреминируем счетчик найденных возможностей
                  }
                }
                for (let jj=0; jj<9; jj++){                                // цикл перебора столбцов в строке
                  if (!elemInCol(x,jj) && !elemInSq(x,Math.floor(i-i%3),Math.floor(jj-jj%3))){
                    elemInN++;                     console.log( 'i=',i,' j=',j,'string (jj)=',jj,'==',x,'==  elemInN=',elemInN)           // инкреминируем счетчик найденных возможностей
                  }
                }
                for (let iik=Math.floor(i-i%3); iik<Math.floor(i-i%3)+3; iik++){
                  for (let jjk=Math.floor(j-j%3); jjk<Math.floor(j-j%3)+3; jjk++){
                    if (!elemInCol(x,jjk) && !elemInStr(x,iik)){
                      elemInN++;                                  console.log( 'i=',i,' j=',j,'string (jj)=',jj,'==',x,'==  elemInN=',elemInN)
                    }
                  }
                }


              }
            }
          }
          if (elemInN==1){                                        // если найдена только одна позиция для цифры
            matrix[i][j]=x;     console.log('============found===============',xp,'---->',i,'-',j,'   jj=');      // утанавливаем найденный элемент в матрицу
            change=true;
          }
        }
      }
    }
  }
                      //       matrix[1][1]=1;
  return change;
}



let ggg=0
do {
  ggg++;
 lh=lastHero();
  lhs=lastHeroStr();
  lhc=lastHeroCol();
  win=whoIsNotI();
  nc=noChoice ();
 // console.log(lh,lhs,lhc,ggg,win,nc);
//  
//  } while (/*( lh || lhs)*//*  &&  /// ggg<     1     );
//console.log(matrix);

return matrix;  }                 */ 

