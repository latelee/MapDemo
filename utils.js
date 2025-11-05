/////////////////////////////////////////////////////////////

// 全局map变量
var mymap = null;
var defaultLatlng = [22.817, 108.366];
var defaultZoom = 11;

function drawOneLayer(map, geoJson, {color = "#FF0000", weight = 2, dashArray = ""} = {}) {
    // 加载json数据
    var myLayer = L.geoJSON(geoJson, {
        // 端点
        // geoJsonPoint 为 geoJSON 的点point对象
        // geoJson 的坐标经纬度顺序是：经度、纬度，但到了本函数，似乎会自动转换经纬度顺序
        pointToLayer: function(geoJsonPoint, latlng) {
            // latlng 自动根据point类型的经纬度传入 像 [22.891922, 111.015295] 的类型
            var marker = L.marker(latlng, {
                //icon: myIcon, // 可以在此指定图标
            });
            if (geoJsonPoint.properties && geoJsonPoint.properties.name && geoJsonPoint.properties.name != "") {
                marker.bindPopup(geoJsonPoint.properties.name);
            }
            return marker
        },
        // 线条  样式，可通过 properties 自定义值设置
        style: function (feature) {
            // 有color才赋值
            if (feature.properties && feature.properties.color && feature.properties.color != "" ) {
                color = feature.properties.color;
            }
            return {
                    color:  color, // feature.properties.color,
                    weight: weight,
                    opcacity: 0.3,
                    fillColor: 'transparent', //区域填充颜色
                    fillOpacity: 0, //区域填充颜色的透明
                    dashArray: dashArray,
                    // more...
                };
        },
        // other
    })

    // myLayer.addTo(map)

    return myLayer
}

/**
 * 在地图上绘制矩形形
 * @param {string} coordStr - 坐标字符串，左下角、左上角坐标，格式："lng,lat,lng,lat"
 * @param {object} options - 样式选项（可选）
 * @returns {L.Rectangle} 返回矩形对象
 */
function drawMyRectangle(coordStr, options = {}) {
    // // 矩形
    // const rectangleBounds = [
    //     [22.864787, 108.187866],  // 西南角 (左下角)
    //     [22.910333, 108.237991]   // 东北角 (右上角)
    // ];

    const points = coordStr.split(',')

    // 按leaflet经纬度顺序调整
    const rectangleBounds = [
        [points[1],points[0]],
        [points[3],points[2]],
    ];

    // L.rectangle(边界坐标, 样式选项)
    rectangle = L.rectangle(rectangleBounds, {
        // 填充相关样式
        fillColor: options.fillColor || '#ff7800',    // 填充颜色 - 橙色
        fillOpacity: options.fillOpacity || 0.1,        // 填充透明度 - 10% 透明
        // 边框相关样式
        color: options.color || '#ff0000',        // 边框颜色 
        weight: options.weight || 3,               // 边框宽度
        // opacity: options.opacity || 0.8,            // 边框透明度
        // 其他可选样式
        dashArray: options.dashArray || '5, 5',    // 虚线样式 - 5像素实线, 5像素空白
        ...options
    })

    return rectangle;
}

/**
 * 在地图上绘制多边形
 * @param {string} coordStr - 坐标字符串，格式 "lng,lat;lng,lat;..."
 * @param {L.Map} map - Leaflet地图对象
 * @param {object} options - 多边形样式选项（可选）
 * @returns {L.Polygon} 返回多边形对象
 */
function drawMyPolygon(coordStr, options = {}) {
    // 清理输入：去除多余的空格和换行，按分号分割
    const cleanedStr = coordStr.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const coordPairs = cleanedStr.split(';').filter(pair => pair.trim() !== '');
    
    // 转换坐标格式：将 "经度,纬度" 转换为 Leaflet 需要的 [纬度, 经度]
    const latLngs = coordPairs.map(pair => {
        const [lng, lat] = pair.trim().split(',').map(coord => parseFloat(coord.trim()));
        return [lat, lng]; // 转换为 [纬度, 经度]
    });

    // 样式设置
    const defaultOptions = {
        color: options.color || '#ff00ff',
        weight: options.weight || 3,
        opacity: options.opacity || 0.8,
        fillColor: options.fillColor || '#ff00ff',
        fillOpacity: options.fillOpacity || 0.2,
        ...options
    };

    // 创建多边形
    const polygon = L.polygon([latLngs], defaultOptions);

    return polygon;
}

