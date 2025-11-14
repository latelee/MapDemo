/*
使用turf精简路线
npm install @turf

执行：
node turf_simple.js  turf_file/my_input.json turf_file/output.json

输出示例：

开始优化GeoJSON数据...
处理线路 1: 小鸡村到大鸡村
  - 清理重复顶点: 106 -> 101
  - 几何简化: 101 -> 15
  - 最终优化: 15 -> 15
  - 总减少: 106 -> 15 (85.8%)
处理线路 2: 某立交到狮山公园
  - 清理重复顶点: 94 -> 89
  - 几何简化: 89 -> 14
  - 最终优化: 14 -> 14
  - 总减少: 94 -> 14 (85.1%)
处理线路 3: 某立交到某检测站
  - 清理重复顶点: 95 -> 90
  - 几何简化: 90 -> 14
  - 最终优化: 14 -> 14
  - 总减少: 95 -> 14 (85.3%)

=== 优化完成 ===
原始文件大小: 7.16 KB
优化后文件大小: 1.55 KB
体积减少: 78.30%

*/


const turf = require('@turf/turf');
const fs = require('fs');


// 获取命令行参数
const args = process.argv;


main()

function main() {
    const inputFile = args[2];
    const outputFile = args[3];

    if (!inputFile || !outputFile) {
        console.error('请提供输入文件和输出文件路径');
        console.log('用法: node xxx.js <输入文件> <输出文件>');
        process.exit(1);
    }

    if (!fs.existsSync(inputFile)) {
        console.error(`错误: 输入文件 "${inputFile}" 不存在`);
        return;
    }
    
    const originalGeoJSON = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

    // 执行优化
    const optimizedGeoJSON = optimizeGeoJSON(originalGeoJSON);

    // 保存优化后的文件
    fs.writeFileSync(outputFile, JSON.stringify(optimizedGeoJSON, null, 2));

    // 统计信息
    const originalSize = JSON.stringify(originalGeoJSON).length;
    const optimizedSize = JSON.stringify(optimizedGeoJSON).length;

    console.log('\n=== 优化完成 ===');
    console.log(`原始文件大小: ${(originalSize / 1024).toFixed(2)} KB`);
    console.log(`优化后文件大小: ${(optimizedSize / 1024).toFixed(2)} KB`);
    console.log(`体积减少: ${((1 - optimizedSize / originalSize) * 100).toFixed(2)}%`);
    
    //formatJsonFile(inputFile, outputFile); return;
}

// 将json格式化再保存
function formatJsonFile(inputFile, outputFile) {
    const orgJsonObj = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
    const jsonstr = JSON.stringify(orgJsonObj, null, 2);
    fs.writeFile(outputFile, jsonstr, 'utf8', (error) => {
        if (error) {
            console.error('保存文件时出错:', error);
        } else {
            console.log('文件保存成功:', outputFile);
        }
    });
}

/**
 * 优化GeoJSON的完整流程
 * @param {Object} geojson 原始GeoJSON数据
 * @returns {Object} 优化后的GeoJSON数据
 */
function optimizeGeoJSON(geojson) {
    console.log('开始优化GeoJSON数据...');
    
    const optimizedFeatures = geojson.features.map((feature, index) => {
        if (feature.geometry.type === 'LineString') {
            console.log(`处理线路 ${index + 1}: ${feature.properties.name || feature.properties.id}`);
            
            const originalPoints = feature.geometry.coordinates.length;
            
            // 第一步：清理重复顶点
            let cleaned = turf.cleanCoords(feature);
            console.log(`  - 清理重复顶点: ${originalPoints} -> ${cleaned.geometry.coordinates.length}`);
            
            // 第二步：几何简化
            const simplified = turf.simplify(cleaned, {
                tolerance: 0.0002, //0.0001,    // 容差值，可调整
                highQuality: true     // 高质量模式
            });
            console.log(`  - 几何简化: ${cleaned.geometry.coordinates.length} -> ${simplified.geometry.coordinates.length}`);
            
            // 第三步：再次清理，确保没有因简化产生的重复点
            const final = turf.cleanCoords(simplified);
            console.log(`  - 最终优化: ${simplified.geometry.coordinates.length} -> ${final.geometry.coordinates.length}`);
            console.log(`  - 总减少: ${originalPoints} -> ${final.geometry.coordinates.length} (${((1 - final.geometry.coordinates.length / originalPoints) * 100).toFixed(1)}%)`);
            
            return {
                ...final,
                properties: feature.properties
            };
        }

        return feature;
    });
    
    return {
        type: 'FeatureCollection',
        features: optimizedFeatures
    };
}