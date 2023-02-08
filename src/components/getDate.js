
const setDate = (newYear, newMonth, newDate) =>{
  let y, m, d = 0;
  let date = new Date()
  y = newYear? newYear : date.getFullYear();
  m = newMonth? newMonth : date.getMonth()+1;
  m = m < 10? '0'+m:m;
  d = newDate? newDate : date.getDate();
  d = d < 10? '0'+d:d;
  
  return [y,m,d]
}
const getDate = (year,month) => {
  //전달 날짜
  let prevLastDate = new Date(year, month - 1, 0).getDate();
  let prevLastDay = new Date(year, month - 1, 0).getDay();

  //이번달 마지막 날짜
  const lastDate = new Date(year, month, 0).getDate();
  const lastDay = new Date(year, month, 0).getDay();

  //이전 날짜 만들기
  let pvDate = [];
  if (prevLastDay !== 6) {
    for (let i = 0; i < prevLastDay + 1; i++) {
      pvDate.unshift({
        class : 'prev',
        date : prevLastDate - i
      });
    }
  }
  //다음 날짜 만들기
  let nextDate = [];
  for (let i = 1; i < 7 - lastDay; i++) {
    if (i === 0) {
      // 버그 캐치
      return nextDate;
    }
    nextDate.push({
      class : 'next',
      date : i
    });
  }
  //현재날짜
  let tMonth = [];
  let nArray = []
  tMonth = [...Array(lastDate + 1).keys()].slice(1);
  for(let i = 0; i < tMonth.length; i++){
    nArray.push({
      class : 'on',
      date : tMonth[i]
    })
  }
  tMonth = nArray;
  return pvDate.concat(tMonth, nextDate);
};

export { setDate, getDate }