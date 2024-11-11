define(function (require) {
    window._AMapSecurityConfig = {
        securityJsCode: "aa0e021695a64fdb83fc1a8c62f7a5d6",
    };

    const amapRiding = function (ridingPoints) {
        require(['https://webapi.amap.com/maps?v=2.0&key=474d379e6d86cfe8d47347daf6c36861'], function (AMap) {
            window.AMap = AMap;

            var map = new AMap.Map("amap_riding", {
                center: [102.364372,29.231038],
                zoom: 14
            });

            AMap.plugin(["AMap.Riding"], function () {
                var riding = new AMap.Riding({
                    policy: 1
                })
                //根据起终点坐标规划骑行路线
                riding.search(ridingPoints, function(status, result) {
                    if (status === 'complete') {
                        if (result.routes && result.routes.length) {
                            drawRoute(result.routes[0])
                        }
                    } else {
                        console.log('骑行路线数据查询失败' + result)
                    }
                });

                function drawRoute (route) {
                    var path = parseRouteToPath(route)
                    var startMarker = new AMap.Marker({
                        position: path[0],
                        icon: 'https://webapi.amap.com/theme/v2.0/markers/n/start.png',
                        anchor: 'bottom-center',
                        map: map
                    })

                    var endMarker = new AMap.Marker({
                        position: path[path.length - 1],
                        icon: 'https://webapi.amap.com/theme/v2.0/markers/n/end.png',
                        anchor: 'bottom-center',
                        map: map
                    })

                    var routeLine = new AMap.Polyline({
                        path: path,
                        isOutline: true,
                        outlineColor: '#ffeeee',
                        borderWeight: 2,
                        strokeWeight: 5,
                        strokeColor: '#0091ff',
                        strokeOpacity: 0.9,
                        lineJoin: 'round'
                    })

                    map.add(routeLine);
                    // 调整视野达到最佳显示区域
                    map.setFitView([ startMarker, endMarker, routeLine ])
                }

                // 解析 RidingRoute 对象，构造成 AMap.Polyline 的 path 参数需要的格式
                function parseRouteToPath(route) {
                    var path = []
                    for (var i = 0, l = route.rides.length; i < l; i++) {
                        var step = route.rides[i]
                        for (var j = 0, n = step.path.length; j < n; j++) {
                            path.push(step.path[j])
                        }
                    }
                    return path
                }
            });
        });
    }

    return {
        'amapRiding': amapRiding
    }
});