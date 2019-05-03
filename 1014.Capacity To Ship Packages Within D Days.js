/* 
A conveyor belt has packages that must be shipped from one port to another within D days.

The i-th package on the conveyor belt has a weight of weights[i].  Each day, we load the ship with packages on the conveyor belt (in the order given by weights). We may not load more weight than the maximum weight capacity of the ship.

Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within D days.

 

Example 1:

Input: weights = [1,2,3,4,5,6,7,8,9,10], D = 5
Output: 15
Explanation: 
A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:
1st day: 1, 2, 3, 4, 5
2nd day: 6, 7
3rd day: 8
4th day: 9
5th day: 10

Note that the cargo must be shipped in the order given, so using a ship of capacity 14 and splitting the packages into parts like (2, 3, 4, 5), (1, 6, 7), (8), (9), (10) is not allowed. 
Example 2:

Input: weights = [3,2,2,4,1,4], D = 3
Output: 6
Explanation: 
A ship capacity of 6 is the minimum to ship all the packages in 3 days like this:
1st day: 3, 2
2nd day: 2, 4
3rd day: 1, 4
Example 3:

Input: weights = [1,2,3,1,1], D = 4
Output: 3
Explanation: 
1st day: 1
2nd day: 2
3rd day: 3
4th day: 1, 1
 */


function shipWithinDays(weights, D) {    
    let heaviestItem = weights[0];
    let weightSum = 0;

    for (x in weights) {
        heaviestItem = Math.max(heaviestItem, weights[x]);
        weightSum += weights[x];
    }

    
    
    let avgWeightOnShip = weightSum / D;
    // Minimum required weight capacity of a ship
    let minWeight = Math.max(heaviestItem, avgWeightOnShip);

    console.log(`Step one: the sum is ${weightSum} and heaviestItem is ${heaviestItem}, avgWeightOnShip is ${avgWeightOnShip} and minWeight for ship to carry one day is ${minWeight}`);
    
    // Start from minimum possible size to maximum possible
    for (let i = minWeight; i <= weights.length * minWeight; i++) {
        console.log("===================");
        console.log(`for now i is ${i}`);
        let ship = new Array(D);
        let index = 0;
        // Fill all the ships
        for (let j = 0; j < ship.length; j++) {
            console.log();
            console.log(`for now j is ${j}`);
            // Try to fit as many items as possible
            while (index < weights.length && ship[j] + weights[index] < i) {
                console.log("ship[j] + weights[index] is: " + ship[j] + weights[index]);
                ship[j] += weights[index];
                index++;
            }
        }
        if (index === weights.length){
            console.log("come herere");
            console.log(i -1);
            return i - 1;
        }
    }
    return 0;
}


shipWithinDays([3,2,2,4,1,4],3);



