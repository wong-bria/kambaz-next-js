export default function AssignmentEditor() { 
  return ( 
    <div id="wd-assignments-editor"> 
      <label htmlFor="wd-name"><h2>Assignment Name</h2></label> 
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br /> 
      <textarea id="wd-description" cols={43} rows={10}> 
      The assignment is available online Submit a link to the landing page of 
      your Web application running on Netlify. The landing page should include
      the following: Your full name and section Links to each of the lab 
      assignments Link to the Kanbas application Links to all relavent source
      code repositories The Kanbas application should include a link to navigate
      back to the landing page.
      </textarea> 
      <br /> <br/>
      <table> 
        <tbody>
          <tr> 
            <td align="right" valign="top"> 
              <label htmlFor="wd-points">Points</label> 
            </td> 
            <td> 
              <input id="wd-points" defaultValue={100} /> 
            </td> 
          </tr> 

          <tr><td><br></br></td></tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group">
                <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="PROJECTS">PROJECTS</option>
              </select>
            </td>
          </tr>

          <tr><td><br></br></td></tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as">
                <option selected value="Percentage">Percentage</option>
                <option value="Decimal">Decimal</option>
                <option value="Letter">Letter</option>
              </select>
            </td>
          </tr>

          <tr><td><br></br></td></tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type">
                <option selected value="Online">Online</option>
                <option value="On Paper">On Paper</option>
                <option value="External Tool">External Tool</option>
              </select>
            </td>
          </tr>

          <tr><td><br></br></td></tr>

          <tr>
            <td align="right" valign="top"></td>
            <td>
              <label>Online Entry Options</label><br />
              <input type="checkbox" id="wd-text-entry" />
              <label htmlFor="wd-text-entry">Text Entry</label><br />
              <input type="checkbox" id="wd-website-url" />
              <label htmlFor="wd-website-url">Website URL</label><br />
              <input type="checkbox" id="wd-media-recordings" />
              <label htmlFor="wd-media-recordings">Media Recordings</label><br />
              <input type="checkbox" id="wd-student-annotation" />
              <label htmlFor="wd-student-annotation">Student Annotation</label><br />
              <input type="checkbox" id="wd-file-upload" />
              <label htmlFor="wd-file-upload">File Uploads</label><br />
            </td>
          </tr>

          <tr><td><br></br></td></tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign</label>
            </td>
            <td> 
              <label htmlFor="wd-assign-to">Assign to</label><br/>
              <input id="wd-assign-to" defaultValue="Everyone" /> 
            </td> 
          </tr>

          <tr><td><br></br></td></tr>

          <tr>
            <td align="right" valign="top"></td>
            <td>
              <label htmlFor="wd-due-date">Due</label><br/>
              <input type="date" 
                  defaultValue="2024-05-13" 
                  id="wd-due-date"/>
            </td>
          </tr>

          <tr><td><br></br></td></tr>

          <tr>
            <td></td>
            <td align="left" valign="top">
              <label htmlFor="wd-available-from">Available from</label><br/>
              <input type="date" 
                  defaultValue="2024-05-06" 
                  id="wd-available-from"/>
            </td>
            <td align="left" valign="top">
              <label htmlFor="wd-available-until">Until</label><br/>
              <input type="date" 
                  defaultValue="2024-05-20" 
                  id="wd-available-until"/>
            </td>
          </tr>

        </tbody>
        <tfoot>
            <tr>
              <td colSpan={3}>
                <hr/>
              </td>
            </tr>
            <tr>
              <td colSpan={2}></td>
              <td colSpan={3} align="right">
                <button>Cancel</button> <button>Save</button>
              </td>
            </tr>
          </tfoot>
      </table> 
    </div> 
);} 