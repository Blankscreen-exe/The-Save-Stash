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

	$("#saveStashTable").DataTable({
	ajax: data_url,
	columns: [
	  {
		data: "game",
		render: function (data, type) {
		  return `<strong>${formatNameString(data)}</strong>`;
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
		  return `<a href="${base_url+"saves/"+row.platform+"/"+row.game+"/"+data}" class="save-file-link">${data}</span>`;
		},
	  },
	],
  });
});
