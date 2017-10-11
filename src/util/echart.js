export const gaugeOption = {
	tooltip: {
		formatter: '{a} <br/>{b} : {c}'
	},
	toolbox: {
		feature: {
			restore: false,
			saveAsImage: false
		}
	},
	series: [
		{
			name: '可用性',
			type: 'gauge',
			detail: {formatter: '{value}'},
			data: [{value: 50, name: '分数'}],
			axisLine: {
				lineStyle: {
					color: [
						[0.1, '#E51900'],
						[0.2, '#E62600'],
						[0.3, '#E84101'],
						[0.4, '#EA5B05'],
						[0.5, '#EA7B0A'],
						[0.6, '#EA9B11'],
						[0.7, '#EAC416'],
						[0.8, '#DCDF1C'],
						[0.9, '#B1DF22'],
						[1, '#8CDD25']
					]
				}

			}
		}
	]
};

export const pieOption = {
	tooltip: {
		trigger: 'item'
	},
	legend: {
		orient: 'vertical',
		x: 'left',
		data: []
	},
	series: [
		{
			name: '权重比例',
			type: 'pie',
			selectedMode: 'single',
			radius: [0, '30%'],

			label: {
				normal: {
					position: 'inner',
					show: false
				}
			},
			labelLine: {
				normal: {
					show: false
				}
			},
			data: []
		},
		{
			name: '扣分权重',
			type: 'pie',
			radius: ['40%', '55%'],

			data: []
		}
	]
};

export const circleOption = {
	tooltip: {
		trigger: 'item',
		formatter: '{a} <br/>{b}: {c} ({d}%)'
	},
	legend: {
		orient: 'vertical',
		x: 'left',
		data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
	},
	series: [
		{
			name: '权重比例',
			type: 'pie',
			radius: ['50%', '70%'],
			avoidLabelOverlap: false,
			label: {
				normal: {
					show: false,
					position: 'center'
				},
				emphasis: {
					show: true,
					textStyle: {
						fontSize: '30',
						fontWeight: 'bold'
					}
				}
			},
			labelLine: {
				normal: {
					show: false
				}
			},
			data: [
			]
		}
	]
};
