// 문자열 압축
const compress = (any) => {

  //파라미터 검증. ''이나 undefined, 숫자로 이루어진 문자열 체크.
  if (!any || Math.sign(any) >= -1) {
    return '압축할 수 없는 문자열입니다.';
  }

  let cnt = 0;
  let resultString = '';
  const lastIndex = any.length - 1;

  any.split('').reduce((acc, cur, index) => {

    if (acc === cur) {//accumulator 값과 현재값이 같을 경우 카운트 ++
      cnt = cnt + 1;
    } else {//accumulator 값과 현재값이 다를 경우 resultString에 add하고 accumulator의 값 변경.
      resultString = resultString + cnt + acc;
      acc = cur;
      cnt = 1;
    }

    if (index == lastIndex) {//마지막 문자는 다음 비교대상이 없기 때문에 바로 resultString에 add
      resultString = resultString + cnt + acc;
    }

    return acc;

  }, any.charAt(0));

  return resultString;

}

//문자열 압축 해제
const decompress = (compressed) => {

  //파라미터 검증. (숫자1문자1)의 형태만 압축해제 한다. 
  const regex = /(\d{1}[A-Za-z])/gmi;
  if (!compressed ||
    Math.sign(compressed) >= -1 ||
    compressed.match(regex).length !== compressed.length / 2) {

    return '암호화 된 문자열이 올바르지 않습니다.';
  }

  let resultString = '';

  compressed.split('').reduce((acc, cur) => {

    if (Math.sign(acc) == 1) {//accumulator의 값이 숫자일 경우 currentValue를 accumulator의 값만큼 resultString에 add한다.
      for (let i = 0; i < Number(acc); i++) {
        resultString += cur;
      }
    }

    return acc = cur;
  })

  return resultString;

}

assertEqual(compress('ZZZAAAABBCCQ'), '3Z4A2B2C1Q').decompressed(decompress('3Z4A2B2C1Q'), 'ZZZAAAABBCCQ');
assertEqual(compress('ZZZAAAABBCCQQ'), '3Z4A2B2C2Q').decompressed(decompress('3Z4A2B2C2Q'), 'ZZZAAAABBCCQQ');
assertEqual(compress('ZABCQ'), '1Z1A1B1C1Q').decompressed(decompress('1Z1A1B1C1Q'), 'ZABCQ');
assertEqual(compress('A'), '1A').decompressed(decompress('1A'), 'A');
assertEqual(compress('AAAAA'), '5A').decompressed(decompress('5A'), 'AAAAA');
assertEqual(compress('AAAAA'), '5A').decompressed(decompress('4ABB'), '암호화 된 문자열이 올바르지 않습니다.'); //invalid parameter
assertEqual(compress('bbaa'), '2b2a').decompressed(decompress('22'), '암호화 된 문자열이 올바르지 않습니다.'); //invalid parameter
assertEqual(compress('333222'), '압축할 수 없는 문자열입니다.').decompressed(decompress('22'), '암호화 된 문자열이 올바르지 않습니다.'); //invalid parameter
assertEqual(compress(''), '압축할 수 없는 문자열입니다.').decompressed(decompress('22'), '암호화 된 문자열이 올바르지 않습니다.'); //invalid parameter


function assertEqual(compressResult, compressExpected) {

  if (compressResult === compressExpected) {
    console.log(`[SUCCESS] 결과: ${compressResult}/ 기대값: ${compressExpected}`);
  } else {
    console.log(`[ERROR] 결과: ${compressResult}/기대값: ${compressExpected}`);
  }

  return {
    decompressed: (deompressResult, decompressExpected) => {
      if (deompressResult === decompressExpected) {
        console.log(`[SUCCESS] 결과: ${deompressResult}/ 기대값: ${decompressExpected}`);
      } else {
        console.log(`[ERROR] 결과: ${deompressResult}/기대값: ${decompressExpected}`);
      }
    }
  }

}

