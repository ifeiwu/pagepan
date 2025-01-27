// 价格格式化
define(function () {
    return function (number, decimals) {
        decimals = decimals > 0 && decimals <= 20 ? decimals : 2;
        number = parseFloat((number + "").replace(/[^\d\.-]/g, "")).toFixed(decimals) + "";
        var l = number.split(".")[0].split("").reverse(),
            r = number.split(".")[1];
        t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    };
});