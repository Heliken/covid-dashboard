export default {
  color: '#000',
  scales: {
    xAxes: [{
      gridLines: {
        color: '#000',
        lineWidth: '.5',
      },
      ticks: {
        fontColor: '#000',
      },
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
      gridLines: {
        display: false,
        color: '#000',
        lineWidth: '.5',
      },
      ticks: {
        fontColor: '#000',
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
