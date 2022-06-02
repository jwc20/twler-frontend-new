import Iframe from "react-iframe";

const CalculatorPage = () => {
  return (
    <div className="min-h-screen">
      <Iframe
        src="https://editor.p5js.org/jcw00/full/PnIhXM3qC"
        className="min-h-screen"
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        id="testFrame"
        style="position:absolute;"
      ></Iframe>
      {/* <iframe src="https://editor.p5js.org/choij2015/full/PnIhXM3qC" width="100%" height="100%" frameBorder="0" scrolling="no" id="testFrame" style="position:absolute;"></iframe> */}
    </div>
    // <div style="stylecontainer" >
    //   <iframe src="https://editor.p5js.org/choij2015/full/wb-aGwhwS"></iframe>
    //  {/* <div dangerouslySetInnerHTML={{ __html: "<iframe src='https://www.youtube.com/embed/cWDJoK8zw58' />"}} /> */}
    //  <div dangerouslySetInnerHTML={{ __html: "<iframe src='https://editor.p5js.org/choij2015/full/wb-aGwhwS' />"}} />

    // </div>
  );
};

export default CalculatorPage;
