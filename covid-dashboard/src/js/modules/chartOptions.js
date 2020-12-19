export default {
  scales: {
    xAxes: [{
      type: 'time',
      time: {
        unit: 'month',
        tooltipFormat: 'DD/MM/YYYY',
        displayFormats: {
          month: 'MMM',
        },
      },
    }],
    yAxes: [{
      ticks: {
        callback: (value) => {
          let formattedValue = value;
          if (Math.abs(value) >= 1000000) {
            formattedValue = `${value / 1000000}M`;
          } else if (Math.abs(value) >= 1000) {
            formattedValue = `${value / 1000}K`;
          }
          return formattedValue;
        },
      },
    }],
  },
  tooltips: {
    displayColors: false,
  },
  legend: {
    display: false,
  },
};
