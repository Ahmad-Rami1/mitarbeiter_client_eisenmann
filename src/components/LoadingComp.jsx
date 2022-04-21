import ReactLoading from "react-loading";

const LoadingComp = () => {
  return (
    <div className="container-fluid d-flex justify-content-center mt-4">
      <ReactLoading type="spin" />
    </div>
  );
};

export default LoadingComp;
