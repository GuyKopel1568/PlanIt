import { GiCommercialAirplane } from 'react-icons/gi';
import { FaArrowRight } from 'react-icons/fa';

import { useDarkMode } from '../context/DarkModeContext';

function HomeHeader() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className=" rounded-xl shadow-2xl overflow-hidden border bg-blue-1000 ">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] text-white ">
        {/* Left Section */}
        <div className="p-6 relative ">
          <h2 className="text-xl font-light uppercase">Boarding Pass</h2>
          <div className="text-sm w-full flex flex-col  justify-end">
            <div className="flex items-center justify-between mt-6 mb-3 ">
              <div>
                <h1 className="text-6xl font-bold uppercase">PlanIt</h1>
              </div>
              <GiCommercialAirplane
                size={40}
                color={isDarkMode ? '#ffffff' : '#051d51'}
              />

              <div>
                <h1 className="text-6xl font-bold uppercase">planIt</h1>
              </div>
            </div>

            <div>
              <h1 className="text-4xl mt-2 font-bold uppercase">anywhere</h1>
            </div>
            <FaArrowRight
              size={32}
              color={isDarkMode ? '#ffffff' : '#051d51'}
            />

            <div>
              <h1 className="text-4xl mt-2 font-bold uppercase">everywhere</h1>
            </div>

            <p className="mt-3 flex text-center justify-center uppercase">
              Join us on a journey to smarter travel — plan every step with
              ease, beauty, and confidence.
            </p>
          </div>

          <div className="absolute bottom-4 right-4">
            <div className="h-6 w-full items-center flex justify-center bg-white">
              <img src="./barcode.png" alt="barcode ticket" />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white text-black p-2 flex flex-col justify-between  ">
          <div className="text-sm w-full">
            <p className="font-bold text-center flex items-center gap-3 justify-center bg-blue-1000 text-white rounded-full py-2">
              GO
              <FaArrowRight
                size={40}
                color={isDarkMode ? '#ffffff' : '#051d51'}
              />
              ANYWHERE
            </p>
            <table className="table-fixed w-full uppercase border-separate border-spacing-y-3">
              <tbody>
                <tr className="">
                  <td className=" text-left font-semibold">Passenger:</td>
                  <td className=" text-right font-semibold">Flight:</td>
                </tr>
                <tr>
                  <td className="text-left  border-b border-dotted border-gray-400">
                    Guy Moshe Kopel
                  </td>
                  <td className="text-right  border-b border-dotted border-gray-400">
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
              color={isDarkMode ? '#051d51' : '#ffffff'}
            />
            <p>EVERYWHERE</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeHeader;
