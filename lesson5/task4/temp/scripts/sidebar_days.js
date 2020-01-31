import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.join";
var sidebarDaysBlock = document.querySelector('.main__sidebar_days');

var generateHoursPlace = function generateHoursPlace() {
  var tempArrOfDays = [];

  for (var i = 0; i < 24; i++) {
    var tempStr = "\n            <div class=\"main__sidebar_days_hours\" data-hour-number=\"".concat(i, "\"></div>\n        ");
    tempArrOfDays.push(tempStr);
  }

  return tempArrOfDays.join('');
};

export var generateDaysPlace = function generateDaysPlace() {
  var tempArrOfDays = [];
  var tempArrOfHours = generateHoursPlace();

  for (var i = 0; i < 7; i++) {
    var tempStr = "\n        <div class=\"main__sidebar_days_line\" data-day-number=\"".concat(i, "\">\n            ").concat(tempArrOfHours, "\n        </div>\n        ");
    tempArrOfDays.push(tempStr);
  }

  var stringOfHTML = tempArrOfDays.join('');
  sidebarDaysBlock.innerHTML = stringOfHTML;
};
generateDaysPlace();