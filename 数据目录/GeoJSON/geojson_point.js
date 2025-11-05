// 标准GeoJSON
// 实际使用时，将本示例前面几行去掉，只即大括号'{}'的内容即可
// 本示例共有2个点，有2个Feature，并分别定义
var myPoints = 

{
	"type": "FeatureCollection",
	"features": [
	  {
		"type": "Feature",
		"properties": {
		  "name": "<b>广西的广西南宁</b><br>市"
		},
		"geometry": {
		  "type": "Point",
		  "coordinates": [108.316269, 22.838212]
		}
	  },
	  {
		"type": "Feature",
		"properties": {
		  "name": "foobar<br>foo"
		},
		"geometry": {
		  "type": "Point",
		  "coordinates": [108.37944, 22.73819]
		}
	  }
	]
}
