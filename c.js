//차량 번호 확인하기
const isRightCarNumFormat = (carNum) => {

  const checkLength = () => { //파라미터로 들어온 차량 번호의 길이 검증.

    return carNum.length == 9;
  }

  const validateCarNum = (permittedLength, type, paramStr) => {//차량 번호의 각 구성요소들이 올바른 형태(문자, 숫자)로 이루어져 있는지 검증하는 공통함수.

    const validateResult = paramStr.split('').filter((el) => type == 'string'? isNaN(el) : !isNaN(el)).length;
    return permittedLength == validateResult;

  }

  const checkLocation = () => {//차량번호 앞 2자리가 2자리 문자인지 검증
    
    return validateCarNum(2, 'string', carNum.substr(0, 2));
  }

  const checkCarType = () => {//차량번호 2-4자리가 2자리 숫자인지 검증

    return validateCarNum(2, 'number', carNum.substr(2, 2));
  }
  
  const checkUsage = () => {//차량번호 4-5자리가 1자리 문자인지 검증

    return validateCarNum(1, 'string', carNum.substr(4, 1));
  }

  const checkCarNumber = () => {//차량번호 5-9자리가 4자리 숫자인지 검증

    return validateCarNum(4, 'number', carNum.substr(5, 4));
  }


  return checkLength() && checkLocation() && checkCarType() && checkUsage() && checkCarNumber ();

}

assertEqual(isRightCarNumFormat('서울12가4567'), true); //정상
assertEqual(isRightCarNumFormat('경기44가4444'), true); //정상
assertEqual(isRightCarNumFormat('123456789'), false); //지역명 검증
assertEqual(isRightCarNumFormat('가12345678'), false); //지역명 검증
assertEqual(isRightCarNumFormat('가나다123456'), false); //차량 타입 검증
assertEqual(isRightCarNumFormat('가나123다라마'), false); //차량 용도 검증
assertEqual(isRightCarNumFormat('가나123다라마'), false); //차량 번호 검증
assertEqual(isRightCarNumFormat('가나12다라바마사'), false); //차량 번호 검증
assertEqual(isRightCarNumFormat('가나12다1234'), true); //정상


function assertEqual(result, expected) {

  if (result === expected) {
    console.log(`[SUCCESS] 결과: ${result}/ 기대값: ${expected}`);
  } else {
    console.log(`[ERROR] 결과: ${result}/기대값: ${expected}`);
  }

}
