import MainHeader from '../UI/MainHeader';

function Home() {
  return (
    <div className="pt-20 h-screen bg-[url('/dayBg.png')] dark:bg-[url('/nightBg.png')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center">
      <MainHeader />
    </div>
  );
}

export default Home;
