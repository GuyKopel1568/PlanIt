import MainHeader from '../UI/MainHeader';
import PlaneScene from '../components/PlaneScene';

function Landing() {
  return (
    <div className="relative pt-20 h-screen bg-[url('/dayBg.png')] dark:bg-[url('/nightBg.png')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center">
      <div className="absolute inset-0 pointer-events-none"></div>
      <div className="w-screen h-screen">
        <PlaneScene />
      </div>

      <MainHeader />
    </div>
  );
}

export default Landing;
