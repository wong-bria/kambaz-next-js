export default function Float() {
  return (
    <>
      <div id="wd-float-divs"> 
        <h2>Float</h2> 
        <div> 
          <img className="wd-float-right" 
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="starship"/> 
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet leo metus.
          Vestibulum vehicula elementum purus sit amet ornare. Nunc felis nulla, eleifend vitae
          viverra et, aliquam efficitur lorem.
          <img className="wd-float-left" 
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="starship"/> 
          Proin maximus mi eu sodales vulputate. Quisque fringilla posuere convallis. 
          Suspendisse potenti. Etiam bibendum urna sed rutrum porta.
          Nunc cursus porta mauris in pretium. 
          <img className="wd-float-right" 
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="starship"/> 
          Integer sagittis lacinia libero ut hendrerit. 
          Nulla sed porttitor purus. In sit amet elit ac tellus lobortis mattis non mollis dolor.
          Nunc bibendum eros non suscipit pharetra.  
          <img className="wd-float-left" 
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="starship"/> 
          Sed id sem vel erat tincidunt tincidunt. Curabitur blandit sem sit amet tortor mattis, 
          sed consectetur quam elementum. Sed ac congue nisl. Donec nec fringilla libero. 
          Suspendisse efficitur et ex vel viverra. Suspendisse erat lectus, 
          cursus at velit sed, laoreet posuere felis. Proin vitae libero justo. 
          <div className="wd-float-done"></div> 
        </div> 
      </div> 

      <div id="wd-float-divs"> 
        <h2>Float</h2> 
        <div> 
          <div className="wd-float-left wd-dimension-portrait wd-bg-color-yellow"> 
            Yellow 
          </div> 
          <div className="wd-float-left wd-dimension-portrait wd-bg-color-blue wd-fg-color-white"> 
            Blue 
          </div> 
          <div className="wd-float-left wd-dimension-portrait wd-bg-color-red"> 
            Red 
          </div> 
          <img className="wd-float-right" 
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="starship"/> 
          <div className="wd-float-done"></div> 
        </div> 
      </div>
    </>
);}