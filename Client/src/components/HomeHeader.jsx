import { GiCommercialAirplane } from 'react-icons/gi';
import { FaArrowRight } from 'react-icons/fa';
import { useDarkMode } from '../context/DarkModeContext';

function HomeHeader() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-xl transition-transform hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] mt-10">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] text-white ">
        <div className="p-2 relative ">
          <h2 className="text-xl font-light uppercase">Boarding Pass</h2>
          <div className="text-sm w-full flex flex-col justify-end">
            <div className="flex items-center md:justify-between mt-2">
              <div>
                <h1 className="text-5xl sm:text-6xl font-bold uppercase animate-fade-in delay-300">
                  PlanIt
                </h1>
              </div>

              <GiCommercialAirplane
                className="animate-plane float-none transition-transform duration-300 hover:rotate-6"
                size={80}
                color={isDarkMode ? '#ffffff' : '#051d51'}
              />

              <div>
                <h1 className="hidden sm:block text-5xl sm:text-6xl font-bold uppercase animate-fade-in delay-300">
                  PlanIt
                </h1>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between">
              <h1 className="text-3xl font-bold uppercase">Anywhere</h1>
              <div className="flex flex-row items-center justify-center gap-5">
                <FaArrowRight className="arrow" size={32} />
                <FaArrowRight className="arrow" size={32} />
                <FaArrowRight className="arrow" size={32} />
              </div>
              <h1 className="text-3xl font-bold uppercase">Everywhere</h1>
            </div>
          </div>
          <div>
            <button
              type="button"
              className="text-white w-full mt-5 bg-gradient-to-r from-blue-900 to-blue-400 to-blue-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2 text-xl uppercase start-button"
            >
              Purple to Blue
            </button>
          </div>
          <div className="flex flex-col items-center justify-center h-16  ">
            <div className=" mt-10 right-4 md:flex justify-center items-center w-full bg-white px-4 py-1 rounded-md shadow">
              <img
                src="./barcode.png"
                alt="barcode"
                className="animate-pulse w-full"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white text-black p-3 flex flex-col justify-between animate-fade-in delay-500 ">
          <div className="text-sm w-full ">
            <p className="font-bold text-center flex items-center gap-3 justify-center text-white rounded-full py-2 transition hover:[var(--color-gray-200)] bg-[var(--color-gray-400)]">
              GO
              <FaArrowRight size={24} />
              ANYWHERE
            </p>

            <table className="table-fixed w-full uppercase border-separate text-[var(--color-gray-550)]">
              <tbody>
                <tr className="">
                  <td className=" text-left font-semibold">Passenger:</td>
                  <td className=" text-right font-semibold">Flight:</td>
                </tr>
                <tr>
                  <td className="text-left border-b border-dotted border-gray-400">
                    Guy Kopel
                  </td>
                  <td className="text-right border-b border-dotted border-gray-400">
                    BC1234
                  </td>
                </tr>
                <tr>
                  <td className="text-left font-semibold">Date:</td>
                  <td className="text-right font-semibold">Time:</td>
                </tr>
                <tr>
                  <td className="text-left  border-b border-dotted border-gray-400">
                    2025/12/12
                  </td>
                  <td className="text-right  border-b border-dotted border-gray-400">
                    15:00
                  </td>
                </tr>
                <tr>
                  <td className="text-left font-semibold">Gate:</td>
                  <td className="text-right font-semibold">Seat:</td>
                </tr>
                <tr>
                  <td className="text-left border-b border-dotted border-gray-400">
                    6
                  </td>
                  <td className="text-right  border-b border-dotted border-gray-400">
                    12A
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-lg font-bold flex flex-col items-center">
            <p>ANYWHERE</p>
            <GiCommercialAirplane
              size={40}
              color={isDarkMode ? '#051d51' : '#b5b7bb'}
            />
            <p>EVERYWHERE</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeHeader;
