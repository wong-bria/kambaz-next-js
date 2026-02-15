export default function IfElse() {
  let true1 = true, false1 = false; 
  return ( 
    <div id="wd-if-else"> 
      <h4>If Else</h4> 
      {/* if true1 is true, then render what's in the p tag. Else nothing renders */}
      { true1 && <p>true1</p> }
      {/* if false1 is not true, then render what's in the p tag. Else render the other p tag */}
      { !false1 ? <p>!false1</p> : <p>false1</p> } <hr/> 
    </div> 
);}