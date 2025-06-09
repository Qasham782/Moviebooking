import Carousel from "../Components/Carousel";
import Experience from "../Components/Experience";
import Footer from "../Components/Footer";
import ExpandingPanels from "../Components/Movposter";
import Theatre from "../Components/Theatre";

export default function Home() {
  return (
    <div >
      <Carousel />
      <Experience />
      <ExpandingPanels />
      <Theatre />
    </div>
  );
}
