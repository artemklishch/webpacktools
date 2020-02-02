export const generateNumbers = (from, to) => {
  let count = 0;
  const arrOfPoints = [];
  let timeOfDay = 'AM';
  for (let i = from; count !== 2; i += 1) {
    let tempStr;
    if (i === from) {
      tempStr = '';
      arrOfPoints.push(tempStr);
      continue;
    }
    if (i > to) {
      i = 1;
      count += 1;
      timeOfDay = 'PM';
    }
    if (i === to && timeOfDay === 'PM') {
      tempStr = '';
      arrOfPoints.push(tempStr);
      break;
    }
    tempStr = `${i} ${timeOfDay}`;
    arrOfPoints.push(tempStr);
  }
  return arrOfPoints;
};

const sidebarTiming = document.querySelector('.main__sidebar_timing');
export const renderTimingSidebar = () => {
  const arrOfTimePoints = generateNumbers(0, 12);
  const timePoints = arrOfTimePoints
    .map((timePoint) => `
        <div class="main__sidebar_timing_place">
            <span class="main__sidebar_time">${timePoint}</span>
            <div class="main__sidebar_timing_place-bord"></div>
        </div>
        `).join('');
  sidebarTiming.innerHTML = timePoints;
};
renderTimingSidebar();
