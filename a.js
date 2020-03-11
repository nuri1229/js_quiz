//운행여부 확인
const isServiceTime = (day, hourOfDay) => {

  //운영요일 day: 0, 1, 2, 3, 4, 5 
  //운영시간 hourOfDay: 0, 1, 2, 3, 23

  //운영요일 체크
  const checkDay = (day) => {

    if (Math.sign(day) >= 0 && day < 6) {
      return true;
    } else {
      return false;
    }

  }

  //운영시간 체크
  const checkHourOfDay = (hourOfDay) => {

    if (Math.sign(hourOfDay) >= 0 && (hourOfDay < 4 || hourOfDay === 23)) {
      return true;
    } else {
      return false;
    }
  }

  //운영시간체크 결과와 운영요일체크 결과가 모두 true일 때만 true 리턴
  return checkDay(day) && checkHourOfDay(hourOfDay);

}


assertEqual(isServiceTime(6, 23), false); //일요일 23시
assertEqual(isServiceTime(5, 22), false); //토요일 22시
assertEqual(isServiceTime(3, 3), true); //목요일 3시
assertEqual(isServiceTime(2, 7), false); //수요일 7시
assertEqual(isServiceTime(0, 2), true); //월요일 2시
assertEqual(isServiceTime(1, 1), true); //화요일 1시
assertEqual(isServiceTime(-1, 1), false); //invalid parameter
assertEqual(isServiceTime('AA', 'AA'), false); //invalid parameter


function assertEqual(result, expected) {

  if (result === expected) {
    console.log(`[SUCCESS] 결과: ${result}/ 기대값: ${expected}`);
  } else {
    console.log(`[ERROR] 결과: ${result}/기대값: ${expected}`);
  }

}