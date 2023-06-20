import Loading from "./Loading";
const withLoadingFeedback = (feedback) => (Component) => (props) => {
  if (props.isLoading) return <Loading center />;
  return <Component {...props} />;
};

export default withLoadingFeedback;
