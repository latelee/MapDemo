// GeoJSON 变形
// 实际使用时，将本示例前面几行去掉，只即大括号'{}'的内容即可
// 本示例共有2个点，有2个Point，与标准geoJson相比，少了Feature字段，但能在leaflet中使用
var myPoints_other_1 = 

{
	"type": "FeatureCollection",
	"features": 
	[
		{
			"type": "Point",
			"properties": {
				"name": "<b>广西的广西南宁</b><br>市"
			},
			"coordinates": [108.316269, 22.838212]
		},
		{
			"type": "Point",
			"properties": {
				"name": "foobar<br>foo"
			},
			"coordinates": [108.379440, 22.738190]
		}
	]
}
