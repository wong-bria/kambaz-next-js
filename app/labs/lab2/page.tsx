import "./index.css";
import Link from "next/link";
import ForegroundColors from "./foregroundcolors";
import BackgroundColors from "./backgroundcolors";
import Borders from "./borders";
import Padding from "./padding";
import Margins from "./margins";
import Corners from "./corners";
import Dimensions from "./dimensions";
import Positions from "./positions";
import ZIndex from "./zindex";
import Float from "./float";
import GridLayout from "./gridlayout";
import Flex from "./flex";
import MediaQueriesDemo from "./mediaqueriesdemo";
import ReactIconsSampler from "./reacticonsampler";
import { Container } from "react-bootstrap";
import BootstrapGrids from "./bootstrapgrids";
import ScreenSizeLabel from "./screensizelabel";
import BootstrapTables from "./bootstraptables";
import BootStrapLists from "./bootstraplists";
import BootStrapForms from "./bootstrapforms";
import BootStrapNavigation from "./bootstrapnavigation";

export default function Lab2() { 
  return ( 
    <Container>
      <h2>Lab 2 - Cascading Style Sheets</h2> 
      <h3>Styling with the STYLE attribute</h3> 
      <p>
        Style attribute allows configuring look and feel right on the element. Although {"it's"} very convenient 
        it is considered bad practice and you should avoid using the style attribute
      </p> 

       <div id="wd-css-id-selectors"> 
        <h3>ID selectors</h3> 
        <p id="wd-id-selector-1"> 
        Instead of changing the look and feel of all the  
        elements of the same name, e.g., P, we can refer to a specific element by its ID 
        </p> 
        <p id="wd-id-selector-2"> 
        {"Here's"} another paragraph using a different ID and a different look and feel 
        </p> 
      </div> 

      <div id="wd-css-class-selectors"> 
        <h3>Class selectors</h3> 
        <p className="wd-class-selector"> 
        Instead of using IDs to refer to elements, you can use an {"element's"} CLASS attribute </p> 
        <h4 className="wd-class-selector"> 
        This heading has same style as paragraph above </h4> 
      </div> 

      <div id="wd-css-document-structure"> 
        <div className="wd-selector-1"> 
          <h3>Document structure selectors</h3> 
          <div className="wd-selector-2"> 
            Selectors can be combined to refer elements in particular 
            places in the document 
            <p className="wd-selector-3"> 
              This {"paragraph's"} red background is referenced as 
              <br /> 
              .selector-2 .selector3<br /> 
              meaning the descendant of some ancestor.<br /> 
              <span className="wd-selector-4">
                {/* .wd-selector-4 is a direct child of .wd-selector-3 and is a descendant of .wd-selector-2 and is a descendant of .wd-selector-1 who is a parent element */}
                Whereas this span is a direct child of its parent 
              </span><br /> 
                You can combine these relationships to create specific  
                styles depending on the document structure 
            </p> 
          </div> 
        </div> 
      </div>

      <div>
        <ForegroundColors />
      </div>

      <div>
        <BackgroundColors />
      </div>

      <div>
        <Borders />
      </div>

      <div>
        <Padding />
      </div>

      <div>
        <Margins />
      </div>

      <div>
        <Corners />
      </div>

      <div>
        <Dimensions />
      </div>

      <div>
        <Positions />
      </div>

      <div>
        <ZIndex />
      </div>

      <div>
        <Float />
      </div>

      <div>
        <GridLayout />
      </div>

      <div>
        <Flex />
      </div>

      <div>
        <MediaQueriesDemo />
      </div>

      <div>
        <ReactIconsSampler />
      </div>

      <h3>Tailwind Exercises</h3>
      Please <Link href="/labs/lab2/tailwind">click here</Link> to go to Tailwind exercises<br/>
      <br/>

      <div>
        <BootstrapGrids />
      </div>

      <div>
        <ScreenSizeLabel />
      </div>

      <div>
        <BootstrapTables />
      </div>

      <div>
        <BootStrapLists />
      </div>

      <div>
        <BootStrapForms />
      </div>

      <div>
        <BootStrapNavigation />
      </div>

    </Container>
);} 