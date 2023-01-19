import Modal from "./modal";
import Notes from "./Notes";

const Home = (props) => {
 
   const {showAlert} = props
    return (
    <div >
{
  props.showModal && <Modal/>
}
  <Notes showAlert={showAlert} />
    </div>);  
}

;


export default Home;