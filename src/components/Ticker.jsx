const Ticker = () => {
  return (
    <div className="w-full bg-indigo-600 py-2 text-white">
      <div className="relative overflow-hidden">
        <div className="animate-scroll whitespace-nowrap">
          <span className="mx-4">
            I'am using free instance of render(hosting prvider for backend) will
            spin down with inactivity, which can delay requests by 50 seconds or
            more.🥲
          </span>
        </div>
      </div>
    </div>
  )
}
export default Ticker