// 与 drawMyPolygon 实现的机制相同
function drawMyPolyLine(coordStr, options = {}) {
    // 清理输入：去除多余的空格和换行，按分号分割
    const cleanedStr = coordStr.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const coordPairs = cleanedStr.split(';').filter(pair => pair.trim() !== '');
    
    // 转换坐标格式：将 "经度,纬度" 转换为 Leaflet 需要的 [纬度, 经度]
    const latLngs = coordPairs.map(pair => {
        const [lng, lat] = pair.trim().split(',').map(coord => parseFloat(coord.trim()));
        return [lat, lng]; // 转换为 [纬度, 经度]
    });

    // 样式设置
    const defaultOptions = {
        color: options.color || '#ff00ff',
        weight: options.weight || 3,
        opacity: options.opacity || 0.8,
        fillColor: options.fillColor || '#ff00ff',
        fillOpacity: options.fillOpacity || 0.2,
        ...options
    };

    // 创建折线
    const polyline = L.polyline([latLngs], defaultOptions);

    return polyline;
}

/////////////////// 固定，默认显示地图和轮廓
function showMap() {
    // 高德地图图层定义
    var url = 'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
    // url = './mapdownload/guangxi_map_clip/{z}/{x}/{y}.png' // 离线地图
    var gaodeNormal = new L.tileLayer(url, {
        subdomains: ['1', '2', '3', '4'],
        attribution: '&copy; <a href="https://ditu.amap.com/">高德地图</a>'
    });

    // 初始化地图
    mymap = new L.Map('map', {zoomControl: false})
    mymap.setView(defaultLatlng, defaultZoom)

    // 默认加载高德普通地图
    gaodeNormal.addTo(mymap);

    showBoundray(mymap)

    // 显示缩放比例
    L.control.scale({
        maxWidth: 100,
        metric: true, // 显示米
        imperial: false,  // 不显示英尺
        position: 'bottomleft'
    }).addTo(mymap);

    // ------------ 右键事件 开始
    const contextMenu = document.getElementById('context-menu');
    let lastRClickEvt = null; // 改为保存事件对象
    mymap.on('contextmenu', function (e) {
        // / 阻止默认的右键菜单
        e.originalEvent.preventDefault();

        lastRClickEvt = e;
        // 显示自定义右键菜单
        contextMenu.style.display = 'block';
        contextMenu.style.left = (e.originalEvent.pageX - 3) + 'px';
        contextMenu.style.top = (e.originalEvent.pageY - 3) + 'px';
    }); // end of contextmenu

    // 单击事件  点击其他地方隐藏右键菜单
    mymap.on('click', function() {
        contextMenu.style.display = 'none';
    });

    // 处理菜单点击
    contextMenu.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', function(e) {
            const action = this.getAttribute('data-action');
            handleRightClick(action, lastRClickEvt);
            contextMenu.style.display = 'none';
        });
    });
    // ------------ 右键事件 结束
}

function getProvLayer(geoProv, map, style1) {
    L.geoJSON(geoProv,
    {
        style: style1,
        onEachFeature: function(feature, layer) {
            // 添加城市名称
            if (feature.properties && feature.properties.name) {
                layer.bindTooltip(feature.properties.name, {
                    permanent: false,
                    direction: 'center',
                    className: 'city-label'
                });
            }
        }
    }).addTo(map)
}

function showBoundray(map) {

    const myStyle1 = {
        color: "#111111",  // 灰色边框
        weight: 1, 
        opcacity: 0.3, 
        fillColor: 'transparent',  // 无填充色
        fillOpacity: 0,
    };
    
    const myStyle2 = {
        color: "#0000ff", // 蓝色边框
        weight: 1, 
        opcacity: 0.3, 
        fillColor: 'transparent', 
        fillOpacity: 0,
        dashArray: "10, 10", // 边框虚线
    };
    
    const myStyle3 = {
        color: "#ff00ff",  // 紫色边框
        weight: 2, 
        opcacity: 0, 
        // fillColor: '#cccccc',  // 有填充颜色
        fillOpacity: 0,
    };
    
    const myStyleRed = {
        color: "#ff0000",  // 红色边框
        weight: 2, 
        opcacity: 0.3, 
        fillColor: 'transparent',  // 有填充颜色
        fillOpacity: 1,
    };


    // 先全国各省
    getProvLayer(geoJsonChina, map, myStyle1)
    // 再到广西
    // 用广西界线的轮廓，由"450000-广西壮族自治区.js"定义 gxGeoJson 变量，其为多个多边形
    getProvLayer(gxGeoJson, map, myStyle2)
    // 再到南宁
    // getProvLayer(naningData, map, myStyle3)
    // 全国轮廓，最后叠加，红色显示
    getProvLayer(geoJsonChinaSimple, map, myStyleRed)
}

// 右键具体命令实现
function handleRightClick(action, e) {
    if (!e || !e.latlng) return;
    
    var latlng = e.latlng.lng.toFixed(6) + "," + e.latlng.lat.toFixed(6)

    var zoom = mymap.getZoom()

    const output = document.getElementById('txtOutput');
    // 根据各命令响应
    switch(action) {
        case 'r-show-coords':
            output.value = `缩放等级: ${zoom} \r\n经纬度信息(经度, 纬度): ${latlng}`
        break;
    }
}
