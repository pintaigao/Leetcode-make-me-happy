var minimumDeleteSum = function (s1, s2) {
    var n = s1.length;
    var m = s2.length;
    var map = new Array(n + 1);
    var map2 = new Array(n + 1);
    map[0] = 0;
    map2[0] = "";
    for (var len = 1; len <= n; len++) {
        map[len] = map[len - 1] + s1.charCodeAt(len - 1);
        map2[len] = map2[len - 1] + s1[len - 1];
    }
    console.log(map2);
    
    for (var len2 = 1; len2 <= m; len2++) { // s2
        console.log("Inside Loop and len2:"+ len2);
        var pre = map[0];
        map[0] += s2.charCodeAt(len2 - 1);
        console.log(map);
        for (var len1 = 1; len1 <= n; len1++) { // s1
            console.log("In Loop and len1:"+ len1);
            var res = Number.MAX_SAFE_INTEGER;
            if (s1[len1 - 1] === s2[len2 - 1]) {
                console.log("s1[len1 - 1] === s2[len2 - 1] and s1[len1 - 1]:"+s1[len1 - 1]+" s2[len2 - 1]:"+s2[len2 - 1]);
                res = pre;
            } else {
                console.log("s1[len1 - 1] !== s2[len2 - 1] and s1[len1 - 1]:"+s1[len1 - 1]+" s2[len2 - 1]:"+s2[len2 - 1]);
                var s1code = s1.charCodeAt(len1 - 1);
                var s2code = s2.charCodeAt(len2 - 1);
                res = Math.min(map[len1 - 1] + s1code, map[len1] + s2code);
            }
            pre = map[len1];
            console.log(pre);
            console.log(res);
            map[len1] = res;
            
        }
    }
    return map[n];
};

minimumDeleteSum("delete","leet");