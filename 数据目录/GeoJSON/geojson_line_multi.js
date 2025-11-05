// 标准GeoJSON
// 本示例共有2条线，只有一个Feature，类型为MultiLineString
// 注意，此法的properties作用于所有的线，如不同线用不同颜色、名称，应单独作feature
var myLines_multi = 

{
	"type": "FeatureCollection",
	"features": [
	  {
		"type": "Feature",
		"properties": {
		  "color": "#FF00FF"
		},
		"geometry": {
		  "type": "MultiLineString",
		  "coordinates": [
			[
			  [108.316269, 22.838212],
			  [108.326569, 22.807200],
			  [108.347168, 22.779347],
			  [108.352661, 22.759720],
			  [108.37944, 22.73819]
			],
			[
			  [108.312063, 22.831725],
			  [108.307085, 22.82334],
			  [108.313522, 22.819226]
			]
		  ]
		}
	  }
	]
}
