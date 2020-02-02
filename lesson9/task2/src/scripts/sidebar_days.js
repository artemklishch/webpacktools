const sidebarDaysBlock = document.querySelector('.main__sidebar_days');


const generateHoursPlace = () => {
  const tempArrOfDays = [];
  for (let i = 0; i < 24; i += 1) {
    const tempStr = `
            <div class="main__sidebar_days_hours" data-hour-number="${i}"></div>
        `;
    tempArrOfDays.push(tempStr);
  }
  return tempArrOfDays.join('');
};


export const generateDaysPlace = () => {
  const tempArrOfDays = [];
  const tempArrOfHours = generateHoursPlace();
  for (let i = 0; i < 7; i += 1) {
    const tempStr = `
        <div class="main__sidebar_days_line" data-day-number="${i}">
            ${tempArrOfHours}
        </div>
        `;
    tempArrOfDays.push(tempStr);
  }
  const stringOfHTML = tempArrOfDays.join('');
  sidebarDaysBlock.innerHTML = stringOfHTML;
};
generateDaysPlace();
