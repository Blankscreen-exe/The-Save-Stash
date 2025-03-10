var base_url = "https://raw.githubusercontent.com/Blankscreen-exe/The-Save-Stash/refs/heads/main/";
var data_url = base_url + "data.json";

$(document).ready(function () {

	function formatNameString(input) {
	  return input
		.split('_')
		.map((word) =>
		  word === word.toUpperCase()
			? word
			: word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
		)
		.join(' ');
	}

	fetch(data_url)
	.then(async data => {
		let save_data = await data.text();
		save_data = JSON.parse(save_data);

		const platformCounts = save_data.data.reduce((acc, item) => {
			let count = (acc[item.platform] || 0) + 1;
			acc[item.platform] = count;
			return acc;
		}, {});

		let chart_bars = '';

		for (const [key, item] of Object.entries(platformCounts)) {
			chart_bars += `<span>${key.toUpperCase()} ( ${item} )</span>`;
		}

		// populate chart section
		$('#chart-section').html(chart_bars);

	})
	.catch(error => {
		console.error("Error fetching data:", error);
		alert(error);
	});


	$("#saveStashTable").DataTable({
	ajax: data_url,
	columns: [
	  {
		data: "title",
		render: function (data, type) {
		  return `<strong>${data}</strong>`;
		},
	  },
	  {
		data: "platform",
		render: function (data, type) {
		  return `<span>${data.toUpperCase()}</span>`;
		},
	  },
	  {
		data: "fileName",
		render: function (data, type, row) {
		  return `<a href="${base_url+"saves/"+row.platform+"/"+row.game+"/"+data}" class="save-file-link"><img src="assets/download.svg" width="20px"/></span>`;
		},
		sortable:false
	  },
	],
  });
});
