const Giphy = ({
  id,
  images: {
    fixed_height: { url }
  }
}) => {
  return (
    <div>
      <img src={url} alt="gif" className="gif" />
    </div>
  );
};
export default Giphy;
