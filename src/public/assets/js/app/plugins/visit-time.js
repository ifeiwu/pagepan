// 下订单字段：期望上门时间
define(['mobile-select/mobile-select', 'css!mobile-select/mobile-select'], function(MobileSelect) {
    let $input = $('[data-mobile-select="visit-time"]')

    // 生成时间段
    function getTimeRanges(startTime, endTime, interval, isToday = false) {
        let ranges = []
        let now = new Date()
        let current = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startTime.getHours(), startTime.getMinutes())
        let end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endTime.getHours(), endTime.getMinutes())

        if (isToday) {
            let nowTime = now.getTime()
            if (current.getTime() < nowTime) {
                current = new Date()
                current.setHours(current.getHours() + 1, 0, 0)
                current.setMinutes(current.getMinutes() - (current.getMinutes() % interval)) // Round down to nearest interval
            }
        }

        while (current < end) {
            let next = new Date(current.getTime() + interval * 60000) // Convert interval to milliseconds
            if (next > end) {
                next = end
            }
            let hours = current.getHours().toString().padStart(2, '0')
            let range = `${formatTime(current)} - ${formatTime(next)}`
            ranges.push({ id: hours, value: range })
            current = next
        }

        return ranges
    }

    // 格式化时间
    function formatTime(date) {
        let hours = date.getHours().toString().padStart(2, '0')
        let minutes = date.getMinutes().toString().padStart(2, '0')
        return `${hours}:${minutes}`
    }

    let timeRange = $input.data('mobile-select-timerange')
    let [startTime, endTime] = timeRange.split('-') // 使用 '-' 分割成开始时间和结束时间
    let [startHour, startMinute] = startTime.split(':') // 使用 ':' 分割开始时间
    let [endHour, endMinute] = endTime.split(':') // 使用 ':' 分割结束时间

    startTime = new Date()
    startTime.setHours(startHour, startMinute, 0) // 09:00
    endTime = new Date()
    endTime.setHours(endHour, endMinute, 0) // 20:00

    // 获取时间间隔数组
    function getTimeRangesData() {
        let interval = 60 // 60 minutes interval
        let todayTimeRanges = getTimeRanges(startTime, endTime, interval, true)
        let defaultTimeRanges = getTimeRanges(startTime, endTime, interval, false)
        let data = []

        if (todayTimeRanges.length) {
            todayTimeRanges.unshift({ id: '0', value: '一小时内' })
            data.push({ id: '1', value: '今天', childs: todayTimeRanges })
        }

        data.push({ id: '2', value: '明天', childs: defaultTimeRanges })
        data.push({ id: '3', value: '后天', childs: defaultTimeRanges })

        return data
    }

    let storage_key = $input.attr('name') + '-change-value';

    let ms = new MobileSelect({
        trigger: $input[0],
        title: '期望上门时间',
        triggerDisplayValue: false,
        wheels: [{
            data: [{ id: '1', value: '今天', childs: [{ id: '0', value: '一小时内' }] }]
        }],
        onShow: function() {
            ms.updateWheels(getTimeRangesData())
            let data = localStorage.getItem(storage_key);
            ms.setValue(JSON.parse(data))
        },
        onChange: function(data, indexArr) {
            $input.val(`${data[0].value} ${data[1].value}`)
            console.log(JSON.stringify(data))
            localStorage.setItem(storage_key, JSON.stringify(data));
        }
    })

    if (!localStorage.getItem(storage_key)) {
        localStorage.setItem(storage_key, JSON.stringify([{id: '1', value: '今天'},{id: '0', value: '一小时内'}]));
    }
})