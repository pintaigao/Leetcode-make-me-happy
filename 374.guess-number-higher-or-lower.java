/* The guess API is defined in the parent class GuessGame.
   @param num, your guess
   @return -1 if my number is lower, 1 if my number is higher, otherwise return 0
      int guess(int num); */

public class Solution extends GuessGame {
    public int guessNumber(int n) {
        return bsearch(1, n);
    }

    private int bsearch(int start, int end) {
        if (start > end)
            return -1;//R u kidding me?
        if (guess(start) == 0)
            return start;
        if (guess(end) == 0)
            return end;
        int mid = start + (end - start) / 2;
        if (guess(mid) == 0)
            return mid;
        else if (guess(mid) == -1)
            return bsearch(start + 1, mid - 1);
        else
            return bsearch(mid + 1, end - 1);
    }
}