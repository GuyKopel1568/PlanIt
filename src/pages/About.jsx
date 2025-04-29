import Header from '../ui/Header';
import Button from '../ui/Button';
import Popup from '../ui/Popup';

function About() {
  return (
    <>
      <div>
        <Header type="primary">About PlanIt </Header>
        <Header type="secondary">About PlanIt </Header>
        <Header type="error">About PlanIt </Header>
      </div>
      <div>
        <Button type="primary">Click</Button>
        <Button type="secondary">Click</Button>
        <Button type="error">Click</Button>
        <Button type="cancel">Click</Button>
      </div>
      <div>
        <Popup>Are you sure you eant to delete?</Popup>
      </div>
    </>
  );
}

export default About;
