module.exports = function solveSudoku(matrix) {
  
  /*     matrix =[  [0, 5, 0, 0, 7, 0, 0, 0, 1],
                      [8, 7, 6, 0, 2, 1, 9, 0, 3],
                      [0, 0, 0, 0, 3, 5, 0, 0, 0],
                      [0, 0, 0, 0, 4, 3, 6, 1, 0],
                      [0, 4, 0, 0, 0, 9, 0, 0, 2],
                      [0, 1, 2, 0, 5, 0, 0, 0, 4],
                      [0, 8, 9, 0, 6, 4, 0, 0, 0],
                      [0, 0, 0, 0, 0, 7, 0, 0, 0],
                      [1, 6, 7, 0, 0, 2, 5, 4, 0]];    */ 
                    

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
                               
          if (!elemInCol(x,j)){
            if (!elemInStr(x,i)){
              if (!elemInSq(x,Math.floor(i-i%3),Math.floor(j-j%3))){
                elemInN++;
                xp=x;                 
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


let ggg=0
do {
  ggg++;
 lh=lastHero();
  lhs=lastHeroStr();
  lhc=lastHeroCol();
  win=whoIsNotI();
//  console.log(lh,lhs,lhc,ggg,win);
//  
  } while (/*( lh || lhs)*//*  &&*/ ggg<20);
//console.log(matrix);

return matrix;  }

