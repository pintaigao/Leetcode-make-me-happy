var kClosest = function (points, K) {
  points = points.sort(function (a, b) {
    console.log(a);
    console.log(b);
    console.log(a[0] * a[0] + a[1] * a[1] - (b[0] * b[0] + b[1] * b[1]));
    console.log("next");

    /* 如果a-b>0 b在a前面，如果小于0,a在b前面 */
    return a[0] * a[0] + a[1] * a[1] - (b[0] * b[0] + b[1] * b[1]);
  });

  console.log(points);

  return points.slice(0, K);
};

kClosest([[3, 3], [5, -1], [-2, 4]], 2);