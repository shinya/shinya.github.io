/**
 * Created by ssaita on 15/12/15.
 */
(function () {

	var width = 640;
	var height = 480;
	var canvas;
	var svg;
	var data;
	var colors;
	var pie;
	var arc, arc2;

	var current = [];

	function init(){

		canvas = d3.select('#canvas');

		svg = canvas.append('svg')
				.attr('width', width)
				.attr('height', height)
				.attr('style', 'background: #eeeeee')
				.append('g')
					.attr('transform', 'translate(' + width/2 + ', ' + height/2 + ')')
					.attr('id', 'pie')



		;

		data = [
			{
				name : 'Web',
				score : 0
			},
			{
				name : 'Server',
				score : 0
			},
			{
				name : 'Language',
				score : 0
			},
			{
				name : 'Product',
				score : 0
			},
			{
				name : 'OS',
				score : 0
			},
			{
				name : 'Other',
				score : 0
			},
		];

		colors = d3.scale.category10().range();

		pie = d3.layout.pie()
//			.startAngle(0).endAngle(Math.PI * 2)
			.value(function(d){
				return d.score
			})
			.sort(function(a, b){
				return a.score < b.score;
			});

		arc = d3.svg
			.arc()
			.innerRadius(0)
			.outerRadius(height/2 * 0.8);

		//arc = d3.svg.arc()
		//	.startAngle(function(d) { return d.x; })
		//	.endAngle(function(d) { return d.x + d.dx; })
		//	.innerRadius(function(d) { return Math.sqrt(d.y); })
		//	.outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });




	}

	function render(){

		var g = svg.selectAll('path') //svg.selectAll('.arc')
			.data(pie(data))
			.enter()
			.append('g')
				.attr("class", "arc")
			;


		g.append('path')
			.attr('fill', function(d, i){
				return colors[i];
			})
			.attr('d', arc)
			.attr('stroke', '#ffffff')
			.each(function(d, i) {
				current[i] = d;
			})
		;

		g.append('text')
			.attr('transform', function(d){ return 'translate(' + arc.centroid(d) + ')'; })
			.style('text-anchor', 'middle')
			.attr("font-size", "14")
			.attr('fill', '#ffffff')
			.text(function(d){

				if(d.data.score <= 0){
					return '';
				}else{
					return d.data.name;
				}

			})
			.each(function(d) {
			})
		;
	}

	function animation(target, type, args){

		target
			.selectAll(type)
			// トランジションを設定するとアニメーションさせることができます。
			.transition()
			// アニメーションの秒数を設定します。
			.duration(800)
			// アニメーションの間の数値を補完します。
			.attrTween(args, function(d, i) {

				if(type == 'path'){
					var interpolate = d3.interpolate(current[i], d);
					current[i] = interpolate(0);
					return function(t) {
						return arc(interpolate(t));
					};
				}else if(type == 'text'){
					var interpolate = d3.interpolate(arc.centroid(current[i]), arc.centroid(d));
					current[i] = d;
					return function(t) {
						return "translate(" + interpolate(t) + ")";
					};

				}

			})
		;
	}

	function update(newData){

		svg
			.selectAll("path")
			// 新しいデータを設定します。
			.data(pie(newData))
		;

		// トランジション部分
		animation(svg, 'path', 'd');

		svg
			.selectAll("text")
			// 新しいデータを設定します。
			.data(pie(newData))
			//文字を更新します。
			.text(function(d) {
				// console.log('name: ' + d.data.name);
				if(d.data.score <= 0){
					return '';
				}else{
					return d.data.name;
				}
			})
		;

		// トランジション部分
		animation(svg, 'text', 'transform');


		//pie.sort(function(a, b){
		//	return a.score < b.score;
		//});
	}



	$(document).ready(function () {
		// 初期処理
		init();

		// 生成
		render();

		var className = '';
		var labelName = '';

		for(var i in skills){
			// console.log(skills[i].name);

			if(skills[i].category == 'Language') {
				className = 'success';
				labelName = 'success';
			}else if(skills[i].category == 'Web'){
				className = 'danger';
				labelName = 'success';
			}else if(skills[i].category == 'Server'){
				className = 'primary';
				labelName = 'success';
			}else if(skills[i].category == 'Product'){
				className = 'warning';
				labelName = 'success';
			}else{
				className = 'foo';
				labelName = 'foo';
			}

			$('#skills').append(
				$('<a>')
					.addClass('btn btn-' + labelClass[skills[i].category].className)
					.text(skills[i].name)
					.attr('category', skills[i].category)
					.addClass('skill')
			);
		}

		$('.skill').click(function(){
			var category = $(this).attr('category');
			var name = $(this).text();

			for(var i = 0; i < data.length; i++){
				if(data[i].name == category){
					data[i].score += 1;
				}
			}

			$('#selected').append(
				$('<div></div>')
					.addClass('label label-' + labelClass[category].labelName)
					.text(name)
			);

			update(data);

			$(this).remove();
		});

	});

})();