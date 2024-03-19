/**
 * Created by ssaita on 15/11/18.
 */
(function () {
	$(document).ready(function () {
		// Add code

		var colors = d3.scale.category10().range();;
		var color = colors[ parseInt(Math.random() * colors.length) ];

		var svg = d3.select('body').append('svg')
			.attr('width', 640)
			.attr('height', 480)
			.attr('style', 'background: #efefef')
			;


		var circle = svg.append('circle')
			.attr('cx', 120)
			.attr('cy', 240)
			.attr('r', 20)
			.attr('fill', color)
		;

		var i = 0;
		var interval;

		interval = setInterval(function(){

			var x = parseInt(Math.random() * 600) + 20
			var y = parseInt(Math.random() * 440) + 20

			circle.transition().delay(1000).duration(200).attr('cx', x).attr('cy', y);

			i++;

			if(i > 10){
				console.log('End.');
				clearInterval(interval);
			}
		}, 1000)

	});
})();