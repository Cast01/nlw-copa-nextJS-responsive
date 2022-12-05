export default function Login() {

  const list = Array.from({length: 21});
  const buttonQtty = Array.from({length: 3});
  const perPage = list.length / 5;

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4 mb-4">
        {
          list.map((itemList, i) => {
            return (
              <div key={i} className="bg-green-500 w-max py-4 px-7">
                OPA, BAO?
              </div>
            );
          })
        }
      </div>
      <div className="flex justify-center gap-2 bg-orange-400 w-full">
        {
          buttonQtty.map((_, i) => {
            return (
              <button key={i} className="bg-slate-600 py-2 px-6">
                {i+1}
              </button>
            );
          })
        }
      </div>
    </div>
  )
}