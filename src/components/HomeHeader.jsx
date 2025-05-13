function HomeHeader() {
  return (
    <div className=" rounded-xl shadow-lg overflow-hidden border ">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] text-white bg-blue-950">
        {/* Left Section */}
        <div className="p-6 relative">
          <h2 className="text-xl font-light">Boarding Pass</h2>

          <div className="flex items-center justify-between mt-8">
            <div>
              <h1 className="text-3xl font-bold uppercase">PlainIt</h1>
            </div>
            <div className="text-4xl">✈️</div>
            <div>
              <h1 className="text-3xl font-bold uppercase">planIt</h1>
            </div>
          </div>

          <div className="text-sm w-full">
            <table className="table-fixed w-full uppercase border-separate border-spacing-y-3">
              <tbody className="">
                <tr className="">
                  <td className="  font-semibold">Passenger:</td>
                  <td className="  font-semibold">Flight:</td>
                </tr>
                <tr>
                  <td className="">Guy Moshe Kopel</td>
                  <td className="">BC1234</td>
                </tr>
                <tr>
                  <td className="font-semibold">Date:</td>
                  <td className=" font-semibold">Time:</td>
                </tr>
                <tr>
                  <td className="">2025/12/12</td>
                  <td className="">15:00</td>
                </tr>
                <tr>
                  <td className="">Gate:</td>
                  <td className="">Seat:</td>
                </tr>
                <tr>
                  <td className="">6</td>
                  <td className="">12A</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="absolute bottom-4 right-4">
            <div className="h-8 w-48 bg-white"></div>
            {/* Barcode placeholder */}
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white text-black p-6 flex flex-col justify-between  ">
          <div className="text-sm w-full">
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
            <p>✈️</p>
            <p>EVERYWHERE</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeHeader;
