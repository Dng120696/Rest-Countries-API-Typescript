import loading from "../assets/loading.svg";

function Loading() {
  return (
    <div className="spinner text-xl flex gap-4 items-center min-h-screen">
      <img src={loading} alt="loading" className=" w-16 h-16" />
    </div>
  );
}

export default Loading;
