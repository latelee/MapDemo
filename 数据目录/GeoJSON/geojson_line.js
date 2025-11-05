// 标准GeoJSON
// 实际使用时，将本示例前面几行去掉，只即大括号'{}'的内容即可
// 本示例共有2条线，有2个Feature，并分别定义
var myLines = 


{
	"type": "FeatureCollection",
	"features":
	[
		{
		"type": "Feature",
		"properties": {
			"color": "#FF00FF"
		},
		"geometry": {
			"type": "LineString",
			"coordinates": [
			[108.316269, 22.838212],
			[108.326569, 22.807200],
			[108.347168, 22.779347],
			[108.352661, 22.759720],
			[108.379440, 22.738190]
			]
		}
		},
		{
		"type": "Feature",
		"properties": {
			"color": "#00FF00"
		},
		"geometry": {
			"type": "LineString",
			"coordinates": [
			[108.312063, 22.831725],
			[108.307085, 22.823340],
			[108.313522, 22.819226]
			]
		}
		}
	]
}