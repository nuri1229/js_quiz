//세 점의 직선여부 구하기
// spread 문법 활용해 세점이 아니어도 (두 점이나 그 이상의 점)도 받을 수 있도록 처리.
const isStraight = (...params) => {

  //좌표가 하나거나 xy개수가 정상적이지 않을시 리턴 false
  if( params.length < 4 || params.length % 2 != 0) {
    return false;
  }

  //m = 기울기 값
  let m = 0;

  for(let i = 0; i <params.length - 3; i+=2) { //x,y가 각 배열 요소 하나를 차지하고 있기때문에 2씩 증가. 다음의 좌표와 비교해야 하기 때문에 leng-3까지 제한.

    const currentX = params[i]; 
    const currentY = params[i+1]; 
    const nextX = params[i+2];
    const nextY = params[i+3];
    const currentM = (nextY - currentY) / (nextX - currentX); //현재 좌표와 다음 좌표의 기울기를 구한다.

    if(isNaN(currentM)) return false; //0일 경우

    if (i != 0) { //첫 반복이 아닐 경우 현재 기울기와 기존에 입력됐던 기울기를 비교하여 기울기가 다를 시 리턴 false
      if (m != currentM) return false;
    } else{ //첫 반복시 기울기를 저장
      m = currentM;
    }

  }
  
  return true;
}


assertEqual(isStraight(0, 0, 1, 1, 2, 2), true);  //예제 케이스
assertEqual(isStraight(0, 0, 1, 2, 2, 2), false);  //예제 케이스
assertEqual(isStraight(0, 0, 1, 1), true);  //좌표 두 개 일 때
assertEqual(isStraight(-2, -2, 0, 0, 2, 2, 4, 4), true);  //좌표 4개 일 때
assertEqual(isStraight(-3, -3, 0, 0, 3, 1), false); //좌표 3개며 직선이 아닐 때
assertEqual(isStraight(-1, -3, 0, 0, 1, 3), true); //좌표 3개일 때 기울기 3
assertEqual(isStraight(-3, -3, 0, 0, 10, 10), true); //좌표 3개일 때 기울기 1
assertEqual(isStraight(0, 0, 2, 2, 4, 4, 6, 6, 8, 8, 10, 10, 12, 12, 14, 14), true); //좌표 8개일 때
assertEqual(isStraight(0, 0, 0, 0), false);  //예제 케이스


function assertEqual(result, expected) {

  if (result === expected) {
    console.log(`[SUCCESS] 결과: ${result}/ 기대값: ${expected}`);
  } else {
    console.log(`[ERROR] 결과: ${result}/기대값: ${expected}`);
  }

}
