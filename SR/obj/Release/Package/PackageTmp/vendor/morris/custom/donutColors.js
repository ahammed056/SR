// Morris Donut
Morris.Donut({
	element: 'donutColors',
	data: [
		{value: 30, label: 'foo'},
		{value: 15, label: 'bar'},
		{value: 10, label: 'baz'},
		{value: 5, label: 'A really really long label'}
	],
	backgroundColor: '#ffffff',
	labelColor: '#666666',
	colors:['#074b9c', '#00a9e2', '#ec4842', '#fc9709'],
	resize: true,
	hideHover: "auto",
	gridLineColor: "#e4e6f2",
	formatter: function (x) { return x + "%"}
});