function kClosest(points, K) {
    let len = points.length, l = 0, r = len - 1;
    while (l <= r) {
        let mid = helper(points, l, r);
        console.log(mid);
        if (mid == K) break;
        if (mid < K) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }

    return points;
    // return Arrays.copyOfRange(points, 0, K);
}

function helper(A, l, r) {
    console.log("Into the helper and l is: " + l + " and r is: " + r);
    console.log(A);
    let pivot = A[l];
    console.log("pivot is: " + pivot);
    while (l < r) {
        while (l < r && compare(A[r], pivot) >= 0) r--;
        A[l] = A[r];
        console.log("After r--" + A);
        while (l < r && compare(A[l], pivot) <= 0) l++;
        A[r] = A[l];
        console.log("After l++" + A);
    }
    A[l] = pivot;
    return l;
}

function compare(p1, p2) {
    console.log("Come to compare and p1 is: " + p1 + " and p2 is: " + p2);
    console.log(p1[0] * p1[0] + p1[1] * p1[1] - p2[0] * p2[0] - p2[1] * p2[1]);
    return p1[0] * p1[0] + p1[1] * p1[1] - p2[0] * p2[0] - p2[1] * p2[1];
}

kClosest([[3, 3], [5, -1], [-2, 4]], 2);