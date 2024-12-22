/**
 * create 3 button for generate random color, hex color and rgb color
 * declare 2 state one is for type of color and other one is storing color
 * set onclick for the two button and create two function for generate color one for hex one for rgb
 * hex color array would be start from 0-9 & A TO F and declare with #
 * create randomfunctionutiliy which return Math.floor(Math.random()* length)
 * run a loop of (0-6)cause hex color length 6 inside hex function and then hex += hex[utilityFunc(hex.length)] then setColor(hexColor)
 * inside rgb declare r = utityFunc(256) same for g same for b then setColor(`rgb${r}{g}{b}`)
 * declare a div under the button for {color} and a conditional rendaring text 
 * declare a useEffect if typeof hex then call hex otherwise rgb
 */
