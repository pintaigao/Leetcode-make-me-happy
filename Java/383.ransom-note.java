import javafx.scene.control.RadioButton;

class Solution {
    public boolean canConstruct(String ransomNote, String magazine) {
        char[] mapRN = new char[26];
        char[] mapMG = new char[26];
        for(char c : magazine.toCharArray()){
            mapMG[c - 'a'] ++;
        }
        for(char c : ransomNote.toCharArray()){
            mapRN[c - 'a'] ++;
        }

        for(int i = 0 ; i < 26 ;i ++){
            if(mapRN[i] > 0 && mapMG[i] > 0){
                mapRN[i] --;
                mapMG[i] --;
                i--;
            }
            
        }

        for(int i : mapRN){
            if( i != 0){
                return false;
            }
        }
        return true;
    }
}