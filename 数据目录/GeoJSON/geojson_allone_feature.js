// 标准GeoJSON 
// 实际使用时，将本示例前面几行去掉，只即大括号'{}'的内容即可
// 本示例共有多个 Feature，并分别定义

// 注意，每种Feature的类型必须与其内容一一对应，即多段折线的，其类型必须为 MultiLineString，而且名称必须正确，不能有空格
// MultiLineString 类型的properties作用于所有的线，如不同线用不同颜色、名称，应单独作feature
// 不管何种 feature，其 coordinates 为null，在leaflet中不会显示，因为整个 FeatureCollection 不合规

var myGeoAll_feature = 

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
		},
		{
		"type": "Feature",
		"properties": {
			"color": "#0000FF"
		},
		"geometry": {
			"type": "MultiLineString",
			"coordinates": [
			[
				[108.203659,22.839477],
				[108.225632,22.857827],
				[108.263741,22.890093],
				[108.321762,22.921085],
				[108.379440,22.934049],
				[108.442268,22.937843],
				[108.485527,22.883450],
				[108.493080,22.866685],
				[108.433685,22.836313]
			],
			[
				[108.580627,22.807833],
				[108.554535,22.734390],
				[108.524323,22.688785],
				[108.444672,22.673580],
				[108.354034,22.679916],
				[108.303223,22.715390],
				[108.235931,22.743256],
				[108.176880,22.778714]
			]
			]
		}
		},
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
